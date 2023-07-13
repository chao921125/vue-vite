<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<h1>{{ now }}，今天是：{{ nowLocal }}</h1>
	</el-skeleton>
	<el-skeleton :rows="2" animated :loading="isLoadingInfo" class="re-mt-20">
		<h1>当前登录环境如下</h1>
		<h1>操作系统：{{ uaInfo.os.name }} 版本：{{ uaInfo.os.version }}</h1>
		<h1>浏览器：{{ uaInfo.browser.name }} 版本：{{ uaInfo.browser.version }}</h1>
		<h1>当前登录IP：{{ ipReal.ip }} - {{ ipReal.country }} {{ ipReal.province }} {{ ipReal.city }} {{ ipReal.isp }} {{ ipReal.net }}</h1>
		<h1 v-show="ipReal.ip && ipReal.ip.toString() !== ipProxy.ip" class="error">您使用了代理</h1>
		<h1 v-show="ipReal.ip && ipReal.ip.toString() !== ipProxy.ip" class="error"
			>当前代理IP为：{{ ipProxy.ip }} - {{ ipProxyInfo.country }} {{ ipProxyInfo.city }} {{ ipProxyInfo.regionName }}</h1
		>
	</el-skeleton>
</template>

<script lang="ts" setup name="Home">
	import { formatAxis, formatDate } from "@/plugins/utils/format";
	import UA from "ua-parser-js";
	import { getIpApi, getIpIpify, getIpUser } from "@/plugins/utils/ip";

	// 欢迎标语
	const now = ref(formatAxis(new Date()));
	const nowLocal = ref(formatDate(new Date(), "YYYY年mm月dd日 HH时MM分 WWW QQQQ ZZZ"));

	// UA 及 IP信息
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

	const isLoading = ref(true);
	const isLoadingInfo = ref(true);
	onMounted(() => {
		getUaInfo();
		getIpInfo();
		setTimeout(() => {
			isLoadingInfo.value = false;
		}, 3000);
		setTimeout(() => {
			isLoading.value = false;
		}, 1000);
	});
</script>

<style scoped lang="scss">
	@use "./home.scss";
</style>
