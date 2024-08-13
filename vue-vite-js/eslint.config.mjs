// @see: https://eslint.org/
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,vue,jsx,tsx}", "**/*.{md,json,json5,yaml,yml}"],
		languageOptions: {
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
	...pluginVue.configs["flat/essential"],
	eslintConfigPrettier,
	eslintPluginPrettierRecommended,
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
		plugins: {
			vue: pluginVue,
		},
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

			// vue (https://eslint.vuejs.org/rules)
			"vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
			"vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
			"vue/no-mutating-props": "off", // 不允许组件 prop的改变（明天找原因）
			"vue/no-v-html": "off", // 不允许使用v-html
			"vue/custom-event-name-casing": "off", // 为自定义事件名称强制使用特定大小写
			"vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
			"vue/one-component-per-file": "off", // 强制每个组件都应该在自己的文件中
			"vue/html-closing-bracket-newline": "off", // 在标签的右括号之前要求或禁止换行
			"vue/max-attributes-per-line": "off", // 强制每行的最大属性数
			"vue/multiline-html-element-content-newline": "off", // 在多行元素的内容之前和之后需要换行符
			"vue/singleline-html-element-content-newline": "off", // 在单行元素的内容之前和之后需要换行符
			"vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
			"vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
			"vue/require-explicit-emits": "off",
			"vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
			"vue/no-multiple-template-root": "off", // 关闭多根节点的校验
			// "vue/html-self-closing": [
			// 	"error",
			// 	{
			// 		html: {
			// 			void: "never",
			// 			normal: "never",
			// 			component: "never",
			// 		},
			// 		svg: "always",
			// 		math: "always",
			// 	},
			// ],
		},
		// settings: {},
	},
];