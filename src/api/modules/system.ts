import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";
import type { MenuListResponse, ApiRequestConfig } from "#/types";

export default {
  getMenuList: (data: ApiRequestConfig = {}) => {
    return Axios<MenuListResponse>({
      url: `${AxiosConfig.baseUrl}/menu-list`,
      method: "GET",
      data,
    });
  },
};
