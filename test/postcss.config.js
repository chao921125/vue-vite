/**
 * postcss 配置
 * @type {path.PlatformPath | path}
 */
// import path from "path";
// const path = require("path");

module.exports = (opts = {}) => {
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ["Android >= 4.0", "iOS >= 7", "Chrome > 31", "ff > 31", "ie >= 11"],
      },
      "postcss-import": {},
      "postcss-url": {},
      "postcss-write-svg": { utf8: false },
    },
  };
};
module.exports.postcss = true;
