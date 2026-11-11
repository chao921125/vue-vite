<template>
  <PageContainer
    :title="$t('message.inv.stock.receivables.title')"
    :description="$t('message.inv.stock.receivables.desc')"
  >
    <template #header>
      <el-tag type="warning">
        {{ $t("message.inv.stock.receivables.actions.totalReceivable") }}:
        <AmountDisplay :value="totalReceivable" />
      </el-tag>
      <el-tag type="danger">
        {{ $t("message.inv.stock.receivables.actions.totalOverdue") }}:
        <AmountDisplay :value="totalOverdue" />
      </el-tag>
    </template>
    <ProTable ref="proTableRef" :fetch-fn="receivableApi.list" :search-fields="searchFields">
      <el-table-column
        prop="receivableNo"
        :label="$t('message.inv.stock.receivables.columns.receivableNo')"
        width="170"
      />
      <el-table-column
        prop="sourceNo"
        :label="$t('message.inv.stock.receivables.columns.sourceNo')"
        width="170"
      />
      <el-table-column
        prop="customerName"
        :label="$t('message.inv.stock.receivables.columns.customerName')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="receivableAmount"
        :label="$t('message.inv.stock.receivables.columns.receivableAmount')"
        width="120"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.receivableAmount" /></template>
      </el-table-column>
      <el-table-column
        prop="settledAmount"
        :label="$t('message.inv.stock.receivables.columns.settledAmount')"
        width="110"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.settledAmount" /></template>
      </el-table-column>
      <el-table-column
        prop="balance"
        :label="$t('message.inv.stock.receivables.columns.balance')"
        width="110"
        align="right"
      >
        <template #default="{ row }"
          ><span :style="{ color: row.balance > 0 ? '#f56c6c' : '#67c23a' }"
            ><AmountDisplay :value="row.balance" /></span
        ></template>
      </el-table-column>
      <el-table-column
        prop="billingDate"
        :label="$t('message.inv.stock.receivables.columns.billingDate')"
        width="110"
      />
      <el-table-column
        prop="dueDate"
        :label="$t('message.inv.stock.receivables.columns.dueDate')"
        width="110"
      />
      <el-table-column
        prop="status"
        :label="$t('message.inv.stock.receivables.columns.status')"
        width="90"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
    </ProTable>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { receivableApi } from "@/api/modules/inventory";

const { t } = useI18n();

const proTableRef = ref();
const totalReceivable = ref(0);
const totalOverdue = ref(0);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.stock.receivables.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.stock.receivables.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.stock.receivables.search.status.label"),
    type: "select" as const,
    options: [
      { label: t("message.inv.status.unsettled"), value: "unsettled" },
      { label: t("message.inv.status.partial"), value: "partial" },
      { label: t("message.inv.status.settled"), value: "settled" },
      { label: t("message.inv.status.overdue"), value: "overdue" },
    ],
  },
]);

onMounted(async () => {
  const res = await receivableApi.list({ page: 1, pageSize: 1000 });
  const list = res.data?.list || [];
  totalReceivable.value = list.reduce((s: number, i: any) => s + i.balance, 0);
  totalOverdue.value = list
    .filter((i: any) => i.status === "overdue")
    .reduce((s: number, i: any) => s + i.balance, 0);
});
</script>
