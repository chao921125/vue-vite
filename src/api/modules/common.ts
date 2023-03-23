import Axios from "@/plugins/axios";
import AxiosSetConfig from "@/config/axiosSetConfig";

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

common.uploadFile = (data: any = {}) => {
	return Axios({
		url: AxiosSetConfig.requestUrl.fileUpload,
		method: "POST",
		headers: { "Content-Type": "multipart/form-data" },
		data,
	});
};

common.previewFile = (data: any) => {
	return Axios({
		url: AxiosSetConfig.requestUrl.fileUpload,
		method: "GET",
		responseType: "blob",
		data,
	});
};

common.previewFileById = (data: any) => {
	return Axios({
		url: AxiosSetConfig.requestUrl.fileUpload + `/${data}`,
		method: "GET",
		responseType: "blob",
		data,
	});
};

export default common;
