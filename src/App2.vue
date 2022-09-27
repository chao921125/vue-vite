<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

import { useRoute, useRouter } from "vue-router";
import Utils from "@/plugins/utils";

const route = useRoute();
const router = useRouter();

const loginUser = () => {
	Utils.Cookies.setCookie(Utils.Constants.cookieKey.token, Math.random().toString(36));
	Utils.Storages.setSessionStorage(Utils.Constants.storageKey.token, Math.random().toString(36));
	if (route.query?.redirect && route.query?.redirect !== "/") {
		router.push({
			path: <string>route.query?.redirect,
			query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : "",
		});
	} else {
		router.push({ path: "/" });
	}
};

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
	<el-button @click="loginUser">login</el-button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
