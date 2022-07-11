/**
 * https://cn.vitejs.dev/config/
 * https://vitejs.dev/config/
 */
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
// @ts-ignore
import dayjs from "dayjs";
// @ts-ignore
import pkg from "./package.json";
// @ts-ignore
import { pathResolve, wrapperEnv } from "./build/utils";
// @ts-ignore
import { vitePlugins, viteServerProxy } from "./build/config";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
};

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const _root = process.cwd();
  const env = loadEnv(mode, _root);
  const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH } = wrapperEnv(env);
  return {
    /**
     * string process.cwd()
     * 配合rollupOptions使用多页面 __dirname
     */
    root: _root,
    /**
     * string /
     * 开发或生产环境服务的公共基础路径。合法的值包括以下几种
     * 绝对 URL 路径名，例如 /foo/
     * 完整的 URL，例如 https://foo.com/
     * 空字符串或 ./（用于开发环境）
     */
    base: VITE_PUBLIC_PATH,
    /**
     * string 'development'（serve），'production'（build）
     * https://cn.vitejs.dev/guide/env-and-mode.html
     */
    // mode:
    /**
     * Record<string, string>
     */
    // define:
    /**
     * (Plugin | Plugin[])[]
     */
    plugins: vitePlugins(command, env),
    /**
     * string | false "public"
     */
    publicDir: "public",
    /**
     * string "node_modules/.vite"
     * pkg 中添加这个命令--force以此来删除缓存
     */
    cacheDir: "node_modules/.vite",
    resolve: {
      /**
       * Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>
       *   别名
       */
      alias: [
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
      /**
       * string[]
       */
      // dedupe: {},
      /**
       * string[]
       */
      // conditions: {
      //  ".": {
      //   "import": "./index.esm.js",
      //   "require": "./index.cjs.js"
      //  }
      // },
      /**
       * string[] ['module', 'jsnext:main', 'jsnext']
       */
      mainFields: ["module", "jsnext:main", "jsnext"],
      /**
       * string[] [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
       */
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
      /**
       * boolean false
       */
      preserveSymlinks: false,
    },
    css: {
      /**
       * CSSModulesOptions
       */
      modules: {},
      /**
       * string | (postcss.ProcessOptions & { plugins?: postcss.Plugin[] })
       */
      // postcss: {},
      /**
       * Record<string, object>
       */
      preprocessorOptions: {
        scss: {
          additionalData: `$injectedColor: orange;`,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    json: {
      /**
       * boolean true
       * 是否支持从 .json 文件中进行按名导入
       */
      namedExports: true,
      /**
       * boolean false
       * 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候
       * 开启此项，则会禁用按名导入
       */
      stringify: true,
    },
    /**
     * ESBuildOptions | false
     */
    esbuild: {
      jsxInject: `import React from 'react'`,
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
    /**
     * string | RegExp | (string | RegExp)[]
     */
    // assetsInclude: {},
    /**
     * 'info' | 'warn' | 'error' | 'silent'
     */
    logLevel: "info",
    /**
     * boolean true
     * false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下可以通过 --clearScreen false 设置
     */
    clearScreen: false,
    /**
     * string root
     * 用于加载 .env 文件的目录
     */
    envDir: "root",
    /**
     * string | string[] VITE_
     * 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
     */
    envPrefix: ["VITE_", "NODE_"],
    server: {
      /**
       * string | boolean '127.0.0.1'
       * 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
       */
      host: true,
      /**
       * number
       * 3000
       */
      port: VITE_PORT,
      /**
       * boolean
       * 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
       */
      // strictPort: {},
      /**
       * boolean | https.ServerOptions
       */
      https: true,
      /**
       * boolean | string
       * 设置为 true 强制使依赖预构建
       */
      open: true,
      /**
       * Record<string, string | ProxyOptions>
       * 为开发服务器配置自定义代理规则
       */
      // @ts-ignore
      prosy: viteServerProxy(VITE_PROXY || []),
      // proxy: {
      //   // 字符串简写写法
      //   "/foo": "http://localhost:4567",
      //   // 选项写法
      //   "/api": {
      //     target: "http://jsonplaceholder.typicode.com",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //   },
      //   // 正则表达式写法
      //   "^/fallback/.*": {
      //     target: "http://jsonplaceholder.typicode.com",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/fallback/, ""),
      //   },
      //   // 使用 proxy 实例
      //   // "/api": {
      //   //   target: "http://jsonplaceholder.typicode.com",
      //   //   changeOrigin: true,
      //   //   configure: (proxy, options) => {
      //   //     // proxy 是 'http-proxy' 的实例
      //   //   },
      //   // },
      //   // Proxying websockets or socket.io
      //   "/socket.io": {
      //     target: "ws://localhost:3000",
      //     ws: true,
      //   },
      // },
      /**
       * boolean | CorsOptions
       * 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用
       */
      cors: true,
      /**
       * boolean
       * 设置为 true 强制使依赖预构建
       */
      // force: {},
      /**
       * boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean, clientPort?: number, server?: Server }
       */
      // hmr: {},
      /**
       * object
       */
      // watch: {},
      /**
       * 'ssr' | 'html'
       */
      // middlewareMode: 'html',
      fs: {
        /**
         * boolean true
         * 限制为工作区 root 路径以外的文件的访问
         */
        // strict: true,
        /**
         * string[]
         * 限制哪些文件可以通过 /@fs/ 路径提供服务
         */
        // allow: [".."],
        /**
         * string[]
         * 用于限制 Vite 开发服务器提供敏感文件的黑名单
         */
        deny: [".env", ".env.*", "*.{pem,crt}"],
      },
      /**
       * WatcherOptions| null null
       */
      origin: "http://127.0.0.1:3333/",
    },
    build: {
      /**
       * string | string[] 'modules'
       */
      // target: {},
      /**
       * boolean true
       */
      // polyfillModulePreload: {},
      /**
       * string dist
       */
      // outDir: {},
      /**
       * string assets
       */
      // assetsDir: {},
      /**
       * number 4096
       */
      // assetsInlineLimit: {},
      /**
       * boolean true
       */
      // cssCodeSplit: {},
      /**
       * string | string[] 与 build.target 一致
       */
      // cssTarget: {},
      /**
       * boolean | 'inline' | 'hidden' false
       */
      sourcemap: "hidden",
      /**
       * RollupOptions
       */
      // commonjsOptions: {},
      /**
       * RollupDynamicImportVarsOptions
       */
      // dynamicImportVarsOptions: {},
      /**
       * { entry: string, name?: string, formats?: ('es' | 'cjs' | 'umd' | 'iife')[], fileName?: string | ((format: ModuleFormat) => string) }
       */
      // lib: {},
      /**
       * boolean | string false
       */
      manifest: true,
      /**
       * boolean | string false
       */
      // ssrManifest: {},
      /**
       * boolean | string undefined
       */
      // ssr: {},
      /**
       * boolean | 'terser' | 'esbuild' 'esbuild'
       * 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%
       */
      // minify: {},
      /**
       * TerserOptions
       */
      // terserOptions: {},
      /**
       * boolean true
       * 设置为 false 来禁用将构建后的文件写入磁盘
       */
      // write: {},
      /**
       * boolean 若 outDir 在 root 目录下，则为 true
       */
      // emptyOutDir: {},
      /**
       * boolean true
       * 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
       */
      // reportCompressedSize: {},
      /**
       * number 500
       * chunk 大小警告的限制（以 kbs 为单位）
       */
      // chunkSizeWarningLimit: {},
      /**
       * WatcherOptions| null null
       */
      // watch: {},
    },
    preview: {
      /**
       * string | boolean server.host
       * 为开发服务器指定 ip 地址。 设置为 0.0.0.0 或 true 会监听所有地址，包括局域网和公共地址
       */
      // host: {},
      /**
       * number 4173
       */
      // port: {},
      /**
       * boolean server.strictPort
       * 设置为 true 时，如果端口已被使用，则直接退出，而不会再进行后续端口的尝试
       */
      // strictPort: {},
      /**
       * boolean | https.ServerOptions server.https
       */
      // https: {},
      /**
       * boolean | string server.proxy
       */
      // open: {},
      /**
       * Record<string, string | ProxyOptions> server.proxy
       */
      // proxy: {},
      /**
       * boolean | CorsOptions server.cors
       */
      // cors: {},
    },
    optimizeDeps: {
      /**
       * string | string[]
       * Vite 会抓取你的 index.html 来检测需要预构建的依赖项。如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点
       */
      // entries: {},
      /**
       * string[]
       * 在预构建中强制排除的依赖项
       */
      // exclude: {},
      /**
       * string[]
       * 强制预构建不在 node_modules 中的
       */
      // include: {},
      /**
       * EsbuildBuildOptions
       * 在部署扫描和优化过程中传递给 esbuild 的选项
       */
      // esbuildOptions: {},
    },
    // 废弃了吗？
    // ssr: {
    //   /**
    //    * string[]
    //    */
    //   // external: [""],
    //   /**
    //    * string | RegExp | (string | RegExp)[] | true
    //    */
    //   // noExternal: "",
    //   /**
    //    * 'node' | 'webworker' node
    //    */
    //   // target: node,
    // },
    worker: {
      /**
       * 'es' | 'iife' iife
       */
      // format: "es",
      /**
       * (Plugin | Plugin[])[]
       */
      // plugins: "es",
      /**
       * RollupOptions
       */
      // rollupOptions: "es",
    },
  };
};
