# Package.json
```json
{
	"unocss": "^0.60.2"
}
```
# vite.config
```ts
import UnoCSS from "unocss/vite";

plugins: [
	UnoCSS(),
]
```
# main.ts
```ts
import "virtual:uno.css";
```
# uno.config.ts
```ts
import { defineConfig } from "unocss";

export default defineConfig({
	rules: [
		["m-1", { margin: "0.25rem" }],
		// [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
		// [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
	],
	shortcuts: [
		// you could still have object style
		{
			btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
		},
		// dynamic shortcuts
		[/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
	],
});

```
