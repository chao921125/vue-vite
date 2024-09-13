import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";

export default {
	loginUser: (data = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/login`,
			method: "POST",
			data,
		});
	},
	queryUserInfo: (data = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/user-info`,
			method: "GET",
			data,
		});
	},
	queryUser: (data = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/user`,
			method: "GET",
			data,
		});
	},
};
