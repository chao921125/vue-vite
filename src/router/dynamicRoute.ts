/**
 * 动态读取
 */
import { RouteRecordName, RouteRecordRaw } from "vue-router";
import Config from "./config";
import router from "./index";
import requestData from "@/router/dataRouter";
import Utils from "@/plugins/utils";
import { useUserInfo } from "@/store/modules/user";
import pinia from "@/store";
import { useRoutesList } from "@/store/modules/routerMeta";
import { useTagsViewRoutes } from "@/store/modules/routerTags";

export async function getDynamicRouter() {
	if (
		!(
			Utils.Storages.getSessionStorage(Utils.Constants.storageKeys.token) ||
			Utils.Cookies.getCookie(Utils.Constants.cookieKeys.token)
		)
	)
		return false;
	await useUserInfo(pinia).setUserInfo();
	await setAddRoute(requestData.menus);
}

export async function setAddRoute(data: any[]) {
	// add filter roles
	// const menus = filterMenus(requestData.menus);
	// const routerList = Config.getRouter(menus);
	const routerList = Config.getRouter(data);
	await routerList.forEach((route: RouteRecordRaw) => {
		const { name } = route;
		router.removeRoute(<RouteRecordName>name);
		router.addRoute(route);
	});
	await setRouterList(routerList);
}

// 存储原始数据
export async function setRouterList(data: any[]) {
	let storesRoutesList = useRoutesList(pinia);
	await storesRoutesList.setRoutesList(data);
}

export async function setTags(data: any[]) {
	const storesTagsView = useTagsViewRoutes(pinia);
	await storesTagsView.setTagsViewRoutes(data);
}
