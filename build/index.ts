import type { ProxyOptions, BuildOptions } from "vite";

export const getEnvConfig = (env: Recordable): ViteEnv => {
	let envConfig: any = {};
	for (const envName of Object.keys(env)) {
		let envValue = env[envName].replace(/\\n/g, "\n");
		envValue = envValue === "true" ? true : envValue === "false" ? false : envValue;
		if (envName === "VITE_PORT") {
			envValue = Number(envValue);
		}
		if (envName === "VITE_PROXY") {
			try {
				envValue = JSON.parse(envValue);
			} catch (e) {
				console.log("VITE_PROXY error");
			}
		}
		envConfig[envName] = envValue;
	}
	return envConfig;
};

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

export const createProxy = (list: ProxyList = []) => {
	const rel: ProxyTargetList = {};
	for (const [prefix, target] of list) {
		const isHttps = httpsRE.test(target);
		// https://github.com/http-party/node-http-proxy#options
		rel[prefix] = {
			target: target,
			changeOrigin: true,
			ws: true,
			rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
			// https is require secure=false
			...(isHttps ? { secure: false } : {}),
		};
	}
	return rel;
};

export const getBuild = (isBuild: boolean): BuildOptions => {
	return {
		target: "modules",
		// polyfillDynamicImport: "", // boolean
		outDir: "dist", // path.join(__dirname, "dist/render"),
		assetsDir: "assets",
		assetsInlineLimit: 5120, // 5MB
		// 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
		cssCodeSplit: true,
		// cssTarget: true,
		sourcemap: false,
		rollupOptions: {
			output: {
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
		minify: "terser", // boolean | "terser" | "esbuild"
		terserOptions: {
			compress: {
				drop_console: isBuild, // 生产环境去除console
				drop_debugger: isBuild, // 生产环境去除debugger
			},
		},
		// write: true,
		// emptyOutDir: "", // outDiroutDir--emptyOutDir
		chunkSizeWarningLimit: 2048,
		// watch: 1024,
	};
};
