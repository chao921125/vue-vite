import { createI18n, useI18n } from "vue-i18n";
import { getStoreRefs, appStore } from "@/store";

// 引入国际化文件
import zhCN from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

export const elI18n = {
	[zhCN.name]: zhCN,
	[en.name]: en,
};

// 保持和element plus语言一致
import znCNLocale from "./modules/zh-cn";
import enLocale from "./modules/en-us";

// 读取 pinia 默认语言
const { themeConfig } = getStoreRefs(appStore.useThemeConfig);

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
			},
			...zhCN,
		},
		[en.name]: {
			message: {
				...enLocale,
			},
			...en,
		},
	},
});

export const readLocale = (prefix = zhCN.name) => {
	return Object.fromEntries(
		Object.entries(import.meta.glob("./modules/*.(j)?(t)?s", { eager: true })).map(([key, value]: any) => {
			const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
			return [matched, value.default];
		}),
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
