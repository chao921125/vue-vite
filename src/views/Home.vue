<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<h1>{{ now }}，今天是：{{ nowLocal }}</h1>
	</el-skeleton>
	<el-skeleton :rows="2" animated :loading="isLoadingInfo" class="re-mt-20">
		<h1>当前登录环境如下</h1>
		<h1>操作系统：{{ uaInfo.os.name }} 版本：{{ uaInfo.os.version }}</h1>
		<h1>浏览器：{{ uaInfo.browser.name }} 版本：{{ uaInfo.browser.version }}</h1>
		<h1 v-if="ipReal.ip">当前登录IP：{{ ipReal.ip }} - {{ ipReal.country }} {{ ipReal.province }} {{ ipReal.region }}</h1>
		<template v-if="ipReal.ip">
			<h1 v-show="ipReal.ip && ipReal.ip.toString() !== ipProxy.ip" class="error">您使用了代理!!!</h1>
			<h1 v-show="ipReal.ip && ipReal.ip.toString() !== ipProxy.ip" class="error">
				当前代理IP为：{{ ipProxy.ip }} - {{ ipProxy.country }} {{ ipProxy.province }} {{ ipProxy.region }}
			</h1>
		</template>
	</el-skeleton>
</template>

<script lang="ts" setup name="Home">
	import { formatAxis, formatDate } from "@/plugins/utils/format";
	import UA from "ua-parser-js";
	import { getProxyIpInfo, getRealIpInfo } from "@/plugins/utils/ip";
	import { IDeviceInfo } from "@/interface/data";

	// 欢迎标语
	const now = ref(formatAxis(new Date()));
	const nowLocal = ref(formatDate(new Date(), "YYYY年mm月dd日 HH时MM分 WWW QQQQ ZZZ"));

	// UA 及 IP信息
	const uaInfo = ref<IDeviceInfo>();
	const ipReal = reactive<IDeviceInfo>({ ip: "", province: "", region: "", country: "" });
	const ipProxy = reactive<{
		ip: string;
		country: string;
		region: string;
		province: string;
	}>({ ip: "", province: "", country: "", region: "" });
	const getUaInfo = () => {
		uaInfo.value = UA(navigator.userAgent) as any;
	};
	const getIpInfo = () => {
		getRealIpInfo().then((res: any) => {
			ipReal.ip = res.data.ip;
			ipReal.country = res.data.country + " " + res.data.countryCode;
			ipReal.province = res.data.province;
			ipReal.region = res.data.city + " " + res.data.isp;
		});

		getProxyIpInfo().then((res: any) => {
			ipProxy.ip = res.query;
			ipProxy.province = res.city;
			ipProxy.country = res.country + " " + res.countryCode;
			ipProxy.region = res.regionName + " " + res.region;
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
