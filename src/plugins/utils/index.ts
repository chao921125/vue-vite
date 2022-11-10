import { nextTick } from "vue";
import { storeToRefs } from "pinia";
import Router from "@/router";
import Pinia from "@/store";
import { useThemeConfig } from "@/store/modules/theme";
import I18n from "@/plugins/language";
import ThemeSetConfig from "@/config/themeSetConfig";

import Constants from "./modules/constants";
import Cookies from "./modules/cookie";
import Storages from "./modules/storage";
import DB from "./modules/db";
import Log from "./modules/log";

const util: any = {
	Constants: Constants,
	Cookies: Cookies,
	Storages: Storages,
	Log: Log,
	DB: DB,
};

/**
 * @description 更新标题
 * @param titleText
 */
util.setTitle = async () => {
	const storeThemeConfig = useThemeConfig(Pinia);
	const { themeConfig } = storeToRefs(storeThemeConfig);
	const globalTitle: string = themeConfig.value.globalTitle;
	await nextTick(() => {
		let title: any = "";
		title = setTitleI18n(Router.currentRoute.value);
		window.document.title = `${title}` || globalTitle;
	});
};

util.tagsName = (value: any) => {
	return setTitleI18n(value);
};

const setTitleI18n = (value: any) => {
	let tagsViewName: any = import.meta.env.VITE_TITLE;
	const { query, params, meta } = value;
	if (query?.tagsViewName || params?.tagsViewName) {
		if (ThemeSetConfig.i18nKey.test(query?.tagsViewName) || ThemeSetConfig.i18nKey.test(params?.tagsViewName)) {
			// 国际化
			const urlTagsParams = (query?.tagsViewName && JSON.parse(query?.tagsViewName)) || (params?.tagsViewName && JSON.parse(params?.tagsViewName));
			tagsViewName = urlTagsParams[I18n.global.locale];
		} else {
			// 非国际化
			tagsViewName = query?.tagsViewName || params?.tagsViewName;
		}
	} else {
		// 非自定义 tagsView 名称
		tagsViewName = I18n.global.t(<any>meta.title);
	}
	return tagsViewName;
};

/**
 * 设置cdn
 */
// 字体图标 url
const cssCdnUrlList: Array<string> = [];
// 第三方 js url
const jsCdnUrlList: Array<string> = [];
// 动态批量设置字体图标
util.setCssCdn = () => {
	if (cssCdnUrlList.length <= 0) return false;
	cssCdnUrlList.map((v) => {
		let link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = v;
		link.crossOrigin = "anonymous";
		document.getElementsByTagName("head")[0].appendChild(link);
	});
};
// 动态批量设置第三方js
util.setJsCdn = () => {
	if (jsCdnUrlList.length <= 0) return false;
	jsCdnUrlList.map((v) => {
		let link = document.createElement("script");
		link.src = v;
		document.body.appendChild(link);
	});
};

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = (url: string) => {
	console.log(url);
	if (!url) return false;
	let a = document.createElement("a");
	a.setAttribute("href", url);
	a.setAttribute("target", "_blank");
	a.setAttribute("id", "open_window_blank");
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(document.getElementById("open_window_blank") as HTMLElement);
};

/**consignment
 * {
 *   "url": "string"
 * }
 * */
util.urlToObj = (url: string) => {
	let obj = {
		id: "",
	};
	// @ts-ignore
	url.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, key, value) => (obj[key] = value));
	// @ts-ignore
	url.replace(/#([^?=&#]+)/g, (_, hash) => (obj["HASH"] = hash));
	return obj;
};

export default util;
