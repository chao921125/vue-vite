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
		postcssPxConvert({
			unitToConvert: "vw", // 需要转换的单位，默认为"px"
			rootValue: 78, //  设计稿的视口宽度
			viewportWidth: 1920, //  设计稿的视口宽度
			unitPrecision: 5, // 单位转换后保留的精度
			propList: ["*"], // 能转化为vw的属性列表
			selectorBlackList: [".ignore"], // 需要忽略的CSS选择器
			minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
			mediaQuery: false, // 媒体查询里的单位是否需要转换单位
			exclude: /(node_module)/gi, // 忽略某些文件夹下的文件或特定文件
			landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
			landscapeUnit: "vw", // 横屏时使用的单位
			landscapeWidth: 568, // 横屏时使用的视口宽度
		}),
	],
};
