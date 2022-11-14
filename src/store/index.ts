// https://pinia.vuejs.org/
import { createPinia, storeToRefs } from "pinia";

// 创建
const pinia = createPinia();

export const getStore = (store: any) => {
	return storeToRefs(store);
};

pinia.use(() => {
	return { testDysId: 1 };
});

// 导出
export default pinia;
