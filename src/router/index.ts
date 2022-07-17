/**
 * 路由入口
 */
import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { storeToRefs } from "pinia";
import pinia from "@/store";
import { useRoutesList } from "@/store/modules/routerMeta";
import Utils from "@/plugins/utils";
import { baseRoutes } from "./route";
import Settings from "@/settings";
import { getDynamicRouter } from "./dynamicRoute";
import { getStaticRouter } from "./staticRoute";

// 配置文件修改是否从后端获取路由
// 动态路由需要后端按照数据格式返回，静态数据直接填充即可
const isRequestRoutes = Settings.isRequestRoutes;

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
	if (to.meta.title) NProgress.start();
	const token =
		Utils.Storages.getSessionStorage(Utils.Constants.storageKeys.token) ||
		Utils.Cookies.getCookie(Utils.Constants.cookieKeys.token);
	if (Settings.whiteList.includes(to.path) && !token) {
		next();
		NProgress.done();
	} else {
		if (!token || token === "undefined") {
			next(`${Settings.routeLogin}?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
			Utils.Storages.removeSessionStorage(Utils.Constants.storageKeys.token);
			Utils.Cookies.removeCookie(Utils.Constants.cookieKeys.token);
			NProgress.done();
		} else if (token && (Settings.whiteList.includes(to.path) || to.path === Settings.routeRoot)) {
			next(Settings.routeHome);
			NProgress.done();
		} else {
			const storesRoutesList = useRoutesList(pinia);
			const { routesList } = storeToRefs(storesRoutesList);
			if (routesList.value.length === 0) {
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

export default router;
