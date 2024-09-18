<script setup>
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

<template>
	<div class="re-w-full">
		点击
		<el-link
			:href="linkUrl"
			:underline="false"
			target="_blank">
			{{ linkUrl }}
		</el-link>
		访问
	</div>
</template>

<style scoped lang="scss"></style>
