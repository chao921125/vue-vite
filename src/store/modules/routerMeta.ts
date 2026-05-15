import { defineStore } from "pinia";
import type { RouterListState } from "#/types";

/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setColumnsMenuHover 设置分栏布局菜单鼠标移入 boolean
 * @methods setColumnsNavHover 设置分栏布局最左侧导航鼠标移入 boolean
 */
export const useRouterList = defineStore("routerList", {
  state: (): RouterListState => ({
    routerList: [],
    menuList: [],
    isColumnsMenuHover: false,
    isColumnsNavHover: false,
  }),
  actions: {
    async setRouterList(data: any[]) {
      // this.routerList = data;
      Object.assign(this.routerList, data);
    },
    async setMenuList(data: any[]) {
      // this.menuList = data;
      Object.assign(this.menuList, data);
    },
    async setColumnsMenuHover(bool: boolean) {
      this.isColumnsMenuHover = bool;
    },
    async setColumnsNavHover(bool: boolean) {
      this.isColumnsNavHover = bool;
    },
  },
});
