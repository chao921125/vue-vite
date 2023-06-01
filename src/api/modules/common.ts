import Axios from "@/plugins/axios";
import AxiosConfig from "@/config/axiosConfig";

export default {
	getImgLocale: (name: string, suffix?: string) => {
		if (!name) return "";
		if (!suffix) suffix = "png";
		// return `/src/assets/images/${type}.${suffix}`;
		return new URL(`/src/assets/images/${name}.${suffix}`, import.meta.url).href;
	},
	previewFileById: (data: any) => {
		return Axios({
			url: `${AxiosConfig.uploadUrl}/login/${data}`,
			method: "GET",
			responseType: "blob",
			data,
		});
	},
	previewFile: (data: any) => {
		return Axios({
			url: `${AxiosConfig.uploadUrl}`,
			method: "GET",
			responseType: "blob",
			data,
		});
	},
	uploadFile: (data: any = {}) => {
		return Axios({
			url: `${AxiosConfig.uploadUrl}`,
			method: "POST",
			headers: { "Content-Type": "multipart/form-data" },
			data,
		});
	},
	queryAddressByIp: (data: any = {}) => {
		return Axios({
			url: `${AxiosConfig.ipUrl}/index?ip=${data.ip}&type=0`,
			method: "GET",
			data,
		});
	},
	queryIp: (data: any = {}) => {
		return Axios({
			url: `${AxiosConfig.uploadUrl}/index?ip=&type=0`,
			method: "GET",
			data,
		});
	},
};
