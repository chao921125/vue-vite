import Axios from "@/plugins/axios";
import AxiosConfig from "@/config/axiosConfig";

export default {
	getMenuList: (data: any = {}) => {
		return Axios({
			url: `${AxiosConfig.baseUrl}/menu-list`,
			method: "GET",
			data,
		});
	},
};
