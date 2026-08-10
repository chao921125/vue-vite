<template>
  <PageContainer title="商品管理" description="管理商品基础资料、规格、价格信息">
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">新增商品</el-button>
    </template>

    <ProTable
      ref="proTableRef"
      :fetch-fn="productApi.list"
      :search-fields="searchFields"
      show-add
      show-action
      :action-width="220"
      @add="handleAdd"
    >
      <el-table-column prop="productCode" label="商品编码" width="100" />
      <el-table-column prop="productName" label="商品名称" min-width="180" show-overflow-tooltip />
      <el-table-column prop="categoryName" label="分类" width="100" />
      <el-table-column prop="brandName" label="品牌" width="100" />
      <el-table-column prop="spec" label="规格" min-width="160" show-overflow-tooltip />
      <el-table-column prop="unitName" label="单位" width="60" align="center" />
      <el-table-column prop="purchasePrice" label="采购价" width="100" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.purchasePrice" /></template>
      </el-table-column>
      <el-table-column prop="salePrice" label="销售价" width="100" align="right">
        <template #default="{ row }"><AmountDisplay :value="row.salePrice" /></template>
      </el-table-column>
      <el-table-column prop="taxRate" label="税率" width="70" align="center">
        <template #default="{ row }">{{ row.taxRate }}%</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80" align="center">
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button text type="warning" size="small" @click="handleToggleStatus(row)">
          {{ row.status === "enabled" ? "停用" : "启用" }}
        </el-button>
        <el-popconfirm title="确定删除该商品吗？" @confirm="handleDelete(row)">
          <template #reference>
            <el-button text type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </ProTable>

    <!-- 新增/编辑抽屉 -->
    <DrawerForm
      v-model="drawerVisible"
      :title="editingId ? '编辑商品' : '新增商品'"
      :data="editingData"
      :rules="formRules"
      size="600px"
      @submit="handleSubmit"
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="商品编码" prop="productCode">
            <el-input
              v-model="editingData.productCode"
              placeholder="请输入商品编码"
              :disabled="!!editingId"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="productName">
            <el-input v-model="editingData.productName" placeholder="请输入商品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="条形码" prop="barcode">
            <el-input v-model="editingData.barcode" placeholder="请输入条形码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类" prop="categoryId">
            <el-select
              v-model="editingData.categoryId"
              placeholder="请选择分类"
              style="width: 100%"
            >
              <el-option
                v-for="c in categories"
                :key="c.id"
                :label="c.categoryName"
                :value="c.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="brandName">
            <el-input v-model="editingData.brandName" placeholder="请输入品牌" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" prop="unitName">
            <el-select
              v-model="editingData.unitName"
              placeholder="请选择单位"
              style="width: 100%"
              filterable
              allow-create
            >
              <el-option v-for="u in units" :key="u.id" :label="u.unitName" :value="u.unitName" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格" prop="spec">
            <el-input v-model="editingData.spec" placeholder="请输入规格" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="型号" prop="model">
            <el-input v-model="editingData.model" placeholder="请输入型号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购价" prop="purchasePrice">
            <el-input-number
              v-model="editingData.purchasePrice"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售价" prop="salePrice">
            <el-input-number
              v-model="editingData.salePrice"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="零售价" prop="retailPrice">
            <el-input-number
              v-model="editingData.retailPrice"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="税率" prop="taxRate">
            <el-select v-model="editingData.taxRate" style="width: 100%">
              <el-option :value="0" label="0%" /><el-option :value="3" label="3%" />
              <el-option :value="13" label="13%" /><el-option :value="6" label="6%" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最低库存" prop="minStock">
            <el-input-number v-model="editingData.minStock" :min="0" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最高库存" prop="maxStock">
            <el-input-number v-model="editingData.maxStock" :min="0" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="editingData.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </DrawerForm>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import DrawerForm from "@/components/inv/DrawerForm.vue";
import { productApi, unitApi, brandApi } from "@/api/modules/inventory";

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});
const categories = ref<any[]>([]);
const units = ref<any[]>([]);
const brands = ref<any[]>([]);

const searchFields = [
  { prop: "keyword", label: "关键词", type: "input" as const, placeholder: "商品编码/名称" },
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
  productCode: [{ required: true, message: "请输入商品编码", trigger: "blur" }],
  productName: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  purchasePrice: [{ required: true, message: "请输入采购价", trigger: "blur" }],
  salePrice: [{ required: true, message: "请输入销售价", trigger: "blur" }],
};

async function loadOptions() {
  const [catRes, unitRes] = await Promise.all([productApi.categoryTree(), unitApi.list()]);
  // 扁平化分类树
  const flat: any[] = [];
  const walk = (items: any[]) =>
    items.forEach((i) => {
      flat.push(i);
      if (i.children) walk(i.children);
    });
  walk(catRes.data || []);
  categories.value = flat;
  units.value = unitRes.data || [];
}

function handleAdd() {
  editingId.value = null;
  Object.keys(editingData).forEach((k) => delete editingData[k]);
  Object.assign(editingData, {
    status: "enabled",
    taxRate: 13,
    minStock: 0,
    maxStock: 0,
    purchasePrice: 0,
    salePrice: 0,
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
      await productApi.update(editingId.value, data);
      ElMessage.success("修改成功");
    } else {
      await productApi.create(data);
      ElMessage.success("新增成功");
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}

async function handleToggleStatus(row: any) {
  await productApi.toggleStatus(row.id);
  ElMessage.success("操作成功");
  proTableRef.value?.refresh();
}

async function handleDelete(row: any) {
  await productApi.remove(row.id);
  ElMessage.success("删除成功");
  proTableRef.value?.refresh();
}

onMounted(loadOptions);
</script>
