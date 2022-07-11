import { createApp } from "vue";
import App from "@/App.vue";

import router from "@/router";
// import store from "@/store";

const app = createApp(App);

import Vant from "vant";
import "vant/lib/index.css";
import "amfe-flexible/index.js";
import "@/plugins/px2rem";

// @ts-ignore
import Video from "video.js";
import "video.js/dist/video-js.css";

app.config.globalProperties.$video = Video;

import "@/assets/styles/public.less";
// .use(store)
app.use(Vant).use(router).mount("#app");
