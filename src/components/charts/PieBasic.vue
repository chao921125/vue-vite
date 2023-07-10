<template>
	<div class="w100 h100 chart-box" :id="props.id" :ref="props.id"></div>
</template>

<script lang="ts" setup name="BarBasic">
	// 饼图
	import * as echarts from "echarts";
	import { onMounted, watch } from "vue";

	type EChartsOption = echarts.EChartsOption;

	const props = defineProps({
		id: {
			type: String,
			require: true,
			default: "main",
		},
		seriesName: {
			type: String,
			default: "",
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
		let chartDom = document.getElementById(`${props.id}`)! as HTMLDivElement;
		let myChart = echarts.getInstanceByDom(chartDom);
		if (!myChart) {
			myChart = echarts.init(chartDom);
		}
		myChart.clear();
		let option: EChartsOption;

		option = {
			color: props.color as any,
			tooltip: {
				trigger: "item",
			},
			series: [
				{
					name: props.seriesName,
					type: "pie",
					radius: "50%",
					data: props.seriesData as any,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "rgba(0, 0, 0, 0.5)",
						},
					},
					label: {
						formatter: (e: any) => {
							let data = e.data;
							return `{name|${data.name}}: {value|${data.value}}`;
						},
						rich: {
							name: {
								color: "#999",
							},
							value: {
								fontSize: 22,
								fontWeight: "bold",
							},
						},
					},
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
	@use "./index.scss";

	.chart-box {
		div {
			width: 100% !important;

			canvas {
				width: 100% !important;
			}
		}
	}
</style>
