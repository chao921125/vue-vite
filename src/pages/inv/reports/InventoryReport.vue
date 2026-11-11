<template>
  <PageContainer
    :title="$t('message.inv.report.inventoryReport.title')"
    :description="$t('message.inv.report.inventoryReport.desc')"
  >
    <el-card shadow="never" style="margin-bottom: 16px">
      <el-row :gutter="16">
        <el-col :span="6" :xs="24" :sm="24" :md="6">
          <el-statistic
            :title="$t('message.inv.report.inventoryReport.actions.totalPurchase')"
            :value="summaryData.totalPurchase"
            :precision="2"
            prefix="¥"
          >
            <template #suffix
              ><el-tag type="success" size="small">{{
                $t("message.inv.report.inventoryReport.messages.countUnit", {
                  count: summaryData.purchaseCount,
                })
              }}</el-tag></template
            >
          </el-statistic>
        </el-col>
        <el-col :span="6" :xs="24" :sm="24" :md="6">
          <el-statistic
            :title="$t('message.inv.report.inventoryReport.actions.totalSale')"
            :value="summaryData.totalSale"
            :precision="2"
            prefix="¥"
          >
            <template #suffix
              ><el-tag type="primary" size="small">{{
                $t("message.inv.report.inventoryReport.messages.countUnit", {
                  count: summaryData.saleCount,
                })
              }}</el-tag></template
            >
          </el-statistic>
        </el-col>
        <el-col :span="6" :xs="24" :sm="24" :md="6">
          <el-statistic
            :title="$t('message.inv.report.inventoryReport.actions.totalInventory')"
            :value="summaryData.totalInventory"
            :precision="2"
            prefix="¥"
          />
        </el-col>
        <el-col :span="6" :xs="24" :sm="24" :md="6">
          <el-statistic
            :title="$t('message.inv.report.inventoryReport.actions.totalProfit')"
            :value="summaryData.totalProfit"
            :precision="2"
            prefix="¥"
          >
            <template #suffix
              ><el-tag type="warning" size="small">{{
                $t("message.inv.report.inventoryReport.messages.profitRate", {
                  rate: summaryData.profitRate,
                })
              }}</el-tag></template
            >
          </el-statistic>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div style="display: flex; align-items: center; justify-content: space-between">
          <span>{{ $t("message.inv.report.inventoryReport.actions.summaryTitle") }}</span>
          <el-button :icon="Download" @click="handleExport">{{
            $t("message.inv.report.inventoryReport.actions.export")
          }}</el-button>
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
        <el-table-column
          prop="productCode"
          :label="$t('message.inv.report.inventoryReport.columns.productCode')"
          width="100"
        />
        <el-table-column
          prop="productName"
          :label="$t('message.inv.report.inventoryReport.columns.productName')"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="spec"
          :label="$t('message.inv.report.inventoryReport.columns.spec')"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="unitName"
          :label="$t('message.inv.report.inventoryReport.columns.unitName')"
          width="60"
          align="center"
        />
        <el-table-column :label="$t('message.inv.report.inventoryReport.columns.groupBegin')">
          <el-table-column
            prop="beginQuantity"
            :label="$t('message.inv.report.inventoryReport.columns.quantity')"
            width="80"
            align="right"
          />
          <el-table-column
            :label="$t('message.inv.report.inventoryReport.columns.amount')"
            width="100"
            align="right"
          >
            <template #default="{ row }"><AmountDisplay :value="row.beginAmount" /></template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('message.inv.report.inventoryReport.columns.groupPurchase')">
          <el-table-column
            prop="purchaseQuantity"
            :label="$t('message.inv.report.inventoryReport.columns.quantity')"
            width="80"
            align="right"
          />
          <el-table-column
            :label="$t('message.inv.report.inventoryReport.columns.amount')"
            width="100"
            align="right"
          >
            <template #default="{ row }"><AmountDisplay :value="row.purchaseAmount" /></template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('message.inv.report.inventoryReport.columns.groupSale')">
          <el-table-column
            prop="saleQuantity"
            :label="$t('message.inv.report.inventoryReport.columns.quantity')"
            width="80"
            align="right"
          />
          <el-table-column
            :label="$t('message.inv.report.inventoryReport.columns.amount')"
            width="100"
            align="right"
          >
            <template #default="{ row }"><AmountDisplay :value="row.saleAmount" /></template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('message.inv.report.inventoryReport.columns.groupEnd')">
          <el-table-column
            prop="endQuantity"
            :label="$t('message.inv.report.inventoryReport.columns.quantity')"
            width="80"
            align="right"
          />
          <el-table-column
            :label="$t('message.inv.report.inventoryReport.columns.amount')"
            width="100"
            align="right"
          >
            <template #default="{ row }"><AmountDisplay :value="row.endAmount" /></template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Download } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { reportApi } from "@/api/modules/inventory";

const { t } = useI18n();

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
    t("message.inv.report.inventoryReport.messages.total"),
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
  ElMessage.info(t("message.inv.report.inventoryReport.messages.exportTip"));
}
</script>
