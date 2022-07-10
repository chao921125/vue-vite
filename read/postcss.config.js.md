module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7', "Chrome > 31", "ff > 31", "ie >= 7"]
    },
    'postcss-pxtorem': {
      // 1、在上面就提到过，lib-flexible最终转换html元素的font-size是手机屏幕的十分之一，所以这个rootValue的值是根据我们的设计稿来设置的。
      // 2、由于我的设计稿是通过iphone6做为原型设计的，宽度是375，所以在这里我rootValue的值为37.5。
      // 3、如果你的设计稿宽度是750，那么rootValue的值为75。
      // 4、如果你使用的UI库是Vant，那么这个rootValue的值就必须设置为37.5，因为 Vant 是基于逻辑像素 375 写的，所以如果你设置为 75 的话，Vant 的样式就小了一半。
      // 5、如果设计稿就是750，我们在测量设计稿的时候都必须除2才能使用，否则就会变得很大。不想除就找UI把设计图变成0.5倍图，也就是宽为375
      rootValue: 37.5,
      unitPrecision: 5,
      propList: ['*'],
      // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
      // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
      selectorBlackList: ['.pc'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules|pc/i
    }
  },
};
