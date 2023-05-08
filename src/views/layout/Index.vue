<template>
	<Mobile v-if="isMobile"></Mobile>
	<Admin v-else-if="isAdmin"></Admin>
	<Web v-else></Web>
</template>

<script lang="ts" setup name="Layout">
	import Admin from "./frame/Admin.vue";
	import Web from "./frame/Web.vue";
	import Mobile from "./frame/Mobile.vue";
	import Utils from "@/plugins/utils";
	import RouterSetConfig from "@/config/routerSetConfig";
	import ThemeSetConfig from "@/config/themeSetConfig";

	// 获取默认设备大小
	const isMobile = ref(Utils.isMobile());

	// 设置是否为权限管理端
	const isAdmin = ref(true);
	isAdmin.value = RouterSetConfig.isAdminIframe;
	const router = useRouter();
	const route = useRoute();
	const screenWidth = ref(useWindowSize().width.value);
	onMounted(() => {
		changeWindow();
		window.onresize = () => {
			return (() => {
				screenWidth.value = useWindowSize().width.value;
				changeWindow();
			})();
		};
	});
	const changeWindow = () => {
		if (Utils.isMobile() || screenWidth.value < ThemeSetConfig.screenMobile) {
			isMobile.value = true;
			if (!route.path.includes(RouterSetConfig.routeMobile)) {
				router.replace({ path: route.path.replace(/[\/]+(?!.*\/)/gi, `/${RouterSetConfig.routeMobile}`) });
			}
		} else {
			isMobile.value = false;
			if (route.path.includes(RouterSetConfig.routeMobile)) {
				router.replace({ path: route.path.replace(`${RouterSetConfig.routeMobile}`, "") });
			}
		}
	};
</script>

<style scoped lang="scss"></style>
