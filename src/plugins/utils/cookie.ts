import Cookies from "js-cookie";

let cookie: any = {};

const cookieSetting: any = {
	expires: 7,
};

export const setCookieCustomize = (cname: string, cvalue: any, exdays?: number) => {
	if (!cname) {
		cname = "";
	}
	if (!cvalue) {
		cvalue = "";
	}
	if (!exdays) {
		exdays = 1;
	}
	let d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + JSON.stringify(cvalue) + "; " + expires;
};

export const getCookieCustomize = (cname: string) => {
	if (!cname) {
		return "";
	}
	let name = cname + "=";
	let ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim();
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

cookie.setCookie = (key: string = "default", value: any = null, setting: any = {}) => {
	if (!value) return false;
	Object.assign(cookieSetting, setting);
	if (typeof value === "string") {
		Cookies.set(key, value, cookieSetting);
	} else {
		Cookies.set(key, JSON.stringify(value), cookieSetting);
	}
};

cookie.getCookie = (key: string = "default") => {
	const item = Cookies.get(key);
	if (!item) return null;
	if (/^[{\\[].*[}\]]$/g.test(item)) {
		return JSON.parse(item);
	} else {
		return item;
	}
};

cookie.getCookieAll = () => {
	return Cookies.get();
};

cookie.removeCookie = (key: string = "default") => {
	Cookies.remove(key);
};

cookie.clearCookie = () => {
	let keys = Cookies.get();
	if (!keys || keys.toString().length === 0) return false;
	for (let key in keys) {
		Cookies.remove(key);
	}
};

export default cookie;
