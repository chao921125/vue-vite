export default {
	// 是否是管理端
	isAdminIframe: true,
	// 是否为动态路由方式
	isRequestRoutes: true,
	// 常用路由罗列，如果是动态路由，请和配置的路由名称保持一致！！！
	routeLogin: "/login",
	routeRoot: "/",
	routeHome: "/home",
	routeNoData: "/no-data",
	route403: "/403",
	route404: "/404",
	route500: "/500",
	routeEquipment: "/equipment",
	whiteList: ["/login", "/register", "/auth"],
	executeList: ["/login", "/register", "/auth", "/equipment", "/no-data", "/home", "/m-home", "/", "/401", "/404", "/500"],
	routeEnum: {
		product: {},
		order: {
			proInputList: "/order/input",
			proInputAddEdit: "/order/input/add-edit",
		},
	},
	routeMobile: "m-",
	routeMHome: "/m-home",
};
