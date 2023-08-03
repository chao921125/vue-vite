<template>
	<el-row>
		<el-col :span="24">
			点击 <el-link :href="linkUrl" :underline="false" target="_blank">{{ linkUrl }}</el-link> 访问
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Link">
	import Utils from "@/plugins/utils";

	const linkUrl = ref("");
	const route = useRoute();
	const initData = () => {
		linkUrl.value = String(route.meta.address) || "";
		Utils.open(linkUrl.value);
	};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
