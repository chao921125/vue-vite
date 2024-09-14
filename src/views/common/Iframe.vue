<script setup lang="ts">
	import { getStoreRefs, appStore } from "@/store";

	const { themeConfig } = <any>getStoreRefs(appStore.useThemeConfig);
	const iframeHeight = computed(() => {
		if (themeConfig.value.isTagsView) {
			return "120px";
		}
		return "100px";
	});
	const iframeObj: any = reactive({
		url: "",
		loading: true,
	});
	const route = useRoute();
	const initData = () => {
		iframeObj.loading = true;
		nextTick(() => {
			iframeObj.url = String(route.meta.address) || "";
			iframeObj.loading = false;
		});
	};
	onMounted(() => {
		initData();
	});
	watch(
		() => route.path,
		() => {
			// initData();
		},
	);
</script>

<template>
	<div
		class="re-full"
		v-loading="iframeObj.loading"
		:style="{ height: `calc(100vh - ${iframeHeight})`, border: 'none' }">
		<iframe
			id="iframe"
			:src="iframeObj.url"
			class="re-full"
			width="100%"
			height="100%"></iframe>
	</div>
</template>

<style scoped lang="scss"></style>
