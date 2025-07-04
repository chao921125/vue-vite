# Package.json
```json
{
	"vite-plugin-windicss": "^1.8.10",
	"windicss": "^3.5.6"
}
```
# vite.config.[tj]s
```ts
import windiCSS from "vite-plugin-windicss";
plugins: [
	windiCSS(),
]
```
# windi.config.ts
```ts
import { defineConfig } from "vite-plugin-windicss";
// import { primaryColor } from "./build/config/themeConfig";

export default defineConfig({
	darkMode: "class",
	plugins: [createEnterPlugin()],
	theme: {
		extend: {
			zIndex: {
				"-1": "-1",
			},
			colors: {
				primary: "#00FFFF",
			},
			screens: {
				sm: "576px",
				md: "768px",
				lg: "992px",
				xl: "1200px",
				"2xl": "1600px",
			},
		},
	},
});

/**
 * Used for animation when the element is displayed.
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume.
 */
function createEnterPlugin(maxOutput = 6) {
	const createCss = (index: number, d = "x") => {
		const upd = d.toUpperCase();
		return {
			[`*> .enter-${d}:nth-child(${index})`]: {
				transform: `translate${upd}(50px)`,
			},
			[`*> .-enter-${d}:nth-child(${index})`]: {
				transform: `translate${upd}(-50px)`,
			},
			[`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
				"z-index": `${10 - index}`,
				opacity: "0",
				animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
				"animation-fill-mode": "forwards",
				"animation-delay": `${(index * 1) / 10}s`,
			},
		};
	};
	const handler = ({ addBase }) => {
		const addRawCss = {};
		for (let index = 1; index < maxOutput; index++) {
			Object.assign(addRawCss, {
				...createCss(index, "x"),
				...createCss(index, "y"),
			});
		}
		addBase({
			...addRawCss,
			[`@keyframes enter-x-animation`]: {
				to: {
					opacity: "1",
					transform: "translateX(0)",
				},
			},
			[`@keyframes enter-y-animation`]: {
				to: {
					opacity: "1",
					transform: "translateY(0)",
				},
			},
		});
	};
	return { handler };
}

```
