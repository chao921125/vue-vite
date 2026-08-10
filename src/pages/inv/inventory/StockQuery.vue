<template>
  <PageContainer title="库存查询" description="实时查询各仓库库存状况">
    <ProTable
      ref="proTableRef"
      :fetch-fn="inventoryApi.list"
      :search-fields="searchFields"
      :action-width="100"
    >
      <el-table-column prop="productCode" label="商品编码" width="100" />
      <el-table-column prop="productName" label="商品名称" min-width="180" show-overflow-tooltip />
      <el-table-column prop="spec" label="规格" min-width="140" show-overflow-tooltip />
      <el-table-column prop="warehouseName" label="仓库" width="110" />
      <el-table-column prop="batchNo" label="批次号" width="150" />
      <el-table-column prop="quantity" label="库存数量" width="100" align="right" />
      <el-table-column prop="lockedQuantity" label="锁定数量" width="100" align="right">
        <template #default="{ row }">
          <span :style="{ color: row.lockedQuantity > 0 ? '#e6a23c' : '' }">{{
            row.lockedQuantity
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="availableQuantity" label="可用数量" width="100" align="right">
        <template #default="{ row }">
          <span
            :style="{
              color:
                row.availableQuantity < 20
                  ? '#f56c6c'
                  : row.availableQuantity < 50
                    ? '#e6a23c'
                    : '#67c23a',
              fontWeight: 600,
            }"
          >
            {{ row.availableQuantity }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="avgCost" label="平均成本" width="100" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.avgCost" /></template>
      </el-table-column>
      <el-table-column prop="totalValue" label="库存金额" width="120" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.totalValue" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleTransactions(row)"
          >流水</el-button
        >
      </template>
    </ProTable>

    <el-drawer v-model="transVisible" title="库存流水" size="60%" destroy-on-close>
      <el-table :data="transData" border size="small">
        <el-table-column prop="transactionNo" label="流水号" width="170" />
        <el-table-column prop="typeName" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.quantity > 0 ? 'success' : 'danger'" size="small">{{
              row.typeName
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="80" align="right">
          <template #default="{ row }">
            <span :style="{ color: row.quantity > 0 ? '#67c23a' : '#f56c6c' }"
              >{{ row.quantity > 0 ? "+" : "" }}{{ row.quantity }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="balanceQuantity" label="结存" width="80" align="right" />
        <el-table-column prop="sourceNo" label="来源单号" width="170" />
        <el-table-column prop="createdBy" label="操作人" width="80" />
        <el-table-column prop="createdAt" label="时间" width="170" />
      </el-table>
    </el-drawer>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { inventoryApi, warehouseApi } from "@/api/modules/inventory";

const proTableRef = ref();
const transVisible = ref(false);
const transData = ref<any[]>([]);
const warehouses = ref<any[]>([]);
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "商品编码/名称" },
  { prop: "warehouseId", label: "仓库", type: "select" as const, options: [] as any[] },
  {
    prop: "lowStock",
    label: "低库存",
    type: "select" as const,
    options: [
      { label: "是", value: "true" },
      { label: "否", value: "false" },
    ],
  },
];

onMounted(async () => {
  const res = await warehouseApi.all();
  warehouses.value = res.data || [];
  searchFields[1].options = warehouses.value.map((w: any) => ({
    label: w.warehouseName,
    value: w.id,
  }));
});

async function handleTransactions(row: any) {
  const res = await inventoryApi.transactions({
    keyword: row.productCode,
    warehouseId: row.warehouseId,
  });
  transData.value = (res.data?.list || []).filter((i: any) => i.productId === row.productId);
  transVisible.value = true;
}
</script>
