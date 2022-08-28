import { createI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import Pinia from "@/store";
import { useThemeConfig } from "@/store/modules/theme";

import zhCNLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";

import znCN from "./modules/zh-cn";
import en from "./modules/en";

// const languageKeys = import.meta.glob("./modules/*.ts");
// export const routerArray: object = {};
// Object.keys(languageKeys).forEach((item: string) => {
// 	console.log("==========", item);
// });

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
	locale: themeConfig.value.globalI18n,
	fallbackLocale: zhCNLocale.name,
	messages,
});

export default i18n;
