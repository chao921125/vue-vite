function createVideoToCanvas(videoSrc: string, width: number, height: number) {
	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null;

	// 初始化视频和 canvas
	async function init() {
		// 创建 video 元素
		video = document.createElement("video");
		video.src = videoSrc;
		video.width = width;
		video.height = height;
		video.muted = true; // 静音
		video.crossOrigin = "anonymous"; // 解决跨域问题（如果有）

		// 创建 canvas 元素
		canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		context = canvas.getContext("2d");

		// 加载视频
		await loadVideo();
	}

	// 加载视频
	function loadVideo() {
		return new Promise<void>((resolve, reject) => {
			video.onloadeddata = () => {
				resolve();
			};
			video.onerror = (err) => {
				reject(err);
			};
		});
	}

	// 捕捉指定时间点的帧
	function captureFrameAt(timeInSeconds: number) {
		return new Promise<HTMLCanvasElement>((resolve, reject) => {
			video.currentTime = timeInSeconds;

			// 等待视频跳转到指定时间
			video.onseeked = () => {
				if (context) {
					context.drawImage(video, 0, 0, width, height);
				}
				resolve(canvas); // 返回包含视频帧的 canvas
			};

			video.onerror = (err) => {
				reject(err);
			};
		});
	}

	// 获取当前帧的 base64 数据
	function getFrameAsBase64() {
		return canvas.toDataURL("image/png");
	}

	// 获取当前帧的 Blob 数据
	function getFrameAsBlob() {
		return new Promise<Blob | null>((resolve) => {
			canvas.toBlob((blob) => {
				resolve(blob);
			}, "image/png");
		});
	}

	// 返回初始化后的函数接口
	return {
		init,
		captureFrameAt,
		getFrameAsBase64,
		getFrameAsBlob,
	};
}

// 使用示例
(async () => {
	const videoSrc = "your-video.mp4"; // 视频的 URL
	const videoToCanvas = createVideoToCanvas(videoSrc, 400, 300);

	// 初始化视频和 canvas
	await videoToCanvas.init();

	// 捕捉 5 秒处的帧
	await videoToCanvas.captureFrameAt(5);

	// 获取当前帧的 base64 数据
	const base64Image = videoToCanvas.getFrameAsBase64();
	console.log(base64Image);

	// 获取当前帧的 Blob 数据
	const blobImage = await videoToCanvas.getFrameAsBlob();
	console.log(blobImage);
})();
