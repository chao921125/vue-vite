import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";

export default {
  getMenuList: (data = {}) => {
    return Axios({
      url: `${AxiosConfig.baseUrl}/menu-list`,
      method: "GET",
      data,
    });
  },
};
