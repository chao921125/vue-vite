// const supportedMIMETypes = ["image/png", "image/jpeg", "image/gif"];
//
// type ResultType = "Blob" | "ImageData";
// const utils = {
// 	blobToDataURL: function (blob: Blob): Promise<string> {
// 		return new Promise((resolve, reject) => {
// 			let reader = new FileReader();
// 			reader.onerror = function () {
// 				reject("ERR_DOM Error on converting blob to data URL");
// 			};
// 			reader.onload = (e) => {
// 				resolve((reader as any).result);
// 			};
// 			reader.readAsDataURL(blob);
// 		});
// 	},
// 	dataURItoBlob: function (dataURI: string): Blob | string {
// 		try {
// 			var byteString = atob(dataURI.split(",")[1]);
// 			var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
// 			var ab = new ArrayBuffer(byteString.length);
// 			var ia = new Uint8Array(ab);
// 			for (var i = 0; i < byteString.length; i++) {
// 				ia[i] = byteString.charCodeAt(i);
// 			}
// 			var blob = new Blob([ab], { type: mimeString });
// 			return blob;
// 		} catch (e) {
// 			return "ERR_DOM Error on converting data URI to blob " + e && e.toString ? e.toString() : e;
// 		}
// 	},
//
// 	imageDataToBlob: function ({ imageData, toType = "image/png", quality = 0.92 }: { imageData: ImageData; toType?: string; quality?: number }): Promise<Blob> {
// 		// normalize quality
// 		if (quality > 1 || quality < 0) {
// 			quality = 0.92;
// 		}
// 		// normalize MIME type
// 		if (supportedMIMETypes.indexOf(toType) === -1) {
// 			toType = "image/png";
// 		}
// 		return new Promise((resolve, reject) => {
// 			let canvas: HTMLCanvasElement | null = null;
//
// 			try {
// 				canvas = document.createElement("canvas");
// 			} catch (e) {}
//
// 			if (!canvas) {
// 				return reject("ERR_CANVAS Error on converting imagedata to blob: Could not create canvas element");
// 			}
//
// 			canvas.width = imageData.width;
// 			canvas.height = imageData.height;
// 			const ctx = canvas.getContext("2d");
// 			if (!ctx) {
// 				return reject("ERR_CANVAS Error on converting imagedata to blob: Could not get canvas context");
// 			}
// 			ctx.putImageData(imageData, 0, 0);
// 			canvas.toBlob(
// 				(blob) => {
// 					if (!blob) {
// 						return reject("ERR_CANVAS Error on converting imagedata to blob: Could not get blob from canvas");
// 					}
// 					return resolve(blob);
// 				},
// 				toType,
// 				quality,
// 			);
// 		});
// 	},
//
// 	imagesToGif: function ({
// 		images,
// 		interval,
// 		gifHeight,
// 		gifWidth,
// 	}: {
// 		images: string[];
// 		interval: number;
// 		gifHeight: number;
// 		gifWidth: number;
// 	}): Promise<string> {
// 		return new Promise((resolve, reject) => {
// 			gifshot.createGIF(
// 				{
// 					images,
// 					interval,
// 					gifHeight,
// 					gifWidth,
// 				},
// 				(res) => {
// 					if (res.error) {
// 						reject(`ERR_GIF ${res.errorCode} ${res.errorMessage}`);
// 					}
// 					return resolve(res.image);
// 				},
// 			);
// 		});
// 	},
//
// 	otherImageType: function (buffer: ArrayBuffer) {
// 		/**
// 		 * Some confusion might arise when passing a regular image
// 		 * like jpeg/png/gif and getting "format is not supported"
// 		 * so to solve this, we should detect if the image is
// 		 * already browser-readable.
// 		 */
// 		const arr = new Uint8Array(buffer).subarray(0, 4);
// 		let header = "";
// 		for (let i = 0; i < arr.length; i++) {
// 			header = header + arr[i].toString(16);
// 		}
// 		switch (header) {
// 			case "89504e47":
// 				return "image/png";
// 			case "47494638":
// 				return "image/gif";
// 			case "ffd8ffe0":
// 			case "ffd8ffe1":
// 			case "ffd8ffe2":
// 			case "ffd8ffe3":
// 			case "ffd8ffe8":
// 				return "image/jpeg";
// 			default:
// 				return false;
// 		}
// 	},
//
// 	error: function (message: string) {
// 		/**
// 		 * Error coding system:
// 		 *
// 		 * UNKNOWN = 0
// 		 * USER errors = 1
// 		 * LIBHEIF errors = 2
// 		 * GIF errors = 3
// 		 * DOM errors = 4
// 		 * CANVAS errors = 5
// 		 *
// 		 */
//
// 		let code = 0;
//
// 		if (!message) {
// 			message = "ERR_UNKNOWN";
// 		} else if (typeof message !== "string") {
// 			if ((message as any).toString) {
// 				message = (message as any).toString();
// 			} else {
// 				message = JSON.stringify(message);
// 			}
// 		}
//
// 		const headers = ["ERR_USER", "ERR_LIBHEIF", "ERR_GIF", "ERR_DOM", "ERR_CANVAS"];
// 		for (let index = 0; index < headers.length; index++) {
// 			const header = headers[index];
// 			if (message.indexOf(header) === 0) {
// 				code = index + 1;
// 			}
// 		}
// 		return {
// 			code,
// 			message,
// 		};
// 	},
// };
