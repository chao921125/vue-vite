// * global
declare global {
	interface Navigator {
		msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
		browserLanguage: string;
	}
	// 声明文件，定义全局变量。其它 app.config.globalProperties.xxx，使用 getCurrentInstance() 来获取
	interface Window {
		webkitRequestAnimationFrame: object;
		mozRequestAnimationFrame: object;
		mozRTCPeerConnection: object;
		webkitRTCPeerConnection: object;
		deferredPrompt: object;
		nextLoading: boolean;
	}
	interface Math {
		easeInOutQuad: any;
	}
}

export { global };
