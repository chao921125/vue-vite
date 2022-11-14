import { createApp, type Directive } from "vue";
import App from "./App.vue";

// router
import Router from "@/router";

// store pinia
import Pinia from "@/store";

// vue i18n
import I18n from "@/plugins/language";

// UI element
import ElementPlus, { ElMessage } from "element-plus";
import * as Icons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

// 三方CSS
import "animate.css/animate.min.css";

// styles
import "@/assets/styles/index.scss";

// icon
import "@purge-icons/generated";

// util
import Utils from "@/plugins/utils";

const app = createApp(App);

// log
app.config.errorHandler = (err, vm, info) => {
	// 处理错误
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	// 只在开发模式下打印 log
	if (import.meta.env.NODE_ENV === "development") {
		Utils.log.danger(">>>>>> 错误信息 >>>>>>");
		console.log(info);
		Utils.log.danger(">>>>>> Vue 实例 >>>>>>");
		console.log(vm);
		Utils.log.danger(">>>>>> Error >>>>>>");
		console.log(err);
	}
};
app.config.warnHandler = (msg, vm, trace) => {
	// 显示在控制台
	if (import.meta.env.NODE_ENV === "development") {
		// `trace` 是组件的继承关系追踪
		Utils.log.warning(">>>>>> 警告信息 >>>>>>");
		console.log(msg);
		Utils.log.warning(">>>>>> Vue 实例 >>>>>>");
		console.log(vm);
		Utils.log.warning(">>>>>> Info >>>>>>");
		console.log(trace);
	}
};

// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

// 自定义指令
import * as directives from "@/plugins/directive";
Object.keys(directives).forEach((key) => {
	app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局指令
// mitt 总线
import mitt from "mitt";
app.config.globalProperties.mittBus = mitt();
// 全局消息提示
app.config.globalProperties.elMessage = ElMessage;

app.use(Pinia).use(Router).use(ElementPlus, { i18n: I18n.global.t }).use(I18n).mount("#app");
