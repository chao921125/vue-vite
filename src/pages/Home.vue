<script setup lang="ts">
import { formatAxis, formatDate } from "@/utils/format";
import { getIpInfoProxy, getIpInfoReal } from "@/utils/ip";
import Constants from "@/utils/constant/constants";
import Ua from "@/utils/ua";

// 欢迎标语
const now = ref(formatAxis(new Date()));
const nowLocal = ref(formatDate(new Date(), "YYYY年mm月dd日 HH时MM分 WWW QQQQ ZZZ"));

// UA 及 IP信息
const uaInfo = Ua.uaInfo;
const ipReal = reactive({ ip: "", province: "", region: "", country: "" });
const ipProxy = reactive({ ip: "", province: "", country: "", region: "" });
const getIpInfo = () => {
	getIpInfoReal(Constants.ipUrl.real.songzixian).then((res) => {
		ipReal.ip = res.data.ip;
		ipReal.country = res.data.country + " " + res.data.countryCode;
		ipReal.province = res.data.province;
		ipReal.region = res.data.city + " " + res.data.isp;
	});

	getIpInfoProxy(Constants.ipUrl.proxy.ipapiCo).then((res) => {
		ipProxy.ip = res.ip;
		ipProxy.province = res.city;
		ipProxy.country = res.country + " " + res.continent_code;
		ipProxy.region = res.region + " " + res.region_code;
	});
};

const isLoading = ref(true);
const isLoadingInfo = ref(true);
onMounted(() => {
	getIpInfo();
	setTimeout(() => {
		isLoadingInfo.value = false;
	}, 3000);
	setTimeout(() => {
		isLoading.value = false;
	}, 1000);
});
</script>

<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<h1>{{ now }}，今天是：{{ nowLocal }}</h1>
	</el-skeleton>
	<el-skeleton :rows="2" animated :loading="isLoadingInfo" class="re-mt-20">
		<h1>当前登录环境如下</h1>
		<h1>操作系统：{{ uaInfo?.os?.name }} 版本：{{ uaInfo?.os?.version }}</h1>
		<h1>浏览器：{{ uaInfo?.browser?.name }} 版本：{{ uaInfo?.browser?.version }}</h1>
		<h1 v-if="ipReal.ip">当前登录IP：{{ ipReal.ip }} - {{ ipReal.country }} {{ ipReal.province }} {{ ipReal.region }}</h1>
		<template v-if="ipReal.ip">
			<h1 v-show="ipReal.ip && ipReal.ip.toString() !== ipProxy.ip" class="error"> 当前代理IP为：{{ ipProxy.ip }} - {{ ipProxy.country }} {{ ipProxy.province }} {{ ipProxy.region }} </h1>
		</template>
	</el-skeleton>
</template>

<style scoped lang="scss">
h1 {
	line-height: 1.5;
}
.error {
	color: #ff0000;
}
</style>
