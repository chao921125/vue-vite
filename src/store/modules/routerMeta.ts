import { defineStore } from "pinia";
import type { RouterListState } from "#/types";

/**
 * 路由列表 Store
 * @methods setRouterList 设置路由数据
 * @methods setMenuList 设置菜单数据
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
    /**
     * 设置路由列表
     * @param data - 路由数据数组
     */
    setRouterList(data: any[]) {
      this.routerList = data;
    },
    /**
     * 设置菜单列表
     * @param data - 菜单数据数组
     */
    setMenuList(data: any[]) {
      this.menuList = data;
    },
    /**
     * 设置菜单 Hover 状态
     * @param bool - 是否 Hover
     */
    setColumnsMenuHover(bool: boolean) {
      this.isColumnsMenuHover = bool;
    },
    /**
     * 设置导航 Hover 状态
     * @param bool - 是否 Hover
     */
    setColumnsNavHover(bool: boolean) {
      this.isColumnsNavHover = bool;
    },
  },
});
