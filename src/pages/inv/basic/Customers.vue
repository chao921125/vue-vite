<template>
  <PageContainer
    :title="$t('message.inv.basic.customers.title')"
    :description="$t('message.inv.basic.customers.desc')"
  >
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        {{ $t("message.inv.basic.customers.actions.add") }}
      </el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="customerApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="180"
    >
      <el-table-column
        prop="customerCode"
        :label="$t('message.inv.basic.customers.columns.customerCode')"
        width="100"
      />
      <el-table-column
        prop="customerName"
        :label="$t('message.inv.basic.customers.columns.customerName')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="contactPerson"
        :label="$t('message.inv.basic.customers.columns.contactPerson')"
        width="90"
      />
      <el-table-column
        prop="phone"
        :label="$t('message.inv.basic.customers.columns.phone')"
        width="130"
      />
      <el-table-column
        prop="level"
        :label="$t('message.inv.basic.customers.columns.level')"
        width="70"
        align="center"
      >
        <template #default="{ row }">
          <el-tag :type="levelTagTypes[row.level] as any" size="small">
            {{ levelLabelMap[row.level] || row.level }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="creditLimit"
        :label="$t('message.inv.basic.customers.columns.creditLimit')"
        width="120"
        align="right"
      >
        <template #default="{ row }"><AmountDisplay :value="row.creditLimit" /></template>
      </el-table-column>
      <el-table-column
        :label="$t('message.inv.basic.customers.columns.creditUsed')"
        width="120"
        align="right"
      >
        <template #default="{ row }">
          <span :style="{ color: row.creditUsed / row.creditLimit > 0.8 ? '#f56c6c' : '' }">
            <AmountDisplay :value="row.creditUsed" />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="settlementMethod"
        :label="$t('message.inv.basic.customers.columns.settlementMethod')"
        width="110"
      >
        <template #default="{ row }">
          {{ settlementLabelMap[row.settlementMethod] || row.settlementMethod }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('message.inv.basic.customers.columns.status')"
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
          :title="$t('message.inv.basic.customers.messages.deleteConfirm')"
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
          ? $t('message.inv.basic.customers.actions.editTitle')
          : $t('message.inv.basic.customers.actions.add')
      "
      :data="editingData"
      :rules="formRules"
      size="600px"
      @submit="handleSubmit"
    >
      <el-row :gutter="16">
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.customers.form.customerCode.label')"
            prop="customerCode"
          >
            <el-input
              v-model="editingData.customerCode"
              :placeholder="$t('message.inv.basic.customers.form.customerCode.placeholder')"
              :disabled="!!editingId"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.customers.form.customerName.label')"
            prop="customerName"
          >
            <el-input
              v-model="editingData.customerName"
              :placeholder="$t('message.inv.basic.customers.form.customerName.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.customers.form.contactPerson.label')"
            prop="contactPerson"
          >
            <el-input
              v-model="editingData.contactPerson"
              :placeholder="$t('message.inv.basic.customers.form.contactPerson.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.customers.form.phone.label')" prop="phone">
            <el-input
              v-model="editingData.phone"
              :placeholder="$t('message.inv.basic.customers.form.phone.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.customers.form.email.label')" prop="email">
            <el-input
              v-model="editingData.email"
              :placeholder="$t('message.inv.basic.customers.form.email.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item :label="$t('message.inv.basic.customers.form.level.label')" prop="level">
            <el-select v-model="editingData.level" style="width: 100%">
              <el-option
                v-for="opt in levelOptions"
                :key="opt.code"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.customers.form.creditLimit.label')"
            prop="creditLimit"
          >
            <el-input-number
              v-model="editingData.creditLimit"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12">
          <el-form-item
            :label="$t('message.inv.basic.customers.form.settlementMethod.label')"
            prop="settlementMethod"
          >
            <el-select v-model="editingData.settlementMethod" style="width: 100%">
              <el-option
                v-for="opt in settlementOptions"
                :key="opt.code"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :xs="24" :sm="24">
          <el-form-item
            :label="$t('message.inv.basic.customers.form.address.label')"
            prop="address"
          >
            <el-input
              v-model="editingData.address"
              :placeholder="$t('message.inv.basic.customers.form.address.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xs="24" :sm="24">
          <el-form-item :label="$t('message.inv.basic.customers.form.remark.label')" prop="remark">
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
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import DrawerForm from "@/components/inv/DrawerForm.vue";
import { customerApi } from "@/api/modules/inventory";

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

/** 客户等级 -> 标签颜色 */
const levelTagTypes: Record<string, string> = {
  VIP: "danger",
  A: "warning",
  B: "primary",
  C: "info",
};

/** 默认结算方式（对应语言包中的 option code） */
const DEFAULT_SETTLEMENT_CODE = "net30";
/** 默认客户等级 */
const DEFAULT_LEVEL = "B";

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});

/** 客户等级选项 */
const levelOptions = computed(() => readOptions("message.inv.basic.customers.options.level"));
/** 结算方式选项 */
const settlementOptions = computed(() =>
  readOptions("message.inv.basic.customers.options.settlement"),
);
/** 客户等级展示文案映射 */
const levelLabelMap = computed<Record<string, string>>(() =>
  Object.fromEntries(levelOptions.value.map((item) => [item.value, item.label])),
);
/** 结算方式展示文案映射 */
const settlementLabelMap = computed<Record<string, string>>(() =>
  Object.fromEntries(settlementOptions.value.map((item) => [item.value, item.label])),
);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.basic.customers.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.basic.customers.search.keyword.placeholder"),
  },
  {
    prop: "level",
    label: t("message.inv.basic.customers.search.level.label"),
    type: "select" as const,
    options: levelOptions.value.map((item) => ({ label: item.label, value: item.value })),
  },
  {
    prop: "status",
    label: t("message.inv.basic.customers.search.status.label"),
    type: "select" as const,
    options: [
      { label: t("message.inv.status.enabled"), value: "enabled" },
      { label: t("message.inv.status.disabled"), value: "disabled" },
    ],
  },
]);

// 校验规则：computed 保证切换语言时提示语同步刷新
const formRules = computed(() => ({
  customerCode: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.customers.form.customerCode.label"),
      }),
      trigger: "blur",
    },
  ],
  customerName: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.customers.form.customerName.label"),
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
    level: DEFAULT_LEVEL,
    creditLimit: 0,
    settlementMethod:
      settlementOptions.value.find((item) => item.code === DEFAULT_SETTLEMENT_CODE)?.value ?? "",
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
      ElMessage.success(t("message.inv.common.success.update"));
    } else {
      await customerApi.create(data);
      ElMessage.success(t("message.inv.common.success.create"));
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}
async function handleDelete(row: any) {
  await customerApi.remove(row.id);
  ElMessage.success(t("message.inv.common.success.delete"));
  proTableRef.value?.refresh();
}
</script>
