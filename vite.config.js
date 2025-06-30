// @see https://vitejs.dev/config/
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import dayjs from "dayjs";
/**
 * 核心
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
/**
 * 插件
 */
// 热重载
import fullReload from "vite-plugin-full-reload";
// build 生成打包分析的 html
import { visualizer } from "rollup-plugin-visualizer";
// ejs 支持，在 html 中使用 变量语法
import { ViteEjsPlugin } from "vite-plugin-ejs";
// 生成一个离线的快捷应用 PWA
import { VitePWA } from "vite-plugin-pwa";
// gzip 压缩
import { compression } from "vite-plugin-compression2";
// 浏览器兼容
import browserslist from "browserslist";
import legacy from "@vitejs/plugin-legacy";
// 自动导入模块
import autoImport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import { VantResolver, ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
// 自动导入模块 图标
import icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import svgLoader from "vite-svg-loader";
// 低质量图片展位
import lqip from "vite-plugin-lqip";
// 自定义文件，变量处理
import pkg from "./package.json";
import { getEnvConfig, createProxy } from "./build";

const __APP_INFO__ = {
	pkg,
	lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export default defineConfig(({ command, mode }) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const envConfig = getEnvConfig(loadEnv(mode, import.meta.dirname, ""));
	const browserslistConfig = browserslist.loadConfig({ path: "." });
	const isBuild = command.includes("build");
	/**
	 * 动态配置
	 */
	let dynamicConfig;
	if (isBuild) {
		// 新建一个build文件，用来告诉用户是否需要刷新页面升级，正常来说不需要告知用户
		fs.writeFileSync(path.join(__dirname, "./public/build.json"), JSON.stringify({ version: `${Date.now()}` }));
		dynamicConfig = {};
	} else {
		dynamicConfig = {};
	}
	/**
	 * 静态配置
	 */
	const defaultConfig = {
		// *** 公共 start ***
		root: path.resolve(__dirname, ""), // "./public/index.html", // 入口，可以指定到public文件夹
		base: isBuild ? envConfig.VITE_PUBLIC_PATH : "./", // 公共基础路径
		// mode: "development", // 指令覆盖构建模式 --mode
		define: {
			// 定义全局常量替换方式
			// setting vue-i18-next
			// Suppress warning
			__APP_INFO__: JSON.stringify(__APP_INFO__),
		},
		plugins: [
			vue({
				template: { transformAssetUrls },
			}),
			fullReload(["config/*", "src/**/*", "types/**/*"], { root: __dirname, delay: 100 }),
			// * 是否生成包预览
			envConfig.VITE_REPORT &&
				visualizer({
					filename: "stats.html",
					title: "Visualizer",
					emitFile: true,
				}),
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
			VitePWA({
				injectRegister: "auto",
				registerType: "autoUpdate",
				devOptions: {
					enabled: false,
				},
				includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
				manifest: {
					name: "vue-vite",
					short_name: "vv",
					description: "vue-vite frame",
					id: "vue-vite",
					start_url: ".",
					theme_color: "#FFFFFF",
					icons: [
						{
							src: "/pwa-640.png",
							sizes: "640x640",
							type: "image/png",
						},
					],
				},
				workbox: {
					globPatterns: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,css,scss,sass,less,html,ico,icon,png,jpg,jpeg,gif,webp,svg,ttf,otf,woff,woff2}"],
					cleanupOutdatedCaches: false,
					sourcemap: true,
					maximumFileSizeToCacheInBytes: 15 * 1024 ** 2,
					runtimeCaching: [
						mode === "production"
							? {
									urlPattern: ({ url }) => url.origin.includes("https"),
									handler: "NetworkFirst",
									options: {
										cacheName: "pwa-api",
										cacheableResponse: {
											statuses: [200],
										},
									},
								}
							: {
									urlPattern: ({ url }) => url.origin.includes("test"),
									handler: "NetworkFirst",
									options: {
										cacheName: "pwa-api",
										cacheableResponse: {
											statuses: [200],
										},
									},
								},
						{
							urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
							handler: "CacheFirst",
							options: {
								cacheName: "pwa-images",
								expiration: {
									// 最多30个图
									maxEntries: 30,
								},
							},
						},
						{
							urlPattern: /.*\.js.*/,
							handler: "StaleWhileRevalidate",
							options: {
								cacheName: "pwa-js",
								expiration: {
									maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
									maxAgeSeconds: 30 * 24 * 60 * 60,
								},
								cacheableResponse: {
									statuses: [200],
								},
							},
						},
						{
							urlPattern: /.*\.css.*/,
							handler: "StaleWhileRevalidate",
							options: {
								cacheName: "pwa-css",
								expiration: {
									maxEntries: 20,
									maxAgeSeconds: 30 * 24 * 60 * 60,
								},
								cacheableResponse: {
									statuses: [200],
								},
							},
						},
						{
							urlPattern: /.*\.html.*/,
							handler: "StaleWhileRevalidate",
							options: {
								cacheName: "pwa-html",
								expiration: {
									maxEntries: 20,
									maxAgeSeconds: 30 * 24 * 60 * 60,
								},
								cacheableResponse: {
									statuses: [200],
								},
							},
						},
					],
				},
			}),
			legacy({
				renderLegacyChunks: false,
				modernPolyfills: ["es.global-this"],
				targets: browserslistConfig,
			}),
			lqip(),
			envConfig.VITE_BUILD_GZIP && compression(),
			autoImport({
				include: [
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
					/\.md$/, // .md
				],
				imports: ["vue", "vue-router", "pinia", "@vueuse/head", "@vueuse/core", "vue-i18n"],
				dirs: ["./hooks", "./hooks/**", "./components", "./components/**"],
				dts: true,
				resolvers: [VantResolver(), ElementPlusResolver(), IconsResolver()],
				eslintrc: {
					enabled: true, // <-- this
				},
			}),
			components({
				dts: true,
				resolvers: [VantResolver(), ElementPlusResolver(), IconsResolver()],
				directoryAsNamespace: true,
			}),
			Vuetify({
				autoImport: true,
				styles: {
					configFile: "src/assets/styles/theme.scss",
				},
			}),
			icons({
				compiler: "vue3",
				autoInstall: true,
			}),
			svgLoader({ defaultImport: "component" }),
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
				// '@': fileURLToPath(new URL('./src', import.meta.url)),
				"#": path.resolve(__dirname, "./types"),
			},
			// dedupe: "", // 一般SSR+ESM使用
			// conditions: "",
			// mainFields: "",
			// extensions: "",
			// preserveSymlinks: "",
		},
		// html: { cspNonce: {} }, // 一个在生成脚本或样式标签时会用到的 nonce 值占位符
		css: {
			// modules: "",
			// 打开此处 postcss.config.js失效
			// postcss: {
			// 	plugins: [],
			// },
			preprocessorOptions: {
				css: { charset: false },
				styl: {
					additionalData: `$injectedColor ?= orange`,
				},
				less: {
					javascriptEnabled: true,
					// additionalData: `$injectedColor: orange`
				},
				scss: {
					javascriptEnabled: true,
					additionalData: `@use "@/assets/styles/theme.scss" as *;`,
				},
			},
			// preprocessorMaxWorkers: true,,
			// devSourcemap: false,
			// transformer: "postcss", // 'postcss' | 'lightningcss'
			// lightningcss: "CSSModulesConfig",
		},
		json: {
			namedExports: true, // 按名称导入
			stringify: true, // 序列化后导入，即：JSON.parse()，开启后则namedExports失效
		},
		esbuild: {
			// false or jsx settings
			// jsxFactory: "h",
			// jsxFragment: "Fragment",
			pure: envConfig.VITE_DROP_CONSOLE ? ["console.log"] : [],
			drop: envConfig.VITE_DROP_CONSOLE ? ["debugger"] : [],
		},
		assetsInclude: ["**/*.gltf"], // 静态资源处理
		logLevel: "info", // 可以根据开发环境动态改变 "info" | "warn" | "error" | "silent"
		// customLogger: logger, // 可以根据开发环境动态改变 "info" | "warn" | "error" | "silent"
		clearScreen: false, // --clearScreen
		// envDir: "", // 配置.env文件相关
		// envPrefix: "", // 配置.env变量以VUE_还是默认的VITE_
		// appType: "", // 'spa' | 'mpa' | 'custom'
		// future: "",
		// *** 服务器 start ***
		server: {
			host: true,
			allowedHosts: true,
			port: envConfig.VITE_PORT,
			strictPort: false, // 存在冲突端口，则继续下找可用端口
			// https: true, // boolean | https.ServerOptions
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
			// warmup: "", // object
			// watch: "", // object
			// middlewareMode: "",
			// fs: {
			//  strict: "",
			//  allow: "",
			//  deny: "",
			// },
			// origin: "",
			// sourcemapIgnoreList: "",
		},
		// *** 构建 start ***
		build: {
			target: "modules",
			// modulePreload: {},
			// polyfillModulePreload: true,
			outDir: path.join(__dirname, "./dist"), // path.join(__dirname, "dist/render"),
			assetsDir: path.join(__dirname, "./assets"),
			assetsInlineLimit: 5120, // 5KB
			// 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
			cssCodeSplit: true,
			// cssTarget: true, // 与 build.target 一致
			// cssMinify: true, // 与 build.minify 一致
			sourcemap: true,
			rollupOptions: {
				input: {
					index: path.resolve(__dirname, "./index.html"),
					// color: path.resolve(__dirname, "/public/color.html"),
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
					},
				},
			},
			// commonjsOptions: "",
			// dynamicImportVarsOptions: "",
			// lib: "",
			// manifest: false, // manifest.json
			// ssrManifest: false,
			// ssr: false,
			// emitAssets: false,
			// ssrEmitAssets: false,
			minify: "terser", // boolean | "terser" | "esbuild"
			terserOptions: {
				compress: {
					drop_console: isBuild, // 生产环境去除console
					drop_debugger: isBuild, // 生产环境去除debugger
				},
			},
			// write: true,
			// emptyOutDir: true, // outDiroutDir--emptyOutDir
			// copyPublicDir: true, // outDiroutDir--emptyOutDir
			reportCompressedSize: true,
			chunkSizeWarningLimit: 1024,
			// watch: 1024,
		},
		// *** 预览 start ***
		// preview: {
		//   host: "",
		//   allowedHosts: "",
		//   port: "",
		//   strictPort: "",
		//   https: "",
		//   open: "",
		//   proxy: {},
		//   cors: true,
		//   headers: "*",
		// },
		// *** 依赖优化 start ***
		optimizeDeps: {
			// entries: "optimize.js",
			exclude: [],
			include: [],
			// esbuildOptions: "",
			force: false,
			// noDiscovery: false,
			// holdUntilCrawlEnd: false,
			// needsInterop: [],
		},
		// *** SSR start ***
		// ssr: {
		//   external: "",
		//   noExternal: "",
		//   target: "",
		//   resolve: {
		//   	conditions: [],
		//   	externalConditions: [],
		//   	mainFields: [],
		//   },
		// },
		// *** Worker start ***
		// worker: {
		//   format: "iife", // 'es' | 'iife'
		//   plugins: [],
		//   rollupOptions: {},
		// },
	};
	return Object.assign(defaultConfig, dynamicConfig);
});
