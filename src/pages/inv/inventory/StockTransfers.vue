<template>
  <PageContainer
    :title="$t('message.inv.stock.stockTransfers.title')"
    :description="$t('message.inv.stock.stockTransfers.desc')"
  >
    <ProTable
      ref="proTableRef"
      :fetch-fn="stockTransferApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="200"
    >
      <el-table-column
        prop="transferNo"
        :label="$t('message.inv.stock.stockTransfers.columns.transferNo')"
        width="170"
      />
      <el-table-column
        prop="fromWarehouseName"
        :label="$t('message.inv.stock.stockTransfers.columns.fromWarehouseName')"
        width="120"
      />
      <el-table-column
        prop="toWarehouseName"
        :label="$t('message.inv.stock.stockTransfers.columns.toWarehouseName')"
        width="120"
      />
      <el-table-column
        prop="transferDate"
        :label="$t('message.inv.stock.stockTransfers.columns.transferDate')"
        width="120"
      />
      <el-table-column
        prop="totalAmount"
        :label="$t('message.inv.stock.stockTransfers.columns.totalAmount')"
        width="120"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.totalAmount" /></template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('message.inv.stock.stockTransfers.columns.status')"
        width="90"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column
        prop="createdBy"
        :label="$t('message.inv.stock.stockTransfers.columns.createdBy')"
        width="80"
      />
      <el-table-column
        prop="createdAt"
        :label="$t('message.inv.stock.stockTransfers.columns.createdAt')"
        width="170"
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
          >{{ $t("message.inv.common.approve") }}</el-button
        >
      </template>
    </ProTable>

    <el-drawer
      v-model="detailVisible"
      :title="$t('message.inv.stock.stockTransfers.actions.detailTitle')"
      :size="isMobile ? '100%' : '60%'"
      destroy-on-close
    >
      <template v-if="detailData">
        <el-descriptions :column="isMobile ? 1 : 2" border>
          <el-descriptions-item
            :label="$t('message.inv.stock.stockTransfers.form.transferNo.label')"
          >
            {{ detailData.transferNo }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.stockTransfers.form.status.label')"
            ><StatusTag :status="detailData.status"
          /></el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.stock.stockTransfers.form.fromWarehouseName.label')"
          >
            {{ detailData.fromWarehouseName }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.stock.stockTransfers.form.toWarehouseName.label')"
          >
            {{ detailData.toWarehouseName }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.stock.stockTransfers.form.transferDate.label')"
          >
            {{ detailData.transferDate }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.stock.stockTransfers.form.totalAmount.label')"
            ><AmountDisplay :value="detailData.totalAmount"
          /></el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.stock.stockTransfers.form.createdBy.label')"
          >
            {{ detailData.createdBy }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.stockTransfers.form.remark.label')">
            {{ detailData.remark || "-" }}
          </el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">
          {{ $t("message.inv.stock.stockTransfers.actions.itemsTitle") }}
        </el-divider>
        <div class="detail-table-scroll">
          <el-table :data="detailData.items" border size="small" class="detail-table-wrap">
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column
              prop="productCode"
              :label="$t('message.inv.stock.stockTransfers.columns.productCode')"
              width="100"
            />
            <el-table-column
              prop="productName"
              :label="$t('message.inv.stock.stockTransfers.columns.productName')"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="quantity"
              :label="$t('message.inv.stock.stockTransfers.columns.quantity')"
              width="80"
              align="right"
            />
            <el-table-column
              prop="unitCost"
              :label="$t('message.inv.stock.stockTransfers.columns.unitCost')"
              width="100"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.unitCost" /></template>
            </el-table-column>
            <el-table-column
              prop="amount"
              :label="$t('message.inv.stock.stockTransfers.columns.amount')"
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
import { stockTransferApi } from "@/api/modules/inventory";
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

/** 调拨单状态选项（待审核沿用接口存储值 approved） */
const statusOptions = computed(() =>
  readOptions("message.inv.stock.stockTransfers.options.status"),
);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.stock.stockTransfers.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.stock.stockTransfers.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.stock.stockTransfers.search.status.label"),
    type: "select" as const,
    options: [
      ...statusOptions.value.map((item) => ({ label: item.label, value: item.value })),
      { label: t("message.inv.status.completed"), value: "completed" },
    ],
  },
]);

async function handleDetail(row: any) {
  const res = await stockTransferApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
}
async function handleApprove(row: any) {
  await ElMessageBox.confirm(
    t("message.inv.stock.stockTransfers.messages.approveConfirm"),
    t("message.inv.stock.stockTransfers.messages.confirmTitle"),
    { type: "warning" },
  );
  await stockTransferApi.approve(row.id);
  ElMessage.success(t("message.inv.stock.stockTransfers.messages.approveSuccess"));
  proTableRef.value?.refresh();
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
    min-width: 630px;
  }
}
</style>
