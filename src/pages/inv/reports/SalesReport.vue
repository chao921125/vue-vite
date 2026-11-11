<template>
  <PageContainer
    :title="$t('message.inv.report.salesReport.title')"
    :description="$t('message.inv.report.salesReport.desc')"
  >
    <el-row :gutter="16" style="margin-bottom: 16px">
      <el-col :span="14" :xs="24" :sm="24" :md="14">
        <el-card shadow="never">
          <template #header>
            <span>{{ $t("message.inv.report.salesReport.charts.trendTitle") }}</span>
          </template>
          <div ref="trendRef" class="chart-box" style="height: 320px" />
        </el-card>
      </el-col>
      <el-col :span="10" :xs="24" :sm="24" :md="10">
        <el-card shadow="never">
          <template #header>
            <span>{{ $t("message.inv.report.salesReport.charts.pieTitle") }}</span>
          </template>
          <div ref="pieRef" class="chart-box" style="height: 320px" />
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never">
      <template #header>
        <span>{{ $t("message.inv.report.salesReport.charts.rankingTitle") }}</span>
      </template>
      <el-table :data="rankingData" border size="small">
        <el-table-column
          :label="$t('message.inv.report.salesReport.columns.rank')"
          width="70"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="row.rank <= 3 ? 'danger' : 'info'" size="small" round>{{
              row.rank
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('message.inv.report.salesReport.columns.productName')"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="quantity"
          :label="$t('message.inv.report.salesReport.columns.quantity')"
          width="100"
          align="right"
          sortable
        />
        <el-table-column
          :label="$t('message.inv.report.salesReport.columns.amount')"
          width="120"
          align="right"
          sortable
          :sort-method="(a: any, b: any) => a.amount - b.amount"
        >
          <template #default="{ row }"><AmountDisplay :value="row.amount" /></template>
        </el-table-column>
        <el-table-column
          :label="$t('message.inv.report.salesReport.columns.profit')"
          width="120"
          align="right"
          sortable
          :sort-method="(a: any, b: any) => a.profit - b.profit"
        >
          <template #default="{ row }"
            ><span style="color: #67c23a"><AmountDisplay :value="row.profit" /></span
          ></template>
        </el-table-column>
        <el-table-column
          :label="$t('message.inv.report.salesReport.columns.profitRate')"
          width="100"
          align="right"
        >
          <template #default="{ row }">
            <el-progress :percentage="row.profitRate" :stroke-width="8" :text-inside="true" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useI18n } from "vue-i18n";
import * as echarts from "echarts";
import PageContainer from "@/components/inv/PageContainer.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { reportApi } from "@/api/modules/inventory";

const { t, tm, locale } = useI18n();

const trendRef = ref<HTMLElement>();
const pieRef = ref<HTMLElement>();
const rankingData = ref<any[]>([]);
const trendData = ref<any[]>([]);

let trendChart: echarts.ECharts | null = null;
let pieChart: echarts.ECharts | null = null;

/** 销售类别选项：value 为接口分类名，label 为展示文案，products 为该类别下的商品名称 */
const categoryOptions = computed(() =>
  Object.entries(
    tm("message.inv.report.salesReport.options.category") as Record<
      string,
      { value: string; label: string; products: string[] }
    >,
  ).map(([code, item]) => ({ code, ...item })),
);

/** 金额刻度配置：scale 为换算基数，suffix 为刻度后缀 */
const amountUnit = computed(() => {
  const unit = tm("message.inv.report.salesReport.charts.unit") as {
    scale?: number;
    suffix?: string;
  };
  return { scale: unit.scale ?? 10000, suffix: unit.suffix ?? "" };
});

onMounted(async () => {
  const [trendRes, rankRes] = await Promise.all([reportApi.salesTrend(), reportApi.salesRanking()]);
  trendData.value = trendRes.data || [];
  rankingData.value = rankRes.data || [];

  await nextTick();
  initTrendChart();
  initPieChart();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  trendChart?.dispose();
  pieChart?.dispose();
  trendChart = null;
  pieChart = null;
});

// 切换语言后重绘图表，保证图例、坐标轴与单位文案同步刷新
watch(locale, async () => {
  await nextTick();
  initTrendChart();
  initPieChart();
});

/** 窗口尺寸变化时同步图表尺寸 */
function handleResize() {
  trendChart?.resize();
  pieChart?.resize();
}

function initTrendChart() {
  if (!trendRef.value) return;
  trendChart?.dispose();
  const chart = echarts.init(trendRef.value);
  trendChart = chart;
  const unit = amountUnit.value;
  const salesAmount = t("message.inv.report.salesReport.charts.legend.salesAmount");
  const profit = t("message.inv.report.salesReport.charts.legend.profit");
  const orderCount = t("message.inv.report.salesReport.charts.legend.orderCount");
  chart.setOption({
    tooltip: { trigger: "axis" },
    legend: { data: [salesAmount, profit, orderCount], bottom: 0 },
    grid: { left: 60, right: 60, top: 30, bottom: 40 },
    xAxis: { type: "category", data: trendData.value.map((i) => i.date) },
    yAxis: [
      {
        type: "value",
        name: t("message.inv.report.salesReport.charts.axis.amount"),
        axisLabel: { formatter: (v: number) => v / unit.scale + unit.suffix },
      },
      {
        type: "value",
        name: t("message.inv.report.salesReport.charts.axis.orderCount"),
        position: "right",
      },
    ],
    series: [
      {
        name: salesAmount,
        type: "bar",
        data: trendData.value.map((i) => i.totalAmount),
        itemStyle: { color: "#409eff" },
        barWidth: 24,
      },
      {
        name: profit,
        type: "line",
        data: trendData.value.map((i) => i.totalProfit),
        smooth: true,
        itemStyle: { color: "#67c23a" },
        lineStyle: { width: 3 },
      },
      {
        name: orderCount,
        type: "line",
        yAxisIndex: 1,
        data: trendData.value.map((i) => i.orderCount),
        smooth: true,
        itemStyle: { color: "#e6a23c" },
      },
    ],
  });
}

function initPieChart() {
  if (!pieRef.value) return;
  pieChart?.dispose();
  const chart = echarts.init(pieRef.value);
  pieChart = chart;
  const colors = ["#409eff", "#67c23a", "#e6a23c"];
  const data = categoryOptions.value.map((cat, i) => ({
    name: cat.label,
    value: rankingData.value
      .filter((r) => cat.products.includes(r.name))
      .reduce((s, r) => s + r.amount, 0),
    itemStyle: { color: colors[i % colors.length] },
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
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

// 窄屏下降低图表高度，避免图表在小屏幕上占据过多空间
.chart-box {
  @include d.mobile {
    height: 240px !important;
  }
}
</style>
