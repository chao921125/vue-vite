import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

// const modules: any = import.meta.glob("./modules/*.(j)?(t)?s", { eager: true });
const mockModules: any = [];

// Object.keys(modules).forEach((key: string) => {
// 	mockModules.push(...modules[key].default);
// });

export function setupProdMockServer() {
	createProdMockServer(mockModules);
}
