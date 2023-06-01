// @ts-ignore
import { createProdMockServer } from "vite-plugin-mock/client";

// 无法使用 import.meta.glob tsconfig配置后依然无效，如果有解决方案的大家可以提供一下
// const modules: any = import.meta.glob("./modules/*.(j)?(t)?s", { eager: true, import: "default" });
// const mockModules: any[] = [];
//
// Object.keys(modules).forEach((key: string) => {
// 	if (key.includes("/_")) {
// 		return false;
// 	}
// 	mockModules.push(...modules[key].default);
// });

// import test from "./modules/test";
import user from "./modules/user";
import system from "./modules/system";
const mockModules: any[] = [...user, ...system];

export const setupProdMockServer = () => {
	createProdMockServer(mockModules);
};
