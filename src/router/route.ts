/**
 * 路由 配置 可以适当进行变更，但尽量不要变动
 */

/**
 * update router
 * 将菜单数据转化为路由格式，除path、component、name三个属性外，其余均放到meta中去
 * path                 必填 请求路径
 * component            必填 组件路径
 * name                 选填 必须英文，默认不展示，直接replaceAll '/'
 * meta: {
 *      ...***:        其余属性
 * }
 */

/**
 * 定义404、401、登录、注册等白名单界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const errorRoutes = [
	{
		path: "/:path(.*)*",
		name: "redirect",
		redirect: "/404",
		meta: {
			auth: false,
			isHide: true,
		},
	},
	{
		path: "/:pathMatch(.*)*",
		name: "redirect",
		redirect: "/404",
		meta: {
			auth: false,
			isHide: true,
		},
	},
	{
		path: "/401",
		name: "noPower",
		component: () => import("@/pages/common/NoPower.vue"),
		meta: {
			title: "message.title.noPower",
			name: "message.title.noPower",
			auth: false,
			isHide: true,
		},
	},
	{
		path: "/404",
		name: "notFound",
		component: () => import("@/pages/common/NotFound.vue"),
		meta: {
			title: "message.title.notFound",
			name: "message.title.notFound",
			auth: false,
			isHide: true,
		},
	},
	{
		path: "/500",
		name: "serverError",
		component: () => import("@/pages/common/ServerError.vue"),
		meta: {
			title: "message.title.serverError",
			name: "message.title.serverError",
			auth: false,
			isHide: true,
		},
	},
];

export const baseRoutes = [
	{
		path: "",
		name: "",
		component: () => import("@/pages/layout/Index.vue"),
		meta: {
			auth: false,
			isHide: false,
		},
		children: [
			// 请不要往这里 `children` 中添加内容，此内容为了防止 No match found for location with path "xxx" 问题
			...errorRoutes,
		],
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/pages/auth/Login.vue"),
		meta: {
			title: "message.title.login",
			name: "message.title.login",
			auth: false,
			isHide: true,
		},
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/pages/auth/Register.vue"),
		meta: {
			title: "message.title.register",
			name: "message.title.register",
			auth: false,
			isHide: true,
		},
	},
];

export default [...errorRoutes, ...baseRoutes];
