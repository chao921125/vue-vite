import { createI18n } from "vue-i18n";
import pinia from "@/store";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme";

import zhcnLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";

import zncn from "./modules/zh-cn";
import en from "./modules/en";

// 定义语言国际化内容
/**
 * 说明：
 */
const messages = {
	[zhcnLocale.name]: {
		...zhcnLocale,
		message: {
			...zncn,
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
const stores = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(stores);

// 导出语言国际化
// https://vue-i18n.intlify.dev/guide/essentials/fallback.html#explicit-fallback-with-one-locale
const i18n = createI18n({
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	locale: themeConfig.value.globalI18n,
	fallbackLocale: zhcnLocale.name,
	messages,
});

export default i18n;
