<template>
  <PageContainer title="库存盘点" description="管理库存盘点单据，处理盘盈盘亏">
    <ProTable
      ref="proTableRef"
      :fetch-fn="stockTakeApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="200"
    >
      <el-table-column prop="takeNo" label="盘点单号" width="170" />
      <el-table-column prop="warehouseName" label="盘点仓库" width="120" />
      <el-table-column prop="takeDate" label="盘点日期" width="120" />
      <el-table-column prop="totalItems" label="盘点项" width="80" align="right" />
      <el-table-column label="盘盈" width="80" align="right">
        <template #default="{ row }">
          <span v-if="row.gainItems > 0" style="color: #67c23a">+{{ row.gainItems }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="盘亏" width="80" align="right">
        <template #default="{ row }">
          <span v-if="row.lossItems > 0" style="color: #f56c6c">-{{ row.lossItems }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalGainAmount" label="盘盈金额" width="110" align="right">
        <template #default="{ row }"
          ><span v-if="row.totalGainAmount > 0" style="color: #67c23a"
            ><AmountDisplay :value="row.totalGainAmount" /></span
          ><span v-else>-</span></template
        >
      </el-table-column>
      <el-table-column prop="totalLossAmount" label="盘亏金额" width="110" align="right">
        <template #default="{ row }"
          ><span v-if="row.totalLossAmount > 0" style="color: #f56c6c"
            ><AmountDisplay :value="row.totalLossAmount" /></span
          ><span v-else>-</span></template
        >
      </el-table-column>
      <el-table-column prop="status" label="状态" width="90" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">详情</el-button>
        <el-button
          v-if="row.status === 'draft'"
          text
          type="success"
          size="small"
          @click="handleApprove(row)"
          >审核</el-button
        >
      </template>
    </ProTable>

    <el-drawer v-model="detailVisible" title="盘点单详情" size="70%" destroy-on-close>
      <template v-if="detailData">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="盘点单号">{{ detailData.takeNo }}</el-descriptions-item>
          <el-descriptions-item label="盘点仓库">{{
            detailData.warehouseName
          }}</el-descriptions-item>
          <el-descriptions-item label="盘点日期">{{ detailData.takeDate }}</el-descriptions-item>
          <el-descriptions-item label="盘点项数">{{ detailData.totalItems }}</el-descriptions-item>
          <el-descriptions-item label="盘盈项数"
            ><span style="color: #67c23a">{{ detailData.gainItems }}</span></el-descriptions-item
          >
          <el-descriptions-item label="盘亏项数"
            ><span style="color: #f56c6c">{{ detailData.lossItems }}</span></el-descriptions-item
          >
          <el-descriptions-item label="状态"
            ><StatusTag :status="detailData.status"
          /></el-descriptions-item>
          <el-descriptions-item label="操作人">{{ detailData.createdBy }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{ detailData.remark || "-" }}</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">盘点明细</el-divider>
        <el-table :data="detailData.items" border size="small">
          <el-table-column type="index" label="#" width="50" align="center" />
          <el-table-column prop="productCode" label="商品编码" width="100" />
          <el-table-column
            prop="productName"
            label="商品名称"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column prop="bookQuantity" label="账面数量" width="100" align="right" />
          <el-table-column prop="actualQuantity" label="实际数量" width="100" align="right" />
          <el-table-column label="差异数量" width="100" align="right">
            <template #default="{ row }">
              <span
                :style="{
                  color: row.diffQuantity > 0 ? '#67c23a' : row.diffQuantity < 0 ? '#f56c6c' : '',
                  fontWeight: 600,
                }"
              >
                {{ row.diffQuantity > 0 ? "+" : "" }}{{ row.diffQuantity }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="unitCost" label="单位成本" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.unitCost" /></template>
          </el-table-column>
          <el-table-column label="差异金额" width="120" align="right">
            <template #default="{ row }">
              <span
                :style="{
                  color: row.diffAmount > 0 ? '#67c23a' : row.diffAmount < 0 ? '#f56c6c' : '',
                }"
              >
                {{ row.diffAmount > 0 ? "+" : ""
                }}<AmountDisplay :value="row.diffAmount" :show-sign="false" />
              </span>
            </template>
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
import { stockTakeApi } from "@/api/modules/inventory";

const proTableRef = ref();
const detailVisible = ref(false);
const detailData = ref<any>(null);
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "盘点单号/仓库" },
  {
    prop: "status",
    label: "状态",
    type: "select" as const,
    options: [
      { label: "草稿", value: "draft" },
      { label: "已完成", value: "completed" },
    ],
  },
];

async function handleDetail(row: any) {
  const res = await stockTakeApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
}
async function handleApprove(row: any) {
  await ElMessageBox.confirm("审核盘点单后将自动调整库存，确定吗？", "提示", { type: "warning" });
  await stockTakeApi.approve(row.id);
  ElMessage.success("审核成功");
  proTableRef.value?.refresh();
}
</script>
