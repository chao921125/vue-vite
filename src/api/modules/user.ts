import Axios from "@/plugins/axios";
import AxiosConfig from "@/config/axiosConfig";

export default {
	loginUser: (data: any = {}) => {
		return Axios({
			url: AxiosConfig.requestUrl.loginUser,
			method: "POST",
			data,
		});
	},
	queryUserInfo: (data: any = {}) => {
		return Axios({
			url: AxiosConfig.requestUrl.getUserInfo,
			method: "POST",
			data,
		});
	},
};
