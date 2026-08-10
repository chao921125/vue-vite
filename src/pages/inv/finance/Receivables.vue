<template>
  <PageContainer title="应收账款" description="管理客户应收账款，支持账龄分析">
    <template #header>
      <el-tag type="warning">应收总额: <AmountDisplay :value="totalReceivable" /></el-tag>
      <el-tag type="danger">逾期总额: <AmountDisplay :value="totalOverdue" /></el-tag>
    </template>
    <ProTable ref="proTableRef" :fetch-fn="receivableApi.list" :search-fields="searchFields">
      <el-table-column prop="receivableNo" label="应收单号" width="170" />
      <el-table-column prop="sourceNo" label="来源单号" width="170" />
      <el-table-column prop="customerName" label="客户" min-width="180" show-overflow-tooltip />
      <el-table-column prop="receivableAmount" label="应收金额" width="120" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.receivableAmount" /></template>
      </el-table-column>
      <el-table-column prop="settledAmount" label="已核销" width="110" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.settledAmount" /></template>
      </el-table-column>
      <el-table-column prop="balance" label="余额" width="110" align="right">
        <template #default="{ row }"
          ><span :style="{ color: row.balance > 0 ? '#f56c6c' : '#67c23a' }"
            ><AmountDisplay :value="row.balance" /></span
        ></template>
      </el-table-column>
      <el-table-column prop="billingDate" label="账单日期" width="110" />
      <el-table-column prop="dueDate" label="到期日期" width="110" />
      <el-table-column prop="status" label="状态" width="90" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
    </ProTable>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { receivableApi } from "@/api/modules/inventory";

const proTableRef = ref();
const totalReceivable = ref(0);
const totalOverdue = ref(0);
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "应收单号/客户" },
  {
    prop: "status",
    label: "状态",
    type: "select" as const,
    options: [
      { label: "未核销", value: "unsettled" },
      { label: "部分核销", value: "partial" },
      { label: "已核销", value: "settled" },
      { label: "已逾期", value: "overdue" },
    ],
  },
];

onMounted(async () => {
  const res = await receivableApi.list({ page: 1, pageSize: 1000 });
  const list = res.data?.list || [];
  totalReceivable.value = list.reduce((s: number, i: any) => s + i.balance, 0);
  totalOverdue.value = list
    .filter((i: any) => i.status === "overdue")
    .reduce((s: number, i: any) => s + i.balance, 0);
});
</script>
