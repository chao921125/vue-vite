// https://pinia.vuejs.org/ 不必采用高级的setup写法
import { createPinia, storeToRefs } from "pinia";

// 创建
const pinia = createPinia();

// 不必额外导入，直接使用此方法
export const getStoreRefs = (store: any) => {
	return storeToRefs(store);
};

// pinia.use(() => {
// 	return { testDysId: 1 };
// });

// 导出自定义其他状态文件
// import { useAuth } from "./modules/auth";
// import { useRouterList } from "./modules/routerMeta";
// import { useRouterTags } from "./modules/routerTags";
// import { useThemeConfig } from "./modules/theme";
// import { useUserInfo } from "./modules/user";
// export interface IAppStore {
// 	useAuth: ReturnType<typeof useAuth>;
// 	useRouterList: ReturnType<typeof useRouterList>;
// 	useRouterTags: ReturnType<typeof useRouterTags>;
// 	useThemeConfig: ReturnType<typeof useThemeConfig>;
// 	useUserInfo: ReturnType<typeof useUserInfo>;
// }
// export const appStore: IAppStore = {} as IAppStore;
// export const registerStore = () => {
// 	appStore.useAuth = useAuth();
// 	appStore.useRouterList = useRouterList();
// 	appStore.useRouterTags = useRouterTags();
// 	appStore.useThemeConfig = useThemeConfig();
// 	appStore.useUserInfo = useUserInfo();
// };
// 导出
export default pinia;
