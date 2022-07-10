/**
 * https://windicss.org/
 * 导入顺序
 * - import 'virtual:windi.css'
 * 可以按照顺序替换以下文件
 * + import 'virtual:windi-base.css'
 * + import 'virtual:windi-components.css'
 * + import 'virtual:windi-utilities.css'
 */

import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import typography from "windicss/plugin/typography";
// import { primaryColor } from "./build/config/themeConfig";

export default defineConfig({
  // or 'media'
  darkMode: "class",
  // 预检
  preflight: false,
  // 属性模式 可选值 true 防止冲突添加前缀w: 例如 w:font
  attributify: {
    prefix: "w:",
  },
  // 别名配置
  alias: {},
  // 白名单
  // safelist: "",
  // 扫描
  extract: {
    include: ["src/**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git", "dist"],
  },
  plugins: [typography()],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
        // primary: primaryColor,
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1600px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              opacity: 0.75,
              fontWeight: "500",
              textDecoration: "underline",
              "&:hover": {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: "inherit" },
            strong: { color: "inherit" },
            em: { color: "inherit" },
            rem: { color: "inherit" },
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },
            h4: { color: "inherit" },
            h5: { color: "inherit" },
            h6: { color: "inherit" },
            code: { color: "inherit" },
          },
        },
      },
    },
  },
});
