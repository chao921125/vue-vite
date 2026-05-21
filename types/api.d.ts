// ==================== API 相关类型定义（局部类型）====================
// 这些类型需要手动导入：import type { UploadFileParams, ApiResponse } from "#/types";

import { DynamicRouteData } from "./router";

// ==================== 通用 API 响应 ====================

/** 通用 API 响应结构 */
export interface ApiResponse<T = any> {
  code: number | string;
  message: string;
  data: T;
  timestamp?: number;
}

/** API 请求配置 */
export interface ApiRequestConfig {
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

// ==================== 用户相关 API 类型 ====================

/** 登录请求参数 */
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
  remember?: boolean;
  [key: string]: any;
}

/** 注册请求参数 */
export interface RegisterParams {
  username: string;
  password: string;
  confirmPassword?: string;
  email?: string;
  phone?: string;
  captcha?: string;
  [key: string]: any;
}

/** 用户信息 */
export interface UserInfo {
  id: string | number;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  permissions?: string[];
  [key: string]: any;
}

/** 登录响应数据 */
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  userInfo?: UserInfo;
}

// ==================== 系统相关 API 类型 ====================

/** 菜单列表响应 */
export interface MenuListResponse {
  list: DynamicRouteData[];
  total?: number;
}

/** 菜单项 */
export interface MenuItem {
  id: string | number;
  name: string;
  path: string;
  component?: string;
  icon?: string;
  title: string;
  sort?: number;
  parent?: string | number;
  children?: MenuItem[];
  meta?: Record<string, any>;
}

// ==================== 文件相关 API 类型 ====================

/** 文件上传参数 */
export interface UploadFileParams {
  file: File;
  filename?: string;
  [key: string]: any;
}

/** 文件预览参数 */
export interface PreviewFileParams {
  id: string | number;
  type?: string;
  [key: string]: any;
}

/** 文件信息 */
export interface FileInfo {
  id: string | number;
  name: string;
  url: string;
  size?: number;
  type?: string;
  [key: string]: any;
}

// ==================== IP 相关 API 类型 ====================

/** IP 查询参数 */
export interface QueryIpParams {
  ip?: string;
  type?: number;
}

/** IP 信息 */
export interface IpInfo {
  ip: string;
  country: string;
  countryCode?: string;
  province: string;
  city: string;
  isp?: string;
  continent_code?: string;
  region?: string;
  region_code?: string;
  latitude?: number;
  longitude?: number;
}

/** IP 查询响应 */
export interface IpInfoResponse {
  data: IpInfo;
  code?: number;
  message?: string;
}

// ==================== 分页相关类型 ====================

/** 分页请求参数 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  total?: number;
  [key: string]: any;
}

/** 分页响应数据 */
export interface PaginationResponse<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ==================== 错误相关类型 ====================

/** HTTP 错误 */
export interface HttpError {
  code: number;
  message: string;
  status?: number;
}

/** 业务错误码映射 */
export type BizErrorCode =
  | 0 // 成功
  | 200 // 成功
  | 400 // 参数错误
  | 1001 // 账号不存在
  | 1002 // 密码错误
  | 1003 // 账号已存在
  | 1004 // 账号已禁用
  | 1005 // 验证码错误
  | 1006 // 验证码过期
  | 1007 // 账号已注销
  | 1008 // 账号或密码错误
  | 2001 // 权限不足
  | 2002 // Token 过期
  | 2003 // Token 无效
  | number; // 扩展
