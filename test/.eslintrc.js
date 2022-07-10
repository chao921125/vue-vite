/**
 * 全局配置参考
 * http://eslint.cn/docs/user-guide/configuring
 * rules配置参考
 * http://eslint.cn/docs/rules/
 *
 * .eslintrc.js .eslintrc.yaml .eslintrc.yml .eslintrc.json .eslintrc package.json
 *
 * env 指定
 * browser - 浏览器环境中的全局变量。
 * node - Node.js 全局变量和 Node.js 作用域。
 * commonjs - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
 * shared-node-browser - Node.js 和 Browser 通用全局变量。
 * es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
 * worker - Web Workers 全局变量。
 * amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
 * mocha - 添加所有的 Mocha 测试全局变量。
 * jasmine - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
 * jest - Jest 全局变量。
 * phantomjs - PhantomJS 全局变量。
 * protractor - Protractor 全局变量。
 * qunit - QUnit 全局变量。
 * jquery - jQuery 全局变量。
 * prototypejs - Prototype.js 全局变量。
 * shelljs - ShellJS 全局变量。
 * meteor - Meteor 全局变量。
 * mongo - MongoDB 全局变量。
 * applescript - AppleScript 全局变量。
 * nashorn - Java 8 Nashorn 全局变量。
 * serviceworker - Service Worker 全局变量。
 * atomtest - Atom 测试全局变量。
 * embertest - Ember 测试全局变量。
 * webextensions - WebExtensions 全局变量。
 * greasemonkey - GreaseMonkey 全局变量。
 *
 * rules
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */

// 需要安装依赖:  npm i eslint-define-config
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    es2021: true,
  },
  /* 指定如何解析语法。*/
  parser: "vue-eslint-parser",
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 12,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
    },
  },
  // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {
    // Ref sugar (take 2)
    $: "readonly",
    $$: "readonly",
    $ref: "readonly",
    $shallowRef: "readonly",
    $computed: "readonly",

    // index.d.ts
    // global.d.ts
    Fn: "readonly",
    PromiseFn: "readonly",
    RefType: "readonly",
    LabelValueOptions: "readonly",
    EmitType: "readonly",
    TargetContext: "readonly",
    ComponentElRef: "readonly",
    ComponentRef: "readonly",
    ElRef: "readonly",
    global: "readonly",
    ForDataType: "readonly",
    ComponentRoutes: "readonly",

    // script setup
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/eslint-config-typescript",

    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",

    "@vue/prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // any
    "@typescript-eslint/explicit-module-boundary-types": "off", // setup()
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-use-before-define": "off",

    semi: ["error", "always"],
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
    "no-debugger": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "no-use-before-define": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "space-before-function-paren": "off",
    "vue/attribute-hyphenation": "off",
    "vue/attributes-order": "off",
    "vue/custom-event-name-casing": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/max-attributes-per-line": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/one-component-per-file": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/script-setup-uses-vars": "error",
    "vue/singleline-html-element-content-newline": "off",
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  processor: "",
  overrides: [
    {
      files: ["*.md"],
      rules: {
        strict: "off",
      },
      // processor: "a-plugin/markdown",
    },
  ],
});
