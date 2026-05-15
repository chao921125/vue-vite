import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";
import type { LoginParams, RegisterParams } from "#/types";

export default {
  login: (data: LoginParams = {} as LoginParams) => {
    return Axios({
      url: `${AxiosConfig.baseUrl}/auth/login`,
      method: "POST",
      data,
    });
  },
  register: (data: RegisterParams = {} as RegisterParams) => {
    return Axios({
      url: `${AxiosConfig.baseUrl}/auth/register`,
      method: "POST",
      data,
    });
  },
};
