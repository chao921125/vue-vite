import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";

export default {
	getImgLocale: (name, suffix) => {
		if (!name) return "";
		if (!suffix) suffix = "png";
		// return `/src/assets/images/${type}.${suffix}`;
		return new URL(`/src/assets/images/${name}.${suffix}`, import.meta.url).href;
	},
	previewFileById: (data) => {
		return Axios({
			url: `${AxiosConfig.uploadUrl}/login/${data}`,
			method: "GET",
			responseType: "blob",
			data,
		});
	},
	previewFile: (data) => {
		return Axios({
			url: `${AxiosConfig.uploadUrl}`,
			method: "GET",
			responseType: "blob",
			data,
		});
	},
	uploadFile: (data = {}) => {
		return Axios({
			url: `${AxiosConfig.uploadUrl}`,
			method: "POST",
			headers: { "Content-Type": "multipart/form-data" },
			data,
		});
	},
	queryAddressByIp: (data = { ip: "" }) => {
		return Axios({
			url: `${AxiosConfig.ipUrl}/index?ip=${data.ip}&type=0`,
			method: "GET",
			data,
		});
	},
	queryIp: (data = {}) => {
		return Axios({
			url: `${AxiosConfig.uploadUrl}/index?ip=&type=0`,
			method: "GET",
			data,
		});
	},
};
