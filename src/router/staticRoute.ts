/**
 * 静态数据
 * TODO 后续再添加前端控制权限
 */
import { RouteRecordRaw } from "vue-router";
import pinia from "@/store";
import { router } from "@/router";
import Utils from "@/plugins/utils";
import { useUserInfo } from "@/store/modules/user";
import Config from "./config";
import requestData from "./dataRouter";

export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "/",
		redirect: "/home",
		component: () => import("@/views/layout/Index.vue"),
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
					roles: ["admin"],
					icon: "iconfont icon-shouye",
				},
			},
		],
	},
];

export async function getStaticRouter() {
	if (!(Utils.Storages.getSessionStorage(Utils.Constants.storageKeys.token) || Utils.Cookies.getCookie(Utils.Constants.cookieKeys.token))) return false;
	await useUserInfo(pinia).setUserInfo();
	await setAddRoute();
}

export async function setAddRoute() {
	// add filter roles
	// const menus = filterMenus(requestData.menus);
	// const routerList = Config.getRouter(menus);
	const routerList = Config.getRouter(requestData.menus);
	await routerList.forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
}
