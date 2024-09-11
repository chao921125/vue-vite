import Cookies from "js-cookie";

const cookie: any = {};

const cookieSetting = {
	expires: 7,
};

export const setCookieCustomize = (cname, cvalue, exdays) => {
	if (!cname) {
		cname = "";
	}
	if (!cvalue) {
		cvalue = "";
	}
	if (!exdays) {
		exdays = 1;
	}
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + JSON.stringify(cvalue) + "; " + expires;
};

export const getCookieCustomize = (cname) => {
	if (!cname) {
		return "";
	}
	const name = cname + "=";
	const ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		const c = ca[i].trim();
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

cookie.setCookie = (key = "default", value = null, setting = {}) => {
	if (!value) return false;
	Object.assign(cookieSetting, setting);
	if (typeof value === "string") {
		Cookies.set(key, value, cookieSetting);
	} else {
		Cookies.set(key, JSON.stringify(value), cookieSetting);
	}
};

cookie.getCookie = (key = "default") => {
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

cookie.removeCookie = (key = "default") => {
	Cookies.remove(key);
};

cookie.clearCookie = () => {
	const keys = Cookies.get();
	if (!keys || keys.toString().length === 0) return false;
	for (const key in keys) {
		Cookies.remove(key);
	}
};

export default cookie;
