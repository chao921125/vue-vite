<template>
  <PageContainer
    :title="$t('message.inv.basic.products.title')"
    :description="$t('message.inv.basic.products.desc')"
  >
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        {{ $t("message.inv.basic.products.actions.add") }}
      </el-button>
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
      <el-table-column
        prop="productCode"
        :label="$t('message.inv.basic.products.columns.productCode')"
        width="100"
      />
      <el-table-column
        prop="productName"
        :label="$t('message.inv.basic.products.columns.productName')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="categoryName"
        :label="$t('message.inv.basic.products.columns.category')"
        width="100"
      />
      <el-table-column
        prop="brandName"
        :label="$t('message.inv.basic.products.columns.brand')"
        width="100"
      />
      <el-table-column
        prop="spec"
        :label="$t('message.inv.basic.products.columns.spec')"
        min-width="160"
        show-overflow-tooltip
      />
      <el-table-column
        prop="unitName"
        :label="$t('message.inv.basic.products.columns.unit')"
        width="60"
        align="center"
      />
      <el-table-column
        prop="purchasePrice"
        :label="$t('message.inv.basic.products.columns.purchasePrice')"
        width="100"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.purchasePrice" /></template>
      </el-table-column>
      <el-table-column
        prop="salePrice"
        :label="$t('message.inv.basic.products.columns.salePrice')"
        width="100"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.salePrice" /></template>
      </el-table-column>
      <el-table-column
        prop="taxRate"
        :label="$t('message.inv.basic.products.columns.taxRate')"
        width="70"
        align="center"
      >
        <template #default="{ row }">{{ row.taxRate }}%</template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('message.inv.basic.products.columns.status')"
        width="80"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleEdit(row)">
          {{ $t("message.inv.common.edit") }}
        </el-button>
        <el-button text type="warning" size="small" @click="handleToggleStatus(row)">
          {{
            row.status === "enabled"
              ? $t("message.inv.status.disabled")
              : $t("message.inv.status.enabled")
          }}
        </el-button>
        <el-popconfirm
          :title="$t('message.inv.basic.products.messages.deleteConfirm')"
          @confirm="handleDelete(row)"
        >
          <template #reference>
            <el-button text type="danger" size="small">{{
              $t("message.inv.common.delete")
            }}</el-button>
          </template>
        </el-popconfirm>
      </template>
    </ProTable>

    <!-- 新增/编辑抽屉 -->
    <DrawerForm
      v-model="drawerVisible"
      :title="
        editingId
          ? $t('message.inv.basic.products.actions.editTitle')
          : $t('message.inv.basic.products.actions.add')
      "
      :data="editingData"
      :rules="formRules"
      size="600px"
      @submit="handleSubmit"
    >
      <el-row :gutter="16">
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.products.form.productCode.label')"
            prop="productCode"
          >
            <el-input
              v-model="editingData.productCode"
              :placeholder="$t('message.inv.basic.products.form.productCode.placeholder')"
              :disabled="!!editingId"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.products.form.productName.label')"
            prop="productName"
          >
            <el-input
              v-model="editingData.productName"
              :placeholder="$t('message.inv.basic.products.form.productName.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.products.form.barcode.label')" prop="barcode">
            <el-input
              v-model="editingData.barcode"
              :placeholder="$t('message.inv.basic.products.form.barcode.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.products.form.category.label')"
            prop="categoryId"
          >
            <el-select
              v-model="editingData.categoryId"
              :placeholder="$t('message.inv.basic.products.form.category.placeholder')"
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
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.products.form.brand.label')" prop="brandName">
            <el-input
              v-model="editingData.brandName"
              :placeholder="$t('message.inv.basic.products.form.brand.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.products.form.unit.label')" prop="unitName">
            <el-select
              v-model="editingData.unitName"
              :placeholder="$t('message.inv.basic.products.form.unit.placeholder')"
              style="width: 100%"
              filterable
              allow-create
            >
              <el-option v-for="u in units" :key="u.id" :label="u.unitName" :value="u.unitName" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.products.form.spec.label')" prop="spec">
            <el-input
              v-model="editingData.spec"
              :placeholder="$t('message.inv.basic.products.form.spec.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.products.form.model.label')" prop="model">
            <el-input
              v-model="editingData.model"
              :placeholder="$t('message.inv.basic.products.form.model.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.products.form.purchasePrice.label')"
            prop="purchasePrice"
          >
            <el-input-number
              v-model="editingData.purchasePrice"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.products.form.salePrice.label')"
            prop="salePrice"
          >
            <el-input-number
              v-model="editingData.salePrice"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.products.form.retailPrice.label')"
            prop="retailPrice"
          >
            <el-input-number
              v-model="editingData.retailPrice"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.products.form.taxRate.label')" prop="taxRate">
            <el-select v-model="editingData.taxRate" style="width: 100%">
              <el-option :value="0" label="0%" /><el-option :value="3" label="3%" />
              <el-option :value="13" label="13%" /><el-option :value="6" label="6%" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.products.form.minStock.label')"
            prop="minStock"
          >
            <el-input-number v-model="editingData.minStock" :min="0" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.products.form.maxStock.label')"
            prop="maxStock"
          >
            <el-input-number v-model="editingData.maxStock" :min="0" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xs="24" :sm="24">
          <el-form-item :label="$t('message.inv.basic.products.form.remark.label')" prop="remark">
            <el-input
              v-model="editingData.remark"
              type="textarea"
              :rows="2"
              :placeholder="$t('message.inv.basic.products.form.remark.placeholder')"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </DrawerForm>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import DrawerForm from "@/components/inv/DrawerForm.vue";
import { productApi, unitApi, brandApi } from "@/api/modules/inventory";

const { t } = useI18n();

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});
const categories = ref<any[]>([]);
const units = ref<any[]>([]);
const brands = ref<any[]>([]);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.basic.products.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.basic.products.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.basic.products.search.status.label"),
    type: "select" as const,
    options: [
      { label: t("message.inv.status.enabled"), value: "enabled" },
      { label: t("message.inv.status.disabled"), value: "disabled" },
    ],
  },
]);

// 校验规则：computed 保证切换语言时提示语同步刷新
const formRules = computed(() => ({
  productCode: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.products.form.productCode.label"),
      }),
      trigger: "blur",
    },
  ],
  productName: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.products.form.productName.label"),
      }),
      trigger: "blur",
    },
  ],
  purchasePrice: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.products.form.purchasePrice.label"),
      }),
      trigger: "blur",
    },
  ],
  salePrice: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.products.form.salePrice.label"),
      }),
      trigger: "blur",
    },
  ],
}));

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
      ElMessage.success(t("message.inv.common.success.update"));
    } else {
      await productApi.create(data);
      ElMessage.success(t("message.inv.common.success.create"));
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}

async function handleToggleStatus(row: any) {
  await productApi.toggleStatus(row.id);
  ElMessage.success(t("message.inv.common.success.operate"));
  proTableRef.value?.refresh();
}

async function handleDelete(row: any) {
  await productApi.remove(row.id);
  ElMessage.success(t("message.inv.common.success.delete"));
  proTableRef.value?.refresh();
}

onMounted(loadOptions);
</script>
