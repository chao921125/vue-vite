/**
 * HTTP 错误码映射和错误处理工具
 *
 * 统一管理所有 HTTP 错误码和业务错误码的映射关系
 * 提供统一的错误提示和错误处理逻辑
 */

import { ElMessage } from "element-plus";
import Router from "@/router";
import RouterConfig from "@/config/routerConfig";
import Storage from "@/utils/storage";
import Log from "@/utils/log";

/**
 * HTTP 状态码映射
 */
export const HTTP_STATUS_MAP: Record<number, string> = {
  // 1xx 信息
  100: "继续请求",
  101: "切换协议",

  // 2xx 成功
  200: "请求成功",
  201: "已创建",
  202: "已接受",
  204: "无内容",

  // 3xx 重定向
  300: "多种选择",
  301: "永久移动",
  302: "临时移动",
  304: "未修改",
  307: "临时重定向",

  // 4xx 客户端错误
  400: "请求错误",
  401: "未授权，请登录",
  402: "需要付款",
  403: "拒绝访问",
  404: "请求地址不存在",
  405: "方法不允许",
  406: "不接受",
  407: "需要代理授权",
  408: "请求超时",
  409: "冲突",
  410: "已删除",
  413: "请求实体过大",
  414: "URI 过长",
  415: "不支持的媒体类型",
  422: "无法处理的实体",
  429: "请求过多",

  // 5xx 服务器错误
  500: "服务器内部错误",
  501: "服务未实现",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
  505: "HTTP 版本不受支持",
};

/**
 * 业务错误码映射
 * 根据实际后端接口约定进行修改
 */
export const BIZ_CODE_MAP: Record<number, string> = {
  // 成功
  0: "操作成功",
  200: "操作成功",

  // 客户端错误（4xx）
  400: "请求参数错误",
  401: "未授权，请重新登录",
  403: "没有权限访问",
  404: "资源不存在",
  405: "请求方法不允许",
  408: "请求超时",
  422: "数据验证失败",

  // 服务器错误（5xx）
  500: "服务器内部错误",
  502: "服务暂时不可用",
  503: "服务维护中",
  504: "服务响应超时",

  // 业务错误（可根据实际项目扩展）
  1000: "未知错误",
  1001: "数据不存在",
  1002: "数据已存在",
  1003: "操作失败",
  1004: "操作过于频繁",
  1005: "账号已被锁定",
  1006: "验证码错误",
  1007: "验证码已过期",
  1008: "账号或密码错误",
  1009: "账号已被禁用",
  1010: "登录已过期",
};

/**
 * 错误类型
 */
export interface HttpError {
  /** 错误码 */
  code: number;
  /** 错误消息 */
  message: string;
  /** HTTP 状态码 */
  status?: number;
  /** 错误详情 */
  details?: any;
  /** 是否需要跳转 */
  needRedirect?: boolean;
  /** 跳转路径 */
  redirectPath?: string;
}

/**
 * 错误处理配置
 */
export interface ErrorHandleConfig {
  /** 是否显示错误提示 */
  showMessage?: boolean;
  /** 是否记录日志 */
  logError?: boolean;
  /** 是否自动跳转 */
  autoRedirect?: boolean;
  /** 自定义错误处理函数 */
  customHandler?: (error: HttpError) => void;
}

/**
 * 默认错误处理配置
 */
const DEFAULT_ERROR_CONFIG: ErrorHandleConfig = {
  showMessage: true,
  logError: true,
  autoRedirect: true,
  customHandler: undefined,
};

/**
 * 根据 HTTP 状态码获取错误消息
 * @param status HTTP 状态码
 * @returns 错误消息
 */
export function getHttpErrorMessage(status: number): string {
  return HTTP_STATUS_MAP[status] || `未知错误 (${status})`;
}

/**
 * 根据业务错误码获取错误消息
 * @param code 业务错误码
 * @returns 错误消息
 */
export function getBizErrorMessage(code: number): string {
  return BIZ_CODE_MAP[code] || `未知错误 (${code})`;
}

/**
 * 判断是否为 HTTP 错误
 * @param status HTTP 状态码
 * @returns 是否为错误状态
 */
export function isHttpError(status: number): boolean {
  return status >= 400;
}

/**
 * 判断是否为业务错误
 * @param code 业务错误码
 * @returns 是否为错误状态
 */
export function isBizError(code: number): boolean {
  // 0 和 200 表示成功，其他为错误
  return code !== 0 && code !== 200;
}

/**
 * 创建 HTTP 错误对象
 * @param status HTTP 状态码
 * @param message 自定义消息（可选）
 * @returns 错误对象
 */
export function createHttpError(status: number, message?: string): HttpError {
  const error: HttpError = {
    code: status,
    message: message || getHttpErrorMessage(status),
    status,
  };

  // 根据状态码决定是否需要跳转
  if (status === 401) {
    error.needRedirect = true;
    error.redirectPath = RouterConfig.routeLogin;
  } else if (status === 403) {
    error.needRedirect = true;
    error.redirectPath = RouterConfig.route403;
  } else if (status === 404) {
    error.needRedirect = true;
    error.redirectPath = RouterConfig.route404;
  } else if (status >= 500) {
    error.needRedirect = true;
    error.redirectPath = RouterConfig.route500;
  }

  return error;
}

/**
 * 创建业务错误对象
 * @param code 业务错误码
 * @param message 自定义消息（可选）
 * @returns 错误对象
 */
export function createBizError(code: number, message?: string): HttpError {
  return {
    code,
    message: message || getBizErrorMessage(code),
  };
}

/**
 * 显示错误消息
 * @param error 错误对象
 * @param config 错误处理配置
 */
export function showError(error: HttpError, config?: Partial<ErrorHandleConfig>): void {
  const finalConfig = { ...DEFAULT_ERROR_CONFIG, ...config };

  // 记录日志
  if (finalConfig.logError) {
    if (import.meta.env.VITE_NODE_ENV === "development") {
      Log.danger(">>>>>> HTTP Error >>>>>>");
      Log.danger(JSON.stringify(error, null, 2));
    }
  }

  // 显示提示
  if (finalConfig.showMessage) {
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
  }

  // 自动跳转
  if (finalConfig.autoRedirect && error.needRedirect && error.redirectPath) {
    // 401 需要清除登录信息
    if (error.code === 401) {
      Storage.clearCookie();
      Storage.clearSessionStorage();
    }
    Router.replace({ path: error.redirectPath });
  }

  // 自定义处理
  if (finalConfig.customHandler) {
    finalConfig.customHandler(error);
  }
}

/**
 * 处理 HTTP 响应错误
 * @param status HTTP 状态码
 * @param message 自定义消息
 * @param config 错误处理配置
 * @returns 错误对象
 */
export function handleHttpError(
  status: number,
  message?: string,
  config?: Partial<ErrorHandleConfig>,
): HttpError {
  const error = createHttpError(status, message);
  showError(error, config);
  return error;
}

/**
 * 处理业务响应错误
 * @param code 业务错误码
 * @param message 自定义消息
 * @param config 错误处理配置
 * @returns 错误对象
 */
export function handleBizError(
  code: number,
  message?: string,
  config?: Partial<ErrorHandleConfig>,
): HttpError {
  const error = createBizError(code, message);
  showError(error, config);
  return error;
}

/**
 * 错误处理工具类
 */
export class ErrorHandler {
  /**
   * 处理 HTTP 错误
   */
  static http(status: number, message?: string, config?: Partial<ErrorHandleConfig>): HttpError {
    return handleHttpError(status, message, config);
  }

  /**
   * 处理业务错误
   */
  static biz(code: number, message?: string, config?: Partial<ErrorHandleConfig>): HttpError {
    return handleBizError(code, message, config);
  }

  /**
   * 显示错误
   */
  static show(error: HttpError, config?: Partial<ErrorHandleConfig>): void {
    showError(error, config);
  }

  /**
   * 创建错误对象
   */
  static create(code: number, message: string, status?: number): HttpError {
    return {
      code,
      message,
      status,
    };
  }
}

export default ErrorHandler;
