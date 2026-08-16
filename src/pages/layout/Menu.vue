<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import MenuSub from "./MenuSub.vue";
import Store, { getStoreRefs, appStore } from "@/store";

// 折叠菜单
const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
const isColl = computed(() => {
  let { isCollapse } = themeConfig.value;
  return !isCollapse;
});
// 渲染菜单
const { menuList } = getStoreRefs(appStore.useRouterList);
const state = reactive({ menuList: [] });
const setMenu = () => {
  state.menuList = menuList.value || [];
};
// 设置菜单当前选中项：直接使用当前路由路径（去掉前导/），与 el-menu-item 的 index 保持一致
const router = useRouter();
const route = useRoute();
const changeMenuKey = computed(() => {
  return route.path.replace(/^\//, "");
});
// 点击路由跳转菜单
const toRouter = (index: string) => {
  router.push({ path: "/" + index });
};
/**
 * 解决点击父菜单也需要跳转页面（不知道哪个脑残公司才会设计这种逻辑，给大家提供一个解决方案思路）
 * 要点一：菜单的命名规则必须统一，比如父菜单：parent，对应的子菜单应该为：parent/children
 * 要点二：所有的展开菜单必须定义好，写到常量文件中和配置的菜单对应上，这个必须是开发人员提供配置
 */
const openMenu = (index: string, _indexPath: string[]) => {
  console.log("openMenu", index);
  // if (["/menu1", "/menu2"].includes(index) && route.path.indexOf(`${index}/`) === -1) {
  // 	router.push({ path: index });
  // }
};
const closeMenu = (index: string, _indexPath: string[]) => {
  console.log("closeMenu", index);
  // if (["/menu1", "/menu2"].includes(index)) {
  // 	router.push({ path: index });
  // }
};
// 回首页
const toHome = () => {
  router.push({ path: "/" });
};
// 监听路由及状态，改变菜单
watch(
  Store.state,
  () => {
    setMenu();
  },
  {
    deep: true,
  },
);
onBeforeMount(() => {
  setMenu();
});
</script>

<template>
  <div v-if="isColl" class="logo-full re-flex-center">
    <el-link underline="never" @click="toHome">
      <i class="iconfont icon-shouye"></i>
      <span class="re-ml-10">CC ADMIN</span>
    </el-link>
  </div>
  <div v-else class="animate__animated animate__zoomIn logo-only re-flex-center">
    <el-link underline="never" @click="toHome">
      <i class="iconfont icon-shouye"></i>
    </el-link>
  </div>
  <!--
    滚动容器说明（替代 el-scrollbar 方案，避免自定义 bar 残留）：
    - 外层 aside 已设置 overflow: hidden，不产生任何滚动
    - 本 div 作为唯一滚动层：flex:1 占满剩余高度，min-height:0 允许压缩，overflow-y:auto 按需滚动
    - .re-scrollbar-hidden：WebKit/Firefox/IE 三端隐藏原生滚动条
    效果：
      菜单高度 < 可视 → 无滚动 → 无任何条
      菜单高度 > 可视 → 可滚动 → 原生条被 class 隐藏，滚轮/触摸板仍可滚动
  -->
  <div class="menu-scroll-wrap re-scrollbar-hidden">
    <el-menu
      class="menu-box"
      :default-active="changeMenuKey"
      mode="vertical"
      :collapse="!isColl"
      :unique-opened="true"
      @select="toRouter"
      @open="openMenu"
      @close="closeMenu"
    >
      <MenuSub v-if="state.menuList && state.menuList.length" :menus="state.menuList"></MenuSub>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
// 菜单滚动层：配合外层 .layout-aside 的 flex 布局
// 为什么不用 el-scrollbar：其内部自定义 bar 隐藏优先级复杂，易残留滚动条
// 改用原生 overflow-y:auto + .re-scrollbar-hidden，行为完全可控
.menu-scroll-wrap {
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

// Logo 文字
:deep(.el-link) {
  font-size: 0.14rem;
}

// 菜单项文字
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  font-size: 0.14rem;
}
</style>
