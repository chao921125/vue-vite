import { defineStore } from "pinia";

/**
 * 布局配置
 */
export const useThemeConfig = defineStore("themeConfig", {
	state: () => ({
		themeConfig: {
			// 默认初始语言，可选值"<zh-cn|en|zh-tw>"，默认 zh-cn
			globalI18n: "zh-cn",
			// 默认全局组件大小，可选值"<large|'default'|small>"，默认 'large'
			globalComponentSize: "default",
			globalTitle: "",
			// 默认 primary 主题颜色
			primary: "#409eff",
			// 是否开启深色模式
			isDark: false,
			// 是否开启灰色模式
			isGrey: false,
			// 是否开启色弱模式
			isInvert: false,

			// 是否折叠菜单
			isCollapse: false,
			// 是否开启菜单手风琴效果
			isUniqueOpened: true,
			// 是否开启固定 Header
			isFixedHeader: true,
			// 初始化变量，用于更新菜单 el-scrollbar 的高度，请勿删除
			isFixedHeaderChange: false,
			// 是否开启 Footer 底部版权信息
			isFooter: true,
			// 是否开启 面包屑
			isBreadcrumb: true,
			// 是否开启 Breadcrumb 图标
			isBreadcrumbIcon: false,
			// 是否开启 TagsView
			isTagsView: false,
			// 是否开启 Tagsview 图标
			isTagsViewIcon: false,
			// 是否开启 TagsView 缓存
			isCacheTagsView: false,
			// 是否开启 TagsView 拖拽
			isSortableTagsView: true,
			// 是否开启水印
			isWatermark: false,
			// 水印文案
			watermarkText: "YY",
		},
	}),
	actions: {
		setThemeConfig(data) {
			// this.themeConfig = data;
			Object.assign(this.themeConfig, data);
		},
	},
});
