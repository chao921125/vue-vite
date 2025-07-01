<script setup lang="ts">
import Api from "@/plugins/api";

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
</script>

<template>
	<div class=""> Login.vue </div>
	<button @click="onLogin">登录</button>
</template>

<style scoped lang="scss"></style>
