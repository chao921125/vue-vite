<template>
	Home
	<div v-for="(item, index) in 100" :key="index">home {{ item }}</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useRouter } from "vue-router";
	import Utils from "@/plugins/utils";

	export default defineComponent({
		name: "Home",
		setup() {
			const router = useRouter();
			const logout = () => {
				Utils.Storages.removeSessionStorage(Utils.Constants.storageKeys.token);
				Utils.Cookies.removeCookie(Utils.Constants.cookieKeys.token);
				router.push({ path: "/login" });
			};
			return {
				logout,
			};
		},
	});
</script>

<style scope lang="less"></style>
