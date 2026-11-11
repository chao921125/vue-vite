<template>
  <PageContainer
    :title="$t('message.inv.stock.payments.title')"
    :description="$t('message.inv.stock.payments.desc')"
  >
    <ProTable
      ref="proTableRef"
      :fetch-fn="paymentApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="120"
    >
      <el-table-column
        prop="paymentNo"
        :label="$t('message.inv.stock.payments.columns.paymentNo')"
        width="170"
      />
      <el-table-column
        prop="supplierName"
        :label="$t('message.inv.stock.payments.columns.supplierName')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="accountName"
        :label="$t('message.inv.stock.payments.columns.accountName')"
        width="140"
      />
      <el-table-column
        prop="paymentDate"
        :label="$t('message.inv.stock.payments.columns.paymentDate')"
        width="110"
      />
      <el-table-column
        prop="amount"
        :label="$t('message.inv.stock.payments.columns.amount')"
        width="120"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.amount" /></template>
      </el-table-column>
      <el-table-column
        prop="paymentMethod"
        :label="$t('message.inv.stock.payments.columns.paymentMethod')"
        width="100"
      >
        <template #default="{ row }">
          {{ paymentMethodMap[row.paymentMethod] || row.paymentMethod }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('message.inv.stock.payments.columns.status')"
        width="90"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column
        prop="createdBy"
        :label="$t('message.inv.stock.payments.columns.createdBy')"
        width="80"
      />
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">
          {{ $t("message.inv.common.detail") }}
        </el-button>
      </template>
    </ProTable>

    <el-drawer
      v-model="detailVisible"
      :title="$t('message.inv.stock.payments.actions.detailTitle')"
      :size="isMobile ? '100%' : '60%'"
      destroy-on-close
    >
      <template v-if="detailData">
        <el-descriptions :column="isMobile ? 1 : 2" border>
          <el-descriptions-item :label="$t('message.inv.stock.payments.form.paymentNo.label')">
            {{ detailData.paymentNo }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.payments.form.status.label')"
            ><StatusTag :status="detailData.status"
          /></el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.payments.form.supplierName.label')">
            {{ detailData.supplierName }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.payments.form.accountName.label')">
            {{ detailData.accountName }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.payments.form.paymentDate.label')">
            {{ detailData.paymentDate }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.payments.form.amount.label')"
            ><AmountDisplay :value="detailData.amount"
          /></el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.payments.form.paymentMethod.label')">
            {{ paymentMethodMap[detailData.paymentMethod] || detailData.paymentMethod }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.payments.form.createdBy.label')">
            {{ detailData.createdBy }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.stock.payments.form.remark.label')"
            :span="isMobile ? 1 : 2"
          >
            {{ detailData.remark || "-" }}
          </el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">
          {{ $t("message.inv.stock.payments.actions.itemsTitle") }}
        </el-divider>
        <div class="detail-table-scroll">
          <el-table :data="detailData.details" border size="small" class="detail-table-wrap">
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column
              prop="payableNo"
              :label="$t('message.inv.stock.payments.columns.payableNo')"
              width="170"
            />
            <el-table-column
              prop="payableAmount"
              :label="$t('message.inv.stock.payments.columns.payableAmount')"
              width="120"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.payableAmount" /></template>
            </el-table-column>
            <el-table-column
              prop="settledAmount"
              :label="$t('message.inv.stock.payments.columns.settledAmount')"
              width="110"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.settledAmount" /></template>
            </el-table-column>
            <el-table-column
              prop="thisSettleAmount"
              :label="$t('message.inv.stock.payments.columns.thisSettleAmount')"
              width="110"
              align="right"
            >
              <template #default="{ row }"
                ><span style="color: #409eff; font-weight: 600"
                  ><AmountDisplay :value="row.thisSettleAmount" /></span
              ></template>
            </el-table-column>
            <el-table-column
              prop="balance"
              :label="$t('message.inv.stock.payments.columns.balance')"
              width="110"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.balance" /></template>
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
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { paymentApi } from "@/api/modules/inventory";
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

/** 付款方式展示文案映射 */
const paymentMethodMap = computed<Record<string, string>>(() =>
  Object.fromEntries(
    readOptions("message.inv.stock.payments.options.paymentMethod").map((item) => [
      item.value,
      item.label,
    ]),
  ),
);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.stock.payments.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.stock.payments.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.stock.payments.search.status.label"),
    type: "select" as const,
    options: [{ label: t("message.inv.status.completed"), value: "completed" }],
  },
]);

async function handleDetail(row: any) {
  const res = await paymentApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
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
    min-width: 670px;
  }
}
</style>
