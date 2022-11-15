/**
 * 路由 配置 可以适当进行变更，但尽量不要变动
 */
import { RouteRecordRaw } from "vue-router";

/**
 * path 必填
 * component 必填
 * name 选填 必须英文，默认不展示，直接replaceAll '/'
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口
 *      roles：         仅仅当前端控制权限时，此项必须非空
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
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
			isHide: true,
		},
	},
	{
		path: "/:pathMatch(.*)*",
		name: "redirect",
		redirect: "/404",
		meta: {
			isHide: true,
		},
	},
	{
		path: "/401",
		name: "noPower",
		component: () => import("@/views/error/401.vue"),
		meta: {
			title: "message.title.noPower",
			name: "message.title.noPower",
			isHide: true,
		},
	},
	{
		path: "/404",
		name: "notFound",
		component: () => import("@/views/error/404.vue"),
		meta: {
			title: "message.title.notFound",
			name: "message.title.notFound",
			isHide: true,
		},
	},
	{
		path: "/500",
		name: "serverError",
		component: () => import("@/views/error/500.vue"),
		meta: {
			title: "message.title.serverError",
			name: "message.title.serverError",
			isHide: true,
		},
	},
];

export const baseRoutes: Array<RouteRecordRaw> = [
	{
		path: "",
		name: "",
		component: () => import("@/views/layout/Index.vue"),
		children: [
			// 请不要往这里 `children` 中添加内容，此内容为了防止 No match found for location with path "xxx" 问题
			...errorRoutes,
		],
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/Login.vue"),
		meta: {
			title: "message.title.login",
			name: "message.title.login",
			isHide: true,
		},
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/login/Register.vue"),
		meta: {
			title: "message.title.register",
			name: "message.title.register",
			isHide: true,
		},
	},
	{
		path: "/auth",
		name: "auth",
		component: () => import("@/views/login/Auth.vue"),
		meta: {
			title: "message.title.auth",
			name: "message.title.auth",
			isHide: true,
		},
	},
];

export default baseRoutes;
