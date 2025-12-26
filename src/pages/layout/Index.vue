<script setup lang="ts">
import Menu from "./Menu.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Tags from "./Tag.vue";
import { getStoreRefs, appStore } from "@/store";
import { ArrowUpBold } from "@element-plus/icons-vue";

// 修改项目设置
const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
const state = reactive({
	clientWidth: 0,
});
// 固定header
const isFixedHeader = computed(() => {
	return themeConfig.value.isFixedHeader;
});
//
const setHeaderHeight = computed(() => {
	const { isTagsView } = themeConfig.value;
	if (isTagsView) return "84px";
	else return "60px";
});
// 开启展示 底部
const isShowFooter = themeConfig.value.isFooter;
// 动态修改菜单的宽高
// eslint-disable-next-line vue/return-in-computed-property
const styleCollapse = computed(() => {
	const { isCollapse } = themeConfig.value;
	if (isCollapse) return ["layout-aside-pc-64"];
	else return ["layout-aside-pc-220"];
});
// 切换路由之后，滚动到顶部
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
// 监听路由的变化
watch(
	() => route.path,
	() => {
		proxy.$refs.refScrollbarMain.wrapRef.scrollTop = 0;
	},
);
onBeforeMount(() => {
	state.clientWidth = document.body.clientWidth;
});
</script>

<template>
  <el-container id="layout" class="layout-container">
    <el-aside id="aside" class="aside" :class="styleCollapse">
      <Menu></Menu>
    </el-aside>
    <el-container id="admin-body" :class="{ 'admin-main': !isFixedHeader }">
      <el-scrollbar ref="refScrollbarMain" :class="{ 'admin-main': isFixedHeader }">
        <el-header v-if="isFixedHeader" :height="setHeaderHeight" class="layout-header">
          <Header></Header>
        </el-header>
        <Tags></Tags>
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

<style scoped lang="scss"></style>
