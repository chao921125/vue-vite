<template>
  <PageContainer
    :title="$t('message.inv.report.logs.title')"
    :description="$t('message.inv.report.logs.desc')"
  >
    <ProTable :fetch-fn="logApi.list" :search-fields="searchFields">
      <el-table-column
        prop="username"
        :label="$t('message.inv.report.logs.columns.username')"
        width="100"
      />
      <el-table-column
        prop="module"
        :label="$t('message.inv.report.logs.columns.module')"
        width="110"
      >
        <template #default="{ row }">
          <el-tag size="small">{{ moduleLabelMap[row.module] || row.module }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="action"
        :label="$t('message.inv.report.logs.columns.action')"
        width="140"
      />
      <el-table-column
        prop="description"
        :label="$t('message.inv.report.logs.columns.description')"
        min-width="260"
        show-overflow-tooltip
      />
      <el-table-column prop="ip" :label="$t('message.inv.report.logs.columns.ip')" width="130" />
      <el-table-column
        prop="createdAt"
        :label="$t('message.inv.report.logs.columns.createdAt')"
        width="170"
      />
    </ProTable>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import { logApi } from "@/api/modules/inventory";

const { t, tm } = useI18n();

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

/** 日志模块选项：value 为接口存储的中文模块名称，label 为展示文案 */
const moduleOptions = computed(() => readOptions("message.inv.report.logs.options.module"));
/** 日志模块展示文案映射 */
const moduleLabelMap = computed<Record<string, string>>(() =>
  Object.fromEntries(moduleOptions.value.map((item) => [item.value, item.label])),
);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.report.logs.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.report.logs.search.keyword.placeholder"),
  },
  {
    prop: "module",
    label: t("message.inv.report.logs.search.module.label"),
    type: "select" as const,
    options: moduleOptions.value.map((item) => ({ label: item.label, value: item.value })),
  },
  {
    prop: "dateRange",
    label: t("message.inv.report.logs.search.dateRange.label"),
    type: "daterange" as const,
  },
]);
</script>
