/**
 * 静态数据
 * TODO 后续再添加前端控制权限
 */
import { RouteRecordName, RouteRecordRaw } from "vue-router";
import pinia from "@/store";
import { router } from "@/router";
import Utils from "@/plugins/utils";
import { useUserInfo } from "@/store/modules/user";
import Config from "./config";
import requestData from "./dataRouter";

export async function getStaticRouter() {
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
}
