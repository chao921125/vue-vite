<template>
	<div v-if="isColl" class="logo-full re-flex-row-center">
		<el-link :underline="false" @click="toHome">
			<i class="iconfont icon-shouye"></i>
			<span class="re-m-l-10">CC ADMIN</span>
		</el-link>
	</div>
	<div v-else class="animate__animated animate__zoomIn logo-only re-flex-row-center">
		<el-link :underline="false" @click="toHome">
			<i class="iconfont icon-shouye"></i>
		</el-link>
	</div>
	<el-scrollbar>
		<el-menu
			class="menu-box"
			:background-color="colorSet.menuBg"
			:active-text-color="colorSet.menuTextActive"
			:text-color="colorSet.menuText"
			:default-active="changeMenuKey"
			mode="vertical"
			:collapse="!isColl"
			:unique-opened="true"
			@select="toMenu"
		>
			<SubMenu v-if="state.menuList && state.menuList.length > 0" :menus="state.menuList"></SubMenu>
		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts" setup name="Menu">
	import { computed, reactive, onBeforeMount, watch } from "vue";
	import { useRouter, useRoute } from "vue-router";
	import SubMenu from "./SubMenu.vue";
	import { storeToRefs } from "pinia";
	import Pinia from "@/store";
	import ColorSetConfig from "@/config/colorSetConfig";
	import { useThemeConfig } from "@/store/modules/theme";
	import { useRouterList } from "@/store/modules/routerMeta";

	const colorSet = ColorSetConfig;
	// 折叠菜单
	const storeThemeConfig = useThemeConfig(Pinia);
	const { themeConfig } = storeToRefs(storeThemeConfig);
	const isColl = computed(() => {
		let { isCollapse } = themeConfig.value;
		return !isCollapse;
	});
	// 渲染菜单
	const storeRouterList = useRouterList(Pinia);
	const { menuList } = storeToRefs(storeRouterList);
	const state = reactive({ menuList: Array<any> });
	const setMenu = () => {
		(state.menuList as any) = menuList.value || [];
	};
	// 设置菜单点击后的默认项
	const router = useRouter();
	const route = useRoute();
	const changeMenuKey = computed(() => {
		console.log(route.meta.roles);
		let menuHierarchy = 2;
		let path = route.path.replace("/", "");
		let pathArray = path.split("/");
		if (pathArray.length > menuHierarchy) {
			let returnPath = "";
			for (let i = 0; i < menuHierarchy; i++) {
				returnPath += `/${pathArray[i]}`;
			}
			return returnPath.replace("/", "");
		}
		return path.toString();
	});
	// 点击路由跳转菜单
	const toMenu = (index) => {
		router.push({ path: "/" + index });
	};
	// 回首页
	const toHome = () => {
		router.push({ path: "/" });
	};
	// 监听路由及状态，改变菜单
	watch(
		Pinia.state,
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

<style scoped lang="scss"></style>
