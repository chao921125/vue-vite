/**
 * 动态读取
 */
import { RouteRecordRaw } from "vue-router";
import Config from "./config";
import router from "./index";

/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "/",
		component: () => import("@/views/layout/Index.vue"),
		redirect: "/home",
		meta: { isKeepAlive: true },
		children: [
			{
				path: "/home",
				name: "home",
				component: () => import("@/views/home/Home.vue"),
				meta: {
					title: "message.router.home",
					isLink: "",
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					roles: Config.rolesSuper,
					icon: "iconfont icon-shouye",
				},
			},
		],
	},
];

export async function setAddRoute() {
	await [].forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
}

export function getDynamicRouter() {}
