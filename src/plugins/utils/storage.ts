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

export default storage;
