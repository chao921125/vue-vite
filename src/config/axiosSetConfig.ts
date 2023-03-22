const baseUrl = "/api";
const uploadUrl = "/upload";
const ip = "/ip";

const useUrl = {
	getUserInfo: `${baseUrl}/user`,
	fileUpload: `${uploadUrl}/file`,
	getIp: `${ip}`,
};

export default {
	timeout: 6000,
	timeoutMsg: "请求超时",
	tokenKey: "AUTH_TOKEN",
	login: "",
	baseUrl: {
		baseUrl: baseUrl,
		uploadUrl: uploadUrl,
		ip: ip,
	},
	requestUrl: useUrl,
	status200: 200,
	status400: 400,
	status401: 401,
	status402: 402,
	status403: 403,
	status404: 404,
	status405: 405,
	status406: 406,
	status407: 407,
	status408: 408,
	status500: 500,
	status501: 501,
	status502: 502,
	status503: 503,
	status504: 504,
	status505: 505,
};
