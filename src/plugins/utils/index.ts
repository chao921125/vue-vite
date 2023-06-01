import { nextTick } from "vue";
import Router from "@/router";
import { getStoreRefs, appStore } from "@/store";
import I18n from "@/plugins/i18n";
import ThemeConfig from "@/config/themeConfig";

const util: any = {};

/**
 * @description 更新标题
 * @param titleText
 */
util.setTitle = async () => {
	const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
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
		if (ThemeConfig.i18nKey.test(query?.tagsViewName) || ThemeConfig.i18nKey.test(params?.tagsViewName)) {
			// 国际化
			const urlTagsParams = (query?.tagsViewName && JSON.parse(query?.tagsViewName)) || (params?.tagsViewName && JSON.parse(params?.tagsViewName));
			tagsViewName = urlTagsParams[I18n.global.locale.value];
		} else {
			// 非国际化
			tagsViewName = query?.tagsViewName || params?.tagsViewName;
		}
	} else {
		// 非自定义 tagsView 名称
		tagsViewName = I18n.global.t(meta.title as any);
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
	let obj: any = {};
	if (!url) return obj;
	// @ts-ignore
	url.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, key, value) => (obj[key] = value));
	// @ts-ignore
	url.replace(/#([^?=&#]+)/g, (_, hash) => (obj["HASH"] = hash));
	return obj;
};

/**
 * @param opts
 * navigator.userAgent 不可靠容易被修改 /Mobi|Android|iPhone/i.test(navigator.userAgent)
 */
export function isMobileTouch1() {
	return "ontouchstart" in document.documentElement;
}
// 另一种写法
export function isMobileTouch2() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}
// 判断手机
util.isMobile = (opts) => {
	const mobileRE =
		/(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
	const notMobileRE = /CrOS/;
	const tabletRE = /android|ipad|playbook|silk/i;
	if (!opts) opts = {};
	let ua = opts.ua;
	if (!ua && typeof navigator !== "undefined") ua = navigator.userAgent;
	if (ua && ua.headers && typeof ua.headers["user-agent"] === "string") {
		ua = ua.headers["user-agent"];
	}
	if (typeof ua !== "string") return false;

	let result = (mobileRE.test(ua) && !notMobileRE.test(ua)) || (!!opts.tablet && tabletRE.test(ua));

	if (
		!result &&
		opts.tablet &&
		opts.featureDetect &&
		navigator &&
		navigator.maxTouchPoints > 1 &&
		ua.indexOf("Macintosh") !== -1 &&
		ua.indexOf("Safari") !== -1
	) {
		result = true;
	}
	return result;
};
// 判断微信
util.isWeixin = () => {
	const ua = navigator.userAgent.toLowerCase();
	// @ts-ignore
	return ua.match(/MicroMessenger/i) === "micromessenger";
};

export default util;
