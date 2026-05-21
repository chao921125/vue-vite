import { defineStore } from "pinia";
import type { TagViewItem } from "#/types";
import { createPersistedState, createPersistedActions } from "@/plugins/golbal/storePersist";

/**
 * TagsView 路由列表 Store
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
export const useRouterTags = defineStore("tagsViewRoutes", () => {
  // 使用持久化抽象层
  const persistConfig = {
    key: "tagsViewRoutes",
    storage: "session" as const,
    paths: ["isTagsViewCurrenFull"],
  };

  const initialState = {
    tagsViewRoutes: [] as TagViewItem[],
    isTagsViewCurrenFull: false,
  };

  const state = createPersistedState(initialState, persistConfig);
  const { save, clear } = createPersistedActions(persistConfig);

  // 响应式状态
  const tagsViewRoutes = ref(state.tagsViewRoutes);
  const isTagsViewCurrenFull = ref(state.isTagsViewCurrenFull);

  /**
   * 设置 TagsView 路由列表
   * @param data - 路由数据数组
   */
  function setTagsViewRoutes(data: TagViewItem[]) {
    tagsViewRoutes.value = data;
  }

  /**
   * 设置全屏状态
   * @param bool - 是否全屏
   */
  function setCurrenFullscreen(bool: boolean) {
    isTagsViewCurrenFull.value = bool;
    // 使用抽象层保存
    save({ isTagsViewCurrenFull: bool });
  }

  /**
   * 清除持久化数据
   */
  function clearPersist() {
    clear();
  }

  return {
    tagsViewRoutes,
    isTagsViewCurrenFull,
    setTagsViewRoutes,
    setCurrenFullscreen,
    clearPersist,
  };
});
