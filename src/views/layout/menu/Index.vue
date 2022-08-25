<template>
	<div v-if="isColl" class="logo-full re-flex-row-center">
		<el-link :underline="false" @click="toHome">
			<i class="iconfont icon-shouye"></i>
			<span class="re-m-l-10">CC ADMIN</span>
		</el-link>
	</div>
	<div v-else class="logo-only re-flex-row-center">
		<el-link :underline="false" @click="toHome">
			<i class="iconfont icon-shouye"></i>
		</el-link>
	</div>
	<el-scrollbar>
		<el-menu background-color="transparent" :default-active="changeMenuKey" mode="vertical" :collapse="!isColl" :unique-opened="true" @select="toMenu">
			<SubItem v-if="state.menuList && state.menuList.length > 0" :menus="state.menuList"></SubItem>
		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts">
	import { defineComponent, computed, reactive, onBeforeMount, watch } from "vue";
	import { useRouter, useRoute } from "vue-router";
	import SubItem from "./SubItem.vue";
	import { storeToRefs } from "pinia";
	import Pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import { useRouterList } from "@/store/modules/routerMeta";

	export default defineComponent({
		name: "Index",
		components: { SubItem },
		setup() {
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

			return {
				isColl,
				changeMenuKey,
				state,
				toHome,
				toMenu,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
