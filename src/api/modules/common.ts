import Axios from "@/plugins/axios";
import AxiosSetConfig from "@/config/axiosSetConfig";
import Fetch from "@/plugins/axios/fetch";

let common: any = {};

common.queryIp = (data: any = {}) => {
	return Axios({
		url: AxiosSetConfig.requestUrl.getIp + "/index?ip=&type=0",
		method: "GET",
		data,
	});
};

common.queryAddressByIp = (data: any = {}) => {
	return Axios({
		url: AxiosSetConfig.requestUrl.getIp + `/index?ip=${data.ip}&type=0`,
		method: "GET",
		data,
	});
};

common.fetchIp = (data: any = {}) => {
	Fetch.request(AxiosSetConfig.requestUrl.ctIpIpify, data, { method: "GET" });
};

common.fetchAddressByIp = (data: any = {}) => {
	Fetch.request(AxiosSetConfig.requestUrl.ctIp + `/index?ip=${data.ip}&type=0`, data, { method: "GET", mode: "no-cors" });
};

common.uploadFile = (data: any = {}) => {
	return Axios({
		url: AxiosSetConfig.requestUrl.fileUpload,
		method: "POST",
		data,
	});
};

export default common;
