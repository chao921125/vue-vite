// ==================== Store 模块类型定义（局部类型）====================
// 这些类型需要手动导入：import type { ThemeConfigState, UserInfoState } from "#/types";

import { RouteMeta, TagViewItem } from "./router";

// 主题配置
export interface ThemeConfigState {
  globalI18n: string;
  globalComponentSize: "default" | "large" | "small";
  globalTitle: string;
  primary: string;
  isDark: boolean;
  isGrey: boolean;
  isInvert: boolean;
  isCollapse: boolean;
  isUniqueOpened: boolean;
  isFixedHeader: boolean;
  isFixedHeaderChange: boolean;
  isFooter: boolean;
  isBreadcrumb: boolean;
  isBreadcrumbIcon: boolean;
  isTagsView: boolean;
  isTagsViewIcon: boolean;
  isCacheTagsView: boolean;
  isSortableTagsView: boolean;
  isWatermark: boolean;
  watermarkText: string;
}

// 路由列表 Store
export interface RouterListState {
  routerList: any[];
  menuList: any[];
  isColumnsMenuHover: boolean;
  isColumnsNavHover: boolean;
}

// 路由标签 Store
export interface RouterTagsState {
  tagsViewRoutes: TagViewItem[];
}

// 用户信息 Store
export interface UserInfoState {
  token: string;
  userInfo: {
    id?: number | string;
    username?: string;
    nickname?: string;
    avatar?: string;
    email?: string;
    phone?: string;
    roles?: string[];
    permissions?: string[];
    [key: string]: any;
  };
}
