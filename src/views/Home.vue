<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<h1>{{ now }}，今天是：{{ nowLocal }}</h1>
	</el-skeleton>
</template>

<script lang="ts" setup name="Home">
	import { formatAxis, formatDate } from "@/plugins/utils/format";

	const now = ref(formatAxis(new Date()));
	const nowLocal = ref(formatDate(new Date(), "YYYY年mm月dd日 HH时MM分 WWW QQQQ ZZZ"));

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 1000);
</script>

<style scoped lang="scss">
	@import "./home";
</style>
