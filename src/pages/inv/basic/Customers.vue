<template>
  <PageContainer title="客户管理" description="管理客户基础资料、信用额度">
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">新增客户</el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="customerApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="180"
    >
      <el-table-column prop="customerCode" label="客户编码" width="100" />
      <el-table-column prop="customerName" label="客户名称" min-width="180" show-overflow-tooltip />
      <el-table-column prop="contactPerson" label="联系人" width="90" />
      <el-table-column prop="phone" label="电话" width="130" />
      <el-table-column prop="level" label="等级" width="70" align="center">
        <template #default="{ row }">
          <el-tag :type="levelMap[row.level]?.type as any" size="small">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creditLimit" label="信用额度" width="120" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.creditLimit" /></template>
      </el-table-column>
      <el-table-column label="已用额度" width="120" align="right">
        <template #default="{ row }">
          <span :style="{ color: row.creditUsed / row.creditLimit > 0.8 ? '#f56c6c' : '' }">
            <AmountDisplay :value="row.creditUsed" />
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="settlementMethod" label="结算方式" width="110" />
      <el-table-column prop="status" label="状态" width="80" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-popconfirm title="确定删除该客户吗？" @confirm="handleDelete(row)">
          <template #reference
            ><el-button text type="danger" size="small">删除</el-button></template
          >
        </el-popconfirm>
      </template>
    </ProTable>
    <DrawerForm
      v-model="drawerVisible"
      :title="editingId ? '编辑客户' : '新增客户'"
      :data="editingData"
      :rules="formRules"
      size="600px"
      @submit="handleSubmit"
    >
      <el-row :gutter="16">
        <el-col :span="12"
          ><el-form-item label="客户编码" prop="customerCode"
            ><el-input
              v-model="editingData.customerCode"
              placeholder="请输入客户编码"
              :disabled="!!editingId" /></el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="客户名称" prop="customerName"
            ><el-input
              v-model="editingData.customerName"
              placeholder="请输入客户名称" /></el-form-item
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
          ><el-form-item label="客户等级" prop="level">
            <el-select v-model="editingData.level" style="width: 100%"
              ><el-option label="VIP" value="VIP" /><el-option label="A" value="A" /><el-option
                label="B"
                value="B" /><el-option label="C" value="C"
            /></el-select> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="信用额度" prop="creditLimit"
            ><el-input-number
              v-model="editingData.creditLimit"
              :min="0"
              :precision="2"
              style="width: 100%" /></el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="结算方式" prop="settlementMethod">
            <el-select v-model="editingData.settlementMethod" style="width: 100%"
              ><el-option label="款到发货" value="款到发货" /><el-option
                label="月结15天"
                value="月结15天" /><el-option label="月结30天" value="月结30天" /><el-option
                label="月结60天"
                value="月结60天"
            /></el-select> </el-form-item
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
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import DrawerForm from "@/components/inv/DrawerForm.vue";
import { customerApi } from "@/api/modules/inventory";

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});
const levelMap: Record<string, { type: string }> = {
  VIP: { type: "danger" },
  A: { type: "warning" },
  B: { type: "primary" },
  C: { type: "info" },
};
const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "编码/名称" },
  {
    prop: "level",
    label: "等级",
    type: "select" as const,
    options: [
      { label: "VIP", value: "VIP" },
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
    ],
  },
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
  customerCode: [{ required: true, message: "请输入客户编码", trigger: "blur" }],
  customerName: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
};

function handleAdd() {
  editingId.value = null;
  Object.keys(editingData).forEach((k) => delete editingData[k]);
  Object.assign(editingData, {
    status: "enabled",
    level: "B",
    creditLimit: 0,
    settlementMethod: "月结30天",
  });
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
      await customerApi.update(editingId.value, data);
      ElMessage.success("修改成功");
    } else {
      await customerApi.create(data);
      ElMessage.success("新增成功");
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}
async function handleDelete(row: any) {
  await customerApi.remove(row.id);
  ElMessage.success("删除成功");
  proTableRef.value?.refresh();
}
</script>
