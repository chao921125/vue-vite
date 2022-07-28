<template>
	<el-row :gutter="10" justify="space-between" class="re-height-fill">
		<el-col :xs="24" :sm="12">
			<div class="re-height-fill re-flex-col">
				<el-icon @click="changeCollapse" class="re-cursor-pointer" :size="18">
					<Fold v-if="isColl" />
					<Expand v-else />
				</el-icon>
				<el-breadcrumb separator-icon="ArrowRight" class="re-m-l-20">
					<transition-group name="breadcrumb">
						<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="{ path: item.path }">
							{{ $t(item.title) }}
						</el-breadcrumb-item>
					</transition-group>
				</el-breadcrumb>
			</div>
		</el-col>
		<el-col :xs="24" :sm="12">
			<el-button @click="isShowDrawer = true">setting</el-button>
			<el-button @click="logout">logout</el-button>
		</el-col>
	</el-row>
	<el-drawer v-model="isShowDrawer" title="system setting" :with-header="false">
		<span>Hi there!</span>
	</el-drawer>
</template>

<script lang="ts">
	import { defineComponent, ref, computed, onMounted } from "vue";
	import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
	import Utils from "@/plugins/utils";
	import SettingsRouter from "@/router/common";
	import { storeToRefs } from "pinia";
	import pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import { useRouterList } from "@/store/modules/routerMeta";

	export default defineComponent({
		name: "Index",
		setup() {
			let isShowDrawer = ref(false);
			// 折叠菜单
			const storeThemeConfig = useThemeConfig(pinia);
			const { themeConfig } = storeToRefs(storeThemeConfig);
			const isColl = computed(() => {
				let { isCollapse } = themeConfig.value;
				return !isCollapse;
			});
			const changeCollapse = () => {
				themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
				setThemeConfig();
			};
			// 面包屑导航
			const breadcrumbList = ref<any[]>([]);
			const storesRouterList = useRouterList(pinia);
			const { menuList } = storeToRefs(storesRouterList);
			const route = useRoute();
			const initBreadcrumbList = (path: string) => {
				if (SettingsRouter.executeList.includes(path)) {
					breadcrumbList.value.push({
						name: menuList.value[0].path,
						title: menuList.value[0].title,
						path: "/" + menuList.value[0].path,
					});
					return false;
				}
				let pathArr = path.split("/");
				pathArr.shift();
				for (let i = 0; i < pathArr.length; i++) {
					breadcrumbList.value.push({
						name: pathArr[i],
						title: "",
						path: i === pathArr.length ? "/" + pathArr.slice(0, i + 1).join("/") : "",
					});
				}
				setBreadcrumbList(menuList.value);
				breadcrumbList.value.unshift({
					name: menuList.value[0].path,
					title: menuList.value[0].title,
					path: "/" + menuList.value[0].path,
				});
			};
			const setBreadcrumbList = (array: Array<any>) => {
				array.forEach((item: any) => {
					breadcrumbList.value.forEach((obj: any) => {
						if (item.path === obj.name) {
							obj.title = item.title;
							if (item.children) setBreadcrumbList(item.children);
						}
					});
				});
			};
			onMounted(() => {
				breadcrumbList.value = [];
				initBreadcrumbList(route.path);
			});
			onBeforeRouteUpdate(to => {
				breadcrumbList.value = [];
				initBreadcrumbList(to.path);
			});
			// 退出
			const router = useRouter();
			const logout = () => {
				Utils.Storages.removeSessionStorage(Utils.Constants.storageKeys.token);
				Utils.Cookies.removeCookie(Utils.Constants.cookieKeys.token);
				router.push({ path: SettingsRouter.routeLogin });
			};

			const setThemeConfig = () => {
				Utils.Storages.removeLocalStorage(Utils.Constants.storageKeys.themeConfig);
				Utils.Storages.setLocalStorage(Utils.Constants.storageKeys.themeConfig, themeConfig.value);
			};

			return {
				isColl,
				changeCollapse,
				isShowDrawer,
				breadcrumbList,
				logout,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
