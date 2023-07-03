<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<h1>{{ now }}</h1>
	</el-skeleton>
</template>

<script lang="ts" setup name="Home">
	import { formatAxis } from "@/plugins/utils/format";

	const now = ref(formatAxis(new Date()));

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 1500);
</script>

<style scoped lang="scss">
	@import "./home";
</style>
