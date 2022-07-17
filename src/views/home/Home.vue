<template>
	Home
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Utils from "@/plugins/utils";

export default defineComponent({
	name: "Home",
	setup() {
		const router = useRouter();
		function logout() {
			Utils.Storages.removeSessionStorage(Utils.Constants.storageKeys.token);
			Utils.Cookies.removeCookie(Utils.Constants.cookieKeys.token);
			router.push({ path: "/login" });
		}
		return {
			logout,
		};
	},
});
</script>

<style scope lang="less"></style>
