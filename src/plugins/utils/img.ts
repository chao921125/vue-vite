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

const fileToDataURL = (file: Blob): Promise<any> => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = (e) => resolve((e.target as FileReader).result);
		reader.readAsDataURL(file);
	});
};
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.src = dataURL;
	});
};
const canvasToFile = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> => {
	return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality));
};
/**
 * 图片压缩方法
 * @param {Object}  file 图片文件
 * @param {String} type 想压缩成的文件类型
 * @param {Nubmber} quality 压缩质量参数
 * @returns 压缩后的新图片
 */
export const compressionFile = async (file, type = "image/jpeg", quality = 0.6) => {
	const fileName = file.name;
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	const base64 = await fileToDataURL(file);
	const img = await dataURLToImage(base64);
	canvas.width = img.width;
	canvas.height = img.height;
	context.clearRect(0, 0, img.width, img.height);
	context.drawImage(img, 0, 0, img.width, img.height);
	const blob = (await canvasToFile(canvas, type, quality)) as Blob; // quality:0.5可根据实际情况计算
	const newFile = await new File([blob], fileName, {
		type: type,
	});
	return newFile;
};

function dataURLtoFile(dataurl, filename) {
	let arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)[1];
	let bstr = atob(arr[1]);
	let n = bstr.length;
	let u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}
export const convertImageFile = (file, outputFormat = "image/jpeg", callback) => {
	debugger;
	let reader = new FileReader();
	let img = new Image();

	reader.onload = function (e: any) {
		debugger;
		if (typeof e.target.result === "string") {
			img.onload = function () {
				debugger;
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext("2d");

				canvas.width = img.width;
				canvas.height = img.height;
				// @ts-ignore
				ctx.drawImage(img, 0, 0, img.width, img.height);

				let newDataUrl = canvas.toDataURL(outputFormat);
				let newFile = dataURLtoFile(newDataUrl, file.name);
				callback(newFile);
			};
			img.src = e.target.result;
		}
	};
	reader.readAsDataURL(file);
};

export const imgTypeChange = () => {
	// let blob = new Blob([fd], {type: fd.type});
	// let reBlob = await heic2any({
	//   blob: blob, toType: "image/jpeg"
	// });
	// // @ts-ignore
	// let reFile = new File([reBlob], fd.name.split(".")[0] + ".jpeg", { type: 'image/jpeg' });
	// let newFile = await compressionFile(reFile);
	// const url = URL.createObjectURL(newFile);
};
export const imgCompress = () => {};

export default utils;
