// https://pinia.vuejs.org/
import { createPinia, storeToRefs, type StoreGeneric } from "pinia";

// 创建 Pinia 实例
const store = createPinia();

/**
 * 获取 Store 的响应式引用
 * @param store - Pinia store 实例
 * @returns 响应式的 store 引用
 */
export const getStoreRefs = <T extends StoreGeneric>(store: T) => {
  return storeToRefs(store);
};

// pinia.use(() => {
// 	return { testDysId: 1 };
// });

// 导出自定义其他状态文件
import { useRouterList } from "./modules/routerMeta";
import { useRouterTags } from "./modules/routerTags";
import { useThemeConfig } from "./modules/theme";
import { useUserInfo } from "./modules/user";

export const appStore = {
  useRouterList: useRouterList(store),
  useRouterTags: useRouterTags(store),
  useThemeConfig: useThemeConfig(store),
  useUserInfo: useUserInfo(store),
};
export default store;
