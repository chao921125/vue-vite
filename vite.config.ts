// https://vitejs.dev/config/
import type { UserConfig, ConfigEnv } from "vite";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue"
import pkg from './package.json';
import dayjs from 'dayjs';
import path from 'path';
import { getEnvConfig } from "./config";
import { createHtmlPlugin } from "vite-plugin-html";
import ViteRestart from "vite-plugin-restart";

// @ts-ignore
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const envConfig = getEnvConfig(env);
  console.log(envConfig);
  console.log(command === 'build', dayjs.locale(), pkg.name);
  // let dynamicConfig = {};
  // if (command === 'serve') {
  //   dynamicConfig = {
  //     // dev specific config
  //   }
  // } else {
  //   // command === 'build'
  //   dynamicConfig = {
  //     // build specific config
  //   }
  // }
  // const defaultConfig = {
  return {
    // root: './public/index.html', // 入口，可以指定到public文件夹
    base: './', // 公共基础路径
    // mode: 'development', // 指令覆盖构建模式 --mode
    define: {
      // setting vue-i18-next
      // Suppress warning
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    plugins: [ // 插件
      vue(),
      // 热重载，包含配置文件的修改
      ViteRestart({
        restart: [
          'vite.config.[jt]s',
        ]
      }),
      createHtmlPlugin({
        minify: true,
        // entry: "src/main.ts",
        // template: "public/index.html",
        inject: {
          data: {
            title: envConfig.VITE_APP_TITLE,
            injectScript: `<script src="./inject.js"></script>`,
          },
        },
      }),
      {
        name: "@rollup/plugin-commonjs",
        transform(code: string, filename: string | string[]) {
          if (filename.includes(`/node_modules/`)) {
            return code
          }

          const cjsRegexp = /(const|let|var)[\n\s]+(\w+)[\n\s]*=[\n\s]*require\(["|'](.+)["|']\)/g
          const res = code.match(cjsRegexp)
          if (res) {
            // const Store = require('electron-store') -> import Store from 'electron-store'
            code = code.replace(cjsRegexp, `import $2 from '$3'`)
          }
          return code
        },
      }
    ],
    // publicDir: 'public', // 静态资源根路径，false关闭
    // cacheDir: 'node_modules/.vite', // 缓存路径
    resolve: {
      alias: {
        // 别名必须以 / 开头、结尾
        // '/@/': root, -- vite 内部在用，这里不能用了
        // '/root/': __dirname, -- vite 内部在用，这里不能用了
        '/@/': path.resolve(__dirname, './src'),
        '/@components/': path.resolve(__dirname, './src/components'),
        '/@plugins/': path.resolve(__dirname, './src/plugins'),
        '/@utils/': path.resolve(__dirname, './src/utils'),
        '/@api/': path.resolve(__dirname, './src/api'),
        '/@assets/': path.resolve(__dirname, './src/assets'),
      },
      // dedupe: '', // 一般SSR+ESM使用
      // conditions: '',
      // mainFields: '',
      // extensions: '',
      // preserveSymlinks: '',
    },
    css: {
      // modules: '',
      postcss: {
        plugins: [
        ]
      },
      preprocessorOptions: {
        less: {
          // additionalData: `$injectedColor: orange`
        },
        scss: {
        }
      },
    },
    // json: {
    //   namedExports: true, // 按名称导入
    //   stringify: false, // 序列化后导入，即：JSON.parse()，开启后则namedExports失效
    // },
    // esbuild: { // false or jsx settings
    //   jsxFactory: 'h',
    //   jsxFragment: 'Fragment'
    // },
    // assetsInclude: '', // 静态资源处理
    logLevel: 'info', // 可以根据开发环境动态改变 'info' | 'warn' | 'error' | 'silent'
    clearScreen: true, // --clearScreen
    // envDir: '', // 配置.env文件相关
    // envPrefix: '', // 配置.env变量以VUE_还是默认的VITE_
    server: {
      // host: 'localhost',
      port: envConfig.VITE_CONFIG_PORT,
      strictPort: true, // 存在冲突端口，则继续下找可用端口
      // https: '', // boolean | https.ServerOptions
      // open: '', // boolean | string
      proxy: {
        // string shorthand
        // '/foo': 'http://localhost:4567/foo',
        // with options
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // with RegEx
        // '^/fallback/.*': {
        //   target: 'http://jsonplaceholder.typicode.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/fallback/, '')
        // },
        // 使用 proxy 实例
        // 'api': {
        //   target: 'http://jsonplaceholder.typicode.com',
        //   changeOrigin: true,
        //   configure: () => {
        //      // proxy http-proxy
        //   },
        // },
      },
      cors: true, // boolean | CorsOptions
      // force: false, // boolean 依赖构建
      // hmr: false, // boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean }
      // watch: '', // object
      // middlewareMode: '',
      // fs: {
      //  strict: '',
      //  allow: '',
      //  deny: '',
      // },
      // origin: '',
    },
    build: {
      target: 'modules',
      // polyfillDynamicImport: '', // boolean
      outDir: 'dist', // path.join(__dirname, 'dist/render'),
      assetsDir: 'assets',
      assetsInlineLimit: 5120, // 5MB
      // cssCodeSplit: true,
      // cssTarget: true,
      sourcemap: false,
      // rollupOptions: '',
      // commonjsOptions: '',
      // dynamicImportVarsOptions: '',
      // lib: '',
      // manifest: false, // manifest.json
      // ssrManifest: false,
      // ssr: false,
      // minify: 'terser', // boolean | 'terser' | 'esbuild'
      // terserOptions: '',
      // write: true,
      // emptyOutDir: '', // outDiroutDir--emptyOutDir
      // brotliSize: true, // 压缩大小报告
      chunkSizeWarningLimit: 1024,
      // watch: 1024,
    },
    // preview: {
    //   host: '',
    //   port: '',
    //   strictPort: '',
    //   https: '',
    //   open: '',
    //   proxy: {},
    //   cors: true,
    // },
    optimizeDeps: {
      entries: "index.md",
      exclude: ['vue-demi'],
      include: ["lodash"],
      // keepNames: ['vue-demi'],
    },
    // ssr: {
    //   external: '',
    //   noExternal: '',
    //   target: '',
    // },
  };
  // return Object.assign(defaultConfig, dynamicConfig);
});