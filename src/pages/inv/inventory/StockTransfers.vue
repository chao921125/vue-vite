<template>
  <PageContainer title="库存调拨" description="管理仓库间库存调拨">
    <ProTable
      ref="proTableRef"
      :fetch-fn="stockTransferApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="200"
    >
      <el-table-column prop="transferNo" label="调拨单号" width="170" />
      <el-table-column prop="fromWarehouseName" label="调出仓库" width="120" />
      <el-table-column prop="toWarehouseName" label="调入仓库" width="120" />
      <el-table-column prop="transferDate" label="调拨日期" width="120" />
      <el-table-column prop="totalAmount" label="调拨金额" width="120" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.totalAmount" /></template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="90" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column prop="createdBy" label="操作人" width="80" />
      <el-table-column prop="createdAt" label="创建时间" width="170" />
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">详情</el-button>
        <el-button
          v-if="row.status === 'approved'"
          text
          type="success"
          size="small"
          @click="handleApprove(row)"
          >审核</el-button
        >
      </template>
    </ProTable>

    <el-drawer v-model="detailVisible" title="调拨单详情" size="60%" destroy-on-close>
      <template v-if="detailData">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="调拨单号">{{ detailData.transferNo }}</el-descriptions-item>
          <el-descriptions-item label="状态"
            ><StatusTag :status="detailData.status"
          /></el-descriptions-item>
          <el-descriptions-item label="调出仓库">{{
            detailData.fromWarehouseName
          }}</el-descriptions-item>
          <el-descriptions-item label="调入仓库">{{
            detailData.toWarehouseName
          }}</el-descriptions-item>
          <el-descriptions-item label="调拨日期">{{
            detailData.transferDate
          }}</el-descriptions-item>
          <el-descriptions-item label="调拨金额"
            ><AmountDisplay :value="detailData.totalAmount"
          /></el-descriptions-item>
          <el-descriptions-item label="操作人">{{ detailData.createdBy }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{ detailData.remark || "-" }}</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">调拨明细</el-divider>
        <el-table :data="detailData.items" border size="small">
          <el-table-column type="index" label="#" width="50" align="center" />
          <el-table-column prop="productCode" label="商品编码" width="100" />
          <el-table-column
            prop="productName"
            label="商品名称"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column prop="quantity" label="数量" width="80" align="right" />
          <el-table-column prop="unitCost" label="单位成本" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.unitCost" /></template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="120" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.amount" /></template>
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { stockTransferApi } from "@/api/modules/inventory";

const proTableRef = ref();
const detailVisible = ref(false);
const detailData = ref<any>(null);
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "调拨单号" },
  {
    prop: "status",
    label: "状态",
    type: "select" as const,
    options: [
      { label: "待审核", value: "approved" },
      { label: "已完成", value: "completed" },
    ],
  },
];

async function handleDetail(row: any) {
  const res = await stockTransferApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
}
async function handleApprove(row: any) {
  await ElMessageBox.confirm("审核调拨单后将更新库存，确定吗？", "提示", { type: "warning" });
  await stockTransferApi.approve(row.id);
  ElMessage.success("审核成功");
  proTableRef.value?.refresh();
}
</script>
