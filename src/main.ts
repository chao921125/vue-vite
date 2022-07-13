import { createApp } from "vue";
import App from "./App.vue";

// router
import router from "@/router";

// store pinia
import pinia from "@/store";

// vue i18n
import I18n from "@/plugins/language";

import mitt from "mitt";

// styles
import "@/assets/styles/index.scss";

// UI element
import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);

// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(pinia).use(router).use(ElementPlus, { i18n: I18n.global.t }).use(I18n).mount("#app");

app.config.globalProperties.mittBus = mitt();
