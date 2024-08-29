import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

/*
 * UI start
 * */
// element
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import * as Icons from "@element-plus/icons-vue";
// element 按需引入解决Message等样式失效，需引入
import "element-plus/dist/index.css";

// element 全局消息提示
app.config.globalProperties.elMessage = ElMessage;
app.config.globalProperties.elMessageBox = ElMessageBox;
app.config.globalProperties.elNotification = ElNotification;

// element 注册element Icons组件
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key]);
});

// mock
import initMock from "../mock/index.js";
initMock();

app.mount("#app");
