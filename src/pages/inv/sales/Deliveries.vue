<template>
  <PageContainer
    :title="$t('message.inv.trade.salesDeliveries.title')"
    :description="$t('message.inv.trade.salesDeliveries.desc')"
  >
    <ProTable
      ref="proTableRef"
      :fetch-fn="salesDeliveryApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="200"
    >
      <el-table-column
        prop="deliveryNo"
        :label="$t('message.inv.trade.salesDeliveries.columns.deliveryNo')"
        width="170"
      />
      <el-table-column
        prop="orderNo"
        :label="$t('message.inv.trade.salesDeliveries.columns.orderNo')"
        width="170"
      />
      <el-table-column
        prop="customerName"
        :label="$t('message.inv.trade.salesDeliveries.columns.customerName')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="warehouseName"
        :label="$t('message.inv.trade.salesDeliveries.columns.warehouseName')"
        width="110"
      />
      <el-table-column
        prop="deliveryDate"
        :label="$t('message.inv.trade.salesDeliveries.columns.deliveryDate')"
        width="110"
      />
      <el-table-column
        prop="totalAmount"
        :label="$t('message.inv.trade.salesDeliveries.columns.totalAmount')"
        width="120"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.totalAmount" /></template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('message.inv.trade.salesDeliveries.columns.status')"
        width="90"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column
        prop="createdBy"
        :label="$t('message.inv.trade.salesDeliveries.columns.operator')"
        width="80"
      />
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">
          {{ $t("message.inv.common.detail") }}
        </el-button>
        <el-button
          v-if="row.status === 'approved'"
          text
          type="success"
          size="small"
          @click="handleApprove(row)"
        >
          {{ $t("message.inv.trade.salesDeliveries.actions.approveDelivery") }}
        </el-button>
      </template>
    </ProTable>

    <el-drawer
      v-model="detailVisible"
      :title="$t('message.inv.trade.salesDeliveries.actions.detailTitle')"
      :size="isMobile ? '100%' : '70%'"
      destroy-on-close
    >
      <template v-if="detailData">
        <el-descriptions :column="isMobile ? 1 : 3" border>
          <el-descriptions-item
            :label="$t('message.inv.trade.salesDeliveries.form.deliveryNo.label')"
          >
            {{ detailData.deliveryNo }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.trade.salesDeliveries.form.orderNo.label')">
            {{ detailData.orderNo }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.salesDeliveries.form.customerName.label')"
          >
            {{ detailData.customerName }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.salesDeliveries.form.warehouseName.label')"
          >
            {{ detailData.warehouseName }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.salesDeliveries.form.deliveryDate.label')"
          >
            {{ detailData.deliveryDate }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.trade.salesDeliveries.form.status.label')">
            <StatusTag :status="detailData.status" />
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.salesDeliveries.form.totalAmount.label')"
          >
            <AmountDisplay :value="detailData.totalAmount" />
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.trade.salesDeliveries.form.operator.label')"
          >
            {{ detailData.createdBy }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.trade.salesDeliveries.form.remark.label')">
            {{ detailData.remark || "-" }}
          </el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">
          {{ $t("message.inv.trade.salesDeliveries.actions.itemsTitle") }}
        </el-divider>
        <div class="detail-table-wrap">
          <el-table class="detail-table" :data="detailData.items" border size="small">
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column
              prop="productCode"
              :label="$t('message.inv.trade.salesDeliveries.columns.productCode')"
              width="100"
            />
            <el-table-column
              prop="productName"
              :label="$t('message.inv.trade.salesDeliveries.columns.productName')"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="batchNo"
              :label="$t('message.inv.trade.salesDeliveries.columns.batchNo')"
              width="150"
            />
            <el-table-column
              prop="quantity"
              :label="$t('message.inv.trade.salesDeliveries.columns.quantity')"
              width="80"
              align="right"
            />
            <el-table-column
              prop="salePrice"
              :label="$t('message.inv.trade.salesDeliveries.columns.salePrice')"
              width="100"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.salePrice" /></template>
            </el-table-column>
            <el-table-column
              prop="amount"
              :label="$t('message.inv.trade.salesDeliveries.columns.amount')"
              width="120"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.amount" /></template>
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
import { ElMessage, ElMessageBox } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { salesDeliveryApi } from "@/api/modules/inventory";
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
const detailVisible = ref(false);
const detailData = ref<any>(null);

/** 单据状态选项（待审核沿用接口存储值 approved，其余复用通用状态文案） */
const statusOptions = computed(() => [
  ...readOptions("message.inv.trade.salesDeliveries.options.status").map((item) => ({
    label: item.label,
    value: item.value,
  })),
  { label: t("message.inv.status.completed"), value: "completed" },
]);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.trade.salesDeliveries.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.trade.salesDeliveries.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.trade.salesDeliveries.search.status.label"),
    type: "select" as const,
    options: statusOptions.value,
  },
]);

async function handleDetail(row: any) {
  const res = await salesDeliveryApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
}
async function handleApprove(row: any) {
  await ElMessageBox.confirm(
    t("message.inv.trade.salesDeliveries.messages.approveConfirm"),
    t("message.inv.trade.salesDeliveries.messages.confirmTitle"),
    { type: "warning" },
  );
  await salesDeliveryApi.approve(row.id);
  ElMessage.success(t("message.inv.trade.salesDeliveries.messages.approveSuccess"));
  proTableRef.value?.refresh();
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

// 抽屉内明细表格：窄屏下允许横向滚动，避免列被压缩
.detail-table-wrap {
  overflow-x: auto;

  @include d.mobile {
    .detail-table {
      min-width: 780px;
    }
  }
}
</style>
