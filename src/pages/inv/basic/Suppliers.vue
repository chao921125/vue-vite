<template>
  <PageContainer
    :title="$t('message.inv.basic.suppliers.title')"
    :description="$t('message.inv.basic.suppliers.desc')"
  >
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        {{ $t("message.inv.basic.suppliers.actions.add") }}
      </el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="supplierApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="180"
    >
      <el-table-column
        prop="supplierCode"
        :label="$t('message.inv.basic.suppliers.columns.supplierCode')"
        width="110"
      />
      <el-table-column
        prop="supplierName"
        :label="$t('message.inv.basic.suppliers.columns.supplierName')"
        min-width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="contactPerson"
        :label="$t('message.inv.basic.suppliers.columns.contactPerson')"
        width="90"
      />
      <el-table-column
        prop="phone"
        :label="$t('message.inv.basic.suppliers.columns.phone')"
        width="130"
      />
      <el-table-column
        prop="bankName"
        :label="$t('message.inv.basic.suppliers.columns.bankName')"
        width="110"
      />
      <el-table-column
        prop="bankAccount"
        :label="$t('message.inv.basic.suppliers.columns.bankAccount')"
        width="180"
      />
      <el-table-column
        prop="paymentTerms"
        :label="$t('message.inv.basic.suppliers.columns.paymentTerms')"
        width="110"
      >
        <template #default="{ row }">
          {{ paymentTermsLabelMap[row.paymentTerms] || row.paymentTerms }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('message.inv.basic.suppliers.columns.status')"
        width="80"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleEdit(row)">
          {{ $t("message.inv.common.edit") }}
        </el-button>
        <el-popconfirm
          :title="$t('message.inv.basic.suppliers.messages.deleteConfirm')"
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
    <DrawerForm
      v-model="drawerVisible"
      :title="
        editingId
          ? $t('message.inv.basic.suppliers.actions.editTitle')
          : $t('message.inv.basic.suppliers.actions.add')
      "
      :data="editingData"
      :rules="formRules"
      size="600px"
      @submit="handleSubmit"
    >
      <el-row :gutter="16">
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.suppliers.form.supplierCode.label')"
            prop="supplierCode"
          >
            <el-input
              v-model="editingData.supplierCode"
              :placeholder="$t('message.inv.basic.suppliers.form.supplierCode.placeholder')"
              :disabled="!!editingId"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.suppliers.form.supplierName.label')"
            prop="supplierName"
          >
            <el-input
              v-model="editingData.supplierName"
              :placeholder="$t('message.inv.basic.suppliers.form.supplierName.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.suppliers.form.contactPerson.label')"
            prop="contactPerson"
          >
            <el-input
              v-model="editingData.contactPerson"
              :placeholder="$t('message.inv.basic.suppliers.form.contactPerson.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.suppliers.form.phone.label')" prop="phone">
            <el-input
              v-model="editingData.phone"
              :placeholder="$t('message.inv.basic.suppliers.form.phone.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.suppliers.form.email.label')" prop="email">
            <el-input
              v-model="editingData.email"
              :placeholder="$t('message.inv.basic.suppliers.form.email.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.suppliers.form.paymentTerms.label')"
            prop="paymentTerms"
          >
            <el-select v-model="editingData.paymentTerms" style="width: 100%">
              <el-option
                v-for="opt in paymentTermsOptions"
                :key="opt.code"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.suppliers.form.bankName.label')"
            prop="bankName"
          >
            <el-input
              v-model="editingData.bankName"
              :placeholder="$t('message.inv.basic.suppliers.form.bankName.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.suppliers.form.bankAccount.label')"
            prop="bankAccount"
          >
            <el-input
              v-model="editingData.bankAccount"
              :placeholder="$t('message.inv.basic.suppliers.form.bankAccount.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xs="24" :sm="24">
          <el-form-item
            :label="$t('message.inv.basic.suppliers.form.address.label')"
            prop="address"
          >
            <el-input
              v-model="editingData.address"
              :placeholder="$t('message.inv.basic.suppliers.form.address.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xs="24" :sm="24">
          <el-form-item :label="$t('message.inv.basic.suppliers.form.remark.label')" prop="remark">
            <el-input v-model="editingData.remark" type="textarea" :rows="2" />
          </el-form-item>
        </el-col>
      </el-row>
    </DrawerForm>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import DrawerForm from "@/components/inv/DrawerForm.vue";
import { supplierApi } from "@/api/modules/inventory";

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

/** 默认付款条件（对应语言包中的 option code） */
const DEFAULT_PAYMENT_TERMS_CODE = "net30";

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});

/** 付款条件选项 */
const paymentTermsOptions = computed(() =>
  readOptions("message.inv.basic.suppliers.options.paymentTerms"),
);
/** 付款条件展示文案映射 */
const paymentTermsLabelMap = computed<Record<string, string>>(() =>
  Object.fromEntries(paymentTermsOptions.value.map((item) => [item.value, item.label])),
);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.basic.suppliers.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.basic.suppliers.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.basic.suppliers.search.status.label"),
    type: "select" as const,
    options: [
      { label: t("message.inv.status.enabled"), value: "enabled" },
      { label: t("message.inv.status.disabled"), value: "disabled" },
    ],
  },
]);

// 校验规则：computed 保证切换语言时提示语同步刷新
const formRules = computed(() => ({
  supplierCode: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.suppliers.form.supplierCode.label"),
      }),
      trigger: "blur",
    },
  ],
  supplierName: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.suppliers.form.supplierName.label"),
      }),
      trigger: "blur",
    },
  ],
}));

function handleAdd() {
  editingId.value = null;
  Object.keys(editingData).forEach((k) => delete editingData[k]);
  Object.assign(editingData, {
    status: "enabled",
    paymentTerms:
      paymentTermsOptions.value.find((item) => item.code === DEFAULT_PAYMENT_TERMS_CODE)?.value ??
      "",
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
      await supplierApi.update(editingId.value, data);
      ElMessage.success(t("message.inv.common.success.update"));
    } else {
      await supplierApi.create(data);
      ElMessage.success(t("message.inv.common.success.create"));
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}
async function handleDelete(row: any) {
  await supplierApi.remove(row.id);
  ElMessage.success(t("message.inv.common.success.delete"));
  proTableRef.value?.refresh();
}
</script>
