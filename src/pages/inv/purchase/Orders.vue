<template>
  <PageContainer title="采购订单" description="管理采购订单全生命周期">
    <template #header>
      <el-button type="primary" :icon="Plus" @click="$router.push('/inv/purchase/orders/create')"
        >新建采购订单</el-button
      >
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="purchaseOrderApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="260"
    >
      <el-table-column prop="orderNo" label="订单编号" width="170" />
      <el-table-column prop="supplierName" label="供应商" min-width="180" show-overflow-tooltip />
      <el-table-column prop="warehouseName" label="入库仓库" width="110" />
      <el-table-column prop="orderDate" label="订单日期" width="110" />
      <el-table-column prop="expectedDate" label="预计到货" width="110" />
      <el-table-column prop="totalAmountWithTax" label="含税总额" width="120" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.totalAmountWithTax" /></template>
      </el-table-column>
      <el-table-column label="收货进度" width="110" align="center">
        <template #default="{ row }">
          <el-progress
            :percentage="getReceivedPercentage(row)"
            :stroke-width="6"
            :text-inside="false"
          />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="90" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column prop="createdBy" label="创建人" width="80" />
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">详情</el-button>
        <el-button
          v-if="row.status === 'draft'"
          text
          type="warning"
          size="small"
          @click="handleApprove(row)"
          >审核</el-button
        >
        <el-button
          v-if="row.status === 'approved' || row.status === 'in_progress'"
          text
          type="success"
          size="small"
          @click="handleReceipt(row)"
          >入库</el-button
        >
        <el-button
          v-if="row.status === 'draft'"
          text
          type="danger"
          size="small"
          @click="handleDelete(row)"
          >删除</el-button
        >
      </template>
    </ProTable>

    <!-- 详情弹窗 -->
    <el-drawer v-model="detailVisible" title="采购订单详情" size="70%" destroy-on-close>
      <template v-if="detailData">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="订单编号">{{ detailData.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="供应商">{{ detailData.supplierName }}</el-descriptions-item>
          <el-descriptions-item label="入库仓库">{{
            detailData.warehouseName
          }}</el-descriptions-item>
          <el-descriptions-item label="订单日期">{{ detailData.orderDate }}</el-descriptions-item>
          <el-descriptions-item label="预计到货">{{
            detailData.expectedDate || "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="状态"
            ><StatusTag :status="detailData.status"
          /></el-descriptions-item>
          <el-descriptions-item label="不含税金额"
            ><AmountDisplay :value="detailData.totalAmount"
          /></el-descriptions-item>
          <el-descriptions-item label="税额"
            ><AmountDisplay :value="detailData.totalTax"
          /></el-descriptions-item>
          <el-descriptions-item label="含税总额"
            ><AmountDisplay :value="detailData.totalAmountWithTax"
          /></el-descriptions-item>
          <el-descriptions-item label="创建人">{{ detailData.createdBy }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ detailData.createdAt }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{ detailData.remark || "-" }}</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">订单明细</el-divider>
        <el-table
          :data="detailData.items"
          border
          size="small"
          show-summary
          :summary-method="getSummary"
        >
          <el-table-column type="index" label="#" width="50" align="center" />
          <el-table-column prop="productCode" label="商品编码" width="100" />
          <el-table-column
            prop="productName"
            label="商品名称"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column prop="spec" label="规格" min-width="140" show-overflow-tooltip />
          <el-table-column prop="unitName" label="单位" width="60" align="center" />
          <el-table-column prop="quantity" label="数量" width="80" align="right" />
          <el-table-column prop="receivedQuantity" label="已收" width="80" align="right" />
          <el-table-column prop="purchasePrice" label="单价" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.purchasePrice" /></template>
          </el-table-column>
          <el-table-column prop="taxRate" label="税率" width="60" align="center">
            <template #default="{ row }">{{ row.taxRate }}%</template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.amount" /></template>
          </el-table-column>
          <el-table-column prop="amountWithTax" label="含税金额" width="110" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.amountWithTax" /></template>
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { purchaseOrderApi, supplierApi } from "@/api/modules/inventory";

const router = useRouter();
const proTableRef = ref();
const detailVisible = ref(false);
const detailData = ref<any>(null);

const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "订单号/供应商" },
  {
    prop: "status",
    label: "状态",
    type: "select" as const,
    options: [
      { label: "草稿", value: "draft" },
      { label: "已审核", value: "approved" },
      { label: "执行中", value: "in_progress" },
      { label: "已完成", value: "completed" },
      { label: "已关闭", value: "closed" },
    ],
  },
  { prop: "dateRange", label: "日期", type: "daterange" as const },
];

function getReceivedPercentage(row: any): number {
  if (!row.items || row.items.length === 0) return 0;
  const totalQty = row.items.reduce((s: number, i: any) => s + i.quantity, 0);
  const receivedQty = row.items.reduce((s: number, i: any) => s + i.receivedQuantity, 0);
  return totalQty > 0 ? Math.round((receivedQty / totalQty) * 100) : 0;
}

async function handleDetail(row: any) {
  const res = await purchaseOrderApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
}

async function handleApprove(row: any) {
  await ElMessageBox.confirm(`确定审核采购订单 ${row.orderNo} 吗？`, "提示", { type: "warning" });
  await purchaseOrderApi.approve(row.id);
  ElMessage.success("审核成功");
  proTableRef.value?.refresh();
}

function handleReceipt(row: any) {
  ElMessage.info(`入库功能 - 订单号: ${row.orderNo}`);
  proTableRef.value?.refresh();
}

async function handleDelete(row: any) {
  await purchaseOrderApi.remove(row.id);
  ElMessage.success("删除成功");
  proTableRef.value?.refresh();
}

function getSummary({ data }: any) {
  const totalAmount = data.reduce((s: number, i: any) => s + i.amount, 0);
  const totalTax = data.reduce((s: number, i: any) => s + i.taxAmount, 0);
  const totalWithTax = data.reduce((s: number, i: any) => s + i.amountWithTax, 0);
  const totalQty = data.reduce((s: number, i: any) => s + i.quantity, 0);
  const totalReceived = data.reduce((s: number, i: any) => s + i.receivedQuantity, 0);
  return [
    "合计",
    "",
    "",
    "",
    "",
    totalQty,
    totalReceived,
    "",
    "",
    `¥${totalAmount.toFixed(2)}`,
    "",
    `¥${totalWithTax.toFixed(2)}`,
  ];
}
</script>
