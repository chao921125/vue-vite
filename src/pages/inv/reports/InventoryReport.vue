<template>
  <PageContainer title="进销存报表" description="商品采购、销售、库存汇总分析">
    <el-card shadow="never" style="margin-bottom: 16px">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-statistic
            title="采购总额"
            :value="summaryData.totalPurchase"
            :precision="2"
            prefix="¥"
          >
            <template #suffix
              ><el-tag type="success" size="small"
                >{{ summaryData.purchaseCount }}笔</el-tag
              ></template
            >
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="销售总额" :value="summaryData.totalSale" :precision="2" prefix="¥">
            <template #suffix
              ><el-tag type="primary" size="small">{{ summaryData.saleCount }}笔</el-tag></template
            >
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic
            title="库存总值"
            :value="summaryData.totalInventory"
            :precision="2"
            prefix="¥"
          />
        </el-col>
        <el-col :span="6">
          <el-statistic title="销售毛利" :value="summaryData.totalProfit" :precision="2" prefix="¥">
            <template #suffix
              ><el-tag type="warning" size="small"
                >毛利率{{ summaryData.profitRate }}%</el-tag
              ></template
            >
          </el-statistic>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div style="display: flex; align-items: center; justify-content: space-between">
          <span>进销存汇总表</span>
          <el-button :icon="Download" @click="handleExport">导出</el-button>
        </div>
      </template>
      <el-table
        :data="tableData"
        border
        size="small"
        show-summary
        :summary-method="getSummary"
        v-loading="loading"
      >
        <el-table-column prop="productCode" label="商品编码" width="100" />
        <el-table-column
          prop="productName"
          label="商品名称"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column prop="spec" label="规格" min-width="140" show-overflow-tooltip />
        <el-table-column prop="unitName" label="单位" width="60" align="center" />
        <el-table-column label="期初">
          <el-table-column prop="beginQuantity" label="数量" width="80" align="right" />
          <el-table-column label="金额" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.beginAmount" /></template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="采购">
          <el-table-column prop="purchaseQuantity" label="数量" width="80" align="right" />
          <el-table-column label="金额" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.purchaseAmount" /></template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="销售">
          <el-table-column prop="saleQuantity" label="数量" width="80" align="right" />
          <el-table-column label="金额" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.saleAmount" /></template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="期末">
          <el-table-column prop="endQuantity" label="数量" width="80" align="right" />
          <el-table-column label="金额" width="100" align="right">
            <template #default="{ row }"><AmountDisplay :value="row.endAmount" /></template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Download } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { reportApi } from "@/api/modules/inventory";

const loading = ref(false);
const tableData = ref<any[]>([]);
const summaryData = ref<any>({
  totalPurchase: 0,
  totalSale: 0,
  totalInventory: 0,
  totalProfit: 0,
  profitRate: 0,
  purchaseCount: 0,
  saleCount: 0,
});

onMounted(async () => {
  loading.value = true;
  try {
    const res = await reportApi.inventorySummary();
    tableData.value = res.data || [];
    summaryData.value = {
      totalPurchase: tableData.value.reduce((s, i) => s + i.purchaseAmount, 0),
      totalSale: tableData.value.reduce((s, i) => s + i.saleAmount, 0),
      totalInventory: tableData.value.reduce((s, i) => s + i.endAmount, 0),
      totalProfit: tableData.value.reduce((s, i) => s + (i.saleAmount - i.purchaseAmount), 0),
      purchaseCount: 6,
      saleCount: 5,
      profitRate: 0,
    };
    summaryData.value.profitRate =
      summaryData.value.totalSale > 0
        ? ((summaryData.value.totalProfit / summaryData.value.totalSale) * 100).toFixed(1)
        : 0;
  } finally {
    loading.value = false;
  }
});

function getSummary({ data }: any) {
  return [
    "合计",
    "",
    "",
    "",
    data.reduce((s: number, i: any) => s + i.beginQuantity, 0),
    "",
    data.reduce((s: number, i: any) => s + i.purchaseQuantity, 0),
    "",
    data.reduce((s: number, i: any) => s + i.saleQuantity, 0),
    "",
    data.reduce((s: number, i: any) => s + i.endQuantity, 0),
    "",
  ];
}

function handleExport() {
  ElMessage.info("导出功能开发中");
}
</script>
