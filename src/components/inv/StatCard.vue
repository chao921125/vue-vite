<template>
  <el-row :gutter="16">
    <el-col v-for="card in cards" :key="card.key" :span="span">
      <div class="stat-card" :class="`stat-card--${card.color || 'blue'}`">
        <div class="stat-card__icon">
          <el-icon :size="28">
            <component :is="card.icon" />
          </el-icon>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">{{ card.label }}</div>
          <div class="stat-card__value">
            <template v-if="card.prefix">{{ card.prefix }}</template>
            {{ formatNumber(card.value) }}
            <template v-if="card.suffix">{{ card.suffix }}</template>
          </div>
          <div v-if="card.extra" class="stat-card__extra">
            <el-icon v-if="card.trend === 'up'" color="#67c23a"><CaretTop /></el-icon>
            <el-icon v-else-if="card.trend === 'down'" color="#f56c6c"><CaretBottom /></el-icon>
            {{ card.extra }}
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CaretTop, CaretBottom } from "@element-plus/icons-vue";

interface StatCardItem {
  key: string;
  label: string;
  value: number | string;
  icon: any;
  color?: "blue" | "green" | "orange" | "red" | "purple" | "cyan";
  prefix?: string;
  suffix?: string;
  extra?: string;
  trend?: "up" | "down" | "flat";
}

const props = defineProps<{
  cards: StatCardItem[];
}>();

const span = computed(() => {
  const count = props.cards.length;
  if (count <= 1) return 24;
  if (count <= 2) return 12;
  if (count <= 3) return 8;
  if (count <= 4) return 6;
  return 6;
});

function formatNumber(val: number | string): string {
  const n = Number(val);
  if (isNaN(n)) return String(val);
  if (Math.abs(n) >= 100000000) return (n / 100000000).toFixed(2) + "亿";
  if (Math.abs(n) >= 10000) return (n / 10000).toFixed(2) + "万";
  return n.toLocaleString("zh-CN");
}
</script>

<style scoped lang="scss">
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  margin-bottom: 16px;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 12px;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__label {
    font-size: 13px;
    color: #909399;
    margin-bottom: 4px;
  }

  &__value {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    font-variant-numeric: tabular-nums;
  }

  &__extra {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  &--blue &__icon {
    background: #ecf5ff;
    color: #409eff;
  }
  &--green &__icon {
    background: #f0f9eb;
    color: #67c23a;
  }
  &--orange &__icon {
    background: #fdf6ec;
    color: #e6a23c;
  }
  &--red &__icon {
    background: #fef0f0;
    color: #f56c6c;
  }
  &--purple &__icon {
    background: #f4f0fd;
    color: #7c3aed;
  }
  &--cyan &__icon {
    background: #ecfdf7;
    color: #13c2c2;
  }
}

:root.dark .stat-card {
  background: #1d1e1f;
  &__label {
    color: #a3a6ad;
  }
  &__value {
    color: #e5eaf3;
  }
  &__extra {
    color: #a3a6ad;
  }
}
</style>
