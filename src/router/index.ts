/**
 * 路由入口
 */
import { createRouter, createWebHashHistory, RouteRecordName, RouteRecordRaw } from "vue-router";
import { storeToRefs } from "pinia";
import Pinia from "@/store";
import { useRouterList } from "@/store/modules/routerMeta";
import { useTagsViewRoutes } from "@/store/modules/routerTags";
import { baseRoutes, errorRoutes } from "./route";
import Utils from "@/plugins/utils";
import NProgress from "@/plugins/loading/progress";
import RouterConfig from "@/config/routerConfig";
import { useUserInfo } from "@/store/modules/user";
import requestData from "@/config/routerData";
import { MenuState } from "@/router/interface";
import AxiosCancel from "@/plugins/axios/cancel";

// 配置文件修改是否从后端获取路由
// 动态路由需要后端按照数据格式返回，静态数据直接填充即可
const isRequestRoutes = RouterConfig.isRequestRoutes;

// 动态路由刷新404，所以先行去掉匹配不存在路由重定向至404页
if (isRequestRoutes) baseRoutes[0].children = [];

export const router = createRouter({
	history: createWebHashHistory(),
	routes: baseRoutes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

if (!isRequestRoutes) await getStaticRouter();

// 路由加载前
router.beforeEach(async (to, from, next) => {
	console.log("router from", from.path, to.path);
	NProgress.configure({ showSpinner: false });
	AxiosCancel.removeAllCancer();
	if (to.meta.title) NProgress.start();
	const token = Utils.Storages.getSessionStorage(Utils.Constants.storageKey.token) || Utils.Cookies.getCookie(Utils.Constants.cookieKey.token);
	if (RouterConfig.whiteList.includes(to.path) && !token) {
		next();
		NProgress.done();
	} else {
		if (!token || token === "undefined") {
			next(`${RouterConfig.routeLogin}?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
			Utils.Storages.removeSessionStorage(Utils.Constants.storageKey.token);
			Utils.Cookies.removeCookie(Utils.Constants.cookieKey.token);
			NProgress.done();
		} else if (token && (RouterConfig.whiteList.includes(to.path) || to.path === RouterConfig.routeRoot)) {
			next(RouterConfig.routeHome);
			NProgress.done();
		} else {
			const storesRouterList = useRouterList(Pinia);
			const { routerList } = storeToRefs(storesRouterList);
			if (routerList.value.length === 0) {
				if (isRequestRoutes) {
					// 后端控制路由：路由数据初始化，防止刷新时丢失
					await getDynamicRouter();
					// 动态添加路由：防止非首页刷新时跳转回首页的问题
					// 确保 addRoute() 时动态添加的路由已经被完全加载上去
					next({ ...to, replace: true });
					NProgress.done();
				}
			} else {
				next();
				NProgress.done();
			}
		}
	}
});

// 路由加载后，关闭loading
router.afterEach(() => {
	NProgress.done();
});

/**
 * 处理路由数据
 * 这里不再单独抽出来一个文件了
 * 总感觉有些人专门搞事情
 */

const viewsModules: any = import.meta.glob("../views/**/**.{vue,tsx}");
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...viewsModules });

// 获取动态路由数据
export async function getDynamicRouter() {
	if (!(Utils.Storages.getSessionStorage(Utils.Constants.storageKey.token) || Utils.Cookies.getCookie(Utils.Constants.cookieKey.token))) return false;
	await useUserInfo(Pinia).setUserInfo();

	let storesRouterList = useRouterList(Pinia);
	await storesRouterList.setMenuList(requestData.menus);

	await setAddRoute(requestData.menus);
}

// 获取静态路由数据
export async function getStaticRouter() {
	if (!(Utils.Storages.getSessionStorage(Utils.Constants.storageKey.token) || Utils.Cookies.getCookie(Utils.Constants.cookieKey.token))) return false;
	await useUserInfo(Pinia).setUserInfo();
	await setAddRoute(requestData.menus);
}

// 动态添加至路由中
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
async function setRouterList(data: any[]) {
	let storesRouterList = useRouterList(Pinia);
	await storesRouterList.setRouterList(data);
}

function getRouter(data: MenuState[] = []) {
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
	const storesTagsView = useTagsViewRoutes(Pinia);
	await storesTagsView.setTagsViewRoutes(data);
}

export default router;
