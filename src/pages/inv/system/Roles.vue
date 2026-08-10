<template>
  <PageContainer title="角色管理" description="管理系统角色及权限分配">
    <ProTable :fetch-fn="roleApi.list" :search-fields="searchFields" :show-search="true">
      <el-table-column prop="roleCode" label="角色编码" width="140" />
      <el-table-column prop="roleName" label="角色名称" width="140" />
      <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
      <el-table-column prop="userCount" label="用户数" width="80" align="right" />
      <el-table-column prop="status" label="状态" width="80" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="170" />
    </ProTable>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import { roleApi } from "@/api/modules/inventory";

const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "角色名称/编码" },
];
</script>
