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
	const { themeConfig } = <any>getStoreRefs(appStore.useThemeConfig);
	const globalTitle = themeConfig.value.globalTitle;
	await nextTick(() => {
		let title = "";
		title = setTitleI18n(Router.currentRoute.value);
		window.document.title = `${title}` || globalTitle;
	});
};

util.tagsName = (value) => {
	return setTitleI18n(value);
};

const setTitleI18n = (value) => {
	let tagsViewName = import.meta.env.VITE_TITLE;
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
		tagsViewName = I18n.global.t(meta.title);
	}
	return tagsViewName;
};

/**
 * 设置cdn
 */
// 字体图标 url
const cssCdnUrlList = [];
// 第三方 js url
const jsCdnUrlList = [];
// 动态批量设置字体图标
util.setCssCdn = () => {
	if (cssCdnUrlList.length <= 0) return false;
	cssCdnUrlList.map((v) => {
		const link = document.createElement("link");
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
		const link = document.createElement("script");
		link.src = v;
		document.body.appendChild(link);
	});
};

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = (url) => {
	if (!url) return false;
	const a = document.createElement("a");
	a.setAttribute("href", url);
	a.setAttribute("target", "_blank");
	a.setAttribute("id", "open_window_blank");
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(document.getElementById("open_window_blank")!);
};

/**
 * http url to object
 * {
 *   "url": "string"
 * }
 * */
util.urlToObj = (url) => {
	const obj = {};
	if (!url) return obj;

	url.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, key, value) => (obj[key] = value));

	url.replace(/#([^?=&#]+)/g, (_, hash) => (obj["HASH"] = hash));
	return obj;
};

/**
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
		console.log(e);
		return false;
	}
}

/**
 * 判断手机
 * https://github.com/matthewhudson/current-device
 * @param opts
 */
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

	if (!result && opts.tablet && opts.featureDetect && navigator && navigator.maxTouchPoints > 1 && ua.indexOf("Macintosh") !== -1 && ua.indexOf("Safari") !== -1) {
		result = true;
	}
	return result;
};
/**
 * 判断微信
 */
util.isWeixin = () => {
	const ua: any = navigator.userAgent.toLowerCase();

	return ua.match(/MicroMessenger/i) === "micromessenger";
};

util.preload = async (mediaUrls: any) => {
	for (const url of mediaUrls) {
		if (url.endsWith(".mp4")) {
			await preloadVideo(url);
		} else if (url.endsWith(".mp3")) {
			await preloadAudio(url);
		} else {
			await preloadImg(url);
		}
	}
};

function preloadImg(url: string) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve(img);
		};
		img.onerror = () => {
			reject(img);
		};
		img.src = url;
	});
}
function preloadAudio(url: string) {
	return url;
}
function preloadVideo(url: string) {
	return new Promise((resolve, reject) => {
		const v = document.createElement("video");
		v.onload = () => {
			resolve(url);
		};
		v.onerror = () => {
			reject(url);
		};
		v.src = url;
	});
}

export default util;
