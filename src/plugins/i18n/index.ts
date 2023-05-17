import { createI18n, useI18n } from "vue-i18n";
import Store, { getStoreRefs } from "@/store";
import { useThemeConfig } from "@/store/modules/theme";

import zhCN from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

import znCNLocale from "./modules/zh-cn";
import enLocale from "./modules/en";

/**
 * 说明：定义语言国际化内容
 */
const messages = {
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
};

// 读取 pinia 默认语言
const storeThemeConfig = useThemeConfig(Store);
const { themeConfig } = getStoreRefs(storeThemeConfig);

// 导出语言国际化
// https://vue-i18n.intlify.dev/guide/essentials/fallback.html#explicit-fallback-with-one-locale
export const i18n = createI18n({
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	legacy: true,
	globalInjection: true,
	locale: themeConfig.value.globalI18n || import.meta.env.VITE_LOCAL,
	fallbackLocale: zhCN.name,
	messages,
});

export const readLocale = (prefix = zhCN.name) => {
	// const languageKeys = import.meta.glob("./modules/*.ts");
	// export const routerArray: object = {};
	// Object.keys(languageKeys).forEach((item: string) => {
	// 	console.log("==========", item);
	// });

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
export const transI18n = (args: string) => {
	const { t } = useI18n();
	return t(args);
};

export default i18n;
