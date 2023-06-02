// https://www.axios-http.cn/
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Router from "@/router";
import Log from "@/plugins/utils/log";
import Storage from "@/plugins/utils/storage";
import Cookie from "@/plugins/utils/cookie";
import Constants from "@/plugins/constants";
import AxiosConfig from "@/config/axiosConfig";
import NProgress from "@/plugins/loading/progress";
import RouterConfig from "@/config/routerConfig";
import AxiosCancel from "./cancel";
import { ElMessage } from "element-plus";

// axios.request(config)
// axios.get(url[, config])
// axios.post(url[, data[, config]])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.options(url[, config])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])

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

const defaultHeader: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_API_URL_PREFIX || "",
	timeout: AxiosConfig.timeout,
	timeoutErrorMessage: AxiosConfig.timeoutMsg,
	withCredentials: true,
	headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json;charset=utf-8", "X-Requested-With": "XMLHttpRequest" },
};

// 创建一个 axios 实例
const http: AxiosInstance = axios.create(defaultHeader);

// 请求拦截器
http.interceptors.request.use(
	(config: AxiosRequestConfig): any => {
		NProgress.start();
		// @ts-ignore
		config.headers["apifoxToken"] = "UpBZTbFlKA6vpmezjXyVjFrs4gCfy4o2";
		if (Cookie.getCookie(Constants.cookieKey.token)) {
			// @ts-ignore
			config.headers["token"] = "Bearer " + Cookie.getCookie(Constants.cookieKey.token);
			// @ts-ignore
			config.headers["Authorization"] = "Bearer " + Cookie.getCookie(Constants.cookieKey.token);
		}
		if (config.method?.toLowerCase() === "get") {
			config.params = config.data;
		}
		// config.data = JSON.stringify(config.data);
		// if (!/^https:\/\/|http:\/\//.test(<string>config.url)) {
		// 	// 在请求发送之前做一些处理
		// 	config.headers = {
		// 		token: Cookie.getCookie(Constants.cookieKey.token),
		// 	};
		// }
		AxiosCancel.addCancer(config);
		return config;
	},
	(error) => {
		NProgress.done();
		let config = error.config;
		if (!config || !config.retry) return Promise.reject(error);
		config.__retryCount = config.__retryCount || 0;
		if (config.__retryCount >= config.retry) return Promise.reject(error);
		config.__retryCount += 1;
		let backOff = new Promise((resolve: any) => {
			setTimeout(() => {
				resolve();
			}, config.retryDelay || 1);
		});
		return backOff.then(() => {
			return axios(config);
		});
	},
);

// 响应拦截器
http.interceptors.response.use(
	async (response: AxiosResponse) => {
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
			Cookie.clearCookie();
			Storage.clearSessionStorage();
			const toUrl = status === 404 ? RouterConfig.route404 : RouterConfig.route403;
			await Router.replace({ path: toUrl });
		} else if (/^3\d{2}/.test(String(status))) {
			await Router.replace({ path: RouterConfig.routeRoot });
		} else if (/^5\d{2}/.test(String(status))) {
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
						errorCreate(`[ code: 400 ] ${resp.message}`);
						break;
					default:
						errorCreate(`${resp.message}`);
						break;
				}
				return resp;
			}
		}
	},
	(error) => {
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
			if (!Cookie.getCookie(Constants.cookieKey.token)) {
				Router.replace({
					path: RouterConfig.routeLogin,
				});
			}
		}
		errorLog(error);
		return Promise.reject(error);
	},
);

export default http;
