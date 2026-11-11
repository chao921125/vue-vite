<template>
  <PageContainer
    :title="$t('message.inv.stock.stockQuery.title')"
    :description="$t('message.inv.stock.stockQuery.desc')"
  >
    <ProTable
      ref="proTableRef"
      :fetch-fn="inventoryApi.list"
      :search-fields="searchFields"
      :action-width="100"
    >
      <el-table-column
        prop="productCode"
        :label="$t('message.inv.stock.stockQuery.columns.productCode')"
        width="100"
      />
      <el-table-column
        prop="productName"
        :label="$t('message.inv.stock.stockQuery.columns.productName')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="spec"
        :label="$t('message.inv.stock.stockQuery.columns.spec')"
        min-width="140"
        show-overflow-tooltip
      />
      <el-table-column
        prop="warehouseName"
        :label="$t('message.inv.stock.stockQuery.columns.warehouseName')"
        width="110"
      />
      <el-table-column
        prop="batchNo"
        :label="$t('message.inv.stock.stockQuery.columns.batchNo')"
        width="150"
      />
      <el-table-column
        prop="quantity"
        :label="$t('message.inv.stock.stockQuery.columns.quantity')"
        width="100"
        align="right"
      />
      <el-table-column
        prop="lockedQuantity"
        :label="$t('message.inv.stock.stockQuery.columns.lockedQuantity')"
        width="100"
        align="right"
      >
        <template #default="{ row }">
          <span :style="{ color: row.lockedQuantity > 0 ? '#e6a23c' : '' }">{{
            row.lockedQuantity
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="availableQuantity"
        :label="$t('message.inv.stock.stockQuery.columns.availableQuantity')"
        width="100"
        align="right"
      >
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
      <el-table-column
        prop="avgCost"
        :label="$t('message.inv.stock.stockQuery.columns.avgCost')"
        width="100"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.avgCost" /></template>
      </el-table-column>
      <el-table-column
        prop="totalValue"
        :label="$t('message.inv.stock.stockQuery.columns.totalValue')"
        width="120"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.totalValue" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleTransactions(row)">
          {{ $t("message.inv.stock.stockQuery.actions.transactions") }}
        </el-button>
      </template>
    </ProTable>

    <el-drawer
      v-model="transVisible"
      :title="$t('message.inv.stock.stockQuery.actions.transactionsTitle')"
      :size="isMobile ? '100%' : '60%'"
      destroy-on-close
    >
      <div class="detail-table-scroll">
        <el-table :data="transData" border size="small" class="detail-table-wrap">
          <el-table-column
            prop="transactionNo"
            :label="$t('message.inv.stock.stockQuery.columns.transNo')"
            width="170"
          />
          <el-table-column
            prop="typeName"
            :label="$t('message.inv.stock.stockQuery.columns.transType')"
            width="100"
          >
            <template #default="{ row }">
              <el-tag :type="row.quantity > 0 ? 'success' : 'danger'" size="small">{{
                transTypeMap[row.type] || row.typeName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="quantity"
            :label="$t('message.inv.stock.stockQuery.columns.transQuantity')"
            width="80"
            align="right"
          >
            <template #default="{ row }">
              <span :style="{ color: row.quantity > 0 ? '#67c23a' : '#f56c6c' }"
                >{{ row.quantity > 0 ? "+" : "" }}{{ row.quantity }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="balanceQuantity"
            :label="$t('message.inv.stock.stockQuery.columns.transBalance')"
            width="80"
            align="right"
          />
          <el-table-column
            prop="sourceNo"
            :label="$t('message.inv.stock.stockQuery.columns.transSourceNo')"
            width="170"
          />
          <el-table-column
            prop="createdBy"
            :label="$t('message.inv.stock.stockQuery.columns.transOperator')"
            width="80"
          />
          <el-table-column
            prop="createdAt"
            :label="$t('message.inv.stock.stockQuery.columns.transTime')"
            width="170"
          />
        </el-table>
      </div>
    </el-drawer>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { inventoryApi, warehouseApi } from "@/api/modules/inventory";
import { useResponsive } from "@/plugins/hooks/useResponsive";

const { t, tm } = useI18n();
const { isMobile } = useResponsive();

/** 语言包中的下拉选项：{ code, value, label } */
interface OptionItem {
  code: string;
  value: string;
  label: string;
}

/** 读取语言包中的下拉选项组 */
const readOptions = (key: string): OptionItem[] =>
  Object.entries(tm(key) as Record<string, { value: string; label: string }>).map(
    ([code, item]) => ({ code, value: item.value, label: item.label }),
  );

const proTableRef = ref();
const transVisible = ref(false);
const transData = ref<any[]>([]);
const warehouses = ref<any[]>([]);

/** 低库存选项 */
const lowStockOptions = computed(() =>
  readOptions("message.inv.stock.stockQuery.options.lowStock"),
);

/** 流水类型展示文案映射 */
const transTypeMap = computed<Record<string, string>>(() =>
  Object.fromEntries(
    readOptions("message.inv.stock.stockQuery.options.transactionType").map((item) => [
      item.value,
      item.label,
    ]),
  ),
);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.stock.stockQuery.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.stock.stockQuery.search.keyword.placeholder"),
  },
  {
    prop: "warehouseId",
    label: t("message.inv.stock.stockQuery.search.warehouse.label"),
    type: "select" as const,
    options: warehouses.value.map((w: any) => ({
      label: w.warehouseName,
      value: w.id,
    })),
  },
  {
    prop: "lowStock",
    label: t("message.inv.stock.stockQuery.search.lowStock.label"),
    type: "select" as const,
    options: lowStockOptions.value.map((item) => ({ label: item.label, value: item.value })),
  },
]);

onMounted(async () => {
  const res = await warehouseApi.all();
  warehouses.value = res.data || [];
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

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

// 明细表横向滚动容器：窄屏下表格保持列宽，由容器横向滚动
.detail-table-scroll {
  overflow-x: auto;
}

.detail-table-wrap {
  overflow-x: auto;

  // 窄屏下保留固定列宽，避免列被压缩
  @include d.mobile {
    min-width: 850px;
  }
}
</style>
