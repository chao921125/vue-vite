// https://vitejs.dev/config/ 中文文档 https://cn.vitejs.dev/
import type { UserConfig, ConfigEnv } from "vite";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";
// 热重载
import viteRestart from "vite-plugin-restart";
// build 构建
import { visualizer } from "rollup-plugin-visualizer";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { VitePWA } from "vite-plugin-pwa";
// 向上兼容浏览器
import browserslist from "browserslist";
import legacy from "@vitejs/plugin-legacy";
// CDN 配置
import importToCDN from "vite-plugin-cdn-import";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import viteCompression from "vite-plugin-compression";
// 自动导入模块
import autoImport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// CSS 预构建
import UnoCSS from "unocss/vite";
// import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from "unocss";
// 图标
import icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// Mock
import { viteMockServe } from "vite-plugin-mock";
// 处理变量
// @ts-ignore
import pkg from "./package.json";
// @ts-ignore
import { getEnvConfig, createProxy } from "./build";

const __APP_INFO__ = {
	pkg,
	lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

// @ts-ignore
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const envConfig = getEnvConfig(env);
	const isBuild = command.includes("build");
	const browserslistConfig = browserslist.loadConfig({ path: "." });
	let dynamicConfig: UserConfig;
	// 动态添加的一些配置
	if (isBuild) {
		// 新建一个build文件，用来告诉用户是否需要刷新页面升级，正常来说不需要告知用户
		fs.writeFileSync(path.join(__dirname, "./public/build.json"), JSON.stringify({ version: `${Date.now()}` }));
		dynamicConfig = {};
	} else {
		// command === "build"
		dynamicConfig = {};
	}
	const defaultConfig: UserConfig = {
		root: path.resolve(__dirname, ""), // "./public/index.html", // 入口，可以指定到public文件夹
		base: isBuild ? "./" : envConfig.VITE_PUBLIC_PATH, // 公共基础路径
		// mode: "development", // 指令覆盖构建模式 --mode
		define: {
			// 定义全局常量替换方式
			// setting vue-i18-next
			// Suppress warning
			__APP_INFO__: JSON.stringify(__APP_INFO__),
		},
		plugins: [
			// 插件
			vue(),
			// * vite 可以使用 jsx/tsx 语法
			// * name 可以写在 script 标签上
			vueSetupExtend(),
			// 浏览器上兼容
			legacy({
				renderLegacyChunks: false,
				modernPolyfills: ["es.global-this"],
				targets: browserslistConfig,
			}),
			// 热重载，包含配置文件的修改
			viteRestart({
				restart: ["vite.config.[jt]s"],
			}),
			// 渐进式配置
			VitePWA({}),
			ViteEjsPlugin(
				(viteConfig) => {
					// viteConfig is the current viteResolved config.
					return {
						root: viteConfig.root,
						title: envConfig.VITE_TITLE,
					};
				},
				{
					ejs: {
						// ejs options goes here.
						beautify: true,
					},
				},
			),
			// * demand import element(如果使用了cdn引入,没必要使用element自动导入了)
			// * cdn 引入（vue、element-plus）//cdn.jsdelivr.net/npm/
			importToCDN({
				modules: [
					// vue按需引入会导致依赖vue的插件出现问题(列如:pinia/vuex)
					// {
					// 	name: "vue",
					// 	var: "Vue",
					// 	path: "https://unpkg.com/vue@3"
					// },
					// 使用cdn引入element-plus时,开发环境还是需要在main.js中引入element-plus,可以不用引入css
					// {
					// 	name: "element-plus",
					// 	var: "ElementPlus",
					// 	path: "https://unpkg.com/element-plus",
					// 	css: "https://unpkg.com/element-plus/dist/index.css",
					// },
					// {
					// 	name: "vant",
					// 	var: "Vant",
					// 	path: "https://fastly.jsdelivr.net/npm/vant@4/lib/vant.min.js",
					// 	css: "https://fastly.jsdelivr.net/npm/vant@4/lib/index.css",
					// },
				],
			}),
			// * 是否生成包预览
			envConfig.VITE_REPORT &&
				visualizer({
					emitFile: false,
					filename: "stats.html",
				}),
			// * gzip compress
			envConfig.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 1024,
					algorithm: "gzip",
					ext: ".gz",
				}),
			{
				name: "@rollup/plugin-commonjs",
				transform(code: string, filename: string | string[]) {
					if (filename.includes(`/node_modules/`)) {
						return code;
					}

					const cjsRegexp = /(const|let|var)[\n\s]+(\w+)[\n\s]*=[\n\s]*require\(['|'](.+)['|']\)/g;
					const res = code.match(cjsRegexp);
					if (res) {
						// const Store = require("electron-store") -> import Store from "electron-store"
						code = code.replace(cjsRegexp, `import $2 from "$3"`);
					}
					return code;
				},
			},
			// 原子css
			UnoCSS(),
			// 图标
			icons({
				compiler: "vue3",
				autoInstall: true,
			}),
			createSvgIconsPlugin({
				// 指定 SVG图标 保存的文件夹路径
				iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
				// 指定 使用svg图标的格式
				symbolId: "svg-[dir]-[name]",
			}),
			// https://github.com/antfu/unplugin-auto-import#readme
			autoImport({
				include: [
					/\.[tj]s?$/, // .ts, .tsx, .js, .jsx
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
					/\.md$/, // .md
				],
				imports: ["vue", "vue-router", "pinia", "@vueuse/head", "@vueuse/core", "vue-i18n"],
				dirs: ["./hooks", "./hooks/**", "./components", "./components/**"],
				dts: true,
				resolvers: [ElementPlusResolver(), IconsResolver()],
			}),
			components({
				dts: true,
				resolvers: [ElementPlusResolver(), IconsResolver()],
				directoryAsNamespace: true,
			}),
			viteMockServe({
				mockPath: envConfig.VITE_MOCK_PATH,
				// configPath: envConfig.VITE_MOCK_PATH,
				watchFiles: false,
				enable: envConfig.VITE_MOCK,
				logger: envConfig.VITE_MOCK,
			}),
		],
		// publicDir: "public", // 静态资源根路径，false关闭
		// cacheDir: "node_modules/.vite", // 缓存路径
		resolve: {
			alias: {
				// 别名必须以 / 开头、结尾
				// "/@/": root, -- vite 内部在用，这里不能用了
				// "/root/": __dirname, -- vite 内部在用，这里不能用了
				// remove i18n waring
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
				"@": path.resolve(__dirname, "./src"),
				"#": path.resolve(__dirname, "./types"),
			},
			// dedupe: "", // 一般SSR+ESM使用
			// conditions: "",
			// mainFields: "",
			// extensions: "",
			// preserveSymlinks: "",
		},
		css: {
			// modules: "",
			// 打开此处 postcss.config.js失效
			// postcss: {
			// 	plugins: [],
			// },
			preprocessorOptions: {
				css: { charset: false },
				less: {
					javascriptEnabled: true,
					// additionalData: `$injectedColor: orange`
				},
				scss: {
					javascriptEnabled: true,
					additionalData: `@use "@/assets/styles/public/index.scss" as *;`,
				},
			},
			// devSourcemap: false,
		},
		// json: {
		//   namedExports: true, // 按名称导入
		//   stringify: false, // 序列化后导入，即：JSON.parse()，开启后则namedExports失效
		// },
		esbuild: {
			// false or jsx settings
			// jsxFactory: "h",
			// jsxFragment: "Fragment",
			pure: envConfig.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
		},
		// assetsInclude: "", // 静态资源处理
		logLevel: "info", // 可以根据开发环境动态改变 "info" | "warn" | "error" | "silent"
		// customLogger: looger,
		clearScreen: false, // --clearScreen
		// envDir: "", // 配置.env文件相关
		// envPrefix: "", // 配置.env变量以VUE_还是默认的VITE_
		// appType: "", // 'spa' | 'mpa' | 'custom'
		server: {
			// host: "localhost",
			port: envConfig.VITE_PORT,
			strictPort: true, // 存在冲突端口，则继续下找可用端口
			// https: "", // boolean | https.ServerOptions
			open: envConfig.VITE_OPEN, // boolean | string
			proxy: createProxy(envConfig.VITE_PROXY),
			// {
			// 	// string shorthand
			// 	// "/foo": "http://localhost:4567/foo",
			// 	"/api": {
			// 		target: "http://jsonplaceholder.typicode.com",
			// 		changeOrigin: true,
			// 		rewrite: path => path.replace(/^\/api/, ""),
			// 	},
			// 	// with RegEx
			// 	// "^/fallback/.*": {
			// 	//   target: "http://jsonplaceholder.typicode.com",
			// 	//   changeOrigin: true,
			// 	//   rewrite: (path) => path.replace(/^\/fallback/, "")
			// 	// },
			// 	// 使用 proxy 实例
			// 	// "api": {
			// 	//   target: "http://jsonplaceholder.typicode.com",
			// 	//   changeOrigin: true,
			// 	//   configure: () => {
			// 	//      // proxy http-proxy
			// 	//   },
			// 	// },
			// 	// '/socket.io': {
			// 	// 	target: 'ws://localhost:3000',
			// 	// 	ws: true
			// 	// }
			// },
			cors: true, // boolean | CorsOptions
			// headers: false, // OutgoingHttpHeaders 指定服务器响应的 header
			hmr: true, // boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean }
			// watch: "", // object
			// middlewareMode: "",
			// base: "", // string | undefined
			// fs: {
			//  strict: "",
			//  allow: "",
			//  deny: "",
			// },
			// origin: "",
			// sourcemapIgnoreList: "", // false | (sourcePath: string, sourcemapPath: string) => boolean
		},
		build: {
			target: "modules",
			// modulePreload: true,
			// polyfillDynamicImport: "", // boolean
			outDir: path.join(__dirname, "dist"), // path.join(__dirname, "dist/render"),
			assetsDir: path.join(__dirname, "assets"),
			assetsInlineLimit: 5120, // 5KB
			// 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
			cssCodeSplit: true,
			// cssTarget: true, // 与 build.target 一致
			// cssMinify: true, // 与 build.minify 一致
			sourcemap: false,
			rollupOptions: {
				input: {
					index: path.resolve(__dirname, "/index.html"),
					color: path.resolve(__dirname, "/color.html"),
				},
				output: {
					dir: "dist",
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
					compact: true,
					manualChunks: {
						vue: ["vue", "vue-router", "pinia"],
						echarts: ["echarts"],
						elementPlus: ["element-plus"],
					},
				},
			},
			// commonjsOptions: "",
			// dynamicImportVarsOptions: "",
			// lib: "",
			// manifest: false, // manifest.json
			// ssrManifest: false,
			// ssr: false,
			minify: "terser", // boolean | "terser" | "esbuild"
			terserOptions: {
				compress: {
					drop_console: isBuild, // 生产环境去除console
					drop_debugger: isBuild, // 生产环境去除debugger
				},
			},
			// write: true,
			// emptyOutDir: true, // outDiroutDir--emptyOutDir
			// copyPublicDir: true,
			reportCompressedSize: true,
			chunkSizeWarningLimit: 2048,
			// watch: 1024,
		},
		// preview: {
		//   host: "",
		//   port: "",
		//   strictPort: "",
		//   https: "",
		//   open: "",
		//   proxy: {},
		//   cors: true,
		//   headers: "", // OutgoingHttpHeaders
		// },
		optimizeDeps: {
			// entries: "optimize.js",
			exclude: [""],
			include: ["lodash", "lodash-es", "@vueuse/core", "@vue/runtime-core", "element-plus", "vuedraggable", "@vue/shared"],
			// esbuildOptions: "",
			force: false,
		},
		// ssr: {
		//   external: "",
		//   noExternal: "",
		//   target: "",
		//   format: "esm",
		// },
		// worker: {
		//   format: "iife", // 'es' | 'iife'
		//   plugins: [],
		//   rollupOptions: {},
		// },
	};
	return Object.assign(defaultConfig, dynamicConfig);
});
