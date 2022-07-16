<template>
	Login
<el-button @click="loginUser">login</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Utils from "@/plugins/utils";

export default defineComponent({
	name: "Login",
	setup() {
		const route = useRoute();
		const router = useRouter();

		const loginUser = () => {
			Utils.Cookies.setCookie(Utils.Constants.cookieKeys.token, Math.random().toString(36));
			Utils.Storages.setSessionStorage(Utils.Constants.storageKeys.token, Math.random().toString(36));
			if (route.query?.redirect !== "/") {
				router.push({
					path: <string>route.query?.redirect,
					query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
				});
			} else {
				router.push('/');
			}
		}

		return {
			loginUser
		}
	}
});
</script>

<style scoped></style>
