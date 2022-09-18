/**
 * 定义接口来定义对象的类型
 * `stores` 全部类型定义在这里
 */

// 用户信息
export interface UserInfoState {
	authBtnList: string[];
	avatar: string;
	roles: string[];
	time: number;
	userName: string;
	id: string;
}
export interface UserInfoStates {
	userInfo: UserInfoState;
}

// 路由缓存列表
export interface KeepAliveNamesState {
	keepAliveNames: string[];
	cachedViews: string[];
}

// 后端返回原始路由(未处理时)
export interface RequestOldRoutesState {
	requestOldRoutes: string[];
}

// TagsView 路由列表
export interface TagsViewRoutesState {
	tagsViewRoutes: string[];
	isTagsViewCurrenFull: Boolean;
}

// 路由列表
export interface MenuListState {
	menuList: string[];
}
export interface RouterListState {
	routerList: string[];
	menuList: any[];
	isColumnsMenuHover: Boolean;
	isColumnsNavHover: Boolean;
}

// 布局配置
export interface ThemeConfigState {
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isInvert: boolean;
	isCollapse: boolean;
	isUniqueOpened: boolean;
	isFixedHeader: boolean;
	isFixedHeaderChange: boolean;
	isFooter: boolean;
	isWatermark: boolean;
	watermarkText: string;
	isBreadcrumb: boolean;
	isBreadcrumbIcon: boolean;
	isTagsView: boolean;
	isTagsViewIcon: boolean;
	isCacheTagsView: boolean;
	isSortableTagsView: boolean;
	globalTitle: string;
	globalI18n: string;
	globalComponentSize: string;
}
export interface ThemeConfigStates {
	themeConfig: ThemeConfigState;
}
