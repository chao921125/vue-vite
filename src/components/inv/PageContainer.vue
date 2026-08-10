<template>
  <div class="page-container">
    <div v-if="title || $slots.header" class="page-header">
      <div class="page-header-left">
        <h2 v-if="title" class="page-title">{{ title }}</h2>
        <p v-if="description" class="page-description">{{ description }}</p>
      </div>
      <div class="page-header-right">
        <slot name="header" />
      </div>
    </div>
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<style scoped lang="scss">
.page-container {
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;

    .page-header-left {
      .page-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }

      .page-description {
        margin: 4px 0 0;
        font-size: 13px;
        color: var(--el-text-color-secondary);
      }
    }

    .page-header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
