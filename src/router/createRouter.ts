/**
 * 动态读取
 */
import { RouteRecordName, RouteRecordRaw } from "vue-router";
import Utils from "@/plugins/utils";
import { useUserInfo } from "@/store/modules/user";
import pinia from "@/store";
import { useRouterList } from "@/store/modules/routerMeta";
import { useTagsViewRoutes } from "@/store/modules/routerTags";
import router from "./index";
import requestData from "@/config/routerData";
import { MenuState } from "@/router/interface";
import { errorRoutes } from "@/router/route";

const viewsModules: any = import.meta.glob("../views/**/**.{vue,tsx}");
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...viewsModules });

export async function getDynamicRouter() {
	if (!(Utils.Storages.getSessionStorage(Utils.Constants.storageKeys.token) || Utils.Cookies.getCookie(Utils.Constants.cookieKeys.token))) return false;
	await useUserInfo(pinia).setUserInfo();

	let storesRouterList = useRouterList(pinia);
	await storesRouterList.setMenuList(requestData.menus);

	await setAddRoute(requestData.menus);
}

export async function getStaticRouter() {
	if (!(Utils.Storages.getSessionStorage(Utils.Constants.storageKeys.token) || Utils.Cookies.getCookie(Utils.Constants.cookieKeys.token))) return false;
	await useUserInfo(pinia).setUserInfo();
	await setAddRoute(requestData.menus);
}

export async function setAddRoute(data: any[]) {
	// add filter roles
	// const menus = filterMenus(requestData.menus);
	// const routerList = Config.getRouter(menus);
	const routerList = getRouter(data);
	await routerList.forEach((route: RouteRecordRaw) => {
		const { name } = route;
		if (name !== "/") {
			router.removeRoute(<RouteRecordName>name);
		}
		router.addRoute(route);
	});
	await setRouterList(routerList);
}

// 存储原始数据
export async function setRouterList(data: any[]) {
	let storesRouterList = useRouterList(pinia);
	await storesRouterList.setRouterList(data);
}

function getRouter(data: any[]) {
	return setRouter(data);
}

function setRouter(data: MenuState[] = []) {
	if (data.length === 0) return [];
	let rootRouter: Array<RouteRecordRaw> = [
		{
			path: "/",
			name: "/",
			redirect: { path: "/" },
			component: () => import("@/views/layout/Index.vue"),
			meta: { title: "message.router.login" },
			children: [],
		},
	];
	let addRouters = [];
	setRouterItem(addRouters, data, "");
	rootRouter[0].children = routeToComponent(addRouters);
	rootRouter[0].children = [...rootRouter[0].children, ...errorRoutes];
	return rootRouter;
}

function setRouterItem(routerList: any, data: MenuState[] = [], parentPath: string = "") {
	if (data.length === 0) return [];
	data.forEach((item: any) => {
		let path = parentPath + "/" + item.path;
		let name = item.component.slice(item.component.lastIndexOf("/") + 1);
		let route: RouteRecordRaw = {
			path: path,
			name: name,
			component: item.component,
			meta: {
				title: item.title,
				name: item.name,
				icon: item.icon,
				isLink: item.isLink,
				isHide: item.isHide,
				isKeepAlive: item.isKeepAlive,
				isAffix: item.isAffix,
				isIframe: item.isIframe,
				roles: item.roles,
			},
		};
		if (item.children && item.children.length > 0) {
			// 当访问的路由是含有子节点的路由，并且子节点非菜单，那么重定向
			// if (!o.isHideSubMenu) {
			// 	o.address = { name: o.children[0].path };
			// }
			routerList.push(route);
			setRouterItem(routerList, item.children, path);
		} else {
			routerList.push(route);
		}
	});
}

function routeToComponent(routes: any[]) {
	if (!routes) return [];
	return routes.map((item: any) => {
		if (item.component) item.component = componentImport(dynamicViewsModules, item.component as string);
		item.children && routeToComponent(item.children);
		return item;
	});
}

function componentImport(dynamicViewsModules: Record<string, Function>, component: string) {
	const keys = Object.keys(dynamicViewsModules);
	const matchKeys = keys.filter((key) => {
		const k = key.replace(/..\/views|../, "");
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
	});
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return dynamicViewsModules[matchKey];
	}
	if (matchKeys?.length > 1) {
		return false;
	}
}

// 存放tag数据
export async function setTags(data: any[]) {
	const storesTagsView = useTagsViewRoutes(pinia);
	await storesTagsView.setTagsViewRoutes(data);
}
