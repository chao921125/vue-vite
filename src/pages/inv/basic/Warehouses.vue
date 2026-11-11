<template>
  <PageContainer
    :title="$t('message.inv.basic.warehouses.title')"
    :description="$t('message.inv.basic.warehouses.desc')"
  >
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        {{ $t("message.inv.basic.warehouses.actions.add") }}
      </el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="warehouseApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="180"
    >
      <el-table-column
        prop="warehouseCode"
        :label="$t('message.inv.basic.warehouses.columns.warehouseCode')"
        width="120"
      />
      <el-table-column
        prop="warehouseName"
        :label="$t('message.inv.basic.warehouses.columns.warehouseName')"
        min-width="140"
      />
      <el-table-column
        prop="type"
        :label="$t('message.inv.basic.warehouses.columns.type')"
        width="100"
        align="center"
      >
        <template #default="{ row }">
          <el-tag :type="warehouseTypeMap[row.type]?.type as any" size="small">
            {{ warehouseTypeMap[row.type]?.label || row.type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        :label="$t('message.inv.basic.warehouses.columns.address')"
        min-width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="manager"
        :label="$t('message.inv.basic.warehouses.columns.manager')"
        width="90"
      />
      <el-table-column
        prop="phone"
        :label="$t('message.inv.basic.warehouses.columns.phone')"
        width="130"
      />
      <el-table-column
        prop="status"
        :label="$t('message.inv.basic.warehouses.columns.status')"
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
          :title="$t('message.inv.basic.warehouses.messages.deleteConfirm')"
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
          ? $t('message.inv.basic.warehouses.actions.editTitle')
          : $t('message.inv.basic.warehouses.actions.add')
      "
      :data="editingData"
      :rules="formRules"
      size="500px"
      @submit="handleSubmit"
    >
      <el-form-item
        :label="$t('message.inv.basic.warehouses.form.warehouseCode.label')"
        prop="warehouseCode"
      >
        <el-input
          v-model="editingData.warehouseCode"
          :placeholder="$t('message.inv.basic.warehouses.form.warehouseCode.placeholder')"
          :disabled="!!editingId"
        />
      </el-form-item>
      <el-form-item
        :label="$t('message.inv.basic.warehouses.form.warehouseName.label')"
        prop="warehouseName"
      >
        <el-input
          v-model="editingData.warehouseName"
          :placeholder="$t('message.inv.basic.warehouses.form.warehouseName.placeholder')"
        />
      </el-form-item>
      <el-form-item :label="$t('message.inv.basic.warehouses.form.type.label')" prop="type">
        <el-select v-model="editingData.type" style="width: 100%">
          <el-option
            v-for="opt in warehouseTypeOptions"
            :key="opt.code"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.inv.basic.warehouses.form.address.label')" prop="address">
        <el-input
          v-model="editingData.address"
          :placeholder="$t('message.inv.basic.warehouses.form.address.placeholder')"
        />
      </el-form-item>
      <el-form-item :label="$t('message.inv.basic.warehouses.form.manager.label')" prop="manager">
        <el-input
          v-model="editingData.manager"
          :placeholder="$t('message.inv.basic.warehouses.form.manager.placeholder')"
        />
      </el-form-item>
      <el-form-item :label="$t('message.inv.basic.warehouses.form.phone.label')" prop="phone">
        <el-input
          v-model="editingData.phone"
          :placeholder="$t('message.inv.basic.warehouses.form.phone.placeholder')"
        />
      </el-form-item>
      <el-form-item :label="$t('message.inv.basic.warehouses.form.remark.label')" prop="remark">
        <el-input v-model="editingData.remark" type="textarea" :rows="2" />
      </el-form-item>
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
import { warehouseApi } from "@/api/modules/inventory";

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

/** 仓库类型 -> 标签颜色 */
const warehouseTypeTagTypes: Record<string, string> = {
  main: "primary",
  branch: "success",
  return: "warning",
  defective: "danger",
};

/** 默认仓库类型（对应语言包中的 option code） */
const DEFAULT_WAREHOUSE_TYPE_CODE = "main";

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});

/** 仓库类型选项 */
const warehouseTypeOptions = computed(() =>
  readOptions("message.inv.basic.warehouses.options.type"),
);
/** 仓库类型展示信息（文案 + 标签颜色） */
const warehouseTypeMap = computed<Record<string, { label: string; type: string }>>(() => {
  const map: Record<string, { label: string; type: string }> = {};
  for (const item of warehouseTypeOptions.value) {
    map[item.value] = { label: item.label, type: warehouseTypeTagTypes[item.code] || "info" };
  }
  return map;
});

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.basic.warehouses.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.basic.warehouses.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.basic.warehouses.search.status.label"),
    type: "select" as const,
    options: [
      { label: t("message.inv.status.enabled"), value: "enabled" },
      { label: t("message.inv.status.disabled"), value: "disabled" },
    ],
  },
]);

// 校验规则：computed 保证切换语言时提示语同步刷新
const formRules = computed(() => ({
  warehouseCode: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.warehouses.form.warehouseCode.label"),
      }),
      trigger: "blur",
    },
  ],
  warehouseName: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.basic.warehouses.form.warehouseName.label"),
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
    type:
      warehouseTypeOptions.value.find((item) => item.code === DEFAULT_WAREHOUSE_TYPE_CODE)?.value ??
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
      await warehouseApi.update(editingId.value, data);
      ElMessage.success(t("message.inv.common.success.update"));
    } else {
      await warehouseApi.create(data);
      ElMessage.success(t("message.inv.common.success.create"));
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}
async function handleDelete(row: any) {
  await warehouseApi.remove(row.id);
  ElMessage.success(t("message.inv.common.success.delete"));
  proTableRef.value?.refresh();
}
</script>
