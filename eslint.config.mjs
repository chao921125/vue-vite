// @see: https://eslint.org/
// eslint 补充规则 @stylistic/eslint-plugin
import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,vue,jsx,tsx}"],
		ignores: [".vscode", ".idea", ".local", "node_modules", "dist", "public", "!mock/", "!build", "Dockerfile", "index.html", "*.sh", "*.js", "*.d.js", "*.ts", "*.d.ts", "*.md", "*.scss", "*.woff", "*.ttf"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: { ...globals.browser, ...globals.node },
			// parser: "",
			// parserOptions: {},
		},
		linterOptions: {
			noInlineConfig: true,
			reportUnusedDisableDirectives: false,
		},
	},
	pluginJs.configs.recommended,
	...tsEslint.configs.recommended,
	...pluginVue.configs.recommended,
	{
		// processor: {},
		/* 继承某些已有的规则 */
		plugins: {
			prettier: prettier,
		},
		rules: {
			// eslint (https://eslint.org/docs/latest/rules/)
			"max-lines": "off", // 最大行
			"no-console": "off", // 禁用 console
			"no-debugger": "off", // 禁用 debugger
			"no-irregular-whitespace": "off", // 禁止不规则的空白
			"no-case-declarations": "off", // 不允许在 case 子句中使用词法声明
			"no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
			"no-unused-vars": [
				"error",
				{
					vars: "local",
					args: "none",
					varsIgnorePattern: "/[iI]gnored/u",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^ignore",
					destructuredArrayIgnorePattern: "^_",
					ignoreRestSiblings: false,
				},
			], // 禁止定义未使用的变量
			"no-var": "error", // 要求使用 let 或 const 而不是 var
			"prefer-const": "error", // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const

			// https://eslint.org/docs/latest/rules/
			"@typescript-eslint/no-explicit-any": "off",

			// https://eslint.vuejs.org/
			"vue/multi-word-component-names": "off",
			"vue/max-attributes-per-line": [
				"error",
				{
					singleline: {
						max: 5,
					},
					multiline: {
						max: 5,
					},
				},
			],
		},
		// settings: {},
	},
	eslintConfigPrettier,
	eslintPluginPrettierRecommended,
];
