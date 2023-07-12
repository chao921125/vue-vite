<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="24">
				是否代理：{{ ipReal.ip && ipReal.ip.toString() === ipProxy.ip ? "否" : "是" }} <br /><br />
				真实IP：{{ ipReal.ip }} - {{ ipReal.country }} {{ ipReal.province }} {{ ipReal.city }} {{ ipReal.isp }} {{ ipReal.net }} <br /><br />
				代理IP：{{ ipProxy.ip }} - {{ ipProxyInfo.country }} {{ ipProxyInfo.city }} {{ ipProxyInfo.regionName }}
			</el-col>
		</el-row>
	</el-skeleton>
</template>

<script lang="ts" setup name="Ip">
	import { getIpApi, getIpIpify, getIpUser } from "@/plugins/utils/ip";

	const isLoading = ref(true);

	const ipReal = ref<any>({});
	const ipProxy = ref<any>({});
	const ipProxyInfo = ref<any>({});

	onMounted(() => {
		getIpIpify().then((res: any) => {
			ipProxy.value = res;
		});
		getIpApi().then((res) => {
			ipProxyInfo.value = res;
		});
		getIpUser().then((res) => {
			ipReal.value = res;
		});
		setTimeout(() => {
			isLoading.value = false;
		}, 3000);
	});
</script>

<style scoped lang="scss"></style>
