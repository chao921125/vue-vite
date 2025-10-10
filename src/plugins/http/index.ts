// https://www.axios-http.cn/
import axios from "axios";
import Router from "@/router";
import Log from "@/utils/log";
import Storage from "@/utils/storage";
import Constants from "@/utils/constant/constants";
import AxiosConfig from "@/config/httpConfig";
import NProgress from "@/plugins/loading/progress";
import RouterConfig from "@/config/routerConfig";
import AxiosCancel from "./cancel";
import { ElMessage } from "element-plus";

// 创建一个错误
function errorCreate(msg) {
	const err = new Error(msg);
	errorLog(err);
	throw err;
}

// 记录和显示错误
function errorLog(err) {
	// 添加到日志

	// 打印到控制台
	if (import.meta.env.VITE_NODE_ENV === "development") {
		Log.danger(">>>>>> Error >>>>>>");
		Log.danger(err);
	}
	// 显示提示
	ElMessage({
		message: err.message,
		type: "error",
		duration: 5 * 1000,
	});
}

const defaultHeader = {
	baseURL: import.meta.env.VITE_API_URL_PREFIX || "",
	timeout: AxiosConfig.timeout,
	timeoutErrorMessage: AxiosConfig.timeoutMsg,
	withCredentials: true,
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json;charset=utf-8",
		"X-Requested-With": "XMLHttpRequest",
	},
};

// 创建一个 axios 实例
const http = axios.create(defaultHeader);

// 请求拦截器
http.interceptors.request.use(
	(config) => {
		NProgress.start();

		config.headers["apifoxToken"] = "UpBZTbFlKA6vpmezjXyVjFrs4gCfy4o2";
		if (Storage.getCookie(Constants.keys.token)) {
			config.headers["token"] = "Bearer " + Storage.getCookie(Constants.keys.token);

			config.headers["Authorization"] = "Bearer " + Storage.getCookie(Constants.keys.token);
		}
		if (config.method?.toLowerCase() === "get") {
			config.params = config.data;
		}
		// config.data = JSON.stringify(config.data);
		// if (!/^https:\/\/|http:\/\//.test(<string>config.url)) {
		// 	// 在请求发送之前做一些处理
		// 	config.headers = {
		// 		token: Storage.getCookie(Constants.keys.token),
		// 	};
		// }
		AxiosCancel.addCancer(config);
		return config;
	},
	async (error) => {
		NProgress.done();
		const config = error.config;
		if (!config || !config.retry) return Promise.reject(error);
		config.__retryCount = config.__retryCount || 0;
		if (config.__retryCount >= config.retry) return Promise.reject(error);
		config.__retryCount += 1;
		const backOff = new Promise((resolve: any) => {
			setTimeout(() => {
				resolve();
			}, AxiosConfig.timeout || 1);
		});
		await backOff;
		return axios(config);
	},
);

// 响应拦截器
http.interceptors.response.use(
	async (response) => {
		NProgress.done();
		AxiosCancel.removeCancer(response.config);
		// resp 是 axios 返回数据中的 data
		const resp = response.data || null;
		const status = response.status || 200;
		if (response.config.url?.includes(AxiosConfig.ipUrl)) {
			return resp;
		}
		if (response.request.responseType === "blob" || response.request.responseType === "arraybuffer") {
			return response.data;
		}
		if (/^4\d{2}/.test(String(status))) {
			Storage.clearCookie();
			Storage.clearSessionStorage();
			const toUrl = status === 404 ? RouterConfig.route404 : RouterConfig.route403;
			await Router.replace({ path: toUrl });
		} else if (/^3\d{2}/.test(String(status))) {
			await Router.replace({ path: RouterConfig.routeRoot });
		} else if (/^5\d{2}/.test(String(status))) {
			await Router.replace({ path: RouterConfig.route500 });
		} else {
			// 这个状态码是和后端约定的
			const { code } = resp;
			Object.assign(resp.data, { code: resp.code });
			// 根据 code 进行判断
			if (code === null || code === undefined) {
				return resp;
			} else {
				// 有 code 代表这是一个后端接口 可以进行进一步的判断
				switch (code) {
					case 0:
						// [ 示例 ] code === 0 代表没有错误
						return resp;
					case 200:
						// [ 示例 ] code === 0 代表没有错误
						return resp;
					case 400:
						errorCreate(`${resp.message}`);
						break;
					default:
						errorCreate(`${resp.message}`);
						break;
				}
				return resp;
			}
		}
	},
	async (error) => {
		NProgress.done();
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = "请求错误";
					break;
				case 401:
					error.message = "未授权，请登录";
					break;
				case 403:
					error.message = "拒绝访问";
					break;
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`;
					break;
				case 408:
					error.message = "请求超时";
					break;
				case 500:
					error.message = "服务器内部错误";
					break;
				case 501:
					error.message = "服务未实现";
					break;
				case 502:
					error.message = "网关错误";
					break;
				case 503:
					error.message = "服务不可用";
					break;
				case 504:
					error.message = "网关超时";
					break;
				case 505:
					error.message = "HTTP版本不受支持";
					break;
				default:
					break;
			}
			if (!Storage.getCookie(Constants.keys.token)) {
				await Router.replace({ path: RouterConfig.routeLogin });
			}
		}
		errorLog(error);
		return Promise.reject(error);
	},
);

export default http;
