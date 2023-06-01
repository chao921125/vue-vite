<template>
	<el-container class="layout-container">
		<el-aside id="admin-aside" class="layout-aside" :class="styleCollapse"><AdminMenu></AdminMenu></el-aside>
		<el-container id="admin-body" :class="{ 'admin-main': !isFixedHeader }">
			<el-header v-if="isFixedHeader" :height="setHeaderHeight" class="layout-header"><AdminHeader></AdminHeader></el-header>
			<el-scrollbar ref="refScrollbarMain" :class="{ 'admin-main': isFixedHeader }">
				<el-header v-if="!isFixedHeader" :height="setHeaderHeight" class="layout-header">
					<AdminHeader></AdminHeader>
				</el-header>
				<Tags></Tags>
				<el-main class="layout-main">
					<el-card class="main-body">
						<router-view></router-view>
					</el-card>
				</el-main>
				<el-footer v-if="isShowFooter" class="re-flex-row-center"><AdminFooter></AdminFooter></el-footer>
			</el-scrollbar>
			<el-backtop target=".admin-main .el-scrollbar__wrap" :visibility-height="300" :right="20" :bottom="20">
				<el-icon :size="20"><ArrowUpBold /></el-icon>
			</el-backtop>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup name="LayoutAdmin">
	import AdminMenu from "../menu/Index.vue";
	import AdminHeader from "../header/Index.vue";
	import AdminFooter from "../footer/Index.vue";
	import Tags from "../tags/Index.vue";
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

<style scoped lang="scss"></style>
