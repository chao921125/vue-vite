import axios from "@/plugins/axios";
import requestURL from "../config";

let user: any = {};

user.queryUserInfo = (data: any = {}) => {
	return axios({
		url: requestURL.userInfo,
		method: "POST",
		data,
	});
};

export default user;
