export default {
	// 是否是管理端
	isAdminIframe: true,
	// 是否为动态路由方式，已经实现mock请求路由，大家改为true即可
	isRequestRoutes: false,
	// 常用路由：PC端，如果是动态路由，请和配置的路由名称保持一致！！！
	routeLogin: "/login",
	routeRoot: "/",
	routeHome: "/home",
	routeNoData: "/no-data",
	route403: "/403",
	route404: "/404",
	route500: "/500",
	routeEquipment: "/equipment",
	// 常用路由：移动端
	routeMobile: "m-",
	routeMHome: "/m-home",
	// 白名单，无需要token即可访问的
	whiteList: ["/login", "/register", "/auth"],
	// 排除路由，即无需通过业务处理的路由，遇到即直接访问即可
	executeList: ["/login", "/register", "/auth", "/equipment", "/no-data", "/home", "/m-home", "/", "/401", "/404", "/500"],
	routeEnum: {
		product: {},
		order: {
			proInputList: "/order/input",
			proInputAddEdit: "/order/input/add-edit",
		},
	},
};
