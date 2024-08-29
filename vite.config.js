// @see https://vitejs.dev/config/
import path from "node:path";
import fs from "node:fs";
// 核心
import { defineConfig } from "vite";
// 插件
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command, mode }) => {
	let dynamicConfig;
	const isBuild = command.includes("build");
	// 动态添加的一些配置
	if (isBuild) {
		// 新建一个build文件，用来告诉用户是否需要刷新页面升级，正常来说不需要告知用户
		fs.writeFileSync(path.join(__dirname, "./public/build.json"), JSON.stringify({ version: `${Date.now()}` }));
		dynamicConfig = {};
	} else {
		// command === "build"
		dynamicConfig = {};
	}
	const defaultConfig = {
		plugins: [vue()],
	};
	return Object.assign(defaultConfig, dynamicConfig);
});
