import { createApp, type Directive } from "vue";
import App from "./App.vue";

const app = createApp(App);
// const app = createSSRApp(App);

// store pinia
import Store from "@/store";
app.use(Store);
// import Store, { registerStore } from "@/store";
// registerStore();

// router
import Router from "@/router";
app.use(Router);

// UI
// element
import ElementPlus, { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import * as Icons from "@element-plus/icons-vue";
// 按需引入解决Message等样式失效，需引入
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
if (import.meta.env.VITE_NODE_ENV === "development") {
	app.use(ElementPlus);
}

// 全局消息提示
app.config.globalProperties.elMessage = ElMessage;
app.config.globalProperties.elMessageBox = ElMessageBox;
app.config.globalProperties.elNotification = ElNotification;

// 全局组件 已通过autoimport实现自动全局引入，无需这里自动指定，对应的目录为src/components/*
// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

// vant
import "vant/lib/index.css";

// px转rem

// svg 图标
import "virtual:svg-icons-register";

// vue i18n
import I18n from "@/plugins/i18n";
app.use(I18n);

// unocss
import "virtual:uno.css";

// 打印
import print from "vue3-print-nb";
app.use(print);

// 工具
import Log from "@/plugins/utils/log";

// 三方样式
import "animate.css/animate.min.css";

// 自定义样式
import "@/assets/styles/index.scss";

// import { register } from "swiper/element/bundle";
// register();

// 全局自定义指令
import * as directives from "@/plugins/directive";
Object.keys(directives).forEach((key) => {
	app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局信息定义 使用 inject: [""],
// app.provide("", "");

// 全局指令集 通过getCurrentInstance
// mitt 总线
import mitt from "mitt";
app.config.globalProperties.mittBus = mitt();

// provide app.provide("fn", FN) 配合 inject inject("fn") 使用
// app.provide("", "");

// 手动引入自定义插件对象，注册整个项目中的全局组件
// import globalComponent from "@/components/index.ts";
// app.use(globalComponent)

// log
Log.success(">>>>>> 当前VUE版本 >>>>>>");
Log.primary(app.version);
let MsgErrorNum: number = 0;
let MsgError: any[] = [];
let isShowMsgError: boolean = false;
app.config.errorHandler = (err, instance, info) => {
	// 处理错误
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	// 只在开发模式下打印 log
	if (import.meta.env.VITE_NODE_ENV === "development" && !isShowMsgError) {
		Log.danger(">>>>>> 错误信息 >>>>>>");
		Log.primary(err || "");
		Log.danger(">>>>>> Vue 实例 >>>>>>");
		Log.primary(instance || "");
		Log.danger(">>>>>> Error >>>>>>");
		Log.primary(info || "");
		MsgError.push(err);
		console.log(++MsgErrorNum);
		console.log(JSON.stringify(MsgError));
		if (MsgError.length > 1) {
			let start = MsgError[0];
			let end = MsgError[MsgError.length - 1];
			isShowMsgError = start === end;
		}
	}
};
app.config.warnHandler = (msg, instance, trace) => {
	// 显示在控制台
	if (import.meta.env.VITE_NODE_ENV === "development") {
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

app.mount("#app");
// app.unmount();
