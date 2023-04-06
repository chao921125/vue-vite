export const urlToBase64 = async (url: string) => {
	if (!url) return "";
	await fetch(url)
		.then((response) => response.blob())
		.then((res) => {
			const blob = new Blob([res]);
			let file = new FileReader();
			file.onload = (e) => {
				return e.target?.result || "";
			};
			file.readAsDataURL(blob);
		});
};

export const fileToBase64 = (file: File, callback?: Function) => {
	if (!file) return "";
	const blob = file.slice();
	const fr = new FileReader();
	fr.onload = (e: any) => {
		if (typeof e === "function") {
			// @ts-ignore
			callback(e.target.result);
		} else {
			return e.target.result;
		}
	};
	fr.readAsDataURL(blob);
};
export const fileToBlob = (file: File, callback?: Function) => {
	if (!file) return "";
	const type = file.type;
	const blob = file.slice();
	const fr = new FileReader();
	fr.onload = (e: any) => {
		const b = new Blob([e.target.result], { type });
		if (typeof e === "function") {
			// @ts-ignore
			callback(b);
		} else {
			return b;
		}
	};
	fr.readAsDataURL(blob);
};
export const blobToBase64 = (blob: Blob, callback?: Function) => {
	if (!blob) return "";
	const fr = new FileReader();
	fr.onload = (e: any) => {
		if (typeof e === "function") {
			// @ts-ignore
			callback(e.target.result);
		} else {
			return e.target.result;
		}
	};
	fr.readAsDataURL(blob);
};
export const blobToFile = () => {};
// @ts-ignore
export const base64ToBlob = (base64: string, callback?: Function) => {
	// if (!base64) return "";
	// let arr = base64.split(","),
	// 	type = arr[0].match(/:(.*?);/)[1];
};
export const base64ToFile = () => {};
