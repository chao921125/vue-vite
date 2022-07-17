let storage: any = {};

// // 获取localstorage最大存储容量
// 	getLocalMaxSpace() {
// 		if (!window.localStorage) {
// 			console.log('当前浏览器不支持localStorage!');
// 		}
// 		let test = '0123456789';
// 		let add = function(num) {
// 			num += num;
// 			if (num.length === 10240) {
// 				test = num;
// 				return;
// 			}
// 			add(num);
// 		};
// 		add(test);
// 		let sum = test;
// 		let show = setInterval(function() {
// 			sum += test;
// 			try {
// 				window.localStorage.removeItem('test');
// 				window.localStorage.setItem('test', sum);
// 				console.log(sum.length / 1024 + 'KB');
// 			} catch (e) {
// 				console.log(sum.length / 1024 + 'KB超出最大限制');
// 				clearInterval(show);
// 			}
// 		}, 0.1);
// 	},
// // 获取使用了的localstorage的空间
// 	getLocalUsedSpace() {
// 		if (!window.localStorage) {
// 			console.log('浏览器不支持localStorage');
// 			return false;
// 		}
// 		let size = 0;
// 		for (let item in window.localStorage) {
// // eslint-disable-next-line no-prototype-builtins
// 			if (window.localStorage.hasOwnProperty(item)) {
// 				size += window.localStorage.getItem(item).length;
// 			}
// 		}
// 		console.log('当前localStorage使用容量为' + (size / 1024).toFixed(2) + 'KB');
// 		return true;
// 	},

// // 获取sessionStorage最大存储容量
// 	getSessionMaxSpace() {
// 		if (!window.sessionStorage) {
// 			console.log('当前浏览器不支持sessionStorage!');
// 		}
// 		let test = '0123456789';
// 		let add = function(num) {
// 			num += num;
// 			if (num.length === 10240) {
// 				test = num;
// 				return;
// 			}
// 			add(num);
// 		};
// 		add(test);
// 		let sum = test;
// 		let show = setInterval(function() {
// 			sum += test;
// 			try {
// 				window.sessionStorage.removeItem('test');
// 				window.sessionStorage.setItem('test', sum);
// 				console.log(sum.length / 1024 + 'KB');
// 			} catch (e) {
// 				console.log(sum.length / 1024 + 'KB超出最大限制');
// 				clearInterval(show);
// 			}
// 		}, 0.1);
// 	},
// // 获取使用了的sessionStorage的空间
// 	getSessionUsedSpace() {
// 		if (!window.sessionStorage) {
// 			console.log('当前浏览器不支持sessionStorage');
// 			return false;
// 		}
// 		let size = 0;
// 		for (let item in window.sessionStorage) {
// // eslint-disable-next-line no-prototype-builtins
// 			if (window.sessionStorage.hasOwnProperty(item)) {
// 				size += window.sessionStorage.getItem(item).length;
// 			}
// 		}
// 		console.log('当前sessionStorage使用容量为' + (size / 1024).toFixed(2) + 'KB');
// 		return true;
// 	},

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

storage.removeLocalStorage = (key: string = "default") => {
	window.localStorage.removeItem(key);
};

storage.clearLocalStorage = () => {
	window.localStorage.clear();
};

storage.removeSessionStorage = (key: string = "default") => {
	window.sessionStorage.removeItem(key);
};

storage.clearSessionStorage = () => {
	window.sessionStorage.clear();
};

storage.removeStorage = (key: string = "default") => {
	window.localStorage.removeItem(key);
	window.sessionStorage.removeItem(key);
};

storage.clearStorage = () => {
	window.localStorage.clear();
	window.sessionStorage.clear();
};

export default storage;
