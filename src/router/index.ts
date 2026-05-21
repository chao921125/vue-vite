// https://router.vuejs.org/zh/
import { createRouter, createWebHistory } from "vue-router";
import { baseRoutes, errorRoutes } from "./route";
import { appStore } from "@/store";
import NProgress from "@/plugins/loading/progress";
import Storage from "@/utils/storage";
import AxiosCancel from "@/plugins/http/cancel";
import Constants from "@/utils/constant/constants";
import RouterConfig from "@/config/routerConfig";
import RouteData from "@/config/routerData";
import Api from "@/api";

/**
 * 动态路由优化说明：
 * 1. 使用 Set 记录已加载的路由，避免重复添加
 * 2. 使用 router.hasRoute() 检查路由是否存在
 * 3. 减少重定向次数，优化导航流程
 * 4. 移除全局变量，使用更安全的方案
 */

// 路由加载标记，避免重复加载
let isRoutesLoaded = false;
// 已加载的路由名称集合
const loadedRouteNames = new Set<string>();

// 动态路由数据缓存
let cachedRouteData: any[] = [];

// 路由组件模块缓存
const viewsModules = import.meta.glob("../pages/**/**.{vue,tsx}");

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
router.beforeEach(async (to, from) => {
  NProgress.start();
  Storage.setLocalStorage(Constants.keys.routerPrev, from.path);
  Storage.setLocalStorage(Constants.keys.routerNext, to.path);
  // 取消所有请求
  AxiosCancel.removeAllCancel();

  const token =
    Storage.getLocalStorage(Constants.keys.token) || Storage.getCookie(Constants.keys.token);

  // 白名单路由直接放行（包括登录、注册等）
  if (RouterConfig.whiteList.includes(to.path)) {
    // 如果已登录且访问登录页，跳转到首页
    if (token && token !== "undefined") {
      return RouterConfig.routeHome;
    }
    return true;
  }

  // 无 Token 或 Token 无效，跳转登录
  if (!token || token === "undefined") {
    Storage.removeLocalStorage(Constants.keys.token);
    Storage.removeSessionStorage(Constants.keys.token);
    Storage.removeCookie(Constants.keys.token);
    return {
      path: RouterConfig.routeLogin,
      query: {
        redirect: to.path,
        params: JSON.stringify(to.query ? to.query : to.params),
      },
    };
  }

  // 已登录且非白名单路由，需要加载动态路由
  try {
    // 如果路由已加载，直接放行
    if (isRoutesLoaded) {
      return true;
    }

    // 获取路由数据
    if (RouterConfig.isRequestRoutes) {
      const { data } = await Api.systemApi.getMenuList({});
      cachedRouteData = data.list || [];
    } else {
      cachedRouteData = RouteData;
    }

    // 动态添加路由
    await addDynamicRoutes(cachedRouteData);

    // 标记路由已加载
    isRoutesLoaded = true;

    // 如果访问根路径，重定向到首页
    if (to.path === "/" || to.path === "") {
      return RouterConfig.routeHome;
    }

    // 其他路径，重试当前导航（路由已添加）
    return { ...to, replace: true };
  } catch (error) {
    console.error("路由加载出错:", error);
    return "/500";
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
 * 动态添加路由
 * @param routeData 路由数据
 */
export async function addDynamicRoutes(routeData: any[]) {
  // 存储菜单列表到 Store
  await appStore.useRouterList.setMenuList(routeData);

  // 构建路由配置
  const routes = buildRoutes(routeData);

  // 添加路由（避免重复添加）
  routes.forEach((route) => {
    if (route.name && !router.hasRoute(route.name)) {
      router.addRoute(route);
      loadedRouteNames.add(route.name as string);
    }
  });

  // 存储路由列表到 Store
  await appStore.useRouterList.setRouterList(routes);
}

/**
 * 构建路由配置
 * @param data 路由数据
 * @returns 路由配置数组
 */
function buildRoutes(data: any[]): any[] {
  if (data.length === 0) return [];

  const rootRouter = { ...baseRoutes[0], children: [] as any[] };
  const routeList: any[] = [];

  // 递归处理路由数据
  processRouteData(routeList, data, "");

  // 将路径映射为组件
  const routesWithComponent = mapRoutesToComponent(routeList);

  // 添加到根路由的 children
  rootRouter.children = [...routesWithComponent, ...errorRoutes];

  return [rootRouter];
}
/**
 * 递归处理路由数据
 * @param routeList 路由列表
 * @param data 路由数据
 * @param parentPath 父路径
 */
function processRouteData(routeList: any[], data: any[] = [], parentPath: string = "") {
  if (data.length === 0) return;

  data.forEach((item: any) => {
    // 清理路径
    const cleanPath = item.path.replace(/^\/+|\/+$/g, "");
    const path = parentPath ? `${parentPath}/${cleanPath}` : `/${cleanPath}`;

    // 生成唯一的路由名称
    const name = path.replace(/\//g, "-").substring(1) || "root";

    const route = {
      path,
      name,
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

    routeList.push(route);

    // 递归处理子路由
    if (item.children && item.children.length > 0) {
      processRouteData(routeList, item.children, path);
    }
  });
}

/**
 * 将路由路径映射为组件
 * @param routes 路由列表
 * @returns 映射后的路由列表
 */
function mapRoutesToComponent(routes: any[]) {
  if (!routes || routes.length === 0) return [];

  return routes.map((item: any) => {
    if (item.component) {
      const component = loadComponent(item.component);
      if (!component) {
        console.error(`路由组件 "${item.component}" 未找到，请检查路径是否正确`);
      }
      item.component = component;
    }
    return item;
  });
}

/**
 * 动态加载组件
 * @param componentPath 组件路径
 * @returns 组件加载函数
 */
function loadComponent(componentPath: string) {
  const keys = Object.keys(viewsModules);

  // 匹配组件路径
  const matchKeys = keys.filter((key) => {
    const k = key.replace(/^\.\.\/pages/, "");
    return (
      k === `/${componentPath}.vue` ||
      k === `/${componentPath}/index.vue` ||
      k === `/${componentPath}.tsx` ||
      k === `/${componentPath}/index.tsx`
    );
  });

  // 精确匹配
  if (matchKeys.length === 1) {
    return viewsModules[matchKeys[0]];
  }

  // 多个匹配，使用第一个并警告
  if (matchKeys.length > 1) {
    console.warn("找到多个匹配的组件:", matchKeys, "使用第一个匹配项");
    return viewsModules[matchKeys[0]];
  }

  // 未找到，返回 404 页面
  console.error("未找到匹配的组件:", componentPath);
  return errorRoutes[4].component;
}

// 存放tag数据
export async function setTags(data: any) {
  await appStore.useRouterTags.setTagsViewRoutes(data);
}

export default router;
