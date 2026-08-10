<script setup lang="ts">
import Menu from "./Menu.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Tags from "./Tag.vue";
import { getStoreRefs, appStore } from "@/store";
import { ArrowUpBold } from "@element-plus/icons-vue";

import { useRoute } from "vue-router";

// 修改项目设置
const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
const state = reactive({
  clientWidth: 0,
  isMobile: false,
  mobileMenuOpen: false,
});
// 固定header
const isFixedHeader = computed(() => {
  return themeConfig.value.isFixedHeader;
});
//
const setHeaderHeight = computed(() => {
  const { isTagsView } = themeConfig.value;
  if (state.isMobile) return "50px";
  if (isTagsView) return "84px";
  else return "60px";
});
// 开启展示 底部
const isShowFooter = themeConfig.value.isFooter;
// 动态修改菜单的宽高
const styleCollapse = computed(() => {
  const { isCollapse } = themeConfig.value;
  if (state.isMobile) return [];
  if (isCollapse) return ["layout-aside-pc-64"];
  else return ["layout-aside-pc-220"];
});
// 移动端菜单抽屉控制
const toggleMobileMenu = () => {
  state.mobileMenuOpen = !state.mobileMenuOpen;
};
const closeMobileMenu = () => {
  state.mobileMenuOpen = false;
};
// 检测设备类型
const checkDevice = () => {
  state.clientWidth = document.body.clientWidth;
  state.isMobile = state.clientWidth < 768;
  if (!state.isMobile) {
    state.mobileMenuOpen = false;
  }
};
// 切换路由之后，滚动到顶部
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
// 监听路由的变化
watch(
  () => route.path,
  () => {
    proxy.$refs.refScrollbarMain.wrapRef.scrollTop = 0;
    // 移动端路由切换后关闭抽屉
    if (state.isMobile) {
      state.mobileMenuOpen = false;
    }
  },
);
// 窗口大小变化时重新检测
let resizeTimer: ReturnType<typeof setTimeout>;
const handleResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(checkDevice, 150);
};
onBeforeMount(() => {
  checkDevice();
});
onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <el-container id="layout" class="layout-container">
    <!-- PC 端侧边栏 -->
    <el-aside v-if="!state.isMobile" id="aside" class="aside" :class="styleCollapse">
      <Menu></Menu>
    </el-aside>

    <!-- 移动端侧边栏抽屉 -->
    <template v-if="state.isMobile">
      <transition name="mobile-aside">
        <div v-show="state.mobileMenuOpen" class="layout-aside-mobile is-open">
          <Menu></Menu>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-show="state.mobileMenuOpen"
          class="layout-aside-mobile-mode"
          @click="closeMobileMenu"
        ></div>
      </transition>
    </template>

    <el-container id="admin-body" :class="{ 'admin-main': !isFixedHeader }">
      <el-scrollbar ref="refScrollbarMain" :class="{ 'admin-main': isFixedHeader }">
        <el-header v-if="isFixedHeader" :height="setHeaderHeight" class="layout-header">
          <Header :is-mobile="state.isMobile" @toggle-menu="toggleMobileMenu"></Header>
        </el-header>
        <Tags v-if="!state.isMobile"></Tags>
        <el-main class="layout-main">
          <el-card class="main-body">
            <router-view></router-view>
          </el-card>
        </el-main>
        <el-footer v-if="isShowFooter" class="re-flex-center">
          <Footer></Footer>
        </el-footer>
      </el-scrollbar>
      <el-backtop
        target=".admin-main .el-scrollbar__wrap"
        :visibility-height="300"
        :right="20"
        :bottom="20"
      >
        <el-icon :size="20"><ArrowUpBold /></el-icon>
      </el-backtop>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

// 主内容区字体
.layout-main {
  font-size: 0.14rem;
}

// 移动端抽屉过渡动画
.mobile-aside-enter-active,
.mobile-aside-leave-active {
  transition: left 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.mobile-aside-enter-from,
.mobile-aside-leave-to {
  left: -220px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
