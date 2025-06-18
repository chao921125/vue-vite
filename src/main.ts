/**
 * @Author: cc
 */
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
// const app = createSSRApp(App);

// 路由管理 router
import Router from "@/router";
app.use(Router);

// 状态管理 pinia
import Store from "@/store";
app.use(Store);

// mitt 总线 全局指令集 通过getCurrentInstance
import mitt from "mitt";
app.config.globalProperties.$mitt = mitt();

// vue i18n
import I18n from "@/plugins/i18n";
app.use(I18n);

/*
 * UI start
 * */
// vuetify
// import "vuetify/styles";
// import { createVuetify } from "vuetify";
// const vuetify = createVuetify({});
// app.use(vuetify);

// element
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import * as Icons from "@element-plus/icons-vue";
// element 按需引入解决Message等样式失效，需引入
import "element-plus/dist/index.css";

// element 全局消息提示
app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$messageBox = ElMessageBox;
app.config.globalProperties.$notification = ElNotification;

// element 注册element Icons组件
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key]);
});

// vant
// import "vant/lib/index.css";

// 营销组件
// import VueLuckyCanvas from "@lucky-canvas/vue";
// app.use(VueLuckyCanvas);
/*
 * UI end
 * */

/*
 * 自定义 start
 * */
// 全局自定义指令
import * as directives from "@/plugins/directive";
Object.keys(directives).forEach((key) => {
	app.directive(key, directives[key]);
});

// 全局信息定义 使用 inject: [""],
// provide app.provide("fn", FN) 配合 inject inject("fn") 使用
// app.provide("", "");

// 手动引入自定义插件对象，注册整个项目中的全局组件
// import globalComponent from "@/components/index.ts";
// app.use(globalComponent)

// PWA
// 图标生成 npx pwa-asset-generator ./src/assets/logo.png ./public/icons
// import { registerSW } from "virtual:pwa-register";
// registerSW({
// 	onNeedRefresh() {},
// 	onOfflineReady() {},
// });
window.addEventListener("beforeinstallprompt", (e) => {
	e.preventDefault();
	window.deferredPrompt = e;
});

// svg font icon 字体、图标
import "@/assets/fonts/font.css";
import "@/assets/icon/iconfont.css";

// 动画
import "animate.css/animate.min.css";
import "animate.css/animate.compat.css";
// 自定义样式
import "@/assets/styles/index.scss";

// v11+ https://swiperjs.com/element
// import { register } from "swiper/element/bundle";
// register();
/*
 * 自定义 end
 * */

/*
 * 启动运行日志 start
 * */
// 工具
import Log from "@/utils/log";

// config log
Log.success(">>>>>> 当前VUE版本 >>>>>>");
Log.primary(app.version);
// 防止错误和警告死循环，手动终止
const isErrorNumMax = 10;
let isErrorNum = 0;
let isShowError = false;
const isWanNumMax = 10;
let isWanNum = 0;
let isShowWan = false;
app.config.errorHandler = (err, instance, info) => {
	// 处理错误
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	// 只在开发模式下打印 log
	if (import.meta.env.VITE_NODE_ENV === "development" && !isShowError) {
		if (++isErrorNum > isErrorNumMax) {
			isShowError = true;
		}
		Log.danger(">>>>>> 错误信息 >>>>>>");
		Log.primary(String(err || ""));
		Log.danger(">>>>>> Vue 实例 >>>>>>");
		Log.primary(instance || "");
		Log.danger(">>>>>> Error >>>>>>");
		Log.primary(info || "");
	}
};
app.config.warnHandler = (msg, instance, trace) => {
	// 显示在控制台
	if (import.meta.env.VITE_NODE_ENV === "development" && !isShowWan) {
		if (++isWanNum > isWanNumMax) {
			isShowWan = true;
		}
		// `trace` 是组件的继承关系追踪
		Log.warning(">>>>>> 警告信息 >>>>>>");
		Log.primary(msg || "");
		Log.warning(">>>>>> Vue 实例 >>>>>>");
		Log.primary(instance || "");
		Log.warning(">>>>>> Info >>>>>>");
		Log.primary(trace || "");
	}
};
app.config.performance = import.meta.env.VITE_NODE_ENV === "development";
/*
 * 启动运行日志 end
 * */

app.mount("#app");
// app.unmount();
