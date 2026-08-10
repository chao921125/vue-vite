<template>
  <PageContainer title="用户管理" description="管理系统用户、角色分配">
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">新增用户</el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="userApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="200"
    >
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="nickname" label="昵称" width="120" />
      <el-table-column prop="department" label="部门" width="100" />
      <el-table-column prop="roles" label="角色" width="120">
        <template #default="{ row }">
          <el-tag v-for="r in row.roles" :key="r" size="small" style="margin-right: 4px">{{
            getRoleName(r)
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="130" />
      <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip />
      <el-table-column prop="lastLogin" label="最后登录" width="170" />
      <el-table-column prop="status" label="状态" width="80" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button text type="warning" size="small" @click="handleResetPassword(row)"
          >重置密码</el-button
        >
        <el-popconfirm title="确定删除该用户吗？" @confirm="handleDelete(row)">
          <template #reference
            ><el-button text type="danger" size="small">删除</el-button></template
          >
        </el-popconfirm>
      </template>
    </ProTable>

    <DrawerForm
      v-model="drawerVisible"
      :title="editingId ? '编辑用户' : '新增用户'"
      :data="editingData"
      :rules="formRules"
      size="500px"
      @submit="handleSubmit"
    >
      <el-form-item label="用户名" prop="username"
        ><el-input
          v-model="editingData.username"
          placeholder="请输入用户名"
          :disabled="!!editingId"
      /></el-form-item>
      <el-form-item label="昵称" prop="nickname"
        ><el-input v-model="editingData.nickname" placeholder="请输入昵称"
      /></el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="editingData.department" style="width: 100%"
          ><el-option label="IT部" value="IT部" /><el-option
            label="采购部"
            value="采购部" /><el-option label="销售部" value="销售部" /><el-option
            label="仓储部"
            value="仓储部" /><el-option label="财务部" value="财务部" /><el-option
            label="运营部"
            value="运营部"
        /></el-select>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="editingData.roles" multiple style="width: 100%"
          ><el-option label="系统管理员" value="admin" /><el-option
            label="采购员"
            value="purchaser" /><el-option label="销售员" value="salesperson" /><el-option
            label="仓库管理员"
            value="warehouse" /><el-option label="财务员" value="finance" /><el-option
            label="查看者"
            value="viewer"
        /></el-select>
      </el-form-item>
      <el-form-item label="电话" prop="phone"
        ><el-input v-model="editingData.phone" placeholder="请输入电话"
      /></el-form-item>
      <el-form-item label="邮箱" prop="email"
        ><el-input v-model="editingData.email" placeholder="请输入邮箱"
      /></el-form-item>
    </DrawerForm>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import DrawerForm from "@/components/inv/DrawerForm.vue";
import { userApi } from "@/api/modules/inventory";

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "用户名/昵称" },
  {
    prop: "status",
    label: "状态",
    type: "select" as const,
    options: [
      { label: "启用", value: "enabled" },
      { label: "停用", value: "disabled" },
    ],
  },
];
const formRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
};
const roleMap: Record<string, string> = {
  admin: "系统管理员",
  purchaser: "采购员",
  salesperson: "销售员",
  warehouse: "仓库管理员",
  finance: "财务员",
  viewer: "查看者",
};
const getRoleName = (code: string) => roleMap[code] || code;

function handleAdd() {
  editingId.value = null;
  Object.keys(editingData).forEach((k) => delete editingData[k]);
  Object.assign(editingData, { status: "enabled", roles: [], department: "IT部" });
  drawerVisible.value = true;
}
function handleEdit(row: any) {
  editingId.value = row.id;
  Object.keys(editingData).forEach((k) => delete editingData[k]);
  Object.assign(editingData, row);
  drawerVisible.value = true;
}
async function handleSubmit(data: any, done: () => void) {
  try {
    if (editingId.value) {
      await userApi.update(editingId.value, data);
      ElMessage.success("修改成功");
    } else {
      await userApi.create(data);
      ElMessage.success("新增成功");
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}
async function handleDelete(row: any) {
  await userApi.remove(row.id);
  ElMessage.success("删除成功");
  proTableRef.value?.refresh();
}
function handleResetPassword(row: any) {
  ElMessage.success(`已重置用户 ${row.username} 的密码为默认密码`);
}
</script>
