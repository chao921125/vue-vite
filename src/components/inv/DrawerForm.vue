<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :size="drawerSize"
    :direction="direction"
    :before-close="handleClose"
    destroy-on-close
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :disabled="readonly"
    >
      <slot :form-data="formData" />
    </el-form>
    <template #footer>
      <div class="drawer-form__footer">
        <el-button @click="handleClose">{{ $t("message.inv.common.cancel") }}</el-button>
        <el-button v-if="!readonly" type="primary" :loading="submitting" @click="handleSubmit">{{
          $t("message.inv.common.confirm")
        }}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useResponsive } from "@/plugins/hooks/useResponsive";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    data?: Record<string, any>;
    rules?: FormRules;
    size?: string | number;
    direction?: "rtl" | "ltr" | "ttb" | "btt";
    labelWidth?: string;
    labelPosition?: "left" | "right" | "top";
    readonly?: boolean;
  }>(),
  {
    size: "50%",
    direction: "rtl",
    labelWidth: "100px",
    labelPosition: "right",
    readonly: false,
    rules: () => ({}),
  },
);

const emit = defineEmits<{
  "update:modelValue": [val: boolean];
  submit: [data: Record<string, any>, done: () => void];
}>();

const { isMobile } = useResponsive();

const visible = ref(props.modelValue);
const formRef = ref<FormInstance>();
const submitting = ref(false);
const formData = reactive<Record<string, any>>({});

// 移动端抽屉占满屏幕，标签置顶，避免窄屏下挤压输入区
const drawerSize = computed(() => (isMobile.value ? "100%" : props.size));
const labelPosition = computed(() => (isMobile.value ? "top" : props.labelPosition));

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val && props.data) {
      Object.assign(formData, props.data);
    }
  },
);

watch(visible, (val) => {
  emit("update:modelValue", val);
});

function handleClose() {
  visible.value = false;
  Object.keys(formData).forEach((k) => delete formData[k]);
}

async function handleSubmit() {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid) => {
    if (!valid) return;
    submitting.value = true;
    emit("submit", { ...formData }, () => {
      submitting.value = false;
      handleClose();
    });
  });
}
</script>

<style scoped lang="scss">
.drawer-form__footer {
  text-align: right;
}
</style>
