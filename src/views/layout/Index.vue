<template>
	<el-container v-if="isAdmin" class="layout-container">
		<el-aside id="admin-aside" class="layout-aside" :class="styleCollapse"><AdminMenu></AdminMenu></el-aside>
		<el-container id="admin-body" :class="{ 'admin-main': !isFixedHeader }">
			<el-header v-if="isFixedHeader" :height="setHeaderHeight" class="layout-header"><AdminHeader></AdminHeader></el-header>
			<el-scrollbar ref="refScrollbarMain" :class="{ 'admin-main': isFixedHeader }">
				<el-header v-if="!isFixedHeader" :height="setHeaderHeight" class="layout-header"><AdminHeader></AdminHeader></el-header>
				<el-main class="layout-main">
					<el-card class="main-body">
						<router-view></router-view>
					</el-card>
				</el-main>
				<el-footer v-if="isShowFooter"><AdminFooter></AdminFooter></el-footer>
			</el-scrollbar>
			<el-backtop target=".admin-main .el-scrollbar__wrap" :visibility-height="300" :right="20" :bottom="20">
				<el-icon :size="20"><ArrowUpBold /></el-icon>
			</el-backtop>
		</el-container>
	</el-container>
	<el-container v-else class="layout-container" :class="{ 'web-main': !isFixedHeader }">
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

<script lang="ts" setup name="Layout">
	import { ref, reactive, computed, getCurrentInstance, watch, onBeforeMount } from "vue";
	import { useRoute } from "vue-router";
	import { storeToRefs } from "pinia";
	import Pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import RouterSetConfig from "@/config/routerSetConfig";
	import AdminMenu from "./menu/Index.vue";
	import AdminHeader from "./header/Index.vue";
	import AdminFooter from "./footer/Index.vue";

	// 设置是否为权限管理端
	const isAdmin = ref(true);
	isAdmin.value = RouterSetConfig.isAdminIframe;
	// 修改项目设置
	const storesThemeConfig = useThemeConfig(Pinia);
	const { themeConfig } = storeToRefs(storesThemeConfig);
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
		// 处理移动端
		if (state.clientWidth < 1000) {
			console.log("TODO 处理移动端");
		} else {
			// 管理端
			if (isAdmin.value) {
				if (isCollapse) return ["layout-aside-pc-64"];
				else return ["layout-aside-pc-220"];
			} else {
				console.log("TODO 处理非管理端");
			}
		}
	});
	// 切换路由之后，滚动到顶部
	const { proxy } = <any>getCurrentInstance();
	const route = useRoute();
	// 监听路由的变化
	watch(
		() => route.path,
		() => {
			proxy.$refs.refScrollbarMain.wrap$.scrollTop = 0;
		},
	);
	onBeforeMount(() => {
		state.clientWidth = document.body.clientWidth;
	});
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
