<template>
  <PageContainer
    :title="$t('message.inv.report.users.title')"
    :description="$t('message.inv.report.users.desc')"
  >
    <template #header>
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        {{ $t("message.inv.report.users.actions.add") }}
      </el-button>
    </template>
    <ProTable
      ref="proTableRef"
      :fetch-fn="userApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="200"
    >
      <el-table-column
        prop="username"
        :label="$t('message.inv.report.users.columns.username')"
        width="120"
      />
      <el-table-column
        prop="nickname"
        :label="$t('message.inv.report.users.columns.nickname')"
        width="120"
      />
      <el-table-column
        prop="department"
        :label="$t('message.inv.report.users.columns.department')"
        width="100"
      >
        <template #default="{ row }">
          {{ departmentLabelMap[row.department] || row.department }}
        </template>
      </el-table-column>
      <el-table-column
        prop="roles"
        :label="$t('message.inv.report.users.columns.roles')"
        width="120"
      >
        <template #default="{ row }">
          <el-tag v-for="r in row.roles" :key="r" size="small" style="margin-right: 4px">{{
            getRoleName(r)
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        :label="$t('message.inv.report.users.columns.phone')"
        width="130"
      />
      <el-table-column
        prop="email"
        :label="$t('message.inv.report.users.columns.email')"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="lastLogin"
        :label="$t('message.inv.report.users.columns.lastLogin')"
        width="170"
      />
      <el-table-column
        prop="status"
        :label="$t('message.inv.report.users.columns.status')"
        width="80"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleEdit(row)">
          {{ $t("message.inv.common.edit") }}
        </el-button>
        <el-button text type="warning" size="small" @click="handleResetPassword(row)">
          {{ $t("message.inv.report.users.actions.resetPassword") }}
        </el-button>
        <el-popconfirm
          :title="$t('message.inv.report.users.messages.deleteConfirm')"
          @confirm="handleDelete(row)"
        >
          <template #reference
            ><el-button text type="danger" size="small">{{
              $t("message.inv.common.delete")
            }}</el-button></template
          >
        </el-popconfirm>
      </template>
    </ProTable>

    <DrawerForm
      v-model="drawerVisible"
      :title="
        editingId
          ? $t('message.inv.report.users.actions.editTitle')
          : $t('message.inv.report.users.actions.add')
      "
      :data="editingData"
      :rules="formRules"
      size="500px"
      @submit="handleSubmit"
    >
      <el-form-item :label="$t('message.inv.report.users.form.username.label')" prop="username"
        ><el-input
          v-model="editingData.username"
          :placeholder="$t('message.inv.report.users.form.username.placeholder')"
          :disabled="!!editingId"
      /></el-form-item>
      <el-form-item :label="$t('message.inv.report.users.form.nickname.label')" prop="nickname"
        ><el-input
          v-model="editingData.nickname"
          :placeholder="$t('message.inv.report.users.form.nickname.placeholder')"
      /></el-form-item>
      <el-form-item :label="$t('message.inv.report.users.form.department.label')" prop="department">
        <el-select v-model="editingData.department" style="width: 100%">
          <el-option
            v-for="opt in departmentOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.inv.report.users.form.roles.label')" prop="roles">
        <el-select v-model="editingData.roles" multiple style="width: 100%">
          <el-option
            v-for="opt in roleOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.inv.report.users.form.phone.label')" prop="phone"
        ><el-input
          v-model="editingData.phone"
          :placeholder="$t('message.inv.report.users.form.phone.placeholder')"
      /></el-form-item>
      <el-form-item :label="$t('message.inv.report.users.form.email.label')" prop="email"
        ><el-input
          v-model="editingData.email"
          :placeholder="$t('message.inv.report.users.form.email.placeholder')"
      /></el-form-item>
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
import { userApi } from "@/api/modules/inventory";

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

const proTableRef = ref();
const drawerVisible = ref(false);
const editingId = ref<number | null>(null);
const editingData = reactive<any>({});

/** 部门选项：value 为接口存储的中文部门名称，label 为展示文案 */
const departmentOptions = computed(() =>
  readOptions("message.inv.report.users.options.department"),
);
/** 角色选项：value 为接口存储的角色编码，label 为展示文案 */
const roleOptions = computed(() => readOptions("message.inv.report.users.options.role"));
/** 部门展示文案映射 */
const departmentLabelMap = computed<Record<string, string>>(() =>
  Object.fromEntries(departmentOptions.value.map((item) => [item.value, item.label])),
);
/** 角色展示文案映射 */
const roleMap = computed<Record<string, string>>(() =>
  Object.fromEntries(roleOptions.value.map((item) => [item.value, item.label])),
);
const getRoleName = (code: string) => roleMap.value[code] || code;

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.report.users.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.report.users.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.report.users.search.status.label"),
    type: "select" as const,
    options: [
      { label: t("message.inv.status.enabled"), value: "enabled" },
      { label: t("message.inv.status.disabled"), value: "disabled" },
    ],
  },
]);

// 校验规则：computed 保证切换语言时提示语同步刷新
const formRules = computed(() => ({
  username: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.report.users.form.username.label"),
      }),
      trigger: "blur",
    },
  ],
  nickname: [
    {
      required: true,
      message: t("message.inv.common.inputPlaceholder", {
        label: t("message.inv.report.users.form.nickname.label"),
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
    roles: [],
    department: departmentOptions.value.find((item) => item.code === "it")?.value,
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
      await userApi.update(editingId.value, data);
      ElMessage.success(t("message.inv.common.success.update"));
    } else {
      await userApi.create(data);
      ElMessage.success(t("message.inv.common.success.create"));
    }
    done();
    proTableRef.value?.refresh();
  } catch {
    done();
  }
}
async function handleDelete(row: any) {
  await userApi.remove(row.id);
  ElMessage.success(t("message.inv.common.success.delete"));
  proTableRef.value?.refresh();
}
function handleResetPassword(row: any) {
  ElMessage.success(
    t("message.inv.report.users.messages.resetPasswordSuccess", { username: row.username }),
  );
}
</script>
