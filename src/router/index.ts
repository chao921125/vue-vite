// https://router.vuejs.org/zh/
import { createRouter, createWebHistory } from "vue-router";
import { baseRoutes, errorRoutes } from "./route";
import { getStoreRefs, appStore } from "@/store";
import NProgress from "@/plugins/loading/progress";
import Storage from "@/utils/storage";
import AxiosCancel from "@/plugins/http/cancel";
import Constants from "@/utils/constant/constants";
import RouterConfig from "@/config/routerConfig";
import RouteData from "@/config/routerData";
import Api from "@/api";

/**
 * 配置文件修改是否从后端获取路由
 * 动态路由需要后端按照数据格式返回，静态数据直接填充即可
 * 动态路由刷新404时会导致首次直接访问子路由报错。
 * 这里在创建路由时先清空 `baseRoutes[0].children`，避免 catch-all（errorRoutes）在动态路由注册之前优先匹配导致重定向到 404。
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
  Storage.setLocalStorage(Constants.keys.routerPrev, from.path);
  Storage.setLocalStorage(Constants.keys.routerNext, to.path);
  // 取消所有请求
  AxiosCancel.removeAllCancel();
  const token =
    Storage.getLocalStorage(Constants.keys.token) || Storage.getCookie(Constants.keys.token);
  if (RouterConfig.whiteList.includes(to.path) && !token) {
    next();
  } else {
    if (!token || token === "undefined") {
      Storage.removeLocalStorage(Constants.keys.token);
      Storage.removeSessionStorage(Constants.keys.token);
      Storage.removeCookie(Constants.keys.token);
      next(
        `${RouterConfig.routeLogin}?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`,
      );
    } else if (token && RouterConfig.whiteList.includes(to.path)) {
      next(RouterConfig.routeHome);
    } else {
      try {
        const { routerList } = getStoreRefs(appStore.useRouterList);
        if (routerList.value.length === 0) {
          if (RouterConfig.isRequestRoutes) {
            // 从后端接口中重新获取数据，如果数据格式变化，直接写一个公共方法去转义即可
            const { data } = await Api.systemApi.getMenuList({});
            requestData = data.list || [];
          } else {
            requestData = RouteData;
          }
          // 后端/本地控制路由：路由数据初始化，防止刷新时丢失
          await getDynamicRouter();
          // 如果首次访问为根路径，重定向到配置的首页，避免在重定向前发生无匹配警告
          if (to.path === "/" || to.path === "") {
            next(RouterConfig.routeHome);
          } else {
            // 确保 addRoute() 时动态添加的路由已经被完全加载上去，再重试原始导航
            next({ ...to, replace: true });
          }
        } else {
          next();
        }
      } catch (error) {
        console.error("路由加载出错:", error);
        // 出错时跳转到错误页面
        next("/500");
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
  const rootRouter: any = [baseRoutes[0]];
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
    // 确保路径格式正确
    const cleanPath = item.path.replace(/^\/+|\/+$/g, ""); // 移除开头和结尾的斜杠
    const path = parentPath ? `${parentPath}/${cleanPath}` : `/${cleanPath}`;

    // 生成唯一的路由名称
    const name = path.replace(/\//g, "-").substring(1) || "root";
    const route = {
      path: path,
      name: name,
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
    if (item.component) {
      const component = componentImport(dynamicViewsModules, item.component);
      if (component === false) {
        console.error(`路由组件 "${item.component}" 匹配到多个组件，请检查路径唯一性`);
      } else if (component === undefined) {
        console.error(`路由组件 "${item.component}" 未找到，请检查路径是否正确`);
      }
      item.component = component;
    }
    if (item.children) routeToComponent(item.children);
    return item;
  });
}

function componentImport(viewsModule, component) {
  const keys = Object.keys(viewsModule);
  const matchKeys = keys.filter((key) => {
    const k = key.replace(/^\.\.\/pages/, "");
    return (
      k === `/${component}.vue` ||
      k === `/${component}/index.vue` ||
      k === `/${component}.tsx` ||
      k === `/${component}/index.tsx`
    );
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return viewsModule[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn("找到多个匹配的组件:", matchKeys, "使用第一个匹配项");
    return viewsModule[matchKeys[0]];
  }

  // 未找到匹配组件时，返回默认页面或错误提示页面
  console.error("未找到匹配的组件:", component);
  return errorRoutes[4].component; // 返回404页面
}

// 存放tag数据
export async function setTags(data) {
  await appStore.useRouterTags.setTagsViewRoutes(data);
}

export default router;
