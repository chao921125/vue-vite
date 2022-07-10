/**
 * A "prettier" key in your package.json file.
 * A .prettierrc file written in JSON or YAML.
 * A .prettierrc.json, .prettierrc.yml, .prettierrc.yaml, or .prettierrc.json5 file.
 * A .prettierrc.js, .prettierrc.cjs, prettier.config.js, or prettier.config.cjs file that exports an object using module.exports.
 * A .prettierrc.toml file.
 * @type {{htmlWhitespaceSensitivity: string, rangeStart: number, embeddedLanguageFormatting: string, jsxSingleQuote: boolean, vueIndentScriptAndStyle: boolean, endOfLine: string, printWidth: number, useTabs: boolean, quoteProps: string, trailingComma: string, proseWrap: string, tabWidth: number, rangeEnd: number, requirePragma: boolean, singleQuote: boolean, insertPragma: boolean, semi: boolean, jsxBracketSameLine: boolean, bracketSameLine: boolean, bracketSpacing: boolean, arrowParens: string}}
 */
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 4 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾不需要有分号
  semi: true,
  // 使用单引号
  singleQuote: false,
  // 对象的 key 仅在必要时用引号 as-needed consistent preserve
  quoteProps: "as-needed",
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: true,
  // 尾随逗号 es5 none all
  trailingComma: "all",
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // HTML, JSX, Vue, Angular 标签尾部是否换行
  bracketSameLine: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号 always avoid
  arrowParens: "always",
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器 babel babel-flow babel-ts flow typescript espree meriyah css scss less json json5 json-stringify
  // graphql markdown mdx html vue angular lwc yaml
  // parser: require("./my-parser"),
  // parser: "babel",
  // 指定用于推断要使用的解析器的文件名
  // filepath: "<string>"
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准 always never preserve
  proseWrap: "preserve",
  // 根据显示样式决定 html 要不要折行 css strict ignore
  htmlWhitespaceSensitivity: "css",
  // 是否缩进 Vue 文件中的代码和标记
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf crlf cr auto
  endOfLine: "lf",
  // 控制是否将 Prettier 格式的带引号的代码嵌入到文件中 auto off
  embeddedLanguageFormatting: "off",
};
