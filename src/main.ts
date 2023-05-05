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
import ElementPlus, { ElMessage } from "element-plus";
import * as Icons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
app.use(ElementPlus);

// 全局组件 已通过autoimport实现自动全局引入，无需这里自动指定，对应的目录为src/components/*
// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

// vant
import "vant/lib/index.css";

// px转rem
import "amfe-flexible";

// 图标
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
import Utils from "@/plugins/utils";

// 三方样式
import "animate.css/animate.min.css";

// 自定义样式
import "@/assets/styles/index.scss";

// 自定义指令
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
// 全局消息提示
app.config.globalProperties.elMessage = ElMessage;
// provide app.provide("fn", FN) 配合 inject inject("fn") 使用
// app.provide("", "");

// log
Utils.Log.success(">>>>>> 当前VUE版本 >>>>>>");
Utils.Log.primary(app.version);
app.config.errorHandler = (err, instance, info) => {
	// 处理错误
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	// 只在开发模式下打印 log
	if (import.meta.env.NODE_ENV === "development") {
		Utils.Log.danger(">>>>>> 错误信息 >>>>>>");
		Utils.log.primary(info);
		Utils.Log.danger(">>>>>> Vue 实例 >>>>>>");
		Utils.log.primary(instance);
		Utils.Log.danger(">>>>>> Error >>>>>>");
		Utils.log.primary(err);
	}
};
app.config.warnHandler = (msg, instance, trace) => {
	// 显示在控制台
	if (import.meta.env.NODE_ENV === "development") {
		// `trace` 是组件的继承关系追踪
		Utils.Log.warning(">>>>>> 警告信息 >>>>>>");
		Utils.log.primary(msg);
		Utils.Log.warning(">>>>>> Vue 实例 >>>>>>");
		Utils.log.primary(instance);
		Utils.Log.warning(">>>>>> Info >>>>>>");
		Utils.log.primary(trace);
	}
};
app.config.performance = import.meta.env.NODE_ENV === "development";

app.mount("#app");
// app.unmount();
