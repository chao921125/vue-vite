// ==================== 路由相关类型定义（局部类型）====================
// 这些类型需要手动导入：import type { RouteMeta, DynamicRouteData } from "#/types";

import { RouteRecordRaw } from "vue-router";

// 路由元信息
export interface RouteMeta {
  title?: string;
  icon?: string;
  auth?: boolean;
  sort?: number;
  isLink?: boolean;
  isIframe?: boolean;
  address?: string;
  isHide?: boolean;
  isKeepAlive?: boolean;
  isAffix?: boolean;
  isDisable?: boolean;
  isMobile?: boolean;
  roles?: string[];
  permission?: string[];
}

// 路由配置项
export interface RouteConfig {
  path: string;
  name?: string;
  component?: any;
  redirect?: string;
  meta?: RouteMeta;
  children?: RouteConfig[];
}

// 动态路由数据（从后端获取）
export interface DynamicRouteData {
  path: string;
  title: string;
  icon?: string;
  component: string;
  auth?: boolean;
  sort?: number;
  isLink?: boolean;
  isIframe?: boolean;
  address?: string;
  isHide?: boolean;
  isKeepAlive?: boolean;
  isAffix?: boolean;
  isDisable?: boolean;
  isMobile?: boolean;
  roles?: string[];
  permission?: string[];
  children?: DynamicRouteData[];
}

// Store 中的路由列表项
export interface RouterListItem extends RouteRecordRaw {
  meta: RouteMeta;
}

// TagsView 标签页
export interface TagViewItem {
  path?: string;
  name: string;
  label?: string;
  meta?: RouteMeta;
  query?: Record<string, any>;
  params?: Record<string, any>;
  closable?: boolean;
}
