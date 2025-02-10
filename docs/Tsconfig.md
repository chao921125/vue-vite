```json5
{
	/* Visit https://aka.ms/tsconfig.json to read more about this file https://www.tslang.cn/docs/handbook/tsconfig-json.html */
	"compilerOptions": {
		/* 项目 */
		"incremental": false, /* 保存 .tsbuildinfo 文件以允许增量编译项目。 */
		"composite": true, /* 启用允许 TypeScript 项目与项目引用一起使用的约束。 */
		"tsBuildInfoFile": "./.tsbuildinfo", /* 指定 .tsbuildinfo 增量编译文件的路径。 */
		"disableSourceOfProjectReferenceRedirect": true, /* 引用复合项目时, 禁用首选源文件而不是声明文件。 */
		"disableSolutionSearching": true, /* 编辑时选择退出多项目引用检查。 */
		"disableReferencedProjectLoad": true, /* 减少 TypeScript 自动加载的项目数量。 */
		/* 语言和环境 */
		"target": "ESNext", /* 设置发出的 JavaScript 的 JavaScript 语言版本并包含兼容的库声明。 */
		"lib": [
			"ES5",
			"ES6",
			"ES7",
			"ESNext",
			"DOM",
			"DOM.Iterable",
			"ScriptHost",
			"Decorators"
		], /* 指定一组描述目标运行时环境的捆绑库声明文件。 */
		"jsx": "preserve", /* 指定生成哪些 JSX 代码。 */
		"experimentalDecorators": true, /* 启用对旧版实验性装饰器的实验性支持。 */
		"emitDecoratorMetadata": true, /* 为源文件中的装饰声明发出设计类型元数据。 */
		"jsxFactory": "", /* 指定定位 React JSX 发出时使用的 JSX 工厂函数, 例如“React.createElement”或“h”。 */
		"jsxFragmentFactory": "", /* 指定定位 React JSX 发出时用于片段的 JSX Fragment 引用, 例如'React.Fragment' 或 'Fragment'。 */
		"jsxImportSource": "", /* 指定使用 'jsx: react-jsx*' 时用于导入 JSX 工厂函数的模块说明符。 */
		"reactNamespace": "", /* 指定为 'createElement' 调用的对象。 这仅适用于以 'react' JSX 发出为目标的情况。 */
		"noLib": false, /* 禁用包括任何库文件, 包括默认的 lib.d.ts。 */
		"useDefineForClassFields": true, /* 发出符合 ECMAScript 标准的类字段。 */
		"moduleDetection": "auto", /* 控制使用什么方法来检测模块格式的 JS 文件。 */

		/* 模块 */
		"module": "ESNext", /* 指定生成的模块代码。 */
		"rootDir": "./", /* 指定源文件中的根文件夹。 */
		"moduleResolution": "Bundler", /* 指定 TypeScript 如何从给定的模块说明符中查找文件。 */
	  "baseUrl": "./", /* 指定用于解析非相对模块名称的基本目录。 */
		"paths": {
			"@/*": [
				"src/*"
			],
			"/#/*": ["class/*"]
		}, /* 指定一组将导入重新映射到其他查找位置的条目。 */
	  "rootDirs": [], /* 允许在解析模块时将多个文件夹视为一个文件夹。 */
	  "typeRoots": [], /* 指定多个文件夹, 其作用类似于 './node_modules/@types'。 */
		"types": [
			"echarts",
			"node",
			"qs",
			"vite/client",
			"vite-plugin-pwa/client",
			"vite-plugin-pwa/vue"
		], /* 指定要包含在源文件中但不在源文件中引用的类型包名称。 */
		"allowUmdGlobalAccess": true, /* 允许从模块访问 UMD 全局变量。 */
		"moduleSuffixes": [], /* 解析模块时要搜索的文件名后缀列表。 */
		"allowImportingTsExtensions": true, /* 允许导入包含 TypeScript 文件扩展名。需要设置“--moduleResolution bundler”和“--noEmit”或“--emitDeclarationOnly”。 */
		"rewriteRelativeImportExtensions": true, /* 将“.ts”、“.tsx”、“.mts”和“.cts”文件扩展名在相对导入路径中重写为输出文件中的 JavaScript 等效项。 */
		"resolvePackageJsonExports": true, /* 解析包导入时使用 package.json“exports”字段。 */
		"resolvePackageJsonImports": true, /* 解析导入时使用 package.json“imports”字段。 */
		"customConditions": [], /* 解析导入时, 除了解析器特定的默认值之外还要设置的条件。 */
		"noUncheckedSideEffectImports": true, /* 检查副作用导入。 */
		"resolveJsonModule": true, /* 启用导入 .json 文件。 */
		"allowArbitraryExtensions": true, /* 启用导入具有任何扩展名的文件, 前提是存在声明文件。 */
		"noResolve": true, /* 禁止“import”、“require”或“<reference>”扩展 TypeScript 应添加到项目的文件数量。 */

		/* JavaScript 支持 */
		"allowJs": true, /* 允许 JavaScript 文件成为程序的一部分。使用“checkJS”选项从这些文件中获取错误。 */
		"checkJs": true, /* 在类型检查的 JavaScript 文件中启用错误报告。 */
		"maxNodeModuleJsDepth": 1, /* 指定用于从“node_modules”检查 JavaScript 文件的最大文件夹深度。仅适用于“allowJs”。 */

		/* 发出 */
		"declaration": true, /* 从项目中的 TypeScript 和 JavaScript 文件生成 .d.ts 文件。 */
		"declarationMap":  true, /* 为 d.ts 文件创建源映射。 */
		"emitDeclarationOnly": true, /* 仅输出 d.ts 文件, 不输出 JavaScript 文件。 */
		"sourceMap": true, /* 为发出的 JavaScript 文件创建源映射文件。 */
		"inlineSourceMap": true, /* 在发出的 JavaScript 中包含源映射文件。 */
		"noEmit": true, /* 禁用从编译中发出文件。 */
		"outFile": "./", /* 指定一个将所有输出捆绑到一个 JavaScript 文件中的文件。 如果 'declaration' 为 true, 还指定一个捆绑所有 .d.ts 输出的文件。 */
		"outDir": "./dist", /* 为所有发出的文件指定一个输出文件夹。 */
		"removeComments": true, /* 禁用发出注释。 */
		"importHelpers": true, /* 允许每个项目从 tslib 导入一次辅助函数, 而不是每个文件都包含它们。 */
		"downlevelIteration": true, /* 发出更兼容但冗长且性能更低的 JavaScript 进行迭代。 */
		"sourceRoot": "", /* 指定调试器查找参考源代码的根路径。 */
		"mapRoot": "", /* 指定调试器应定位映射文件的位置, 而不是生成的位置。 */
		"inlineSources": true, /* 在发出的 JavaScript 内的源映射中包含源代码。 */
		"emitBOM": true, /* 在输出文件的开头发出 UTF-8 字节顺序标记 (BOM)。 */
		"newLine": "crlf", /* 设置发出文件的换行符。 */
		"stripInternal": true, /* 禁用发出 JSDoc 注释中包含“@internal”的声明。 */
		"noEmitHelpers": true, /* 禁用在编译输出中生成自定义辅助函数, 如“__extends”。 */
		"noEmitOnError": true, /* 如果报告任何类型检查错误, 则禁用发出文件。 */
		"preserveConstEnums": true, /* 禁用在生成的代码中擦除“const enum”声明。 */
		"declarationDir": "./types", /* 指定生成的声明文件的输出目录。 */

		/* 互操作约束 */
		"isolatedModules": true, /* 确保每个文件都可以安全地转译, 而无需依赖其他导入。 */
		"verbatimModuleSyntax": true, /* 不转换或省略任何未标记为仅类型的导入或导出, 确保它们根据“模块”设置以输出文件的格式编写。 */
		"isolatedDeclarations": true, /* 要求对导出进行足够的注释, 以便其他工具可以轻松生成声明文件。 */
		"allowSyntheticDefaultImports": true, /* 当模块没有默认导出时, 允许“从 y 导入 x”。 */
		"esModuleInterop": true, /* 发出额外的 JavaScript 以简化对导入 CommonJS 模块的支持。这将启用“allowSyntheticDefaultImports”以实现类型兼容性。 */
		"preserveSymlinks": true, /* 禁用将符号链接解析为其真实路径。这与节点中的相同标志相关。 */
		"forceConsistentCasingInFileNames": true, /* 确保导入中的大小写正确。 */

		/* 类型检查 */
		"strict": true, /* 启用所有严格类型检查选项。 */
		"noImplicitAny": false, /* 为具有隐含“任何”类型的表达式和声明启用错误报告。 */
		"strictNullChecks": true, /* 类型检查时, 请考虑“null”和“undefined”。*/
		"strictFunctionTypes": false, /* 分配函数时, 请检查以确保参数和返回值与子类型兼容。*/
		"strictBindCallApply": true, /* 检查“bind”、“call”和“apply”方法的参数是否与原始函数匹配。*/
		"strictPropertyInitialization": true, /* 检查已声明但未在构造函数中设置的类属性。*/
		"strictBuiltinIteratorReturn": true, /* 内置迭代器使用“undefined”而不是“any”的“TReturn”类型实例化。*/
		"noImplicitThis": true, /* 当“this”的类型为“any”时启用错误报告。*/
		"useUnknownInCatchVariables": true, /* 默认 catch 子句变量为“unknown”而不是“any”。 */
		"alwaysStrict": true, /* 确保始终发出“use strict”。 */
		"noUnusedLocals": true, /* 在未读取局部变量时启用错误报告。 */
		"noUnusedParameters": true, /* 在未读取函数参数时引发错误。 */
		"exactOptionalPropertyTypes": true, /* 按书面形式解释可选属性类型, 而不是添加“undefined”。 */
		"noImplicitReturns": true, /* 为未在函数中明确返回的代码路径启用错误报告。 */
		"noFallthroughCasesInSwitch": true, /* 为 switch 语句中的 fallthrough 情况启用错误报告。 */
		"noUncheckedIndexedAccess": true, /* 使用索引访问时将“undefined”添加到类型中。 */
		"noImplicitOverride": true, /* 确保派生类中的重写成员用 override 修饰符标记。 */
		"noPropertyAccessFromIndexSignature": true, /* 强制对使用索引类型声明的键使用索引访问器。 */
		"allowUnusedLabels": true, /* 禁用未使用标签的错误报告。 */
		"allowUnreachableCode": true, /* 禁用无法访问的代码的错误报告。 */

		/* 完整性 */
		"skipDefaultLibCheck": true, /* 跳过对 TypeScript 中包含的 .d.ts 文件进行类型检查。 */
		"skipLibCheck": true, /* 跳过对所有 .d.ts 文件进行类型检查。 */

		/* 其他 */
		"listEmittedFiles": true,
		"listFiles": true,
	},
	"plugins": [],
	"include": [
		"src/**/*",
		"src/**/*.vue",
		"types/**/*",
		"build/**/*",
		"mock/**/*",
		"auto-imports.d.ts",
		"components.d.ts"
	],
	"exclude": [
		"node_modules",
		"dist",
		"cypress",
		"tests"
	]
//	"references": [{ "path": "./tsconfig.node.json" }, { "path": "./tsconfig.app.json" }]
}
```
