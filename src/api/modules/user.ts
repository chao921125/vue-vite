import Axios from "@/plugins/axios";
import AxiosSetConfig from "@/config/axiosSetConfig";

let user: any = {};

user.queryUserInfo = (data: any = {}) => {
	return Axios({
		url: AxiosSetConfig.userInfo,
		method: "POST",
		data,
	});
};

export default user;
