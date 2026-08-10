<template>
  <el-tag :type="tagType" :effect="effect" size="small" round>
    {{ statusText }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  status: string;
  type?: "document" | "enable" | "receivable" | "payment";
}>();

const statusMap: Record<string, { text: string; type: string }> = {
  // 单据状态
  draft: { text: "草稿", type: "info" },
  pending: { text: "待审核", type: "warning" },
  approved: { text: "已审核", type: "primary" },
  in_progress: { text: "执行中", type: "primary" },
  rejected: { text: "已驳回", type: "danger" },
  closed: { text: "已关闭", type: "info" },
  completed: { text: "已完成", type: "success" },
  cancelled: { text: "已取消", type: "info" },
  // 启用/停用
  enabled: { text: "启用", type: "success" },
  disabled: { text: "停用", type: "danger" },
  // 应收应付状态
  unsettled: { text: "未核销", type: "warning" },
  partial: { text: "部分核销", type: "primary" },
  settled: { text: "已核销", type: "success" },
  overdue: { text: "已逾期", type: "danger" },
};

const tagType = computed(() => {
  const item = statusMap[props.status];
  return (item?.type || "info") as any;
});

const effect = computed(() => {
  return props.status === "draft" || props.status === "disabled" ? "plain" : "light";
});

const statusText = computed(() => {
  const item = statusMap[props.status];
  return item?.text || props.status;
});
</script>
