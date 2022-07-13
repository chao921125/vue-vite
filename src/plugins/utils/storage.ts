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
