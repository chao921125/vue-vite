<template>
  <PageContainer title="销售分析" description="销售趋势、排行、毛利分析">
    <el-row :gutter="16" style="margin-bottom: 16px">
      <el-col :span="14">
        <el-card shadow="never">
          <template #header><span>销售趋势分析</span></template>
          <div ref="trendRef" style="height: 320px" />
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="never">
          <template #header><span>销售类别占比</span></template>
          <div ref="pieRef" style="height: 320px" />
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never">
      <template #header><span>商品销售排行</span></template>
      <el-table :data="rankingData" border size="small">
        <el-table-column label="排名" width="70" align="center">
          <template #default="{ row }">
            <el-tag :type="row.rank <= 3 ? 'danger' : 'info'" size="small" round>{{
              row.rank
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="quantity" label="销售数量" width="100" align="right" sortable />
        <el-table-column
          label="销售金额"
          width="120"
          align="right"
          sortable
          :sort-method="(a: any, b: any) => a.amount - b.amount"
        >
          <template #default="{ row }"><AmountDisplay :value="row.amount" /></template>
        </el-table-column>
        <el-table-column
          label="毛利"
          width="120"
          align="right"
          sortable
          :sort-method="(a: any, b: any) => a.profit - b.profit"
        >
          <template #default="{ row }"
            ><span style="color: #67c23a"><AmountDisplay :value="row.profit" /></span
          ></template>
        </el-table-column>
        <el-table-column label="毛利率" width="100" align="right">
          <template #default="{ row }">
            <el-progress :percentage="row.profitRate" :stroke-width="8" :text-inside="true" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import * as echarts from "echarts";
import PageContainer from "@/components/inv/PageContainer.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { reportApi } from "@/api/modules/inventory";

const trendRef = ref<HTMLElement>();
const pieRef = ref<HTMLElement>();
const rankingData = ref<any[]>([]);
const trendData = ref<any[]>([]);

onMounted(async () => {
  const [trendRes, rankRes] = await Promise.all([reportApi.salesTrend(), reportApi.salesRanking()]);
  trendData.value = trendRes.data || [];
  rankingData.value = rankRes.data || [];

  await nextTick();
  initTrendChart();
  initPieChart();
});

function initTrendChart() {
  if (!trendRef.value) return;
  const chart = echarts.init(trendRef.value);
  chart.setOption({
    tooltip: { trigger: "axis" },
    legend: { data: ["销售额", "利润", "订单数"], bottom: 0 },
    grid: { left: 60, right: 60, top: 30, bottom: 40 },
    xAxis: { type: "category", data: trendData.value.map((i) => i.date) },
    yAxis: [
      { type: "value", name: "金额", axisLabel: { formatter: (v: number) => v / 10000 + "万" } },
      { type: "value", name: "订单数", position: "right" },
    ],
    series: [
      {
        name: "销售额",
        type: "bar",
        data: trendData.value.map((i) => i.totalAmount),
        itemStyle: { color: "#409eff" },
        barWidth: 24,
      },
      {
        name: "利润",
        type: "line",
        data: trendData.value.map((i) => i.totalProfit),
        smooth: true,
        itemStyle: { color: "#67c23a" },
        lineStyle: { width: 3 },
      },
      {
        name: "订单数",
        type: "line",
        yAxisIndex: 1,
        data: trendData.value.map((i) => i.orderCount),
        smooth: true,
        itemStyle: { color: "#e6a23c" },
      },
    ],
  });
  window.addEventListener("resize", () => chart.resize());
}

function initPieChart() {
  if (!pieRef.value) return;
  const chart = echarts.init(pieRef.value);
  const categories = ["电子产品", "办公耗材", "办公家具"];
  const colors = ["#409eff", "#67c23a", "#e6a23c"];
  const data = categories.map((cat, i) => ({
    name: cat,
    value: rankingData.value
      .filter((r) => {
        if (cat === "电子产品")
          return [
            "笔记本电脑 Pro 15",
            "27寸4K显示器",
            "USB-C 扩展坞",
            "机械键盘 K870",
            "无线鼠标 M200",
          ].includes(r.name);
        if (cat === "办公耗材") return ["中性笔 0.5mm 黑色", "A4打印纸 80g"].includes(r.name);
        return ["办公椅 人体工学"].includes(r.name);
      })
      .reduce((s, r) => s + r.amount, 0),
    itemStyle: { color: colors[i] },
  }));
  chart.setOption({
    tooltip: { trigger: "item", formatter: "{b}: ¥{c} ({d}%)" },
    legend: { bottom: 0 },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "45%"],
        label: { formatter: "{b}\n{d}%" },
        data,
      },
    ],
  });
  window.addEventListener("resize", () => chart.resize());
}
</script>
