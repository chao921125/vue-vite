export const download = async (url, name) => {
	const link = document.createElement("a");
	link.href = url; // 替换为文件的真实链接
	link.download = name || `download${url.slice(url.lastIndexOf("."))}`; // 指定下载的文件名
	link.click();
};

export const urlToBase64 = async (url) => {
	if (!url) return "";
	await fetch(url)
		.then((response) => response.blob())
		.then((res) => {
			const blob = new Blob([res]);
			const file = new FileReader();
			file.onload = (e) => {
				return e.target?.result || "";
			};
			file.readAsDataURL(blob);
		});
};

export const fileToBase64 = (file, callback) => {
	if (!file) return "";
	const blob = file.slice();
	const fr = new FileReader();
	fr.onload = (e: any) => {
		if (typeof e === "function") {
			callback(e.target.result);
		} else {
			return e.target.result;
		}
	};
	fr.onerror = () => {
		return "";
	};
	fr.readAsDataURL(blob);
};
export const base64ToFile = (base64, fileName) => {
	if (!base64) return "";
	const arr = base64.split(",");
	const type = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], fileName, {
		type: type,
	});
};

export const fileToBlob = (file, callback) => {
	if (!file) return "";
	const type = file.type;
	const blob = file.slice();
	const fr = new FileReader();
	fr.onload = (e: any) => {
		const b = new Blob([e.target.result], { type });
		if (typeof e === "function") {
			callback(b);
		} else {
			return b;
		}
	};
	fr.readAsDataURL(blob);
};
export const blobToFile = (blob, fileName) => {
	if (!blob) return "";
	return new File([blob], fileName);
};

export const blobToBase64 = (blob, callback) => {
	if (!blob) return "";
	const fr = new FileReader();
	fr.onload = (e: any) => {
		if (typeof e === "function") {
			callback(e.target.result);
		} else {
			return e.target.result;
		}
	};
	fr.readAsDataURL(blob);
};
export const base64ToBlob = (base64) => {
	if (!base64) return "";
	const arr = base64.split(",");
	const type = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: type,
	});
};

export default { urlToBase64, fileToBase64, base64ToFile, fileToBlob, blobToFile, blobToBase64, base64ToBlob };
