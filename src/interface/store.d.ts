// 用户信息
export interface IUserInfoState {
	id: string;
	userName: string;
	avatar: string;
	time: number;
	roles: string[];
	permission: string[];
}
export interface IUserInfoStates {
	userInfo: IUserInfoState;
}

// 路由缓存列表
export interface IKeepAliveNamesState {
	keepAliveNames: string[];
	cachedViews: string[];
}
export interface IKeepAliveNamesStates {
	keepAliveName: IKeepAliveNamesState;
}

// 后端返回原始路由(未处理时)
export interface IRequestOldRoutesState {
	requestOldRoutes: string[];
}
export interface IRequestOldRoutesStates {
	requestOldRoute: IRequestOldRoutesState;
}

// TagsView 路由列表
export interface ITagsViewRoutesState {
	tagsViewRoutes: string[];
	isTagsViewCurrenFull: boolean;
}
export interface ITagsViewRoutesStates {
	tagsViewRoute: ITagsViewRoutesState;
}

// 路由列表
export interface IMenuListState {
	menuList: string[];
}
export interface IRouterListState {
	routerList: string[];
	menuList: any[];
	isColumnsMenuHover: boolean;
	isColumnsNavHover: boolean;
}

// 布局配置
export interface IThemeConfigState {
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
export interface IThemeConfigStates {
	themeConfig: IThemeConfigState;
}
