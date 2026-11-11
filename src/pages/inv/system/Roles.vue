<template>
  <PageContainer
    :title="$t('message.inv.report.roles.title')"
    :description="$t('message.inv.report.roles.desc')"
  >
    <ProTable :fetch-fn="roleApi.list" :search-fields="searchFields" :show-search="true">
      <el-table-column
        prop="roleCode"
        :label="$t('message.inv.report.roles.columns.roleCode')"
        width="140"
      />
      <el-table-column
        prop="roleName"
        :label="$t('message.inv.report.roles.columns.roleName')"
        width="140"
      >
        <template #default="{ row }">{{ roleLabelMap[row.roleCode] || row.roleName }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        :label="$t('message.inv.report.roles.columns.description')"
        min-width="200"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          {{ roleDescriptionMap[row.roleCode] || row.description }}
        </template>
      </el-table-column>
      <el-table-column
        prop="userCount"
        :label="$t('message.inv.report.roles.columns.userCount')"
        width="80"
        align="right"
      />
      <el-table-column
        prop="status"
        :label="$t('message.inv.report.roles.columns.status')"
        width="80"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        :label="$t('message.inv.report.roles.columns.createdAt')"
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
import StatusTag from "@/components/inv/StatusTag.vue";
import { roleApi } from "@/api/modules/inventory";

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

/** 角色选项：value 为接口存储的角色编码，label 为展示文案 */
const roleOptions = computed(() => readOptions("message.inv.report.roles.options.role"));
/** 角色描述选项：value 为接口存储的角色编码，label 为展示文案 */
const roleDescriptionOptions = computed(() =>
  readOptions("message.inv.report.roles.options.roleDescription"),
);
/** 角色名称展示文案映射 */
const roleLabelMap = computed<Record<string, string>>(() =>
  Object.fromEntries(roleOptions.value.map((item) => [item.value, item.label])),
);
/** 角色描述展示文案映射 */
const roleDescriptionMap = computed<Record<string, string>>(() =>
  Object.fromEntries(roleDescriptionOptions.value.map((item) => [item.value, item.label])),
);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.report.roles.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.report.roles.search.keyword.placeholder"),
  },
]);
</script>
