<template>
	Login
	<el-button @click="loginUser">login</el-button>
</template>

<script lang="ts" setup name="Login">
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

<style scoped></style>
