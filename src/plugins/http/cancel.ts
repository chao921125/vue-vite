const axiosCancel = {
	addCancer: () => {},
	removeCancer: () => {},
	removeAllCancer: () => {},
};
const cancelMap = new Map();

function getPending(config = { url: "", method: "" }) {
	return [config.url, config.method].join("&");
}

axiosCancel.addCancer = (config = { url: "", method: "", signal: {} }) => {
	// 防止重复请求
	axiosCancel.removeCancer(config);
	// 取消请求
	const controller = new AbortController();
	const key = getPending(config);
	config.signal = controller.signal;
	if (!cancelMap.has(key)) {
		cancelMap.set(key, controller);
	}
};
axiosCancel.removeCancer = (config = { url: "", method: "", signal: {} }) => {
	const key = getPending(config);
	if (cancelMap.has(key)) {
		const cancel = cancelMap.get(key);
		if (cancel) {
			cancel.abort(key);
		}
		cancelMap.delete(key);
	}
};
axiosCancel.removeAllCancer = () => {
	cancelMap.forEach((cancel) => {
		if (cancel) {
			cancel.abort();
		}
	});
	cancelMap.clear();
};

export default axiosCancel;
