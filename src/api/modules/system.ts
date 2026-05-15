import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";
import type { MenuListResponse } from "#/types";

export default {
  getMenuList: (data = {}) => {
    return Axios<MenuListResponse>({
      url: `${AxiosConfig.baseUrl}/menu-list`,
      method: "GET",
      data,
    });
  },
};
