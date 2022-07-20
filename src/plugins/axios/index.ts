// https://www.axios-http.cn/
import axios from "axios";
import router from "@/router";
import util from "@/plugins/utils";

axios.defaults.timeout = 6000;
// 跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "";

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
	if (process.env.NODE_ENV === "development") {
		util.log.danger(">>>>>> Error >>>>>>");
		console.log(err);
	}
	// 显示提示
	/* Message({
		message: err.message,
		type: "error",
		duration: 5 * 1000
	}) */
}

// 创建一个 axios 实例
const http = axios.create({
	baseURL: "/",
	headers: { "Content-Type": "application/json" },
});

// 请求拦截器
http.interceptors.request.use(
	config => {
		// config.headers["Content-Type"] = "application/json"
		if (!/^https:\/\/|http:\/\//.test(<string>config.url)) {
			// 在请求发送之前做一些处理
			const token = util.cookies.get("token");
			if (token && token !== "undefined") {
				// 让每个请求携带token-- ["X-Token"]为自定义key 请根据实际情况自行修改
				// config.headers["X-Token"] = token
			}
		}
		return config;
	},
	error => {
		console.log("request error" + error);
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
	response => {
		// dataAxios 是 axios 返回数据中的 data
		const dataAxios = response.data;
		// 这个状态码是和后端约定的
		const { code } = dataAxios;
		// 根据 code 进行判断
		if (code || code === null || code === undefined) {
			// 如果没有 code 代表这不是项目后端开发的接口
			return dataAxios;
		} else {
			// 有 code 代表这是一个后端接口 可以进行进一步的判断
			switch (code) {
				case 0:
					// [ 示例 ] code === 0 代表没有错误
					return dataAxios;
				case "xxx":
					// [ 示例 ] 其它和后台约定的 code
					errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`);
					break;
				default:
					// 不是正确的 code
					errorCreate(`${dataAxios.msg}: ${response.config.url}`);
					break;
			}
		}
	},
	error => {
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
			if (!util.cookies.get("token")) {
				router.replace({
					path: "login",
				});
			}
		}
		errorLog(error);
		return Promise.reject(error);
	},
);

export default http;
