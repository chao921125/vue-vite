/**
 * 动态读取
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
	if (!(Utils.Storages.getSessionStorage("token") || Utils.Cookies.getCookie("token"))) return false;
	await useUserInfo(pinia).setUserInfos();
	await setAddRoute();
}

export async function setAddRoute() {
	await Config.getRouter(requestData.menus).forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
}
