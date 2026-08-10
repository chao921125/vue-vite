// https://postcss.org/
import postcssPresetEnv from "postcss-preset-env";
import postcssPxConvert from "postcss-px-convert";

export default {
  plugins: [
    postcssPresetEnv({
      autoprefixer: {
        grid: true,
      },
    }),
    // postcss-px-convert: px → rem 自适应方案
    // rootValue: 100 (100px = 1rem，便于心算)
    // 配合 public/flexible.js 动态设置 root font-size 实现 PC + 移动端兼容
    // PC (>=768px): root font-size 按视口比例缩放 (80px ~ 120px)
    // 移动端 (<768px): root font-size = clientWidth / 3.75 (375px 设计稿)
    postcssPxConvert({
      unitToConvert: "rem",
      rootValue: 100,
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: [".norem", ".ignore"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1,
      exclude: /node_modules/i,
    }),
  ],
};
