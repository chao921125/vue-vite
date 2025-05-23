import heic2any from "heic2any";

const utils: any = {
	blobToDataURL: (blob) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onerror = () => {
				reject("ERR_DOM Error on converting blob to data URL");
			};
			reader.onloadend = (e) => resolve(e.target!.result);
			reader.readAsDataURL(blob);
		});
	},
	imageToDataURL: (imgURL) => {
		return new Promise((resolve, reject) => {
			const canvas = document.createElement("canvas");
			const img = new Image();
			img.src = imgURL;
			img.crossOrigin = "Anonymous";
			img.onerror = () => {
				reject("ERR_DOM Error on converting img to data URL");
			};
			img.onload = function () {
				canvas.width = img.naturalWidth * window.devicePixelRatio;
				canvas.height = img.naturalHeight * window.devicePixelRatio;
				const ctx: any = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				const dataURL = canvas.toDataURL();
				resolve(dataURL);
			};
		});
	},
	dataURLToImage: (dataURL) => {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.src = dataURL;
		});
	},
	dataURLtoBlob: (dataURL) => {
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
	dataURLtoImgBlob: (dataURL) => {
		return new Promise((resolve, reject) => {
			const canvas = document.createElement("canvas");
			const img = new Image();
			img.src = dataURL;
			img.crossOrigin = "Anonymous";
			img.onerror = () => {
				reject("ERR_DOM Error on converting img to data URL");
			};
			img.onload = function () {
				canvas.width = img.naturalWidth * window.devicePixelRatio;
				canvas.height = img.naturalHeight * window.devicePixelRatio;
				const ctx: any = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				canvas.toBlob((blob) => resolve(blob));
			};
		});
	},
	dataURLtoFile: (dataURL, fileName) => {
		const arr = dataURL.split(","),
			mime = arr[0].match(/:(.*?);/)[1];
		const bStr = atob(arr[1]);
		let n = bStr.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bStr.charCodeAt(n);
		}

		return new File([u8arr], fileName, { type: mime });
	},
	canvasToFile: (canvas, type, quality) => {
		return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality));
	},
};

export const imgConvert = async (file, outputFormat = "image/jpeg", callback) => {
	const result: any = {
		file: null,
		fileUrl: "",
	};
	if (file.type === "heic" || file.type === "image/heic") {
		const blob = new Blob([file], { type: file.type });
		const reBlob: any = await heic2any({
			blob: blob,
			toType: "image/jpeg",
		});

		const reFile = new File([reBlob], file.name.split(".")[0] + ".jpeg", {
			type: "image/jpeg",
		});
		const newFile = await imgCompress(reFile);
		const url = URL.createObjectURL(newFile);
		result.file = newFile;
		result.fileUrl = url;
		callback(result);
	} else {
		const reader = new FileReader();
		const img = new Image();

		reader.onload = function (e: any) {
			if (typeof e.target.result === "string") {
				img.onload = function () {
					const canvas = document.createElement("canvas");
					const ctx: any = canvas.getContext("2d");

					canvas.width = img.width;
					canvas.height = img.height;

					ctx.drawImage(img, 0, 0, img.width, img.height);

					const newDataUrl = canvas.toDataURL(outputFormat);
					const newFile = utils.dataURLtoFile(newDataUrl, file.name);
					callback(newFile);
				};
				img.src = e.target.result;
			}
		};
		reader.readAsDataURL(file);
	}
};

export const imgCompress = async (file, type = "image/jpeg", quality = 0.6) => {
	const fileName = file.name;
	const canvas = document.createElement("canvas");
	const context: any = canvas.getContext("2d");
	const base64 = await utils.blobToDataURL(file);
	const img = await utils.dataURLToImage(base64);
	canvas.width = img.width;
	canvas.height = img.height;
	context.clearRect(0, 0, img.width, img.height);
	context.drawImage(img, 0, 0, img.width, img.height);
	const blob = await utils.canvasToFile(canvas, type, quality); // quality:0.5可根据实际情况计算
	return new File([blob], fileName, {
		type: type,
	});
};

export default { imgConvert, imgCompress, utils };
