<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import Ua from "@/plugins/utils/ua";

	const isLoading = ref(true);
	const uaInfo = Ua.uaInfo;

	onMounted(() => {
		setTimeout(() => {
			isLoading.value = false;
		}, 3000);
	});
</script>

<template>
	<el-skeleton
		:rows="1"
		animated
		:loading="isLoading">
		<el-row>
			<el-col :span="24">浏览器：{{ uaInfo.browser.name }} 版本：{{ uaInfo.browser.version }}</el-col>
			<el-col :span="24">操作系统：{{ uaInfo.os.name }} 版本：{{ uaInfo.os.version }}</el-col>
		</el-row>
	</el-skeleton>
</template>

<style scoped lang="scss"></style>
