<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="24">浏览器：{{ uaInfo.browser.name }} 版本：{{ uaInfo.browser.version }}</el-col>
			<el-col :span="24">操作系统：{{ uaInfo.os.name }} 版本：{{ uaInfo.os.version }}</el-col>
			<el-col :span="24">是否代理：{{ ipReal.ip && ipReal.ip.toString() === ipProxy.ip ? "否" : "是" }}</el-col>
			<el-col :span="24">真实IP：{{ ipReal.ip }} - {{ ipReal.country }} {{ ipReal.province }} {{ ipReal.city }} {{ ipReal.isp }} {{ ipReal.net }}</el-col>
			<el-col :span="24">代理IP：{{ ipProxy.ip }} - {{ ipProxyInfo.country }} {{ ipProxyInfo.city }} {{ ipProxyInfo.regionName }}</el-col>
		</el-row>
	</el-skeleton>
</template>

<script lang="ts" setup name="Browser">
	import UA from "ua-parser-js";
	import { getIpApi, getIpIpify, getIpUser } from "@/plugins/utils/ip";

	const isLoading = ref(true);
	const uaInfo = ref<any>();
	const ipReal = ref<any>({});
	const ipProxy = ref<any>({});
	const ipProxyInfo = ref<any>({});
	const getUaInfo = () => {
		uaInfo.value = UA(navigator.userAgent) as any;
	};
	const getIpInfo = () => {
		getIpIpify().then((res: any) => {
			ipProxy.value = res;
		});
		getIpApi().then((res) => {
			ipProxyInfo.value = res;
		});
		getIpUser().then((res) => {
			ipReal.value = res;
		});
	};

	onMounted(() => {
		getUaInfo();
		getIpInfo();
		setTimeout(() => {
			isLoading.value = false;
		}, 3000);
	});
</script>

<style scoped lang="scss"></style>
