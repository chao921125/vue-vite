import Cookies from "js-cookie";

let cookie: any = {};

const cookieSetting: object = {
	expires: 1,
};

cookie.setCookie = (key: string = "default", value: any = null, setting: object = {}) => {
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

cookie.remove = (key: string = "default") => {
	Cookies.remove(key);
};

cookie.clear = () => {
	let keys = Cookies.get();
	if (!keys || keys.length === 0) return false;
	for (let key in keys) {
		Cookies.remove(key);
	}
};

export default cookie;
