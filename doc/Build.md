# vite-plugin-html
```ts

import { createHtmlPlugin } from "vite-plugin-html";

createHtmlPlugin({
	minify: true,
	pages: [
		{
			template: "/public/index.html",
			filename: "index.html",
			entry: "/src/main.ts",
			injectOptions: {
				data: {
					title: envConfig.VITE_TITLE,
					injectScript: `<script src="./inject.js"></script>`,
				},
			},
		},
		// {
		// 	template: "/public/color.html",
		// 	filename: "color.html",
		// 	injectOptions: {
		// 		data: {
		// 			title: envConfig.VITE_TITLE,
		// 			injectScript: `<script src="./inject.js"></script>`,
		// 		},
		// 	},
		// },
	],
	// template: "/public/index.html",
	// entry: "/src/main.ts",
	// inject: {
	//   data: {
	//     title: envConfig.VITE_TITLE,
	//     injectScript: `<script src="./inject.js"></script>`,
	//   },
	// },
}),
```
