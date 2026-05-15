<script setup lang="ts">
// 折线图 多条
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

declare interface IChart {
  name: string;
  type: string;
  stack: string;
  data: number[];
}

interface LineStackedProps {
  id?: string;
  legendData?: string[];
  xAxisData?: string[];
  seriesData?: number[][];
  color?: string[];
}

const props = withDefaults(defineProps<LineStackedProps>(), {
  id: "main",
  legendData: () => [],
  xAxisData: () => [],
  seriesData: () => [],
  color: () => ["#80D3CB", "#007177", "#F08080", "#B2F26E", "#FFCC00"],
});

const drawChart = () => {
  if (!props.seriesData?.length) return false;
  const chartDom = document.getElementById(`${props.id}`);
  if (!chartDom) return false;
  let myChart = echarts.getInstanceByDom(chartDom);
  if (!myChart) {
    myChart = echarts.init(chartDom);
  }
  myChart.clear();

  let seriesArray: any[] = [];
  if (props.legendData?.length) {
    props.legendData.forEach((item: string, index: number) => {
      seriesArray.push({
        name: item,
        type: "line",
        stack: "Total",
        data: props.seriesData?.[index] || [],
      });
    });
  }

  const option: EChartsOption = {
    color: props.color,
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: props.legendData,
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
      data: props.xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: seriesArray,
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
  <div class="w100 h100 chart-box" :id="props.id" :ref="props.id"></div>
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
