export default {
	// 是否是管理端
	isAdminIframe: true,
	// 是否为动态路由方式
	isRequestRoutes: true,
	routeLogin: "/login",
	routeRoot: "/",
	routeHome: "/home",
	routeNoData: "/no-data",
	route403: "/403",
	route404: "/404",
	route500: "/500",
	whiteList: ["/login", "/register", "/auth"],
	executeList: ["/login", "/register", "/auth", "/home", "/", "/401", "/404", "/500"],
	rolesSuper: ["admin", "common"],
	rolesAdmin: ["admin"],
	rolesUser: ["common"],
};
