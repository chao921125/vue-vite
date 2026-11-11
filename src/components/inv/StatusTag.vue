<template>
  <el-tag :type="tagType" :effect="effect" size="small" round>
    {{ statusText }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  status: string;
  type?: "document" | "enable" | "receivable" | "payment";
}>();

const { t } = useI18n();

/** 状态 -> 标签类型；文案统一走 i18n（message.inv.status.*） */
const statusTypeMap: Record<string, string> = {
  // 单据状态
  draft: "info",
  pending: "warning",
  approved: "primary",
  in_progress: "primary",
  rejected: "danger",
  closed: "info",
  completed: "success",
  cancelled: "info",
  // 启用/停用
  enabled: "success",
  disabled: "danger",
  // 应收应付状态
  unsettled: "warning",
  partial: "primary",
  settled: "success",
  overdue: "danger",
};

const tagType = computed(() => {
  return (statusTypeMap[props.status] || "info") as any;
});

const effect = computed(() => {
  return props.status === "draft" || props.status === "disabled" ? "plain" : "light";
});

const statusText = computed(() => {
  const key = `message.inv.status.${props.status}`;
  // 未定义的状态回退展示原始值
  const text = t(key);
  return text === key ? props.status : text;
});
</script>
