<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<h1>{{ now }}</h1>
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
	import Echarts from "@/plugins/echarts";
	import { formatAxis } from "@/plugins/utils/format";

	const now = ref(formatAxis(new Date()));

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 3000);

	import * as echarts from "echarts";
	const initData = () => {
		let chartDom = document.getElementById("echartsAmount") as HTMLDivElement;
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

	// const viewImg = (url: string) => {
	// 	const image = new Image();
	// 	image.src = url;
	// 	const imgWindow = window.open(url);
	// 	imgWindow?.document.write(image.outerHTML);
	// };

	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss">
	@import "./home";
</style>
