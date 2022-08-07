<template>
	<el-row :gutter="10" justify="space-between" class="re-height-fill">
		<el-col :xs="24" :sm="12">
			<div class="re-height-fill re-flex-row-center-ai">
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
			<div class="re-height-fill re-flex-row-reverse">
				<div class="re-m-l-10">Admin</div>
				<el-dropdown ref="dropdownUser" trigger="contextmenu">
					<el-image
						src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
						fit="cover"
						class="re-cursor-pointer user-avatar re-m-l-10"
						@click="showDropdownUser"
					/>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="logout">
								<el-icon><SwitchButton /></el-icon>
								<span>退出登录</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<el-tooltip effect="dark" content="全屏" placement="bottom">
					<i class="iconfont icon-fullscreen re-cursor-pointer re-m-l-10" />
				</el-tooltip>
				<el-tooltip effect="dark" content="设置" placement="bottom">
					<i class="iconfont icon-pifu re-cursor-pointer re-m-l-10" @click="isShowDrawer = true" />
				</el-tooltip>
				<el-tooltip effect="dark" content="国际化" placement="bottom">
					<el-dropdown ref="dropdownComponents" trigger="contextmenu">
						<i class="iconfont icon-duoyuyan re-cursor-pointer re-m-l-10" @click="showDropdownComponents" />
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="logout">
									<span>简体中文</span>
								</el-dropdown-item>
								<el-dropdown-item @click="logout">
									<span>繁体中文</span>
								</el-dropdown-item>
								<el-dropdown-item @click="logout">
									<span>英文</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</el-tooltip>
				<el-tooltip effect="dark" content="组件" placement="bottom">
					<el-dropdown ref="dropdownLanguage" trigger="contextmenu">
						<i class="iconfont icon-zujian2 re-cursor-pointer re-m-l-10" @click="showDropdownLanguage" />
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="logout">
									<span>默认</span>
								</el-dropdown-item>
								<el-dropdown-item @click="logout">
									<span>大型</span>
								</el-dropdown-item>
								<el-dropdown-item @click="logout">
									<span>小型</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</el-tooltip>
			</div>
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
			// 折叠菜单 start
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
			// 折叠菜单 end
			// 面包屑导航 start
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
			onBeforeRouteUpdate((to) => {
				breadcrumbList.value = [];
				initBreadcrumbList(to.path);
			});
			// 面包屑导航 end
			// 个人中心 start
			const dropdownUser = ref();
			const dropdownComponents = ref();
			const dropdownLanguage = ref();
			const showDropdownUser = () => {
				dropdownUser.value.handleOpen();
			};
			const showDropdownComponents = () => {
				dropdownComponents.value.handleOpen();
			};
			const showDropdownLanguage = () => {
				dropdownLanguage.value.handleOpen();
			};
			// 退出
			const router = useRouter();
			const logout = () => {
				Utils.Storages.removeSessionStorage(Utils.Constants.storageKeys.token);
				Utils.Cookies.removeCookie(Utils.Constants.cookieKeys.token);
				router.push({ path: SettingsRouter.routeLogin });
			};
			// 个人中心 end

			// 本地持久化配置
			const setThemeConfig = () => {
				Utils.Storages.removeLocalStorage(Utils.Constants.storageKeys.themeConfig);
				Utils.Storages.setLocalStorage(Utils.Constants.storageKeys.themeConfig, themeConfig.value);
			};

			return {
				isColl,
				changeCollapse,
				isShowDrawer,
				breadcrumbList,
				dropdownUser,
				dropdownComponents,
				dropdownLanguage,
				showDropdownUser,
				showDropdownComponents,
				showDropdownLanguage,
				logout,
			};
		},
	});
</script>

<style scoped lang="scss">
	.user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
</style>
