// @see: https://eslint.org/
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import vueParser from 'vue-eslint-parser'


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
];
