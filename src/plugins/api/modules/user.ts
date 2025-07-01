import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";

export default {
	loginUser: (data = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/auth/login`,
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
};
