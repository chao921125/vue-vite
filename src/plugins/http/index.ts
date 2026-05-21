// https://www.axios-http.cn/
import axios from "axios";
import Router from "@/router";
import Storage from "@/utils/browser/storage";
import { secureStorage } from "@/utils/browser/crypto";
import Constants from "@/utils/constant/constants";
import AxiosConfig from "@/config/httpConfig";
import NProgress from "@/plugins/loading/progress";
import RouterConfig from "@/config/routerConfig";
import AxiosCancel from "./cancel";
import { ErrorHandler, isBizError } from "./errorHandler";

const defaultHeader = {
  baseURL: import.meta.env.VITE_API_URL_PREFIX || "",
  timeout: AxiosConfig.timeout,
  timeoutErrorMessage: AxiosConfig.timeoutMsg,
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
  },
};

// 创建一个 axios 实例
const http = axios.create(defaultHeader);

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    NProgress.start();

    // ⚠️ 注意：以下 Token 仅为本地开发示例，实际使用时请根据项目需求修改
    // - 开发环境：可在 .env.development 中配置 VITE_API_TOKEN
    // - 生产环境：建议从环境变量或配置中心动态获取
    // - 如不需要，可直接删除此行
    config.headers["apifoxToken"] = "UpBZTbFlKA6vpmezjXyVjFrs4gCfy4o2";

    // 用户认证 Token（优先使用加密存储，降级使用 Cookie）
    const encryptedToken = secureStorage.getToken();
    const cookieToken = Storage.getCookie(Constants.keys.token);
    const token = encryptedToken || cookieToken;

    if (token) {
      config.headers["token"] = "Bearer " + token;
      config.headers["Authorization"] = "Bearer " + token;
    }

    // CSRF Token（仅 POST/PUT/DELETE 请求）
    const csrfToken = Storage.getSessionStorage(Constants.keys.csrfToken);
    if (csrfToken && !["get", "GET"].includes(config.method || "")) {
      config.headers["X-CSRF-Token"] = csrfToken;
      config.headers["X-Requested-With"] = "XMLHttpRequest";
    }

    // GET 请求参数处理：将 data 合并到 params
    // 注意：GET 请求不应有请求体，参数应放在 URL 查询字符串中
    // 如果同时配置了 params 和 data，会合并两者，data 优先
    if (config.method?.toLowerCase() === "get" && config.data) {
      config.params = { ...config.params, ...config.data };
      config.data = undefined; // 清除 data，GET 请求不需要请求体
    }

    // 添加请求到取消列表
    AxiosCancel.addCancel(config);
    return config;
  },
  async (error) => {
    NProgress.done();
    const config = error.config;
    if (!config || !config.retry) return Promise.reject(error);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) return Promise.reject(error);
    config.__retryCount += 1;
    const backOff = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, AxiosConfig.timeout || 1);
    });
    await backOff;
    return axios(config);
  },
);

// 响应拦截器
http.interceptors.response.use(
  async (response) => {
    NProgress.done();
    AxiosCancel.removeCancel(response.config);

    // resp 是 axios 返回数据中的 data
    const resp = response.data || null;
    const status = response.status || 200;

    // 特殊 URL 处理（IP 查询接口）
    if (response.config.url?.includes(AxiosConfig.ipUrl)) {
      return resp;
    }

    // Blob/ArrayBuffer 类型响应直接返回
    if (
      response.request.responseType === "blob" ||
      response.request.responseType === "arraybuffer"
    ) {
      return response.data;
    }

    // 处理 HTTP 状态码错误（4xx、5xx）
    if (/^4\d{2}/.test(String(status))) {
      // 清除登录信息
      Storage.clearCookie();
      Storage.clearSessionStorage();

      // 使用统一错误处理
      ErrorHandler.http(status, undefined, { autoRedirect: true });
      return Promise.reject(new Error(ErrorHandler.http(status).message));
    }

    if (/^3\d{2}/.test(String(status))) {
      // 重定向到根路径
      await Router.replace({ path: RouterConfig.routeRoot });
      return Promise.reject(new Error("重定向"));
    }

    if (/^5\d{2}/.test(String(status))) {
      // 服务器错误，使用统一处理
      ErrorHandler.http(status, undefined, { autoRedirect: true });
      return Promise.reject(new Error(ErrorHandler.http(status).message));
    }

    // 处理业务错误码
    const { code } = resp;

    // 如果没有 code，直接返回
    if (code === null || code === undefined) {
      return resp;
    }

    // 使用统一错误处理判断是否为业务错误
    if (isBizError(code)) {
      // 业务错误，显示错误提示
      ErrorHandler.biz(code, resp.message, { autoRedirect: false });
      return Promise.reject(new Error(resp.message));
    }

    // 成功（code === 0 或 200）
    return resp;
  },
  async (error) => {
    NProgress.done();

    if (error && error.response) {
      const status = error.response.status;

      // 使用统一错误处理
      const httpError = ErrorHandler.http(status, undefined, {
        showMessage: true,
        logError: true,
        autoRedirect: status === 401, // 只有 401 自动跳转
      });

      // 401 未授权，跳转到登录页
      if (status === 401 && !Storage.getCookie(Constants.keys.token)) {
        await Router.replace({ path: RouterConfig.routeLogin });
      }

      return Promise.reject(httpError);
    }

    // 网络错误或其他错误
    const networkError = ErrorHandler.create(-1, error.message || "网络异常，请检查网络连接");

    ErrorHandler.show(networkError, {
      showMessage: true,
      logError: true,
      autoRedirect: false,
    });

    return Promise.reject(networkError);
  },
);

export default http;
