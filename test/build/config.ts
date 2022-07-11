import path from "path";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import vueJsx from "@vitejs/plugin-vue-jsx";
import WindiCSS from "vite-plugin-windicss";
import removeConsole from "vite-plugin-remove-console";
import liveReload from "vite-plugin-live-reload";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import VitePluginCertificate from "vite-plugin-mkcert";
import svgLoader from "vite-svg-loader";
import legacy from "@vitejs/plugin-legacy";
import { viteMockServe } from "vite-plugin-mock";
import { createStyleImportPlugin, VantResolve, ElementPlusResolve } from "vite-plugin-style-import";
import ElementPlus from "unplugin-element-plus/vite";
import { visualizer } from "rollup-plugin-visualizer";

export function vitePlugins(command: string, viteEnv: ViteEnv) {
  const { VITE_USE_MOCK, VITE_LEGACY } = viteEnv;

  return [
    vue(),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve("locales/**")],
    }),
    // jsx、tsx语法支持
    vueJsx(),
    WindiCSS(),
    // 线上环境删除console
    removeConsole(),
    liveReload(["src/layout/**/*", "src/router/**/*"]),
    vueSetupExtend(),
    VitePluginCertificate({
      source: "coding",
    }),
    // svg组件化支持
    svgLoader(),
    // 按需加载vxe-table
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "vxe-table",
          esModule: true,
          ensureStyleFile: true,
          libraryNameChangeCase: (name) => `vxe-table/es/${name}`,
          resolveStyle: (name) => `vxe-table/es/${name}/style.css`,
        },
      ],
      resolves: [ElementPlusResolve(), VantResolve()],
    }),
    ElementPlus({}),
    // mock支持
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && VITE_USE_MOCK,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: true,
    }),
    // 是否为打包后的文件提供传统浏览器兼容性支持
    VITE_LEGACY
      ? legacy({
          targets: ["ie >= 11"],
          additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        })
      : null,
    // 打包分析
    // eslint-disable-next-line no-constant-condition
    "report" === "report"
      ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
      : null,
  ];
}

export function viteServerProxy(list: ProxyList = []) {
  const httpsRE = /^https:\/\//;
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
}
