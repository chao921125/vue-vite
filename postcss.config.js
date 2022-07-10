module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7', "Chrome > 31", "ff > 31", "ie >= 7"]
    },
    'postcss-pxtorem': {
      rootValue: 16,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*']
    }
  },
};
