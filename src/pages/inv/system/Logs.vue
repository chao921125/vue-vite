<template>
  <PageContainer title="操作日志" description="查询系统操作记录">
    <ProTable :fetch-fn="logApi.list" :search-fields="searchFields">
      <el-table-column prop="username" label="操作人" width="100" />
      <el-table-column prop="module" label="模块" width="110">
        <template #default="{ row }">
          <el-tag size="small">{{ row.module }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="140" />
      <el-table-column prop="description" label="描述" min-width="260" show-overflow-tooltip />
      <el-table-column prop="ip" label="IP地址" width="130" />
      <el-table-column prop="createdAt" label="操作时间" width="170" />
    </ProTable>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import { logApi } from "@/api/modules/inventory";

const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "操作人/操作内容" },
  {
    prop: "module",
    label: "模块",
    type: "select" as const,
    options: [
      { label: "采购管理", value: "采购管理" },
      { label: "销售管理", value: "销售管理" },
      { label: "库存管理", value: "库存管理" },
      { label: "基础资料", value: "基础资料" },
      { label: "资金管理", value: "资金管理" },
      { label: "系统管理", value: "系统管理" },
    ],
  },
  { prop: "dateRange", label: "日期", type: "daterange" as const },
];
</script>
