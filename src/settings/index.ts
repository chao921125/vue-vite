// 系统参数配置
export default {
	// 是否是管理端
	isAdminIframe: true,
	// 是否为动态路由方式
	isRequestRoutes: true,
	routeLogin: "/login",
	routeRoot: "/",
	routeHome: "/home",
	whiteList: ["/login", "/register", "/auth"],
	rolesSuper: ["admin", "common"],
	rolesAdmin: ["admin"],
	rolesUser: ["common"],
}
