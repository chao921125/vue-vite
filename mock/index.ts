// @ts-ignore
import { createProdMockServer } from "vite-plugin-mock/client";

const modules: any = import.meta.glob("./modules/*.(j)?(t)?s", { eager: true, import: "default" });
const mockModules: any[] = [];

Object.keys(modules).forEach((key: string) => {
	if (key.includes("/_")) {
		return false;
	}
	mockModules.push(...modules[key].default);
});

// import test from "./modules/test";
// const mockModules: any[] = [...test];
console.log(mockModules);

export const setupProdMockServer = () => {
	createProdMockServer(mockModules);
};
