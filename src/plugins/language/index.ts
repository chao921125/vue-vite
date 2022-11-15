import { createI18n, useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import Pinia from "@/store";
import { useThemeConfig } from "@/store/modules/theme";

import zhCNLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";

import znCN from "./modules/zh-cn";
import en from "./modules/en";

// 定义语言国际化内容
/**
 * 说明：
 */
const messages = {
	[zhCNLocale.name]: {
		...zhCNLocale,
		message: {
			...znCN,
		},
	},
	[enLocale.name]: {
		...enLocale,
		message: {
			...en,
		},
	},
};

// 读取 pinia 默认语言
const storeThemeConfig = useThemeConfig(Pinia);
const { themeConfig } = storeToRefs(storeThemeConfig);

// 导出语言国际化
// https://vue-i18n.intlify.dev/guide/essentials/fallback.html#explicit-fallback-with-one-locale
const i18n = createI18n({
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	legacy: true,
	globalInjection: true,
	locale: themeConfig.value.globalI18n || import.meta.env.VITE_LOCAL,
	fallbackLocale: zhCNLocale.name,
	messages,
});

export function readLocal(prefix = zhCNLocale.name) {
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
}

// 以下两种方式均可以实现在js中动态国际化
export function $t(args: string) {
	return i18n.global.t(args);
}
export function transI18n(args: string) {
	const { t } = useI18n();
	return t(args);
}

export default i18n;
