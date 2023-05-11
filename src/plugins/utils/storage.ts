let storage: any = {};

storage.setStorage = (key: string = "default", value: any = null) => {
	if (!value) return false;
	if (typeof value === "string") {
		window.localStorage.setItem(key, value);
		window.sessionStorage.setItem(key, value);
	} else {
		window.localStorage.setItem(key, JSON.stringify(value));
		window.sessionStorage.setItem(key, JSON.stringify(value));
	}
};

storage.getStorage = (key: string = "default") => {
	const item = window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
	if (!item) return null;
	if (/^[{\\[].*[}\]]$/g.test(item)) {
		return JSON.parse(item);
	} else {
		return item;
	}
};

storage.removeStorage = (key: string = "default") => {
	window.localStorage.removeItem(key);
	window.sessionStorage.removeItem(key);
};

storage.clearStorage = () => {
	window.localStorage.clear();
	window.sessionStorage.clear();
};

storage.setLocalStorage = (key: string = "default", value: any = null) => {
	if (!value) return false;
	if (typeof value === "string") {
		window.localStorage.setItem(key, value);
	} else {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
};

storage.getLocalStorage = (key: string = "default") => {
	const item = window.localStorage.getItem(key);
	if (!item) return null;
	if (/^[{\\[].*[}\]]$/g.test(item)) {
		return JSON.parse(item);
	} else {
		return item;
	}
};

storage.removeLocalStorage = (key: string = "default") => {
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
	let add = function (num) {
		num += num;
		if (num.length === 10240) {
			test = num;
			return test;
		}
		add(num);
	};
	add(test);
	let sum = test;
	let show = setInterval(function () {
		sum += test;
		try {
			window.localStorage.removeItem("test");
			window.localStorage.setItem("test", sum);
			console.log(sum.length / 1024 + "KB");
		} catch (e) {
			console.log(sum.length / 1024 + "KB超出最大限制");
			clearInterval(show);
		}
	}, 0.1);
};

storage.getLocalUsedSpace = () => {
	if (!window.localStorage) {
		console.log("浏览器不支持localStorage");
		return false;
	}
	let size: number = 0;
	for (let item in window.localStorage) {
		if (window.localStorage.hasOwnProperty(item)) {
			size += window.localStorage!.getItem(item)!.length;
		}
	}
	console.log("当前localStorage使用容量为" + (size / 1024).toFixed(2) + "KB");
	return (size / 1024).toFixed(2);
};

storage.setSessionStorage = (key: string = "default", value: any = null) => {
	if (!value) return false;
	if (typeof value === "string") {
		window.sessionStorage.setItem(key, value);
	} else {
		window.sessionStorage.setItem(key, JSON.stringify(value));
	}
};

storage.getSessionStorage = (key: string = "default") => {
	const item = window.sessionStorage.getItem(key);
	if (!item) return null;
	if (/^[{\\[].*[}\]]$/g.test(item)) {
		return JSON.parse(item);
	} else {
		return item;
	}
};

storage.removeSessionStorage = (key: string = "default") => {
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
	let add = function (num) {
		num += num;
		if (num.length === 10240) {
			test = num;
			return test;
		}
		add(num);
	};
	add(test);
	let sum = test;
	let show = setInterval(function () {
		sum += test;
		try {
			window.sessionStorage.removeItem("test");
			window.sessionStorage.setItem("test", sum);
			console.log(sum.length / 1024 + "KB");
		} catch (e) {
			console.log(sum.length / 1024 + "KB超出最大限制");
			clearInterval(show);
		}
	}, 0.1);
};

storage.getSessionUsedSpace = () => {
	if (!window.sessionStorage) {
		console.log("当前浏览器不支持sessionStorage");
		return false;
	}
	let size: number = 0;
	for (let item in window.sessionStorage) {
		if (window.sessionStorage.hasOwnProperty(item)) {
			size += window.sessionStorage!.getItem(item)!.length;
		}
	}
	console.log("当前sessionStorage使用容量为" + (size / 1024).toFixed(2) + "KB");
	return (size / 1024).toFixed(2);
};

export default storage;
