import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";

export default {
	login: (data = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/auth/login`,
			method: "POST",
			data,
		});
	},
	register: (data = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/auth/register`,
			method: "POST",
			data,
		});
	},
};
