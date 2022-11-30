import { createApp, type Directive } from "vue";
import App from "./App.vue";

// router
import Router from "@/router";

// store pinia
import Pinia from "@/store";

// UI element
import ElementPlus, { ElMessage } from "element-plus";
import * as Icons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

// vue i18n
import I18n from "@/plugins/i18n";

// util
import Utils from "@/plugins/utils";

// 三方CSS
import "animate.css/animate.min.css";

// styles
import "@/assets/styles/index.scss";

// icon
import "@purge-icons/generated";

const app = createApp(App);
// const app = createSSRApp(App);
Utils.Log.primary(">>>>>> 当前VUE版本 >>>>>>");
console.log(app.version);

// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

// 自定义指令
import * as directives from "@/plugins/directive";
Object.keys(directives).forEach((key) => {
	app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局信息定义
// app.provide("", "");
// inject: [""],

// 全局指令
// mitt 总线
import mitt from "mitt";
app.config.globalProperties.mittBus = mitt();
// 全局消息提示
app.config.globalProperties.elMessage = ElMessage;

// log
app.config.errorHandler = (err, instance, info) => {
	// 处理错误
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	// 只在开发模式下打印 log
	if (import.meta.env.NODE_ENV === "development") {
		Utils.Log.danger(">>>>>> 错误信息 >>>>>>");
		console.log(info);
		Utils.Log.danger(">>>>>> Vue 实例 >>>>>>");
		console.log(instance);
		Utils.Log.danger(">>>>>> Error >>>>>>");
		console.log(err);
	}
};
app.config.warnHandler = (msg, instance, trace) => {
	// 显示在控制台
	if (import.meta.env.NODE_ENV === "development") {
		// `trace` 是组件的继承关系追踪
		Utils.Log.warning(">>>>>> 警告信息 >>>>>>");
		console.log(msg);
		Utils.Log.warning(">>>>>> Vue 实例 >>>>>>");
		console.log(instance);
		Utils.Log.warning(">>>>>> Info >>>>>>");
		console.log(trace);
	}
};
app.config.performance = import.meta.env.NODE_ENV === "development";

app.use(Pinia).use(Router).use(ElementPlus).use(I18n).mount("#app");
// app.unmount();
