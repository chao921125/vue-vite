<template>
  <span :class="['amount-display', { 'is-negative': isNegative }]">
    {{ formatted }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value: number | string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    showSign?: boolean;
  }>(),
  {
    prefix: "¥",
    suffix: "",
    decimals: 2,
    showSign: false,
  },
);

const numValue = computed(() => {
  const n = Number(props.value);
  return isNaN(n) ? 0 : n;
});

const isNegative = computed(() => numValue.value < 0);

const formatted = computed(() => {
  const abs = Math.abs(numValue.value);
  const str = abs.toLocaleString("zh-CN", {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  });
  const sign = props.showSign && numValue.value > 0 ? "+" : numValue.value < 0 ? "-" : "";
  return `${sign}${props.prefix}${str}${props.suffix}`;
});
</script>

<style scoped lang="scss">
.amount-display {
  font-variant-numeric: tabular-nums;
  &.is-negative {
    color: var(--el-color-danger);
  }
}
</style>
