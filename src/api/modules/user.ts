import axios from "@/plugins/axios";
import requestURL from "../config";

export function queryUserInfo(data) {
	return axios({
		url: requestURL.userInfo,
		method: "POST",
		data,
	});
}
