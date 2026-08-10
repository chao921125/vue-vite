<template>
  <PageContainer title="收款管理" description="管理客户收款单据，核销应收账款">
    <ProTable
      ref="proTableRef"
      :fetch-fn="receiptApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="120"
    >
      <el-table-column prop="receiptNo" label="收款单号" width="170" />
      <el-table-column prop="customerName" label="客户" min-width="180" show-overflow-tooltip />
      <el-table-column prop="accountName" label="收款账户" width="140" />
      <el-table-column prop="receiptDate" label="收款日期" width="110" />
      <el-table-column prop="amount" label="收款金额" width="120" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.amount" /></template>
      </el-table-column>
      <el-table-column prop="paymentMethod" label="收款方式" width="100" />
      <el-table-column prop="status" label="状态" width="90" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column prop="createdBy" label="操作人" width="80" />
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">详情</el-button>
      </template>
    </ProTable>

    <el-drawer v-model="detailVisible" title="收款单详情" size="60%" destroy-on-close>
      <template v-if="detailData">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="收款单号">{{ detailData.receiptNo }}</el-descriptions-item>
          <el-descriptions-item label="状态"
            ><StatusTag :status="detailData.status"
          /></el-descriptions-item>
          <el-descriptions-item label="客户">{{ detailData.customerName }}</el-descriptions-item>
          <el-descriptions-item label="收款账户">{{ detailData.accountName }}</el-descriptions-item>
          <el-descriptions-item label="收款日期">{{ detailData.receiptDate }}</el-descriptions-item>
          <el-descriptions-item label="收款金额"
            ><AmountDisplay :value="detailData.amount"
          /></el-descriptions-item>
          <el-descriptions-item label="收款方式">{{
            detailData.paymentMethod
          }}</el-descriptions-item>
          <el-descriptions-item label="操作人">{{ detailData.createdBy }}</el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">{{
            detailData.remark || "-"
          }}</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">核销明细</el-divider>
        <el-table :data="detailData.details" border size="small">
          <el-table-column type="index" label="#" width="50" align="center" />
          <el-table-column prop="receivableNo" label="应收单号" width="170" />
          <el-table-column prop="receivableAmount" label="应收金额" width="120" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.receivableAmount" /></template>
          </el-table-column>
          <el-table-column prop="settledAmount" label="已核销" width="110" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.settledAmount" /></template>
          </el-table-column>
          <el-table-column prop="thisSettleAmount" label="本次核销" width="110" align="right">
            <template #default="{ row }"
              ><span style="color: #409eff; font-weight: 600"
                ><AmountDisplay :value="row.thisSettleAmount" /></span
            ></template>
          </el-table-column>
          <el-table-column prop="balance" label="余额" width="110" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.balance" /></template>
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { receiptApi } from "@/api/modules/inventory";

const proTableRef = ref();
const detailVisible = ref(false);
const detailData = ref<any>(null);
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "收款单号/客户" },
  {
    prop: "status",
    label: "状态",
    type: "select" as const,
    options: [{ label: "已完成", value: "completed" }],
  },
];

async function handleDetail(row: any) {
  const res = await receiptApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
}
</script>
