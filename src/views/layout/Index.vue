<template>
	<Admin v-if="isAdmin"></Admin>
	<Web v-else></Web>
</template>

<script lang="ts" setup name="Layout">
	import Admin from "./frame/Admin.vue";
	import Web from "./frame/Web.vue";
	import RouterConfig from "@/config/routerConfig";

	// 设置是否为权限管理端
	const isAdmin = ref(true);
	isAdmin.value = RouterConfig.isAdminIframe;
</script>

<style scoped lang="scss"></style>
