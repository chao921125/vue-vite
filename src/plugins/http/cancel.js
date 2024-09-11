const cancelMap = new Map();

function getPending(config) {
	return [config.url, config.method].join("&");
}

function removeCancer(config) {
	const key = getPending(config);
	if (cancelMap.has(key)) {
		const cancel = cancelMap.get(key);
		if (cancel) {
			cancel.abort(key);
		}
		cancelMap.delete(key);
	}
}

export default {
	addCancer: (config) => {
		// 防止重复请求
		removeCancer(config);
		// 取消请求
		const controller = new AbortController();
		const key = getPending(config);
		config.signal = controller.signal;
		if (!cancelMap.has(key)) {
			cancelMap.set(key, controller);
		}
	},
	removeCancer: (config) => {
		removeCancer(config);
	},
	removeAllCancer: () => {
		cancelMap.forEach((cancel) => {
			if (cancel) {
				cancel.abort();
			}
		});
		cancelMap.clear();
	},
};
