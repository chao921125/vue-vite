import Axios from "@/plugins/axios";
import AxiosConfig from "@/config/axiosConfig";

export default {
	loginUser: (data: any = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/login`,
			method: "POST",
			data,
		});
	},
	queryUserInfo: (data: any = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/user-info`,
			method: "GET",
			data,
		});
	},
};
