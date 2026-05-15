// ==================== API 相关类型定义（局部类型）====================
// 这些类型需要手动导入：import type { UploadFileParams, ApiResponse } from "#/types";

import { DynamicRouteData } from "./router";

// 文件上传参数
export interface UploadFileParams {
  file: File;
  [key: string]: any;
}

// 文件预览参数
export interface PreviewFileParams {
  id: string | number;
  [key: string]: any;
}

// IP 查询参数
export interface QueryIpParams {
  ip?: string;
  type?: number;
}

// IP 查询响应
export interface IpInfoResponse {
  data: {
    ip: string;
    country: string;
    countryCode?: string;
    province: string;
    city: string;
    isp?: string;
    continent_code?: string;
    region?: string;
    region_code?: string;
  };
}

// 菜单列表响应
export interface MenuListResponse {
  list: DynamicRouteData[];
  total?: number;
}

// 登录参数
export interface LoginParams {
  username: string;
  password: string;
  [key: string]: any;
}

// 注册参数
export interface RegisterParams {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

// 通用 API 响应
export interface ApiResponse<T = any> {
  code: number | string;
  message: string;
  data: T;
}
