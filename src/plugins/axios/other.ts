import axios from "axios";
import Utils from "@/plugins/utils";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = process.env.REACT_APP_HTTP;

axios.interceptors.request.use(
	config => {
		config.data = JSON.stringify(config.data);
		config.headers = {
			"Content-Type": "application/json",
			token: Utils.Cookies.getCookie("token"),
		};
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	response => {
		// if (response.data.errCode === 2) {
		// console.log("过期");
		// }
		return response;
	},
	error => {
		console.log("request error：", error);
	},
);

export function get(url: string, params = {}) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: params,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function post(url: string, data: any) {
	return new Promise((resolve, reject) => {
		axios.post(url, data).then(
			response => {
				resolve(response.data);
			},
			error => {
				reject(error);
			},
		);
	});
}

export function patch(url: string, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data).then(
			response => {
				resolve(response.data);
			},
			error => {
				mssage(error);
				reject(error);
			},
		);
	});
}

export function put(url: string, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then(
			response => {
				resolve(response.data);
			},
			error => {
				mssage(error);
				reject(error);
			},
		);
	});
}

export default function (fecth: string, url: string, param: any) {
	return new Promise((resolve, reject) => {
		switch (fecth) {
			case "get":
				console.log("begin a get request,and url:", url);
				get(url, param)
					.then(function (response) {
						resolve(response);
					})
					.catch(function (error) {
						console.log("get request GET failed.", error);
						reject(error);
					});
				break;
			case "post":
				post(url, param)
					.then(function (response) {
						resolve(response);
					})
					.catch(function (error) {
						console.log("get request POST failed.", error);
						reject(error);
					});
				break;
			default:
				break;
		}
	});
}

function mssage(err: any) {
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				console.log(err.response.data.error.details);
				break;
			case 401:
				console.log("未授权，请登录");
				break;
			case 403:
				console.log("拒绝访问");
				break;
			case 404:
				console.log("请求地址出错");
				break;
			case 408:
				console.log("请求超时");
				break;
			case 500:
				console.log("服务器内部错误");
				break;
			case 501:
				console.log("服务未实现");
				break;
			case 502:
				console.log("网关错误");
				break;
			case 503:
				console.log("服务不可用");
				break;
			case 504:
				console.log("网关超时");
				break;

			case 505:
				console.log("HTTP版本不受支持");
				break;
			default:
		}
	}
}
