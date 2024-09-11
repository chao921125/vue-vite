// 用户信息
declare interface IUserInfoState {
	id: string;
	userName: string;
	avatar: string;
	time: number;
	roles: string[];
	permission: string[];
}
declare interface IUserInfoStates {
	userInfo: IUserInfoState;
}

// 路由缓存列表
declare interface IKeepAliveNamesState {
	keepAliveNames: string[];
	cachedViews: string[];
}
declare interface IKeepAliveNamesStates {
	keepAliveName: IKeepAliveNamesState;
}

// 后端返回原始路由(未处理时)
declare interface IRequestOldRoutesState {
	requestOldRoutes: string[];
}
declare interface IRequestOldRoutesStates {
	requestOldRoute: IRequestOldRoutesState;
}

// TagsView 路由列表
declare interface ITagsViewRoutesState {
	tagsViewRoutes: string[];
	isTagsViewCurrenFull: boolean;
}
declare interface ITagsViewRoutesStates {
	tagsViewRoute: ITagsViewRoutesState;
}

// 路由列表
declare interface IMenuListState {
	menuList: string[];
}
declare interface IRouterListState {
	routerList: string[];
	menuList: never[];
	isColumnsMenuHover: boolean;
	isColumnsNavHover: boolean;
}

// 布局配置
declare interface IThemeConfigState {
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
declare interface IThemeConfigStates {
	themeConfig: IThemeConfigState;
}
