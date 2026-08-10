<template>
  <PageContainer title="供应商管理" description="管理供应商基础资料、付款条件">
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">新增供应商</el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="supplierApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="180"
    >
      <el-table-column prop="supplierCode" label="供应商编码" width="110" />
      <el-table-column
        prop="supplierName"
        label="供应商名称"
        min-width="200"
        show-overflow-tooltip
      />
      <el-table-column prop="contactPerson" label="联系人" width="90" />
      <el-table-column prop="phone" label="电话" width="130" />
      <el-table-column prop="bankName" label="开户银行" width="110" />
      <el-table-column prop="bankAccount" label="银行账号" width="180" />
      <el-table-column prop="paymentTerms" label="付款条件" width="110" />
      <el-table-column prop="status" label="状态" width="80" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-popconfirm title="确定删除该供应商吗？" @confirm="handleDelete(row)">
          <template #reference
            ><el-button text type="danger" size="small">删除</el-button></template
          >
        </el-popconfirm>
      </template>
    </ProTable>
    <DrawerForm
      v-model="drawerVisible"
      :title="editingId ? '编辑供应商' : '新增供应商'"
      :data="editingData"
      :rules="formRules"
      size="600px"
      @submit="handleSubmit"
    >
      <el-row :gutter="16">
        <el-col :span="12"
          ><el-form-item label="供应商编码" prop="supplierCode"
            ><el-input
              v-model="editingData.supplierCode"
              placeholder="请输入编码"
              :disabled="!!editingId" /></el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="供应商名称" prop="supplierName"
            ><el-input v-model="editingData.supplierName" placeholder="请输入名称" /></el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="联系人" prop="contactPerson"
            ><el-input
              v-model="editingData.contactPerson"
              placeholder="请输入联系人" /></el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="电话" prop="phone"
            ><el-input v-model="editingData.phone" placeholder="请输入电话" /></el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="邮箱" prop="email"
            ><el-input v-model="editingData.email" placeholder="请输入邮箱" /></el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="付款条件" prop="paymentTerms">
            <el-select v-model="editingData.paymentTerms" style="width: 100%"
              ><el-option label="款到发货" value="款到发货" /><el-option
                label="货到付款"
                value="货到付款" /><el-option label="月结15天" value="月结15天" /><el-option
                label="月结30天"
                value="月结30天" /><el-option label="月结45天" value="月结45天" /><el-option
                label="月结60天"
                value="月结60天"
            /></el-select> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="开户银行" prop="bankName"
            ><el-input v-model="editingData.bankName" placeholder="请输入开户银行" /></el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="银行账号" prop="bankAccount"
            ><el-input
              v-model="editingData.bankAccount"
              placeholder="请输入银行账号" /></el-form-item
        ></el-col>
        <el-col :span="24"
          ><el-form-item label="地址" prop="address"
            ><el-input v-model="editingData.address" placeholder="请输入地址" /></el-form-item
        ></el-col>
        <el-col :span="24"
          ><el-form-item label="备注" prop="remark"
            ><el-input v-model="editingData.remark" type="textarea" :rows="2" /></el-form-item
        ></el-col>
      </el-row>
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
import { supplierApi } from "@/api/modules/inventory";

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});
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
  supplierCode: [{ required: true, message: "请输入供应商编码", trigger: "blur" }],
  supplierName: [{ required: true, message: "请输入供应商名称", trigger: "blur" }],
};

function handleAdd() {
  editingId.value = null;
  Object.keys(editingData).forEach((k) => delete editingData[k]);
  Object.assign(editingData, { status: "enabled", paymentTerms: "月结30天" });
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
      await supplierApi.update(editingId.value, data);
      ElMessage.success("修改成功");
    } else {
      await supplierApi.create(data);
      ElMessage.success("新增成功");
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}
async function handleDelete(row: any) {
  await supplierApi.remove(row.id);
  ElMessage.success("删除成功");
  proTableRef.value?.refresh();
}
</script>
