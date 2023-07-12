<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="24">
				浏览器：{{ uaInfo.browser.name }} 版本：{{ uaInfo.browser.version }} <br /><br />
				操作系统：{{ uaInfo.os.name }} 版本：{{ uaInfo.os.version }} <br /><br />
			</el-col>
		</el-row>
	</el-skeleton>
</template>

<script lang="ts" setup name="Ua">
	import UA from "ua-parser-js";

	const isLoading = ref(true);
	const uaInfo = ref<any>();
	const getUaInfo = () => {
		uaInfo.value = UA(navigator.userAgent) as any;
	};

	onMounted(() => {
		getUaInfo();
	});
</script>

<style scoped lang="scss"></style>
