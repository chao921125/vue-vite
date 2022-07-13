/**
 * 路由入口
 */
import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "@/store";
import { storeToRefs } from "pinia";
import Utils from "@/plugins/utils";
import { staticRoutes } from "./route";

const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
});

// 路由加载前
router.beforeEach(async (to, from, next) => {
	console.log("router", from, to, next);
	NProgress.configure({ showSpinner: false });
	if (to.meta.title) NProgress.start();
	const token = Utils.getSessionStorage("token");
	if (to.path === "/login" && !token) {
		next();
		NProgress.done();
	} else {
		if (!token) {
			next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
			Utils.clearSessionStorage();
			NProgress.done();
		} else if (token && to.path === "/login") {
			next("/home");
			NProgress.done();
		} else {
			const storesRoutesList = useRoutesList(pinia);
			const { routesList } = storeToRefs(storesRoutesList);
			if (routesList.value.length === 0) {
				if (isRequestRoutes) {
					// 后端控制路由：路由数据初始化，防止刷新时丢失
					await initBackEndControlRoutes();
					// 动态添加路由：防止非首页刷新时跳转回首页的问题
					// 确保 addRoute() 时动态添加的路由已经被完全加载上去
					next({ ...to, replace: true });
				}
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

export default router;
