const storage: any = {};

storage.setStorage = (key = "default", value = null) => {
	if (!value) return false;
	if (typeof value === "string") {
		window.localStorage.setItem(key, value);
		window.sessionStorage.setItem(key, value);
	} else {
		window.localStorage.setItem(key, JSON.stringify(value));
		window.sessionStorage.setItem(key, JSON.stringify(value));
	}
};

storage.getStorage = (key = "default") => {
	const item = window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
	if (!item) return null;
	if (/^[{\\[].*[}\]]$/g.test(item)) {
		return JSON.parse(item);
	} else {
		return item;
	}
};

storage.removeStorage = (key = "default") => {
	window.localStorage.removeItem(key);
	window.sessionStorage.removeItem(key);
};

storage.clearStorage = () => {
	window.localStorage.clear();
	window.sessionStorage.clear();
};

storage.setLocalStorage = (key = "default", value = null) => {
	if (!value) return false;
	if (typeof value === "string") {
		window.localStorage.setItem(key, value);
	} else {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
};

/**
 * Local
 */
storage.getLocalStorage = (key = "default") => {
	const item = window.localStorage.getItem(key);
	if (!item) return null;
	if (/^[{\\[].*[}\]]$/g.test(item)) {
		return JSON.parse(item);
	} else {
		return item;
	}
};

storage.removeLocalStorage = (key = "default") => {
	window.localStorage.removeItem(key);
};

storage.clearLocalStorage = () => {
	window.localStorage.clear();
};

storage.getLocalMaxSpace = () => {
	if (!window.localStorage) {
		console.log("当前浏览器不支持localStorage!");
	}
	let test = "0123456789";
	const add = function (num) {
		num += num;
		if (num.length === 10240) {
			test = num;
			return test;
		}
		add(num);
	};
	add(test);
	let sum = test;
	const show = setInterval(function () {
		sum += test;
		try {
			window.localStorage.removeItem("test");
			window.localStorage.setItem("test", sum);
			console.log(sum.length / 1024 + "KB");
		} catch (e) {
			console.log(sum.length / 1024 + "KB超出最大限制", e);
			clearInterval(show);
		}
	}, 0.1);
};

storage.getLocalUsedSpace = () => {
	if (!window.localStorage) {
		console.log("浏览器不支持localStorage");
		return false;
	}
	let size = 0;
	for (const item in window.localStorage) {
		if (Object.prototype.hasOwnProperty.call(window.localStorage, item)) {
			size += window.localStorage.getItem(item)!.length;
		}
	}
	console.log("当前localStorage使用容量为" + (size / 1024).toFixed(2) + "KB");
	return (size / 1024).toFixed(2);
};

/**
 * Session
 */
storage.setSessionStorage = (key = "default", value = null) => {
	if (!value) return false;
	if (typeof value === "string") {
		window.sessionStorage.setItem(key, value);
	} else {
		window.sessionStorage.setItem(key, JSON.stringify(value));
	}
};

storage.getSessionStorage = (key = "default") => {
	const item = window.sessionStorage.getItem(key);
	if (!item) return null;
	if (/^[{\\[].*[}\]]$/g.test(item)) {
		return JSON.parse(item);
	} else {
		return item;
	}
};

storage.removeSessionStorage = (key = "default") => {
	window.sessionStorage.removeItem(key);
};

storage.clearSessionStorage = () => {
	window.sessionStorage.clear();
};

storage.getSessionMaxSpace = () => {
	if (!window.sessionStorage) {
		console.log("当前浏览器不支持sessionStorage!");
	}
	let test = "0123456789";
	const add = function (num) {
		num += num;
		if (num.length === 10240) {
			test = num;
			return test;
		}
		add(num);
	};
	add(test);
	let sum = test;
	const show = setInterval(function () {
		sum += test;
		try {
			window.sessionStorage.removeItem("test");
			window.sessionStorage.setItem("test", sum);
			console.log(sum.length / 1024 + "KB");
		} catch (e) {
			console.log(sum.length / 1024 + "KB超出最大限制", e);
			clearInterval(show);
		}
	}, 0.1);
};

storage.getSessionUsedSpace = () => {
	if (!window.sessionStorage) {
		console.log("当前浏览器不支持sessionStorage");
		return false;
	}
	let size = 0;
	for (const item in window.sessionStorage) {
		if (Object.prototype.hasOwnProperty.call(window.sessionStorage, item)) {
			size += window.sessionStorage.getItem(item)!.length;
		}
	}
	console.log("当前sessionStorage使用容量为" + (size / 1024).toFixed(2) + "KB");
	return (size / 1024).toFixed(2);
};

/**
 * Cookie
 */
storage.setCookieCustomize = (cname, cvalue, exdays) => {
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

storage.getCookieCustomize = (cname) => {
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

storage.setCookie = (key = "default", value, settings?) => {
	let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
	const options = Object.assign(
		{
			expires: 7,
			path: "/",
			domain: window.location.origin,
			secure: window.location.protocol,
			sameSite: "Lax", // Lax Strict None
		},
		settings,
	);
	// 处理过期时间
	if (options.expires) {
		if (typeof options.expires === "number") {
			const date = new Date();
			date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
			cookieString += `; expires=${date.toUTCString()}`;
		} else if (options.expires instanceof Date) {
			cookieString += `; expires=${options.expires.toUTCString()}`;
		}
	}
	// 处理路径
	if (options.path) {
		cookieString += `; path=${options.path}`;
	}

	// 处理域名
	if (options.domain) {
		cookieString += `; domain=${options.domain}`;
	}

	// 处理Secure标志
	if (options.secure) {
		cookieString += "; secure";
	}

	// 处理SameSite
	if (options.sameSite) {
		cookieString += `; samesite=${options.sameSite}`;
		if (options.sameSite.toLowerCase() === "none") {
			cookieString += "; secure";
		}
	}

	document.cookie = cookieString;
};

storage.getCookie = (key = "default") => {
	const nameEQ = `${encodeURIComponent(key)}=`;
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		while (cookie.charAt(0) === " ") {
			cookie = cookie.substring(1, cookie.length);
		}

		if (cookie.indexOf(nameEQ) === 0) {
			return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
		}
	}

	return null;
};

storage.getCookieAll = () => {
	const cookies = {};

	if (document.cookie) {
		document.cookie.split(";").forEach((cookie) => {
			const [name, value] = cookie.split("=").map((c) => c.trim());
			cookies[decodeURIComponent(name)] = decodeURIComponent(value);
		});
	}

	return cookies;
};

storage.removeCookie = (key = "default", options?) => {
	// 设置过期时间为过去的时间
	storage.setCookie(key, "", {
		...options,
		expires: new Date(0),
	});
};

storage.clearCookie = () => {
	const cookies = storage.getCookieAll();
	Object.keys(cookies).forEach((key) => {
		storage.removeCookie(key);
	});
};

export default storage;
