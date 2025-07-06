/**
 * 路由入口
 */
import { createRouter, createWebHistory } from "vue-router";
import { baseRoutes, errorRoutes } from "./route";
import { getStoreRefs, appStore } from "@/store";
import NProgress from "@/plugins/loading/progress";
import Storage from "@/utils/storage";
import Cookie from "@/utils/cookie";
import AxiosCancel from "@/plugins/http/cancel";
import Constants from "@/utils/constant/constants";
import RouterConfig from "@/config/routerConfig";
import RouteData from "@/config/routerData";
import Api from "@/plugins/api";

/**
 * 配置文件修改是否从后端获取路由
 * 动态路由需要后端按照数据格式返回，静态数据直接填充即可
 * 动态路由刷新404，所以先行去掉匹配不存在路由重定向至404页
 */
baseRoutes[0].children = [];

// 默认获取菜单及路由为静态数据
let requestData: any[] = [];

// createWebHashHistory() hash路由#
export const router = createRouter({
	history: createWebHistory(),
	routes: baseRoutes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => {
		return { el: "body", left: 0, top: 0 };
	},
});

// 路由加载前
router.beforeEach(async (to, from, next) => {
	NProgress.start();
	Storage.setLocalStorage(Constants.storageKey.routerPrev, from.path);
	Storage.setLocalStorage(Constants.storageKey.routerNext, to.path);
	// 取消所有请求
	AxiosCancel.removeAllCancer();
	const token = Storage.getLocalStorage(Constants.storageKey.token) || Cookie.getCookie(Constants.cookieKey.token);
	if (RouterConfig.whiteList.includes(to.path) && !token) {
		next();
	} else {
		if (!token || token === "undefined") {
			Storage.removeLocalStorage(Constants.storageKey.token);
			Storage.removeSessionStorage(Constants.storageKey.token);
			Cookie.removeCookie(Constants.cookieKey.token);
			next(`${RouterConfig.routeLogin}?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
		} else if (token && RouterConfig.whiteList.includes(to.path)) {
			next(RouterConfig.routeHome);
		} else {
			const { routerList } = <any>getStoreRefs(appStore.useRouterList);
			if (routerList.value.length === 0) {
				if (RouterConfig.isRequestRoutes) {
					// 从后端接口中重新获取数据，如果数据格式变化，直接写一个公共方法去转义即可
					const { data } = await Api.systemApi.getMenuList({});
					requestData = data.list || [];
				} else {
					requestData = RouteData;
				}
				// 后端控制路由：路由数据初始化，防止刷新时丢失
				await getDynamicRouter();
				// 动态添加路由：防止非首页刷新时跳转回首页的问题
				// 确保 addRoute() 时动态添加的路由已经被完全加载上去
				next({ ...to, replace: true });
			} else {
				next();
			}
		}
	}
});

// 路由加载后，关闭loading
router.afterEach(() => {
	NProgress.done();
});

router.onError(() => {
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

const viewsModules = import.meta.glob("../pages/**/**.{vue,tsx}");
const dynamicViewsModules = Object.assign({}, { ...viewsModules });

// 获取动态路由数据
export async function getDynamicRouter() {
	if (!(Storage.getSessionStorage(Constants.storageKey.token) || Cookie.getCookie(Constants.cookieKey.token))) return false;

	await appStore.useRouterList.setMenuList(requestData);

	await setAddRoute(requestData);
}

// 动态添加至路由中
export async function setAddRoute(data) {
	const routerList = getRouter(data);
	routerList.forEach((route) => {
		const { name } = route;
		if (name && name !== "/") {
			router.removeRoute(name || "");
		}
		router.addRoute(route);
	});
	await setRouterList(routerList);
}

// 存储原始数据
async function setRouterList(data) {
	await appStore.useRouterList.setRouterList(data);
}

/**
 * update router
 * @param data
 */
function getRouter(data = []) {
	if (data.length === 0) return [];
	const rootRouter: any = [
		{
			path: "/",
			name: "/",
			redirect: { path: "" },
			component: () => import("@/pages/layout/Index.vue"),
			meta: {
				title: "message.title.home",
				name: "message.title.home",
				auth: false,
				isHide: false,
			},
			children: [],
		},
	];
	const addRouters = [];
	setRouterItem(addRouters, data, "");
	rootRouter[0].children = routeToComponent(addRouters);
	rootRouter[0].children = [...rootRouter[0].children, ...errorRoutes];
	return rootRouter;
}
/**
 * update router
 */
function setRouterItem(routerList, data = [], parentPath = "") {
	if (data.length === 0) return [];
	data.forEach((item: any) => {
		const path = parentPath + "/" + item.path;
		const name = item.component.slice(item.component.lastIndexOf("/") + 1);
		const route = {
			path: path,
			name: path.replace("/", "-") + "-" + name,
			component: item.component,
			meta: {
				title: item.title,
				icon: item.icon,
				auth: item.auth || false,
				sort: item.sort || 1,
				isLink: item.isLink || false,
				isIframe: item.isIframe || false,
				address: item.address || "",
				isHide: item.isHide || false,
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
			routerList.push(route);
			setRouterItem(routerList, item.children, path);
		} else {
			routerList.push(route);
		}
	});
}

function routeToComponent(routes) {
	if (!routes) return [];
	return routes.map((item) => {
		if (item.component) item.component = componentImport(dynamicViewsModules, item.component);
		if (item.children) routeToComponent(item.children);
		return item;
	});
}

function componentImport(viewsModule, component) {
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
export async function setTags(data) {
	await appStore.useRouterTags.setTagsViewRoutes(data);
}

export default router;
