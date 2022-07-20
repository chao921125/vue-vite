<template>
	<el-container v-if="isAdmin" class="">
		<el-aside width="200px"><AdminMenu></AdminMenu></el-aside>
		<el-container :class="{ 'bakctop-main' : !isFixedHeader }">
			<el-header v-if="isFixedHeader"><AdminHeader></AdminHeader></el-header>
			<el-scrollbar ref="refScrollbarMain" :class="{ 'bakctop-main' : isFixedHeader }">
				<el-header v-if="!isFixedHeader"><AdminHeader></AdminHeader></el-header>
				<el-main><router-view></router-view></el-main>
				<el-footer><AdminFooter></AdminFooter></el-footer>
			</el-scrollbar>
			<el-backtop target=".bakctop-main .el-scrollbar__wrap"></el-backtop>
		</el-container>
	</el-container>
	<el-container v-else :class="{ 'bakctop-main' : !isFixedHeader }">
		<el-header v-if="isFixedHeader">Web 下因需求不同，请重写</el-header>
		<el-scrollbar ref="refScrollbarMain" :class="{ 'bakctop-main' : isFixedHeader }">
			<el-header v-if="!isFixedHeader">Web 下因需求不同，请重写</el-header>
			<el-main><router-view></router-view></el-main>
			<el-footer>Web 下因需求不同，请重写</el-footer>
		</el-scrollbar>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
	import { defineComponent, ref, getCurrentInstance, watch } from "vue";
	import { useRoute } from "vue-router";
	import { storeToRefs } from "pinia";
	import pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import Settings from "@/router/common";
	import AdminMenu from "./menu/Index.vue";
	import AdminHeader from "./header/Index.vue";
	import AdminFooter from "./footer/Index.vue";

	export default defineComponent({
		name: "Layout",
		components: { AdminMenu, AdminHeader, AdminFooter },
		setup() {
			const isAdmin = ref(true);
			isAdmin.value = Settings.isAdminIframe;

			const storesThemeConfig = useThemeConfig(pinia);
			const { themeConfig } = storeToRefs(storesThemeConfig);
			const isFixedHeader = computed(() => {
				return themeConfig.value.isFixedHeader;
			});

			const { proxy } = <any>getCurrentInstance();
			const route = useRoute();
			// 监听路由的变化
			watch(
				() => route.path,
				() => {
					proxy.$refs.refScrollbarMain.wrap$.scrollTop = 0;
				}
			);

			return {
				isAdmin,
				isFixedHeader,
			};
		},
	});
</script>

<style scoped></style>
