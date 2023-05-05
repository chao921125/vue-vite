<template>
	<template v-if="isMobile">
		<Mobile></Mobile>
	</template>
	<template v-else-if="isAdmin">
		<Admin></Admin>
	</template>
	<template v-else>
		<Web></Web>
	</template>
</template>

<script lang="ts" setup name="Layout">
	import Admin from "./frame/Admin.vue";
	import Web from "./frame/Web.vue";
	import Mobile from "./frame/Mobile.vue";
	import Utils from "@/plugins/utils";
	import RouterSetConfig from "@/config/routerSetConfig";
	// 判断是否为手机端
	const isMobile = () => {
		return Utils.isMobile();
	};
	// 设置是否为权限管理端
	const isAdmin = ref(true);
	isAdmin.value = RouterSetConfig.isAdminIframe;
	const router = useRouter();
	onMounted(() => {
		if (Utils.isMobile()) {
			router.replace({ path: RouterSetConfig.routeMHome });
		} else {
			router.replace({ path: RouterSetConfig.routeHome });
		}
	});
</script>

<style scoped lang="scss"></style>
