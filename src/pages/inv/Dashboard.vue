<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <StatCard :cards="statCards" />

    <!-- 图表区域 -->
    <el-row :gutter="16" style="margin-top: 8px">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
              <el-tag type="success" size="small">月度汇总</el-tag>
            </div>
          </template>
          <div ref="trendChartRef" style="height: 320px" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>销售排行 TOP5</span>
            </div>
          </template>
          <div ref="rankChartRef" style="height: 320px" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 待办和预警 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
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
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>库存预警</span>
              <el-tag type="danger" size="small">{{ warningList.length }} 项</el-tag>
            </div>
          </template>
          <el-table :data="warningList" size="small" style="width: 100%">
            <el-table-column prop="productCode" label="商品编码" width="100" />
            <el-table-column prop="productName" label="商品名称" show-overflow-tooltip />
            <el-table-column prop="warehouseName" label="仓库" width="120" />
            <el-table-column prop="availableQuantity" label="可用库存" width="90" align="right">
              <template #default="{ row }">
                <span :style="{ color: row.availableQuantity < 10 ? '#f56c6c' : '#e6a23c' }">
                  {{ row.availableQuantity }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="80" align="center">
              <template #default="{ row }">
                <el-tag :type="row.availableQuantity < 10 ? 'danger' : 'warning'" size="small">
                  {{ row.availableQuantity < 10 ? "严重不足" : "库存不足" }}
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
import { ref, onMounted, nextTick } from "vue";
import {
  ShoppingCart,
  Goods,
  Money,
  Warning,
  TrendCharts,
  Document,
} from "@element-plus/icons-vue";
import * as echarts from "echarts";
import StatCard from "@/components/inv/StatCard.vue";
import { reportApi, inventoryApi } from "@/api/modules/inventory";

const trendChartRef = ref<HTMLElement>();
const rankChartRef = ref<HTMLElement>();
const stats = ref<any>({});
const salesTrend = ref<any[]>([]);
const salesRanking = ref<any[]>([]);
const warningList = ref<any[]>([]);

const statCards = ref<any[]>([]);

const todoList = ref([
  {
    id: 1,
    title: "采购订单 PO202607100006 待收货",
    desc: "深圳电子制造有限公司 - 部分收货中",
    time: "2026-07-15",
    type: "primary",
    tagType: "warning",
    status: "进行中",
  },
  {
    id: 2,
    title: "销售订单 SO202606180004 待发货",
    desc: "深圳创新科技 - 10台笔记本电脑",
    time: "2026-06-18",
    type: "warning",
    tagType: "danger",
    status: "待处理",
  },
  {
    id: 3,
    title: "采购入库单 PR202607150004 待审核",
    desc: "需财务确认入库金额",
    time: "2026-07-15",
    type: "success",
    tagType: "info",
    status: "待审核",
  },
  {
    id: 4,
    title: "库存盘点单 ST202607010003 待录入",
    desc: "总部仓库 - 12项商品待盘点",
    time: "2026-07-01",
    type: "info",
    tagType: "info",
    status: "草稿",
  },
]);

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

  statCards.value = [
    {
      key: "sales",
      label: "销售总额",
      value: stats.value.totalSales,
      icon: ShoppingCart,
      color: "blue",
      prefix: "¥",
      extra: `本月增长 ${stats.value.monthlyGrowth}%`,
      trend: "up",
    },
    {
      key: "purchase",
      label: "采购总额",
      value: stats.value.totalPurchase,
      icon: Goods,
      color: "green",
      prefix: "¥",
    },
    {
      key: "receivable",
      label: "应收账款",
      value: stats.value.totalReceivable,
      icon: Money,
      color: "orange",
      prefix: "¥",
    },
    {
      key: "payable",
      label: "应付账款",
      value: stats.value.totalPayable,
      icon: Money,
      color: "red",
      prefix: "¥",
    },
    {
      key: "inventory",
      label: "库存总值",
      value: stats.value.totalInventory,
      icon: TrendCharts,
      color: "purple",
      prefix: "¥",
    },
    {
      key: "orders",
      label: "本月订单",
      value: stats.value.orderCount,
      icon: Document,
      color: "cyan",
      suffix: "笔",
    },
  ];

  await nextTick();
  initCharts();
}

function initCharts() {
  // 销售趋势图
  if (trendChartRef.value) {
    const chart = echarts.init(trendChartRef.value);
    chart.setOption({
      tooltip: { trigger: "axis" },
      legend: { data: ["销售额", "利润"], bottom: 0 },
      grid: { left: 50, right: 30, top: 30, bottom: 40 },
      xAxis: { type: "category", data: salesTrend.value.map((i) => i.date), boundaryGap: false },
      yAxis: [
        {
          type: "value",
          name: "金额(元)",
          axisLabel: { formatter: (v: number) => v / 10000 + "万" },
        },
      ],
      series: [
        {
          name: "销售额",
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
          name: "利润",
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
    window.addEventListener("resize", () => chart.resize());
  }

  // 销售排行图
  if (rankChartRef.value) {
    const chart = echarts.init(rankChartRef.value);
    const names = salesRanking.value.map((i) =>
      i.name.length > 8 ? i.name.substring(0, 8) + "..." : i.name,
    );
    chart.setOption({
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      grid: { left: 100, right: 30, top: 10, bottom: 30 },
      xAxis: { type: "value", axisLabel: { formatter: (v: number) => v / 10000 + "万" } },
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
            formatter: (p: any) => "¥" + (p.value / 10000).toFixed(1) + "万",
            fontSize: 10,
          },
        },
      ],
    });
    window.addEventListener("resize", () => chart.resize());
  }
}

onMounted(loadData);
</script>

<style scoped lang="scss">
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
</style>
