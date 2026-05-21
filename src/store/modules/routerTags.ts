import { defineStore } from "pinia";
import Storage from "@/utils/storage";
import type { TagViewItem } from "#/types";

/**
 * TagsView 路由列表 Store
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
export const useRouterTags = defineStore("tagsViewRoutes", {
  state: () => ({
    tagsViewRoutes: [] as TagViewItem[],
    isTagsViewCurrenFull: false,
  }),
  actions: {
    /**
     * 设置 TagsView 路由列表
     * @param data - 路由数据数组
     */
    setTagsViewRoutes(data: TagViewItem[]) {
      this.tagsViewRoutes = data;
    },
    /**
     * 设置全屏状态
     * @param bool - 是否全屏
     */
    setCurrenFullscreen(bool: boolean) {
      Storage.setSessionStorage("isTagsViewCurrenFull", String(bool));
      Storage.setCookie("isTagsViewCurrenFull", String(bool));
      this.isTagsViewCurrenFull = bool;
    },
  },
});
