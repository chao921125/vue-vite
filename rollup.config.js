import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
	input: "main.ts",
	output: {
		file: "bundle.js",
		format: "iife",
		name: "MyModule",
	},
	plugins: [commonjs(), resolve()],
};
