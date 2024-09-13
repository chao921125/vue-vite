<script setup lang="ts">
	// 折线图 单条
	import * as echarts from "echarts";
	import { onMounted, watch } from "vue";

	const props = defineProps({
		id: {
			type: String,
			require: true,
			default: "main",
		},
		xAxisData: {
			type: Array,
			default: () => [],
		},
		seriesData: {
			type: Array,
			default: () => [],
		},
		color: {
			type: Array,
			default: () => ["#80D3CB", "#007177", "#F08080", "#B2F26E", "#FFCC00"],
		},
	});

	const drawChart = () => {
		if (!props.seriesData?.length) return false;
		let chartDom = document.getElementById(`${props.id}`) as HTMLDivElement;
		let myChart = echarts.getInstanceByDom(chartDom);
		if (!myChart) {
			myChart = echarts.init(chartDom);
		}
		myChart.clear();
		let option: echarts.EChartOption;

		option = {
			color: props.color as any,
			tooltip: {
				trigger: "axis",
			},
			xAxis: {
				type: "category",
				data: props.xAxisData as any,
			},
			yAxis: {
				type: "value",
			},
			grid: {
				top: "15",
				right: "1%",
				bottom: "25",
				left: "10%",
			},
			series: [
				{
					data: props.seriesData as any,
					type: "line",
					symbol: "circle",
					symbolSize: 6,
				},
			],
		};

		option && myChart.setOption(option);
		myChart.resize();
	};

	onMounted(() => {
		drawChart();
	});
	watch(
		props,
		() => {
			drawChart();
		},
		{
			deep: true,
		},
	);
	defineExpose({
		drawChart,
	});
</script>

<template>
	<div
		class="w100 h100 chart-box"
		:id="props.id"
		:ref="props.id"></div>
</template>

<style scoped lang="scss">
	.chart-box {
		div {
			width: 100% !important;

			canvas {
				width: 100% !important;
			}
		}
	}
</style>
