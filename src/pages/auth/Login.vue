<script setup lang="ts">
import Api from "@/plugins/api";
import { useRouter } from "vue-router";

const onLogin = () => {
	Api.userApi
		.loginUser({
			userName: "admin",
			password: "123123",
		})
		.then((res) => {
			console.log(res);
		});
};

const router = useRouter();
const onToReg = () => {
	router.push({ path: "/register" });
};
</script>

<template>
	<div class=""> Login.vue </div>
	<button @click="onLogin">登录</button>
	<button @click="onToReg">zhuce</button>
</template>

<style scoped lang="scss"></style>
