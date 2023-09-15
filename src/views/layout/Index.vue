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
	import RouterConfig from "@/config/routerConfig";
	import ThemeConfig from "@/config/themeConfig";

	// 获取默认设备大小
	const isMobile = ref(Utils.isMobile());

	// 设置是否为权限管理端
	const isAdmin = ref(true);
	isAdmin.value = RouterConfig.isAdminIframe;
	const router = useRouter();
	const route = useRoute();
	const screenWidth = ref(useWindowSize().width.value);

	// 如果使用媒体查询解决手机适配，那么请修改此处
	const changeWindow = () => {
		if (Utils.isMobile() || screenWidth.value < ThemeConfig.screenMobile) {
			isMobile.value = true;
			if (!route.path.includes(RouterConfig.routeMobile)) {
				// 匹配指定内容，并获取到最后一个
				router.replace({ path: route.path.replace(/[\/]+(?!.*\/)/gi, `/${RouterConfig.routeMobile}`) });
			}
		} else {
			isMobile.value = false;
			if (route.path.includes(RouterConfig.routeMobile)) {
				router.replace({ path: route.path.replace(`${RouterConfig.routeMobile}`, "") });
			}
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
