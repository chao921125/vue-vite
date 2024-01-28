const utils = {
	blobToDataURL: (file: Blob): Promise<any> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onerror = () => {
				reject("ERR_DOM Error on converting blob to data URL");
			};
			reader.onloadend = (e) => resolve((e.target as FileReader).result);
			reader.readAsDataURL(file);
		});
	},
	imageToDataURL: (imgURL: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			let canvas = document.createElement("canvas");
			let img = new Image();
			img.src = imgURL;
			img.crossOrigin = "Anonymous";
			img.onerror = () => {
				reject("ERR_DOM Error on converting img to data URL");
			};
			img.onload = function () {
				canvas.width = img.naturalWidth * window.devicePixelRatio;
				canvas.height = img.naturalHeight * window.devicePixelRatio;
				let ctx: any = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				const dataURL = canvas.toDataURL();
				resolve(dataURL);
			};
		});
	},
	dataURLToImage: (dataURL: string): Promise<HTMLImageElement> => {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.src = dataURL;
		});
	},
	dataURLtoBlob: (dataURL: string): Blob | string => {
		try {
			const byteString = atob(dataURL.split(",")[1]);
			const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
			const ab = new ArrayBuffer(byteString.length);
			const ia = new Uint8Array(ab);
			for (let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ab], { type: mimeString });
		} catch (e: any) {
			return "ERR_DOM Error on converting data URI to blob " + e && e.toString ? e.toString() : e;
		}
	},
	dataURLtoBlobImg: (dataURL: string): Promise<HTMLImageElement> => {
		return new Promise((resolve, reject) => {
			let canvas = document.createElement("canvas");
			let img = new Image();
			img.src = dataURL;
			img.crossOrigin = "Anonymous";
			img.onerror = () => {
				reject("ERR_DOM Error on converting img to data URL");
			};
			img.onload = function () {
				canvas.width = img.naturalWidth * window.devicePixelRatio;
				canvas.height = img.naturalHeight * window.devicePixelRatio;
				let ctx: any = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				canvas.toBlob((blob: any) => resolve(blob));
			};
		});
	},
};

export const imgTypeChange = () => {};

export default utils;
