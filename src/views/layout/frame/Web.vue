<template>
	<el-container class="layout-container" :class="{ 'web-main': !isFixedHeader }">
		<el-header v-if="isFixedHeader" class="layout-header">Web 下因需求不同，请重写</el-header>
		<el-scrollbar ref="refScrollbarMain" :class="{ 'web-main': isFixedHeader }">
			<el-header v-if="!isFixedHeader" class="layout-header">Web 下因需求不同，请重写</el-header>
			<el-main class="layout-main"><router-view></router-view></el-main>
			<el-footer v-if="isShowFooter">Web 下因需求不同，请重写</el-footer>
		</el-scrollbar>
		<el-backtop target=".web-main .el-scrollbar__wrap" :visibility-height="300" :right="20" :bottom="20">
			<el-icon :size="20"><ArrowUpBold /></el-icon>
		</el-backtop>
	</el-container>
</template>

<script lang="ts" setup name="LayoutWeb">
	import { getStoreRefs, appStore } from "@/store";
	import { ElScrollbar } from "element-plus";

	// 修改项目设置
	const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
	const state: any = reactive({
		clientWidth: 0,
	});
	// 固定header
	const isFixedHeader = computed(() => {
		return themeConfig.value.isFixedHeader;
	});
	// 开启展示 底部
	const isShowFooter = themeConfig.value.isFooter;

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

<style scoped lang="scss"></style>
