<template>
	<el-row>
		<el-col :span="12">
			<div id="echartsAmount" style="height: 300px"></div>
		</el-col>
		<el-col :span="12">
			<div id="echartsAmount1" style="height: 300px"></div>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Echart">
	import Echarts from "@/plugins/echarts";

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

<style scoped lang="scss"></style>
