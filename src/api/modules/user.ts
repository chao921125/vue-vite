import Axios from "@/plugins/axios";
import requestURL from "@/config/axiosConfig";

let user: any = {};

user.queryUserInfo = (data: any = {}) => {
	return Axios({
		url: requestURL.userInfo,
		method: "POST",
		data,
	});
};

export default user;
