<template>
	<div class="w100 h100 chart-box" :id="props.id" :ref="props.id"></div>
</template>

<script lang="ts" setup name="LineStacked">
	// 折线图 多条
	import * as echarts from "echarts";
	import { onMounted, watch } from "vue";

	type EChartsOption = echarts.EChartsOption;

	const props = defineProps({
		id: {
			type: String,
			require: true,
			default: "main",
		},
		legendData: {
			type: Array,
			default: () => [],
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
		let chartDom = <HTMLElement>document.getElementById(`${props.id}`)!;
		let myChart = echarts.getInstanceByDom(chartDom);
		if (!myChart) {
			myChart = echarts.init(chartDom);
		}
		myChart.clear();
		let option: EChartsOption;

		let seriesArray: any[] = [];
		if (props.legendData?.length) {
			props.legendData.map((item: any, index: number) => {
				seriesArray.push({
					name: item,
					type: "line",
					stack: "Total",
					data: props.seriesData[index],
				});
			});
		}

		option = {
			color: <any>props.color,
			tooltip: {
				trigger: "axis",
			},
			legend: {
				data: <any>props.legendData,
				left: "left",
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true,
			},
			xAxis: {
				type: "category",
				boundaryGap: false,
				data: <any>props.xAxisData,
			},
			yAxis: {
				type: "value",
			},
			series: <any>seriesArray,
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
