// @see https://vitejs.dev/config/
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { format } from "date-fns";

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
  lastBuildTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};

export default defineConfig(({ command, mode }) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envConfig = getEnvConfig(loadEnv(mode, import.meta.dirname, ""));
  const browserslistConfig = browserslist.loadConfig({ path: "." });
  const isBuild = command.includes("build");

  // 检测部署平台
  const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_URL;
  const isCloudflare = process.env.CF_PAGES === "true" || !!process.env.CF_REGION;
  const isDeploy = isVercel || isCloudflare;
  // 是否为微前端子应用
  // const isMicroApp = !!env.VITE_MICRO_APP;
  /**
   * 动态配置
   */
  let dynamicConfig;
  if (isBuild) {
    // 新建一个build文件，用来告诉用户是否需要刷新页面升级，正常来说不需要告知用户
    fs.writeFileSync(
      path.join(__dirname, "./public/manifest.json"),
      JSON.stringify({ version: `${Date.now()}` }),
    );
    dynamicConfig = {};
  } else {
    dynamicConfig = {};
  }
  /**
   * 静态配置
   */
  const defaultConfig = {
    /**
     * =======================================================================
     * 1. 共享选项 (Shared Options)
     * 参考: https://vite.dev/config/shared-options
     * =======================================================================
     */
    root: path.resolve(__dirname, ""), // "./public/index.html", // 入口，可以指定到public文件夹
    base: isBuild ? (isDeploy ? "/" : envConfig.VITE_PUBLIC_PATH) : "./", // 公共基础路径，部署到云平台时使用根路径
    // mode: "development", // 指令覆盖构建模式 --mode
    define: {
      // 定义全局常量替换方式
      // setting vue-i18-next
      // Suppress warning
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    plugins: [
      vue({
        // template: { transformAssetUrls },
      }),
      fullReload(["config/*", "src/**/*", "types/**/*"], { root: __dirname, delay: 100 }),
      // * 是否生成包预览
      isBuild &&
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
      isBuild &&
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
            globPatterns: [
              "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,css,scss,sass,less,html,ico,icon,png,jpg,jpeg,gif,webp,svg,ttf,otf,woff,woff2}",
            ],
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
        modernTargets: "defaults and supports es6-module",
      }),
      lqip(),
      isBuild && envConfig.VITE_BUILD_GZIP && compression(),
      autoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.vue\.[tj]sx?\?vue/,
          /\.md$/, // .md
        ],
        imports: [
          "vue",
          "vue-router",
          "pinia",
          "@vueuse/head",
          "@vueuse/core",
          "vue-i18n",
          {
            axios: [
              // default imports
              ["default", "axios"], // import { default as axios } from 'axios',
            ],
          },
        ],
        dirs: ["./hooks", "./hooks/**", "./components", "./components/**"],
        dirsScanOptions: {
          filePatterns: ["*.ts"], // Glob patterns for matching files
          fileFilter: (file) => file.endsWith(".ts"), // Filter files
          types: true, // Enable auto import the types under the directories
        },
        resolvers: [VantResolver(), ElementPlusResolver(), IconsResolver()],
        dts: "./auto-imports.d.ts",
        dtsMode: "append",
        defaultExportByFilename: false,
        ignore: ["useMouse", "useFetch"],
        ignoreDts: ["ignoredFunction", /^ignore_/],
        vueTemplate: false,
        viteOptimizeDeps: true,
        injectAtEnd: true,
        eslintrc: {
          enabled: true, // <-- this
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true,
        },
        biomelintrc: {
          enabled: false, // Default `false`
          filepath: "./.biomelintrc-auto-import.json", // Default `./.biomelintrc-auto-import.json`
        },
        dumpUnimportItems: "./auto-imports.json",
      }),
      components({
        include: [/\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/],
        exclude: [/[\/]node_modules[\/]/, /[\/]\.git[\/]/, /[\/]\.nuxt[\/]/],
        excludeNames: [/^Async.+/],
        dirs: ["src/components"],
        extensions: ["vue"],
        globs: ["src/components/*.vue"],
        resolvers: [VantResolver(), ElementPlusResolver(), IconsResolver()],
        dts: true,
        deep: true,
        directoryAsNamespace: false,
        dtsTsx: false,
        collapseSamePrefixes: false,
        globalNamespaces: [],
        directives: true,
        allowOverrides: false,
        version: 3,
        types: [],
        dumpComponentsInfo: false,
        syncMode: "default",
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
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
        "@": path.resolve(__dirname, "./src"),
        "#": path.resolve(__dirname, "./types"),
      },
    },
    // html: { cspNonce: {} }, // 一个在生成脚本或样式标签时会用到的 nonce 值占位符
    css: {
      preprocessorOptions: {
        css: { charset: false },
        styl: {
          additionalData: `$injectedColor ?= orange`,
        },
        less: {
          javascriptEnabled: true,
        },
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/assets/styles/theme.scss" as *;`,
        },
      },
    },
    json: {
      namedExports: true, // 按名称导入
      stringify: true, // 序列化后导入，即：JSON.parse()，开启后则namedExports失效
    },
    oxc: {},
    assetsInclude: ["**/*.gltf"], // 静态资源处理
    logLevel: "info", // 可以根据开发环境动态改变 "info" | "warn" | "error" | "silent"
    // customLogger: logger, // 可以根据开发环境动态改变 "info" | "warn" | "error" | "silent"
    clearScreen: false, // --clearScreen
    // envDir: "", // 配置.env文件相关
    // envPrefix: "", // 配置.env变量以VUE_还是默认的VITE_
    // appType: "", // 'spa' | 'mpa' | 'custom'
    // devtools: false,
    // future: "",
    /**
     * 2. 服务器选项 (Server Options)
     * 参考: https://vite.dev/config/server-options
     */
    server: {
      host: true,
      allowedHosts: true,
      port: envConfig.VITE_PORT,
      strictPort: false,
      open: envConfig.VITE_OPEN,
      proxy: createProxy(envConfig.VITE_PROXY),
      cors: true,
      hmr: true,
      forwardConsole: {
        unhandledErrors: true,
        logLevels: ['warn', 'error'],
      },
      // 开发环境安全头
      headers: {
        'Content-Security-Policy': `
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*;
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https: blob:;
          font-src 'self' data: https:;
          connect-src 'self' https: http://localhost:* ws://localhost:*;
          media-src 'self';
          object-src 'none';
          frame-src 'self';
          base-uri 'self';
          form-action 'self';
          frame-ancestors 'none';
        `.replace(/\s+/g, ' ').trim(),
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    /**
     * 3. 构建选项 (Build Options)
     * 参考: https://vite.dev/config/build-options
     */
    build: {
      outDir: path.join(__dirname, "./dist"),
      assetsDir: path.join(__dirname, "./assets"),
      assetsInlineLimit: 5120, // 5KB
      cssCodeSplit: true,
      sourcemap: true,
      rolldownOptions: {
        input: {
          index: path.resolve(__dirname, "./index.html"),
        },
        output: {
          dir: "dist",
          // 部署到云平台时使用无 hash 的文件名，便于缓存
          chunkFileNames: isDeploy ? "assets/js/[name].js" : "assets/js/[name]-[hash].js",
          entryFileNames: isDeploy ? "assets/js/[name].js" : "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          // Vercel/Cloudflare 部署时的 publicPath
          publicPath: isDeploy ? "/" : (envConfig.VITE_PUBLIC_PATH || "/"),
        },
        // 代码分割策略：优化首屏加载
        manualChunks(id) {
          // Vue 核心库
          if (id.includes('node_modules/vue') || 
              id.includes('node_modules/vue-router') || 
              id.includes('node_modules/pinia')) {
            return 'vue-vendor';
          }
          // Element Plus UI 库
          if (id.includes('node_modules/element-plus')) {
            return 'element-plus';
          }
          // HTTP 请求库
          if (id.includes('node_modules/axios')) {
            return 'axios';
          }
          // 图表库
          if (id.includes('node_modules/echarts')) {
            return 'echarts';
          }
          // 工具库
          if (id.includes('node_modules/date-fns') || 
              id.includes('node_modules/lodash-es')) {
            return 'utils';
          }
        },
        // 路由懒加载优化：按页面分割代码
        plugins: [
          {
            name: 'route-chunking',
            enforce: 'post',
          }
        ],
      },
      minify: true,
      terserOptions: {
        compress: {
          drop_console: isBuild,
          drop_debugger: isBuild,
        },
      },
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1024,
    },
    /**
     * 4. 预览选项 (Preview Options)
     * 参考: https://vite.dev/config/preview-options
     */
    /**
     * 5. 依赖优化选项 (Dep Optimization Options)
     * 参考: https://vite.dev/config/dep-optimization-options
     */
    optimizeDeps: {
      exclude: [],
      include: [],
      rolldownOptions: {},
      force: false,
    },
  };
  return Object.assign(defaultConfig, dynamicConfig);
});
