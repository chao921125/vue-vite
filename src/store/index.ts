// https://pinia.vuejs.org/ 不必采用高级的setup写法
import { createPinia, storeToRefs } from "pinia";

// 创建
const store = createPinia();

// 不必额外导入，直接使用此方法
export const getStoreRefs = (store: any) => {
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
export interface IAppStore {
	useRouterList: ReturnType<typeof useRouterList>;
	useRouterTags: ReturnType<typeof useRouterTags>;
	useThemeConfig: ReturnType<typeof useThemeConfig>;
	useUserInfo: ReturnType<typeof useUserInfo>;
}
export const appStore: IAppStore = {
	useRouterList: useRouterList(store),
	useRouterTags: useRouterTags(store),
	useThemeConfig: useThemeConfig(store),
	useUserInfo: useUserInfo(store),
} as IAppStore;
export default store;
