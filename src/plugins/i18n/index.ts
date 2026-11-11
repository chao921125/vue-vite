import { createI18n, useI18n } from "vue-i18n";
import { getStoreRefs, appStore } from "@/store";

// 引入国际化文件
// @ts-ignore
import zhCN from "element-plus/dist/locale/zh-cn.mjs";
// @ts-ignore
import en from "element-plus/dist/locale/en.mjs";

export const elI18n = {
  [zhCN.name]: zhCN,
  [en.name]: en,
};

// 保持和element plus语言一致
import znCNLocale from "./modules/zh-cn";
import enLocale from "./modules/en-us";

// 进销存业务模块语言包（按业务域拆分，文件见 ./modules/inv/）
import invCommonZhCN from "./modules/inv/common.zh-cn";
import invCommonEnUS from "./modules/inv/common.en-us";
import invBasicZhCN from "./modules/inv/basic.zh-cn";
import invBasicEnUS from "./modules/inv/basic.en-us";
import invTradeZhCN from "./modules/inv/trade.zh-cn";
import invTradeEnUS from "./modules/inv/trade.en-us";
import invStockZhCN from "./modules/inv/stock.zh-cn";
import invStockEnUS from "./modules/inv/stock.en-us";
import invReportZhCN from "./modules/inv/report.zh-cn";
import invReportEnUS from "./modules/inv/report.en-us";
import invDashboardZhCN from "./modules/inv/dashboard.zh-cn";
import invDashboardEnUS from "./modules/inv/dashboard.en-us";
import invMenuZhCN from "./modules/inv/menu.zh-cn";
import invMenuEnUS from "./modules/inv/menu.en-us";

// 读取 pinia 默认语言
const { themeConfig } = getStoreRefs(appStore.useThemeConfig);

/** 进销存模块语言包汇总 */
const invZhCN = {
  ...invCommonZhCN,
  ...invBasicZhCN,
  ...invTradeZhCN,
  ...invStockZhCN,
  ...invReportZhCN,
  ...invDashboardZhCN,
  ...invMenuZhCN,
};
const invEnUS = {
  ...invCommonEnUS,
  ...invBasicEnUS,
  ...invTradeEnUS,
  ...invStockEnUS,
  ...invReportEnUS,
  ...invDashboardEnUS,
  ...invMenuEnUS,
};

// 导出语言国际化
// https://vue-i18n.intlify.dev/guide/essentials/fallback.html#explicit-fallback-with-one-locale
export const i18n = createI18n({
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true,
  fallbackWarn: false,
  legacy: false,
  globalInjection: true,
  locale: themeConfig.value.globalI18n || import.meta.env.VITE_LOCAL,
  fallbackLocale: zhCN.name,
  messages: {
    [zhCN.name]: {
      message: {
        ...znCNLocale,
        inv: invZhCN,
      },
      ...zhCN,
    },
    [en.name]: {
      message: {
        ...enLocale,
        inv: invEnUS,
      },
      ...en,
    },
  },
});

export const readLocale = (prefix = zhCN.name) => {
  return Object.fromEntries(
    Object.entries(import.meta.glob("./modules/*.(j)?(t)?s", { eager: true })).map(
      ([key, value]: [any, any]) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)![1];
        return [matched, value.default];
      },
    ),
  )[prefix];
};

// 以下两种方式均可以实现在js中动态国际化
export const $t = (args: string) => {
  return i18n.global.t(args);
};
export const useI18nMessage = (args: string) => {
  const { t } = useI18n();
  return t(args);
};

export default i18n;
