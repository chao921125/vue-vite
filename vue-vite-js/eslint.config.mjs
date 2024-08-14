// @see: https://eslint.org/
// eslint 补充规则 @stylistic/eslint-plugin
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,vue,jsx,tsx}"],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{
		files: ["**/*.{js,mjs,cjs,ts,vue,jsx,tsx}"],
		ignores: [
			".vscode",
			".idea",
			".local",
			"node_modules",
			"dist",
			"public",
			"!mock/",
			"!build",
			"Dockerfile",
			"index.html",
			"*.sh",
			"*.js",
			"*.d.js",
			"*.ts",
			"*.d.ts",
			"*.md",
			"*.scss",
			"*.woff",
			"*.ttf",
		],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			// globals: {},
			parser: vueParser,
			// parserOptions: {},
		},
		linterOptions: {
			noInlineConfig: true,
			reportUnusedDisableDirectives: false,
		},
		// processor: {},
		/* 继承某些已有的规则 */
		// plugins: {},
		rules: {
			semi: "error",
			// eslint (http://eslint.cn/docs/rules)
			"no-console": "off", // 禁用 console
			"no-debugger": "off", // 禁用 debugger
			"no-irregular-whitespace": "off", // 禁止不规则的空白
			"no-case-declarations": "off", // 不允许在 case 子句中使用词法声明
			"no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
			"no-unused-vars": [
				"error",
				{
					vars: "all",
					args: "none",
					ignoreRestSiblings: false,
				},
			], // 禁止定义未使用的变量
			"space-before-function-paren": "off", // 强制在 function的左括号之前使用一致的空格
			"no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
			"no-var": "error", // 要求使用 let 或 const 而不是 var
			"prefer-const": "error", // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
		},
		// settings: {},
	},
	eslintConfigPrettier,
	eslintPluginPrettierRecommended,
];
