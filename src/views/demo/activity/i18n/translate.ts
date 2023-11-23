import i18nTranslate_zh from "./zh";

const i18nMap: any = {
	zh: i18nTranslate_zh,
};

export default function getI18nTranslate(i18n: string): (template: string, replacements: { [index: string]: string }) => any {
	// let replacements = replacements || {};
	// const i18nTranslate: any = i18nMap.zh[i18n];
	return i18nTranslate_zh;
}
