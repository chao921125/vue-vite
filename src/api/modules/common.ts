import Axios from "@/plugins/axios";
import AxiosConfig from "@/config/axiosConfig";

let common: any = {};

common.queryIp = (data: any = {}) => {
	return Axios({
		url: AxiosConfig.requestUrl.getIp + "/index?ip=&type=0",
		method: "GET",
		data,
	});
};

common.queryAddressByIp = (data: any = {}) => {
	return Axios({
		url: AxiosConfig.requestUrl.getIp + `/index?ip=${data.ip}&type=0`,
		method: "GET",
		data,
	});
};

common.uploadFile = (data: any = {}) => {
	return Axios({
		url: AxiosConfig.requestUrl.fileUpload,
		method: "POST",
		headers: { "Content-Type": "multipart/form-data" },
		data,
	});
};

common.previewFile = (data: any) => {
	return Axios({
		url: AxiosConfig.requestUrl.fileUpload,
		method: "GET",
		responseType: "blob",
		data,
	});
};

common.previewFileById = (data: any) => {
	return Axios({
		url: AxiosConfig.requestUrl.fileUpload + `/${data}`,
		method: "GET",
		responseType: "blob",
		data,
	});
};

common.getImgLocal = (name: string) => {
	if (!name) return "";
	// return `/src/assets/images/${type}.png`;
	return new URL(`/src/assets/images/${name}.png`, import.meta.url).href;
};

export default common;
