<template>
	<el-container v-if="isAdmin" class="layout-container">
		<el-aside class="layout-aside" :class="styleCollapse"><AdminMenu></AdminMenu></el-aside>
		<el-container :class="{ 'bakctop-main': !isFixedHeader }">
			<el-header v-if="isFixedHeader"><AdminHeader></AdminHeader></el-header>
			<el-scrollbar ref="refScrollbarMain" :class="{ 'bakctop-main': isFixedHeader }">
				<el-header v-if="!isFixedHeader"><AdminHeader></AdminHeader></el-header>
				<el-main><router-view></router-view></el-main>
				<el-footer><AdminFooter></AdminFooter></el-footer>
			</el-scrollbar>
			<el-backtop target=".bakctop-main .el-scrollbar__wrap"
				><el-icon :size="20"><ArrowUpBold /></el-icon
			></el-backtop>
		</el-container>
	</el-container>
	<el-container v-else class="layout-container" :class="{ 'bakctop-main': !isFixedHeader }">
		<el-header v-if="isFixedHeader">Web 下因需求不同，请重写</el-header>
		<el-scrollbar ref="refScrollbarMain" :class="{ 'bakctop-main': isFixedHeader }">
			<el-header v-if="!isFixedHeader">Web 下因需求不同，请重写</el-header>
			<el-main><router-view></router-view></el-main>
			<el-footer>Web 下因需求不同，请重写</el-footer>
		</el-scrollbar>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"
			><el-icon :size="20"><ArrowUpBold /></el-icon
		></el-backtop>
	</el-container>
</template>

<script lang="ts">
	import { defineComponent, ref, getCurrentInstance, watch, onBeforeMount } from "vue";
	import { useRoute } from "vue-router";
	import { storeToRefs } from "pinia";
	import pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import SettingsRouter from "@/router/common";
	import AdminMenu from "./menu/Index.vue";
	import AdminHeader from "./header/Index.vue";
	import AdminFooter from "./footer/Index.vue";

	export default defineComponent({
		name: "Layout",
		components: { AdminMenu, AdminHeader, AdminFooter },
		setup() {
			// 设置是否为权限管理端
			const isAdmin = ref(true);
			isAdmin.value = SettingsRouter.isAdminIframe;
			// 修改项目设置
			const storesThemeConfig = useThemeConfig(pinia);
			const { themeConfig } = storeToRefs(storesThemeConfig);
			const state = reactive({
				clientWidth: 0,
			});
			// 固定header
			const isFixedHeader = computed(() => {
				return themeConfig.value.isFixedHeader;
			});
			// 动态修改菜单的宽高
			const styleCollapse = computed(() => {
				const { isCollapse } = themeConfig.value;
				// 处理移动端
				if (state.clientWidth < 1000) {
					console.log("TODO 处理移动端");
				} else {
					// 管理端
					if (isAdmin) {
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

			return {
				isAdmin,
				isFixedHeader,
				styleCollapse,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
