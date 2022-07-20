import Constants from "./constants";
import Cookies from "./cookie";
import Storages from "./storage";
import DB from "./db";
import Date from "./date";
import Log from "./log";

const util: any = {
	Constants,
	Cookies,
	Storages,
	DB,
	Date,
	Log,
};

/**
 * @description 更新标题
 * @param titleText
 */
util.title = titleText => {
	const processTitle = process.env.VITE_APP_TITLE || "";
	window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ""}`;
};

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = (url: string) => {
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
