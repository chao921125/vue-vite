<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <StatCard :cards="statCards" />

    <!-- 图表区域 -->
    <el-row :gutter="16" style="margin-top: 8px">
      <el-col :span="16" :xs="24" :sm="24" :md="16">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>{{ $t("message.inv.dashboard.charts.salesTrend") }}</span>
              <el-tag type="success" size="small">
                {{ $t("message.inv.dashboard.charts.monthlySummary") }}
              </el-tag>
            </div>
          </template>
          <div ref="trendChartRef" class="chart-box" style="height: 320px" />
        </el-card>
      </el-col>
      <el-col :span="8" :xs="24" :sm="24" :md="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>{{ $t("message.inv.dashboard.charts.salesRank") }}</span>
            </div>
          </template>
          <div ref="rankChartRef" class="chart-box" style="height: 320px" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 待办和预警 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="12" :xs="24" :sm="24" :md="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>{{ $t("message.inv.dashboard.todo.title") }}</span>
              <el-badge :value="todoList.length" type="warning" />
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="item in todoList"
              :key="item.id"
              :timestamp="item.time"
              :type="item.type as any"
              placement="top"
            >
              <div class="todo-item">
                <span class="todo-title">{{ item.title }}</span>
                <el-tag :type="item.tagType as any" size="small">{{ item.status }}</el-tag>
              </div>
              <p class="todo-desc">{{ item.desc }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24" :sm="24" :md="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>{{ $t("message.inv.dashboard.warning.title") }}</span>
              <el-tag type="danger" size="small">
                {{ $t("message.inv.dashboard.warning.count", { count: warningList.length }) }}
              </el-tag>
            </div>
          </template>
          <el-table :data="warningList" size="small" class="detail-table-wrap" style="width: 100%">
            <el-table-column
              prop="productCode"
              :label="$t('message.inv.dashboard.warning.columns.productCode')"
              width="100"
            />
            <el-table-column
              prop="productName"
              :label="$t('message.inv.dashboard.warning.columns.productName')"
              show-overflow-tooltip
            />
            <el-table-column
              prop="warehouseName"
              :label="$t('message.inv.dashboard.warning.columns.warehouseName')"
              width="120"
            />
            <el-table-column
              prop="availableQuantity"
              :label="$t('message.inv.dashboard.warning.columns.availableQuantity')"
              width="90"
              align="right"
            >
              <template #default="{ row }">
                <span :style="{ color: row.availableQuantity < 10 ? '#f56c6c' : '#e6a23c' }">
                  {{ row.availableQuantity }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('message.inv.dashboard.warning.columns.status')"
              width="80"
              align="center"
            >
              <template #default="{ row }">
                <el-tag :type="row.availableQuantity < 10 ? 'danger' : 'warning'" size="small">
                  {{
                    row.availableQuantity < 10
                      ? $t("message.inv.dashboard.warning.status.critical")
                      : $t("message.inv.dashboard.warning.status.low")
                  }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useI18n } from "vue-i18n";
import { ShoppingCart, Goods, Money, TrendCharts, Document } from "@element-plus/icons-vue";
import * as echarts from "echarts";
import StatCard from "@/components/inv/StatCard.vue";
import { reportApi, inventoryApi } from "@/api/modules/inventory";

const { t, tm, locale } = useI18n();

const trendChartRef = ref<HTMLElement>();
const rankChartRef = ref<HTMLElement>();
const stats = ref<any>(null);
const salesTrend = ref<any[]>([]);
const salesRanking = ref<any[]>([]);
const warningList = ref<any[]>([]);

let trendChart: echarts.ECharts | null = null;
let rankChart: echarts.ECharts | null = null;

/** 金额刻度配置：scale 为换算基数，suffix 为刻度后缀 */
const amountUnit = computed(() => {
  const unit = tm("message.inv.dashboard.charts.unit") as {
    scale?: number;
    suffix?: string;
  };
  return { scale: unit?.scale ?? 10000, suffix: unit?.suffix ?? "" };
});

/** 统计卡片：computed 保证切换语言时 label / extra 文案同步刷新 */
const statCards = computed<any[]>(() => {
  if (!stats.value) return [];
  const s = stats.value;
  return [
    {
      key: "sales",
      label: t("message.inv.dashboard.statCards.totalSales"),
      value: s.totalSales,
      icon: ShoppingCart,
      color: "blue",
      prefix: "¥",
      extra: t("message.inv.dashboard.statCards.monthlyGrowth", { growth: s.monthlyGrowth }),
      trend: "up",
    },
    {
      key: "purchase",
      label: t("message.inv.dashboard.statCards.totalPurchase"),
      value: s.totalPurchase,
      icon: Goods,
      color: "green",
      prefix: "¥",
    },
    {
      key: "receivable",
      label: t("message.inv.dashboard.statCards.totalReceivable"),
      value: s.totalReceivable,
      icon: Money,
      color: "orange",
      prefix: "¥",
    },
    {
      key: "payable",
      label: t("message.inv.dashboard.statCards.totalPayable"),
      value: s.totalPayable,
      icon: Money,
      color: "red",
      prefix: "¥",
    },
    {
      key: "inventory",
      label: t("message.inv.dashboard.statCards.totalInventory"),
      value: s.totalInventory,
      icon: TrendCharts,
      color: "purple",
      prefix: "¥",
    },
    {
      key: "orders",
      label: t("message.inv.dashboard.statCards.orderCount"),
      value: s.orderCount,
      icon: Document,
      color: "cyan",
      suffix: t("message.inv.dashboard.statCards.orderUnit"),
    },
  ];
});

/** 待办事项：文案取自语言包，computed 保证切换语言时同步刷新 */
const todoList = computed<any[]>(() => [
  {
    id: 1,
    title: t("message.inv.dashboard.todo.items.purchaseReceiving.title", {
      orderNo: "PO202607100006",
    }),
    desc: t("message.inv.dashboard.todo.items.purchaseReceiving.desc"),
    time: "2026-07-15",
    type: "primary",
    tagType: "warning",
    status: t("message.inv.dashboard.todo.status.inProgress"),
  },
  {
    id: 2,
    title: t("message.inv.dashboard.todo.items.salesDelivery.title", {
      orderNo: "SO202606180004",
    }),
    desc: t("message.inv.dashboard.todo.items.salesDelivery.desc", { quantity: 10 }),
    time: "2026-06-18",
    type: "warning",
    tagType: "danger",
    status: t("message.inv.dashboard.todo.status.pending"),
  },
  {
    id: 3,
    title: t("message.inv.dashboard.todo.items.inboundReview.title", {
      orderNo: "PR202607150004",
    }),
    desc: t("message.inv.dashboard.todo.items.inboundReview.desc"),
    time: "2026-07-15",
    type: "success",
    tagType: "info",
    status: t("message.inv.dashboard.todo.status.pendingReview"),
  },
  {
    id: 4,
    title: t("message.inv.dashboard.todo.items.stockTaking.title", {
      orderNo: "ST202607010003",
    }),
    desc: t("message.inv.dashboard.todo.items.stockTaking.desc", { count: 12 }),
    time: "2026-07-01",
    type: "info",
    tagType: "info",
    status: t("message.inv.dashboard.todo.status.draft"),
  },
]);

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  await loadData();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  trendChart?.dispose();
  rankChart?.dispose();
  trendChart = null;
  rankChart = null;
});

// 切换语言后重绘图表，保证图例、坐标轴与单位文案同步刷新
watch(locale, async () => {
  await nextTick();
  initCharts();
});

/** 窗口尺寸变化时同步图表尺寸 */
function handleResize() {
  trendChart?.resize();
  rankChart?.resize();
}

async function loadData() {
  const [dashRes, trendRes, rankRes, warnRes] = await Promise.all([
    reportApi.dashboard(),
    reportApi.salesTrend(),
    reportApi.salesRanking(),
    inventoryApi.warnings(),
  ]);

  stats.value = dashRes.data;
  salesTrend.value = trendRes.data;
  salesRanking.value = (rankRes.data || []).slice(0, 5);
  warningList.value = warnRes.data || [];

  await nextTick();
  initCharts();
  // 窄屏下栅格换行后图表宽度需重新计算
  await nextTick();
  handleResize();
}

/** 初始化图表：语言切换时重建，保证文案与当前语言一致 */
function initCharts() {
  initTrendChart();
  initRankChart();
}

function initTrendChart() {
  if (!trendChartRef.value) return;
  trendChart?.dispose();
  const chart = echarts.init(trendChartRef.value);
  trendChart = chart;
  const unit = amountUnit.value;
  const salesAmount = t("message.inv.dashboard.charts.legend.salesAmount");
  const profit = t("message.inv.dashboard.charts.legend.profit");
  chart.setOption({
    tooltip: { trigger: "axis" },
    legend: { data: [salesAmount, profit], bottom: 0 },
    grid: { left: 50, right: 30, top: 30, bottom: 40 },
    xAxis: { type: "category", data: salesTrend.value.map((i) => i.date), boundaryGap: false },
    yAxis: [
      {
        type: "value",
        name: t("message.inv.dashboard.charts.axis.amount"),
        axisLabel: { formatter: (v: number) => v / unit.scale + unit.suffix },
      },
    ],
    series: [
      {
        name: salesAmount,
        type: "line",
        smooth: true,
        data: salesTrend.value.map((i) => i.totalAmount),
        itemStyle: { color: "#409eff" },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(64,158,255,0.3)" },
            { offset: 1, color: "rgba(64,158,255,0)" },
          ]),
        },
      },
      {
        name: profit,
        type: "line",
        smooth: true,
        data: salesTrend.value.map((i) => i.totalProfit),
        itemStyle: { color: "#67c23a" },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(103,194,58,0.3)" },
            { offset: 1, color: "rgba(103,194,58,0)" },
          ]),
        },
      },
    ],
  });
}

function initRankChart() {
  if (!rankChartRef.value) return;
  rankChart?.dispose();
  const chart = echarts.init(rankChartRef.value);
  rankChart = chart;
  const unit = amountUnit.value;
  const names = salesRanking.value.map((i) =>
    i.name.length > 8 ? i.name.substring(0, 8) + "..." : i.name,
  );
  chart.setOption({
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: 100, right: 30, top: 10, bottom: 30 },
    xAxis: { type: "value", axisLabel: { formatter: (v: number) => v / unit.scale + unit.suffix } },
    yAxis: { type: "category", data: names.reverse(), axisLabel: { fontSize: 11 } },
    series: [
      {
        type: "bar",
        data: salesRanking.value.map((i) => i.amount).reverse(),
        barWidth: 18,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#409eff" },
            { offset: 1, color: "#67c23a" },
          ]),
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: "right",
          formatter: (p: any) => "¥" + (p.value / unit.scale).toFixed(1) + unit.suffix,
          fontSize: 10,
        },
      },
    ],
  });
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

.dashboard {
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
  }

  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .todo-title {
      font-weight: 500;
      font-size: 14px;
    }
  }

  .todo-desc {
    margin: 4px 0 0;
    font-size: 12px;
    color: #909399;
  }
}

// 窄屏下降低图表高度，避免图表占满屏幕
.chart-box {
  @include d.mobile {
    height: 240px !important;
  }
}

// 库存预警表格：窄屏下列宽较多，容器允许横向滚动
.detail-table-wrap {
  overflow-x: auto;
}
</style>
