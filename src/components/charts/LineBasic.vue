<template>
	<div class="w100 h100 chart-box" :id="props.id" :ref="props.id"></div>
</template>

<script lang="ts" setup name="LineBasic">
	// 折线图 单条
	import * as echarts from "echarts";
	import { onMounted, watch } from "vue";

	type EChartsOption = echarts.EChartsOption;

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
		let chartDom = <HTMLElement>document.getElementById(`${props.id}`);
		let myChart = echarts.getInstanceByDom(chartDom);
		if (!myChart) {
			myChart = echarts.init(chartDom);
		}
		myChart.clear();
		let option: EChartsOption;

		option = {
			color: <any>props.color,
			tooltip: {
				trigger: "axis",
			},
			xAxis: {
				type: "category",
				data: <any>props.xAxisData,
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
					data: <any>props.seriesData,
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

<style scoped lang="scss">
	@import "./index";

	.chart-box {
		div {
			width: 100% !important;

			canvas {
				width: 100% !important;
			}
		}
	}
</style>
