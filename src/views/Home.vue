<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="12">
				浏览器：{{ uaInfo.browser.name }} 版本：{{ uaInfo.browser.version }} <br />
				操作系统：{{ uaInfo.os.name }} 版本：{{ uaInfo.os.version }} <br />
				是否代理：{{ ipReal.ip.toString() === ipProxy.ip ? "否" : "是" }} <br />
				真实IP：{{ ipReal.ip }} - {{ ipReal.country }} {{ ipReal.province }} {{ ipReal.city }} {{ ipReal.isp }} {{ ipReal.net }} <br />
				代理IP：{{ ipProxy.ip }} - {{ ipProxyInfo.country }} {{ ipProxyInfo.city }} {{ ipProxyInfo.regionName }}
			</el-col>
			<el-col :span="3">
				<el-badge :value="12" class="item">
					<el-button @click="testI18nMessage">库存预警</el-button>
				</el-badge>
			</el-col>
			<el-col :span="3">
				<el-badge :value="0" class="item">
					<el-button @click="testI18nMessage">待审核</el-button>
				</el-badge>
			</el-col>
		</el-row>
	</el-skeleton>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="24" class="re-mtb-20">
				<el-date-picker
					v-model="form.date"
					type="daterange"
					unlink-panels
					range-separator="-"
					start-placeholder="Start date"
					end-placeholder="End date"
					:shortcuts="shortcuts"
					@change="searchCount"
				/>
			</el-col>
		</el-row>
	</el-skeleton>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row gutter="20">
			<el-col :span="8">
				<el-card>
					<div class="count-title">采购金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<div class="count-title">销售金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<div class="count-title">入库金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
			<el-col :span="8" class="re-mt-20">
				<el-card>
					<div class="count-title">出库金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
			<el-col :span="8" class="re-mt-20">
				<el-card>
					<div class="count-title">库存金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
		</el-row>
	</el-skeleton>
	<el-row>
		<el-col :span="12">
			<div id="echartsAmount" style="height: 300px"></div>
		</el-col>
		<el-col :span="12">
			<div id="echartsAmount1" style="height: 300px"></div>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Home">
	import { $t } from "@/plugins/i18n";
	import UA from "ua-parser-js";
	import { getIpApi, getIpIpify, getIpUser } from "@/plugins/utils/ip";
	// import api from "@/api";
	import Echarts from "@/plugins/echarts";

	const tI18n = ref();
	const form = reactive({
		date: ["2022-08-31", "2022-11-31"],
	});

	const shortcuts = [
		{
			text: $t("message.dateTime.week"),
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				return [start, end];
			},
		},
		{
			text: $t("message.dateTime.month"),
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				return [start, end];
			},
		},
		{
			text: $t("message.dateTime.monthThree"),
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				return [start, end];
			},
		},
	];

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);

	const testI18nMessage = () => {
		tI18n.value = $t("message.title.login");
	};

	const searchCount = () => {
		console.log(form.date);
	};

	const uaInfo: any = ref<any>();
	const getUaInfo = () => {
		uaInfo.value = UA(navigator.userAgent);
	};

	const ipReal = ref<any>({});
	const ipProxy = ref<any>({});
	const ipProxyInfo = ref<any>({});

	import * as echarts from "echarts";
	const initData = () => {
		let chartDom = document.getElementById("echartsAmount")!;
		let myChart = echarts.init(chartDom);

		myChart.setOption({
			xAxis: {
				type: "category",
				data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			},
			yAxis: {
				type: "value",
			},
			series: [
				{
					data: [150, 230, 224, 218, 135, 147, 260],
					type: "line",
				},
			],
		});

		Echarts("echartsAmount1", {
			xAxis: {
				type: "category",
				data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			},
			yAxis: {
				type: "value",
			},
			series: [
				{
					data: [150, 230, 224, 218, 135, 147, 260],
					type: "line",
				},
			],
		});
	};

	const viewImg = (url: string) => {
		const image = new Image();
		image.src = url;
		const imgWindow = window.open(url);
		imgWindow.document.write(image.outerHTML);
	};

	onMounted(() => {
		getUaInfo();
		getIpIpify().then((res: any) => {
			ipProxy.value = res;
		});
		getIpApi().then((res) => {
			ipProxyInfo.value = res;
		});
		getIpUser().then((res) => {
			ipReal.value = res;
		});
		initData();
	});
</script>

<style scoped lang="scss">
	@import "./home";
</style>
