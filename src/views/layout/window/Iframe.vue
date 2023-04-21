<template>
	<el-row>
		<el-col :span="24" v-loading="iframeObj.loading" :style="{ height: `calc(100vh - ${iframeHeight})`, border: 'none' }">
			<iframe id="iframe" :src="iframeObj.url" width="100%" height="100%"></iframe>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Iframe">
	import Store, { getStoreRefs } from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";

	const storeThemeConfig = useThemeConfig(Store);
	const { themeConfig } = getStoreRefs(storeThemeConfig);
	const iframeHeight = computed(() => {
		if (themeConfig.value.isTagsView) {
			return "120px";
		}
		return "100px";
	});
	const iframeObj = reactive({
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

<style scoped lang="scss"></style>
