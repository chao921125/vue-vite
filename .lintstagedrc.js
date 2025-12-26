export default {
  "**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}": (filenames) => {
    // 智能过滤：排除构建产物、依赖、类型定义和配置文件
    const files = filenames
      .filter(
        (file) =>
          !file.includes("/dist/") && // 排除构建产物
          !file.includes("/node_modules/") && // 排除依赖
          !file.includes("/public/") && // 排除静态资源
          !file.includes("/types/") && // 排除类型文件
          !file.includes("vite.config.") && // 排除 Vite 配置
          !file.includes(".lintstagedrc."), // 排除自身
      )
      .join(" ");

    // 如果过滤后没有文件，返回空数组
    if (!files) return [];

    // 返回并行执行命令（性能最优）
    return [`oxlint --fix ${files}`, `oxfmt --write ${files}`];
  },
  "{!(package)*.json,*.code-snippets,.!{npm,browserslist}*rc.{js,cjs,mjs}}": [
    "oxfmt --write",
  ],
  "*.json": ["oxfmt --write"],
  "*.{css,scss,less,styl,html}": ["oxfmt --write", "stylelint --cache --fix"],
  "*.{md, mdx}": ["oxfmt --write"],
};
