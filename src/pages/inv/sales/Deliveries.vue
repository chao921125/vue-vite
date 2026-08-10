<template>
  <PageContainer title="销售出库" description="管理销售出库单据">
    <ProTable
      ref="proTableRef"
      :fetch-fn="salesDeliveryApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="200"
    >
      <el-table-column prop="deliveryNo" label="出库单号" width="170" />
      <el-table-column prop="orderNo" label="销售订单号" width="170" />
      <el-table-column prop="customerName" label="客户" min-width="180" show-overflow-tooltip />
      <el-table-column prop="warehouseName" label="发货仓库" width="110" />
      <el-table-column prop="deliveryDate" label="出库日期" width="110" />
      <el-table-column prop="totalAmount" label="出库金额" width="120" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.totalAmount" /></template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="90" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column prop="createdBy" label="操作人" width="80" />
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">详情</el-button>
        <el-button
          v-if="row.status === 'approved'"
          text
          type="success"
          size="small"
          @click="handleApprove(row)"
          >审核出库</el-button
        >
      </template>
    </ProTable>

    <el-drawer v-model="detailVisible" title="出库单详情" size="70%" destroy-on-close>
      <template v-if="detailData">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="出库单号">{{ detailData.deliveryNo }}</el-descriptions-item>
          <el-descriptions-item label="销售订单">{{ detailData.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="客户">{{ detailData.customerName }}</el-descriptions-item>
          <el-descriptions-item label="发货仓库">{{
            detailData.warehouseName
          }}</el-descriptions-item>
          <el-descriptions-item label="出库日期">{{
            detailData.deliveryDate
          }}</el-descriptions-item>
          <el-descriptions-item label="状态"
            ><StatusTag :status="detailData.status"
          /></el-descriptions-item>
          <el-descriptions-item label="出库金额"
            ><AmountDisplay :value="detailData.totalAmount"
          /></el-descriptions-item>
          <el-descriptions-item label="操作人">{{ detailData.createdBy }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{ detailData.remark || "-" }}</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">出库明细</el-divider>
        <el-table :data="detailData.items" border size="small">
          <el-table-column type="index" label="#" width="50" align="center" />
          <el-table-column prop="productCode" label="商品编码" width="100" />
          <el-table-column
            prop="productName"
            label="商品名称"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column prop="batchNo" label="批次号" width="150" />
          <el-table-column prop="quantity" label="数量" width="80" align="right" />
          <el-table-column prop="salePrice" label="单价" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.salePrice" /></template>
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
import { salesDeliveryApi } from "@/api/modules/inventory";

const proTableRef = ref();
const detailVisible = ref(false);
const detailData = ref<any>(null);
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "出库单号/客户" },
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
  const res = await salesDeliveryApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
}
async function handleApprove(row: any) {
  await ElMessageBox.confirm("审核出库后将扣减库存并生成应收账款，确定吗？", "提示", {
    type: "warning",
  });
  await salesDeliveryApi.approve(row.id);
  ElMessage.success("审核出库成功");
  proTableRef.value?.refresh();
}
</script>
