<template>
	<van-row justify="center">
		<van-col span="20">暂未支持Mobile端，请在PC访问。</van-col>
	</van-row>
</template>

<script lang="ts" setup name="Device">
	import Utils from "@/plugins/utils";
	import RouterConfig from "@/config/routerConfig";

	const router = useRouter();
	onMounted(() => {
		if (!Utils.isMobile()) {
			router.push({ path: RouterConfig.routeHome });
		}
	});
</script>

<style scoped lang="scss"></style>
