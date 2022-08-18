<template>
	<el-button @click="changeShow">click</el-button>
	<transition-group appear tag="h2" name="animate__animated animate__bounce" enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
		<h2 v-show="isShow" key="1">动画效果1</h2>
		<h2 v-show="!isShow" key="2">动画效果2</h2>
	</transition-group>
	<div v-for="(item, index) in 100" :key="index">home {{ item }}</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";
	import { useRouter } from "vue-router";
	import Utils from "@/plugins/utils";

	export default defineComponent({
		name: "Home",
		setup() {
			const router = useRouter();
			const logout = () => {
				Utils.Storages.removeSessionStorage(Utils.Constants.storageKey.token);
				Utils.Cookies.removeCookie(Utils.Constants.cookieKey.token);
				router.push({ path: "/login" });
			};
			const isShow = ref(false);
			const changeShow = () => {
				isShow.value = !isShow.value;
			};
			return {
				isShow,
				changeShow,
				logout,
			};
		},
	});
</script>

<style scope lang="less"></style>
