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
		data,
	});
};

export default common;
