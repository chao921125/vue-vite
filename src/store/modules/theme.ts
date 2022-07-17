import { defineStore } from "pinia";
import { ThemeConfigStates, ThemeConfigState } from "../interface";

/**
 * 布局配置
 */
export const useThemeConfig = defineStore("themeConfig", {
	state: (): ThemeConfigStates => ({
		themeConfig: {
			/**
			 * 全局主题
			 */
			// 默认 primary 主题颜色
			primary: "#409eff",
			// 是否开启深色模式
			isIsDark: false,
			// 是否开启灰色模式
			isGrayscale: false,
			// 是否开启色弱模式
			isInvert: false,
			/**
			 * 界面设置
			 */
			// 是否开启菜单水平折叠效果
			isCollapse: false,
			// 是否开启菜单手风琴效果
			isUniqueOpened: true,
			// 是否开启固定 Header
			isFixedHeader: false,
			// 初始化变量，用于更新菜单 el-scrollbar 的高度，请勿删除
			isFixedHeaderChange: false,
			// 是否开启 Footer 底部版权信息
			isFooter: false,
			// 是否开启水印
			isWartermark: false,
			// 水印文案
			wartermarkText: "shuiyin",

			/**
			 * 界面显示
			 */
			// 是否开启侧边栏 Logo
			isShowLogo: true,
			// 初始化变量，用于 el-scrollbar 的高度更新，请勿删除
			isShowLogoChange: false,
			// 是否开启 Breadcrumb，强制经典、横向布局不显示
			isBreadcrumb: true,
			// 是否开启 Breadcrumb 图标
			isBreadcrumbIcon: false,
			// 是否开启 Tagsview
			isTagsview: true,
			// 是否开启 Tagsview 图标
			isTagsviewIcon: false,
			// 是否开启 TagsView 缓存
			isCacheTagsView: false,
			// 是否开启 TagsView 拖拽
			isSortableTagsView: true,
			// 是否开启 TagsView 共用
			isShareTagsView: false,
			/**
			 * 其它设置
			 */
			// Tagsview 风格：可选值"<tags-style-one|tags-style-four|tags-style-five>"，默认 tags-style-five
			// 定义的值与 `/src/layout/navBars/tagsView/tagsView.vue` 中的 class 同名
			tagsStyle: "tags-style-five",
			// 主页面切换动画：可选值"<slide-right|slide-left|opacitys>"，默认 slide-right
			animation: "slide-right",
			/**
			 * 全局网站标题 / 副标题
			 */
			// 网站主标题（菜单导航、浏览器当前网页标题）
			globalTitle: "vue3-vite",
			// 网站副标题（登录页顶部文字）
			globalViceTitle: "vue3",
			// 默认初始语言，可选值"<zh-cn|en|zh-tw>"，默认 zh-cn
			globalI18n: "zh-cn",
			// 默认全局组件大小，可选值"<large|'default'|small>"，默认 'large'
			globalComponentSize: "default",
		},
	}),
	actions: {
		setThemeConfig(data: ThemeConfigState) {
			this.themeConfig = data;
		},
	},
});
