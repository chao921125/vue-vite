/**
 * 路由 配置 可以适当进行变更，但尽量不要变动
 */

/**
 * update router
 * 将菜单数据转化为路由格式，除path、component、name三个属性外，其余均放到meta中去
 * path                 必填 请求路径
 * component            必填 组件路径
 * name                 选填 必须英文，默认不展示，直接replaceAll '/'
 * meta: {
 *      ...***:        其余属性
 * }
 */

// 注意：RouterConfig 不再在此文件中使用，重定向逻辑已移至路由守卫

/**
 * 定义404、401、登录、注册等白名单界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const errorRoutes = [
  {
    path: "/:path(.*)*",
    name: "redirect",
    redirect: "/404",
    meta: {
      auth: false,
      isHide: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "redirect",
    redirect: "/404",
    meta: {
      auth: false,
      isHide: true,
    },
  },
  {
    path: "/401",
    name: "noPower",
    component: () => import("@/pages/common/NoPower.vue"),
    meta: {
      title: "message.title.noPower",
      name: "message.title.noPower",
      auth: false,
      isHide: true,
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("@/pages/common/NotFound.vue"),
    meta: {
      title: "message.title.notFound",
      name: "message.title.notFound",
      auth: false,
      isHide: true,
    },
  },
  {
    path: "/500",
    name: "serverError",
    component: () => import("@/pages/common/ServerError.vue"),
    meta: {
      title: "message.title.serverError",
      name: "message.title.serverError",
      auth: false,
      isHide: true,
    },
  },
];

export const baseRoutes = [
  {
    // 明确使用根路径 '/'，便于在浏览器直接访问根地址时进行重定向
    path: "/",
    name: "/",
    // 注意：移除了 redirect 配置，因为 /home 是动态路由
    // 重定向逻辑由 src/router/index.ts 的路由守卫在动态路由加载后处理
    component: () => import("@/pages/layout/Index.vue"),
    meta: {
      title: "message.title.home",
      name: "message.title.home",
      auth: false,
      isHide: false,
    },
    children: [], // 动态路由将添加到这里
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/auth/Login.vue"),
    meta: {
      title: "message.title.login",
      name: "message.title.login",
      auth: false,
      isHide: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/auth/Register.vue"),
    meta: {
      title: "message.title.register",
      name: "message.title.register",
      auth: false,
      isHide: true,
    },
  },
];

export default [...errorRoutes, ...baseRoutes];
