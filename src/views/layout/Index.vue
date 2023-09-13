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
	const router = useRouter();
	const route = useRoute();
	const screenWidth = ref(useWindowSize().width.value);

	// 如果使用媒体查询解决手机适配，那么请修改此处
	const changeWindow = () => {
		if (route.path.includes(RouterConfig.routeMobile)) {
			router.replace({ path: route.path.replace(`${RouterConfig.routeMobile}`, "") });
		}
	};

	onMounted(() => {
		changeWindow();
		window.onresize = () => {
			return (() => {
				screenWidth.value = useWindowSize().width.value;
				changeWindow();
			})();
		};
	});
</script>

<style scoped lang="scss"></style>
