import Axios from "@/plugins/axios";
import AxiosConfig from "@/config/axiosConfig";

let user: any = {};

user.queryUserInfo = (data: any = {}) => {
	return Axios({
		url: AxiosConfig.requestUrl.getUserInfo,
		method: "POST",
		data,
	});
};

export default user;
