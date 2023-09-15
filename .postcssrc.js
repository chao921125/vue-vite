module.exports = {
	plugins: {
		autoprefixer: {
			overrideBrowserslist: ["Android >= 4.1", "iOS >= 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
		},
		"postcss-pxtorem": {
			rootValue: 75, // （Number|Function）表示根元素的字体大小或返回基于输入参数的根元素字体大小
			unitPrecision: 10, // （数字）允许REM单位增长到的十进制数字。
			propList: ["*"], // （数组）可以从px更改为rem的属性。
			selectorBlackList: [".van"], // （数组）要忽略并保留为px的选择器。
			replace: true, // 布尔）替换包含rems的规则，而不是添加回退。
			mediaQuery: false, // （布尔值）允许转换px
			minPixelValue: 1,
			exclude: /node_modules/i,
		},
	},
};
