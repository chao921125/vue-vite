<template>
  <PageContainer
    :title="$t('message.inv.trade.purchaseOrders.title')"
    :description="$t('message.inv.trade.purchaseOrders.desc')"
  >
    <template #header>
      <el-button type="primary" :icon="Plus" @click="$router.push('/purchase/orders/create')">
        {{ $t("message.inv.trade.purchaseOrders.actions.create") }}
      </el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="purchaseOrderApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="260"
    >
      <el-table-column
        prop="orderNo"
        :label="$t('message.inv.trade.purchaseOrders.columns.orderNo')"
        width="170"
      />
      <el-table-column
        prop="supplierName"
        :label="$t('message.inv.trade.purchaseOrders.columns.supplierName')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="warehouseName"
        :label="$t('message.inv.trade.purchaseOrders.columns.warehouseName')"
        width="110"
      />
      <el-table-column
        prop="orderDate"
        :label="$t('message.inv.trade.purchaseOrders.columns.orderDate')"
        width="110"
      />
      <el-table-column
        prop="expectedDate"
        :label="$t('message.inv.trade.purchaseOrders.columns.expectedDate')"
        width="110"
      />
      <el-table-column
        prop="totalAmountWithTax"
        :label="$t('message.inv.trade.purchaseOrders.columns.totalAmountWithTax')"
        width="120"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.totalAmountWithTax" /></template>
      </el-table-column>
      <el-table-column
        :label="$t('message.inv.trade.purchaseOrders.columns.receivedProgress')"
        width="110"
        align="center"
      >
        <template #default="{ row }">
          <el-progress
            :percentage="getReceivedPercentage(row)"
            :stroke-width="6"
            :text-inside="false"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('message.inv.trade.purchaseOrders.columns.status')"
        width="90"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column
        prop="createdBy"
        :label="$t('message.inv.trade.purchaseOrders.columns.createdBy')"
        width="80"
      />
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">
          {{ $t("message.inv.common.detail") }}
        </el-button>
        <el-button
          v-if="row.status === 'draft'"
          text
          type="warning"
          size="small"
          @click="handleApprove(row)"
        >
          {{ $t("message.inv.common.approve") }}
        </el-button>
        <el-button
          v-if="row.status === 'approved' || row.status === 'in_progress'"
          text
          type="success"
          size="small"
          @click="handleReceipt(row)"
        >
          {{ $t("message.inv.trade.purchaseOrders.actions.receipt") }}
        </el-button>
        <el-button
          v-if="row.status === 'draft'"
          text
          type="danger"
          size="small"
          @click="handleDelete(row)"
        >
          {{ $t("message.inv.common.delete") }}
        </el-button>
      </template>
    </ProTable>

    <!-- 详情弹窗 -->
    <el-drawer
      v-model="detailVisible"
      :title="$t('message.inv.trade.purchaseOrders.actions.detailTitle')"
      :size="isMobile ? '100%' : '70%'"
      destroy-on-close
    >
      <template v-if="detailData">
        <el-descriptions :column="isMobile ? 1 : 3" border>
          <el-descriptions-item :label="$t('message.inv.trade.purchaseOrders.form.orderNo.label')">
            {{ detailData.orderNo }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.purchaseOrders.form.supplierName.label')"
          >
            {{ detailData.supplierName }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.purchaseOrders.form.warehouseName.label')"
          >
            {{ detailData.warehouseName }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.purchaseOrders.form.orderDate.label')"
          >
            {{ detailData.orderDate }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.purchaseOrders.form.expectedDate.label')"
          >
            {{ detailData.expectedDate || "-" }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.trade.purchaseOrders.form.status.label')">
            <StatusTag :status="detailData.status" />
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.purchaseOrders.form.totalAmount.label')"
          >
            <AmountDisplay :value="detailData.totalAmount" />
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.trade.purchaseOrders.form.totalTax.label')">
            <AmountDisplay :value="detailData.totalTax" />
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.purchaseOrders.form.totalAmountWithTax.label')"
          >
            <AmountDisplay :value="detailData.totalAmountWithTax" />
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.purchaseOrders.form.createdBy.label')"
          >
            {{ detailData.createdBy }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.purchaseOrders.form.createdAt.label')"
          >
            {{ detailData.createdAt }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.trade.purchaseOrders.form.remark.label')">
            {{ detailData.remark || "-" }}
          </el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">
          {{ $t("message.inv.trade.purchaseOrders.actions.itemsTitle") }}
        </el-divider>
        <div class="detail-table-wrap">
          <el-table
            class="detail-table"
            :data="detailData.items"
            border
            size="small"
            show-summary
            :summary-method="getSummary"
          >
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column
              prop="productCode"
              :label="$t('message.inv.trade.purchaseOrders.columns.productCode')"
              width="100"
            />
            <el-table-column
              prop="productName"
              :label="$t('message.inv.trade.purchaseOrders.columns.productName')"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="spec"
              :label="$t('message.inv.trade.purchaseOrders.columns.spec')"
              min-width="140"
              show-overflow-tooltip
            />
            <el-table-column
              prop="unitName"
              :label="$t('message.inv.trade.purchaseOrders.columns.unitName')"
              width="60"
              align="center"
            />
            <el-table-column
              prop="quantity"
              :label="$t('message.inv.trade.purchaseOrders.columns.quantity')"
              width="80"
              align="right"
            />
            <el-table-column
              prop="receivedQuantity"
              :label="$t('message.inv.trade.purchaseOrders.columns.receivedQuantity')"
              width="80"
              align="right"
            />
            <el-table-column
              prop="purchasePrice"
              :label="$t('message.inv.trade.purchaseOrders.columns.purchasePrice')"
              width="100"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.purchasePrice" /></template>
            </el-table-column>
            <el-table-column
              prop="taxRate"
              :label="$t('message.inv.trade.purchaseOrders.columns.taxRate')"
              width="60"
              align="center"
            >
              <template #default="{ row }">{{ row.taxRate }}%</template>
            </el-table-column>
            <el-table-column
              prop="amount"
              :label="$t('message.inv.trade.purchaseOrders.columns.amount')"
              width="100"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.amount" /></template>
            </el-table-column>
            <el-table-column
              prop="amountWithTax"
              :label="$t('message.inv.trade.purchaseOrders.columns.amountWithTax')"
              width="110"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.amountWithTax" /></template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-drawer>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { purchaseOrderApi } from "@/api/modules/inventory";
import { useResponsive } from "@/plugins/hooks/useResponsive";

const { t } = useI18n();
const { isMobile } = useResponsive();

const proTableRef = ref();
const detailVisible = ref(false);
const detailData = ref<any>(null);

/** 单据状态选项（复用 message.inv.status.*） */
const statusOptions = computed(() => [
  { label: t("message.inv.status.draft"), value: "draft" },
  { label: t("message.inv.status.approved"), value: "approved" },
  { label: t("message.inv.status.in_progress"), value: "in_progress" },
  { label: t("message.inv.status.completed"), value: "completed" },
  { label: t("message.inv.status.closed"), value: "closed" },
]);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.trade.purchaseOrders.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.trade.purchaseOrders.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.trade.purchaseOrders.search.status.label"),
    type: "select" as const,
    options: statusOptions.value,
  },
  {
    prop: "dateRange",
    label: t("message.inv.trade.purchaseOrders.search.dateRange.label"),
    type: "daterange" as const,
  },
]);

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
  await ElMessageBox.confirm(
    t("message.inv.trade.purchaseOrders.messages.approveConfirm", { orderNo: row.orderNo }),
    t("message.inv.trade.purchaseOrders.messages.confirmTitle"),
    { type: "warning" },
  );
  await purchaseOrderApi.approve(row.id);
  ElMessage.success(t("message.inv.trade.purchaseOrders.messages.approveSuccess"));
  proTableRef.value?.refresh();
}

function handleReceipt(row: any) {
  ElMessage.info(
    t("message.inv.trade.purchaseOrders.messages.receiptTip", { orderNo: row.orderNo }),
  );
  proTableRef.value?.refresh();
}

async function handleDelete(row: any) {
  await purchaseOrderApi.remove(row.id);
  ElMessage.success(t("message.inv.common.success.delete"));
  proTableRef.value?.refresh();
}

function getSummary({ data }: any) {
  const totalAmount = data.reduce((s: number, i: any) => s + i.amount, 0);
  const totalTax = data.reduce((s: number, i: any) => s + i.taxAmount, 0);
  const totalWithTax = data.reduce((s: number, i: any) => s + i.amountWithTax, 0);
  const totalQty = data.reduce((s: number, i: any) => s + i.quantity, 0);
  const totalReceived = data.reduce((s: number, i: any) => s + i.receivedQuantity, 0);
  return [
    t("message.inv.trade.purchaseOrders.messages.total"),
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

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

// 抽屉内明细表格：窄屏下允许横向滚动，避免列被压缩
.detail-table-wrap {
  overflow-x: auto;

  @include d.mobile {
    .detail-table {
      min-width: 1060px;
    }
  }
}
</style>
