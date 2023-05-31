<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="24">
				浏览器：{{ uaInfo.browser.name }} 版本：{{ uaInfo.browser.version }} <br />
				操作系统：{{ uaInfo.os.name }} 版本：{{ uaInfo.os.version }} <br />
				是否代理：{{ ipReal.ip && ipReal.ip.toString() === ipProxy.ip ? "否" : "是" }} <br />
				真实IP：{{ ipReal.ip }} - {{ ipReal.country }} {{ ipReal.province }} {{ ipReal.city }} {{ ipReal.isp }} {{ ipReal.net }} <br />
				代理IP：{{ ipProxy.ip }} - {{ ipProxyInfo.country }} {{ ipProxyInfo.city }} {{ ipProxyInfo.regionName }}
			</el-col>
		</el-row>
	</el-skeleton>
</template>

<script lang="ts" setup name="Ua">
	import { getIpApi, getIpIpify, getIpUser } from "@/plugins/utils/ip";
	import UA from "ua-parser-js";

	const isLoading = ref(true);
	declare interface IBrowser {
		name?: string;
		version?: string;
	}
	declare interface IUaInfo {
		browser?: IBrowser;
		os?: IBrowser;
	}
	const uaInfo = ref<IUaInfo>();
	const getUaInfo = () => {
		uaInfo.value = <IUaInfo>UA(navigator.userAgent);
	};

	const ipReal = ref<any>({});
	const ipProxy = ref<any>({});
	const ipProxyInfo = ref<any>({});

	onMounted(() => {
		getUaInfo();
		getIpIpify().then((res: any) => {
			ipProxy.value = res;
			isLoading.value = false;
		});
		getIpApi().then((res) => {
			ipProxyInfo.value = res;
			isLoading.value = false;
		});
		getIpUser().then((res) => {
			ipReal.value = res;
			isLoading.value = false;
		});
	});
</script>

<style scoped lang="scss"></style>
