<template>
	<van-row justify="center">
		<van-col span="20">暂未支持Mobile端，请在PC访问。</van-col>
	</van-row>
</template>

<script lang="ts" setup name="Device">
	import { onMounted } from "vue";
	import { useRouter } from "vue-router";
	import Utils from "@/plugins/utils";
	import RouterSetConfig from "@/config/routerSetConfig";

	const router = useRouter();
	onMounted(() => {
		if (!Utils.isMobile()) {
			router.push({ path: RouterSetConfig.routeHome });
		}
	});
</script>

<style scoped lang="scss"></style>
