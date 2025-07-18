// https://pinia.vuejs.org/ 不必采用高级的setup写法
import { createPinia, storeToRefs } from "pinia";

// 创建
const store = createPinia();

// 不必额外导入，直接使用此方法
export const getStoreRefs: any = (store) => {
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
