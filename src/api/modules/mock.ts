import Axios from "@/plugins/axios";
// import AxiosConfig from "@/config/axiosConfig";

export default {
	queryUserInfo: (data: any = {}) => {
		return Axios({
			url: "/api/get",
			method: "get",
			data,
		});
	},
};
