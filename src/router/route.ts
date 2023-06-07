/**
 * 路由 配置 可以适当进行变更，但尽量不要变动
 */
import { RouteRecordRaw } from "vue-router";

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
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const errorRoutes: Array<RouteRecordRaw> = [
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
		component: () => import("@/views/error/NoPower.vue"),
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
		component: () => import("@/views/error/NotFound.vue"),
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
		component: () => import("@/views/error/ServerError.vue"),
		meta: {
			title: "message.title.serverError",
			name: "message.title.serverError",
			auth: false,
			isHide: true,
		},
	},
];

export const baseRoutes: Array<RouteRecordRaw> = [
	{
		path: "",
		name: "",
		component: () => import("@/views/layout/Index.vue"),
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
		component: () => import("@/views/user/Login.vue"),
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
		component: () => import("@/views/user/Register.vue"),
		meta: {
			title: "message.title.register",
			name: "message.title.register",
			auth: false,
			isHide: true,
		},
	},
	{
		path: "/auth",
		name: "auth",
		component: () => import("@/views/user/Auth.vue"),
		meta: {
			title: "message.title.auth",
			name: "message.title.auth",
			auth: false,
			isHide: true,
		},
	},
	{
		path: "/equipment",
		name: "equipment",
		component: () => import("@/views/error/Equipment.vue"),
		meta: {
			title: "message.title.serverError",
			name: "message.title.serverError",
			auth: false,
			isHide: true,
		},
	},
];

export default [...errorRoutes, ...baseRoutes];
