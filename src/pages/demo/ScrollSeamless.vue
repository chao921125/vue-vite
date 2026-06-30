<template>
  <div class="scroll-seamless-demo">
    <h1 class="title-large">无缝滚动 Demo</h1>

    <div class="demo-section">
      <h2 class="title">水平滚动</h2>
      <div class="scroll-wrapper">
        <ScrollSeamless
          :data="horizontalData"
          direction="left"
          :step="1"
          :rows="1"
          :hover-stop="true"
          class="scroll-inner"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="title">垂直滚动</h2>
      <div class="scroll-wrapper vertical">
        <ScrollSeamless
          :data="verticalData"
          direction="up"
          :step="1"
          :cols="1"
          :hover-stop="true"
          class="scroll-inner"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="title">反向滚动</h2>
      <div class="scroll-wrapper">
        <ScrollSeamless
          :data="reverseData"
          direction="right"
          :step="1"
          :rows="1"
          :hover-stop="true"
          class="scroll-inner"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2 class="title">多行滚动</h2>
      <div class="scroll-wrapper multi-row">
        <ScrollSeamless
          :data="multiRowData"
          direction="up"
          :step="1"
          :cols="1"
          :rows="3"
          :hover-stop="true"
          class="scroll-inner"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ScrollSeamless } from "scroll-seamless/vue";

// 水平滚动数据
const horizontalData = ref([
  "项目 1: Vue 3 框架",
  "项目 2: Vite 构建工具",
  "项目 3: TypeScript 语言",
  "项目 4: Element Plus UI",
  "项目 5: Pinia 状态管理",
  "项目 6: Vue Router 路由",
  "项目 7: VueUse 工具库",
  "项目 8: Axios HTTP",
]);

// 垂直滚动数据
const verticalData = ref([
  "公告：系统将于今晚 22:00-24:00 进行维护升级",
  "通知：新功能已上线，请查看更新日志",
  "提醒：请及时备份您的数据",
  "公告：服务器已完成扩容，性能提升 50%",
  "通知：安全更新已发布，请及时更新",
]);

// 反向滚动数据
const reverseData = ref([
  "数据 1: 高性能渲染引擎",
  "数据 2: 智能缓存策略",
  "数据 3: 分布式架构",
  "数据 4: 微服务治理",
  "数据 5: 容器化部署",
  "数据 6: 自动化运维",
]);

// 多行滚动数据
const multiRowData = ref([
  "第 1 行: 多行滚动示例",
  "第 2 行: 可以同时显示多行",
  "第 3 行: 提高信息密度",
  "第 4 行: 适用于数据展示",
  "第 5 行: 实时监控面板",
  "第 6 行: 日志滚动显示",
  "第 7 行: 消息通知列表",
  "第 8 行: 任务队列状态",
]);
</script>

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

.scroll-seamless-demo {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-top: 60px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: d.$radius-lg;
}

.scroll-wrapper {
  margin-top: 20px;
  height: 60px;
  overflow: hidden;
  border-radius: d.$radius-md;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &.vertical {
    height: 200px;
  }

  &.multi-row {
    height: 150px;
  }
}

.scroll-inner {
  :deep(.ss-content) {
    display: flex;
    align-items: center;
  }

  :deep(.ss-item) {
    padding: 10px 20px;
    margin: 4px 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    color: #fff;
    font-size: d.$font-size-sm;
    white-space: nowrap;
  }
}

.title-large {
  font-size: d.$font-size-xl;
  font-weight: d.$font-weight-bold;
  color: d.$text-primary;
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: d.$font-size-lg;
  font-weight: d.$font-weight-bold;
  color: d.$text-primary;
  margin: 0;
}
</style>
