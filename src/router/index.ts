/**
 * 路由入口
 */
import { createRouter, createWebHistory, RouteRecordName, RouteRecordRaw } from "vue-router";
import { getStoreRefs, appStore } from "@/store";
import { baseRoutes, errorRoutes } from "./route";
import Storage from "@/plugins/utils/storage";
import Cookie from "@/plugins/utils/cookie";
import Constants from "@/plugins/constants";
import NProgress from "@/plugins/loading/progress";
import RouterConfig from "@/config/routerConfig";
import RouteData from "@/config/routerData";
import { IMenuState } from "@/interface/router";
import AxiosCancel from "@/plugins/axios/cancel";
import api from "@/api";

// 配置文件修改是否从后端获取路由
// 动态路由需要后端按照数据格式返回，静态数据直接填充即可
const isRequestRoutes = RouterConfig.isRequestRoutes;

// 动态路由刷新404，所以先行去掉匹配不存在路由重定向至404页
if (isRequestRoutes) baseRoutes[0].children = [];
// 纯静态配置，下面代码注释掉或删掉即可
baseRoutes[0].children = [];

// 默认获取菜单及路由为静态数据
let requestData: any = [];

// createWebHashHistory() hash路由#
export const router = createRouter({
	history: createWebHistory(),
	routes: baseRoutes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 路由加载前
router.beforeEach(async (to, from, next) => {
	NProgress.start();
	Storage.setLocalStorage(Constants.storageKey.routerPrev, from.path);
	Storage.setLocalStorage(Constants.storageKey.routerNext, to.path);
	// 取消所有请求
	AxiosCancel.removeAllCancer();
	const token = Storage.getSessionStorage(Constants.storageKey.token) || Cookie.getCookie(Constants.cookieKey.token);
	if (RouterConfig.whiteList.includes(to.path) && !token) {
		next();
	} else {
		if (!token || token === "undefined") {
			Storage.removeSessionStorage(Constants.storageKey.token);
			Cookie.removeCookie(Constants.cookieKey.token);
			next(`${RouterConfig.routeLogin}?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
		} else if (token && (RouterConfig.whiteList.includes(to.path) || to.path === RouterConfig.routeRoot)) {
			next(RouterConfig.routeHome);
		} else {
			const { routerList } = getStoreRefs(appStore.useRouterList);
			if (routerList.value.length === 0) {
				if (isRequestRoutes) {
					// 从后端接口中重新获取数据，如果数据格式变化，直接写一个公共方法去转义即可
					const { data } = await api.systemApi.getMenuList({});
					requestData = data.list || [];
				} else {
					requestData = RouteData.menus;
				}
				// 后端控制路由：路由数据初始化，防止刷新时丢失
				await getDynamicRouter();
				// 动态添加路由：防止非首页刷新时跳转回首页的问题
				// 确保 addRoute() 时动态添加的路由已经被完全加载上去
				next({ ...to, replace: true });
			} else {
				appStore.useUserInfo.setUserInfo(to.meta);
				next();
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
 * 动态路由处理思路：
 * 1、配置静态路由（无需登录即访问的，比如登录/注册/404等）
 * 2、拦截处理配置
 * 3、获取动态路由（将菜单存放状态管理中/将处理后的路由存放状态管理中，方便改变数据及时渲染）
 * 4、处理获取到的路由数据转为路由并动态添加进去
 * 5、渲染
 */

const viewsModules: any = import.meta.glob("../views/**/**.{vue,tsx}");
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...viewsModules });

// 获取动态路由数据
export async function getDynamicRouter() {
	if (!(Storage.getSessionStorage(Constants.storageKey.token) || Cookie.getCookie(Constants.cookieKey.token))) return false;

	await appStore.useRouterList.setMenuList(requestData);

	await setAddRoute(requestData);
}

// 动态添加至路由中
export async function setAddRoute(data: any[]) {
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
	await appStore.useRouterList.setRouterList(data);
}

/**
 * update router
 * @param data
 */
function getRouter(data: IMenuState[] = []) {
	if (data.length === 0) return [];
	let rootRouter: Array<RouteRecordRaw> = [
		{
			path: "/",
			name: "/",
			redirect: { path: "" },
			component: () => import("@/views/layout/Index.vue"),
			meta: { title: "message.title.home", name: "message.title.home", auth: false, isHide: false },
			children: [],
		},
	];
	let addRouters = [];
	setRouterItem(addRouters, data, "");
	rootRouter[0].children = routeToComponent(addRouters);
	rootRouter[0].children = [...rootRouter[0].children, ...errorRoutes];
	return rootRouter;
}
/**
 * update router
 */
function setRouterItem(routerList: any, data: IMenuState[] = [], parentPath: string = "") {
	if (data.length === 0) return [];
	data.forEach((item: any) => {
		let path = parentPath + "/" + item.path;
		let name = item.component.slice(item.component.lastIndexOf("/") + 1);
		let route: RouteRecordRaw = {
			path: path,
			name: name,
			component: item.component,
			meta: {
				name: item.name,
				title: item.title,
				icon: item.icon,
				auth: item.auth || false,
				isLink: item.isLink || false,
				isIframe: item.isIframe || false,
				address: item.address || "",
				isHide: item.isHide || false,
				isHideSubMenu: item.isHideSubMenu || false,
				isKeepAlive: item.isKeepAlive || false,
				isAffix: item.isAffix || false,
				isDisable: item.isDisable || false,
				isMobile: item.isMobile || false,
				roles: item.roles || [],
				permission: item.permission || [],
			},
		};
		if (item.children && item.children.length) {
			// 当访问的路由是含有子节点的路由，并且子节点非菜单，那么重定向
			// if (!o.isHideSubMenu) {
			// 	o.path = { name: o.children[0].path };
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

function componentImport(viewsModule: Record<string, Function>, component: string) {
	const keys = Object.keys(viewsModule);
	const matchKeys = keys.filter((key) => {
		const k = key.replace(/..\/views|../, "");
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
	});
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return viewsModule[matchKey];
	}
	if (matchKeys?.length > 1) {
		return false;
	}
}

// 存放tag数据
export async function setTags(data: any[]) {
	await appStore.useRouterTags.setTagsViewRoutes(data);
}

export default router;
