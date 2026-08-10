<template>
  <PageContainer title="仓库管理" description="管理仓库基础信息">
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">新增仓库</el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="warehouseApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="180"
    >
      <el-table-column prop="warehouseCode" label="仓库编码" width="120" />
      <el-table-column prop="warehouseName" label="仓库名称" min-width="140" />
      <el-table-column prop="type" label="类型" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="warehouseTypeMap[row.type]?.type as any" size="small">{{
            warehouseTypeMap[row.type]?.label || row.type
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
      <el-table-column prop="manager" label="负责人" width="90" />
      <el-table-column prop="phone" label="电话" width="130" />
      <el-table-column prop="status" label="状态" width="80" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-popconfirm title="确定删除该仓库吗？" @confirm="handleDelete(row)">
          <template #reference
            ><el-button text type="danger" size="small">删除</el-button></template
          >
        </el-popconfirm>
      </template>
    </ProTable>
    <DrawerForm
      v-model="drawerVisible"
      :title="editingId ? '编辑仓库' : '新增仓库'"
      :data="editingData"
      :rules="formRules"
      size="500px"
      @submit="handleSubmit"
    >
      <el-form-item label="仓库编码" prop="warehouseCode"
        ><el-input
          v-model="editingData.warehouseCode"
          placeholder="请输入仓库编码"
          :disabled="!!editingId"
      /></el-form-item>
      <el-form-item label="仓库名称" prop="warehouseName"
        ><el-input v-model="editingData.warehouseName" placeholder="请输入仓库名称"
      /></el-form-item>
      <el-form-item label="仓库类型" prop="type">
        <el-select v-model="editingData.type" style="width: 100%">
          <el-option label="主仓库" value="main" /><el-option label="分仓" value="branch" />
          <el-option label="退货仓" value="return" /><el-option label="次品仓" value="defective" />
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address"
        ><el-input v-model="editingData.address" placeholder="请输入仓库地址"
      /></el-form-item>
      <el-form-item label="负责人" prop="manager"
        ><el-input v-model="editingData.manager" placeholder="请输入负责人"
      /></el-form-item>
      <el-form-item label="电话" prop="phone"
        ><el-input v-model="editingData.phone" placeholder="请输入联系电话"
      /></el-form-item>
      <el-form-item label="备注" prop="remark"
        ><el-input v-model="editingData.remark" type="textarea" :rows="2"
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
import { warehouseApi } from "@/api/modules/inventory";

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});
const warehouseTypeMap: Record<string, { label: string; type: string }> = {
  main: { label: "主仓库", type: "primary" },
  branch: { label: "分仓", type: "success" },
  return: { label: "退货仓", type: "warning" },
  defective: { label: "次品仓", type: "danger" },
};
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "编码/名称" },
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
  warehouseCode: [{ required: true, message: "请输入仓库编码", trigger: "blur" }],
  warehouseName: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
};

function handleAdd() {
  editingId.value = null;
  Object.keys(editingData).forEach((k) => delete editingData[k]);
  Object.assign(editingData, { status: "enabled", type: "main" });
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
      await warehouseApi.update(editingId.value, data);
      ElMessage.success("修改成功");
    } else {
      await warehouseApi.create(data);
      ElMessage.success("新增成功");
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}
async function handleDelete(row: any) {
  await warehouseApi.remove(row.id);
  ElMessage.success("删除成功");
  proTableRef.value?.refresh();
}
</script>
