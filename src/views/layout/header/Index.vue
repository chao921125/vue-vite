<template>
	<el-row :gutter="10" justify="space-between" class="re-height-fill">
		<!--		面包屑导航-->
		<el-col :xs="24" :sm="12">
			<div class="re-height-fill re-flex-row-center-ai">
				<el-icon @click="changeCollapse" class="re-cursor-pointer" :size="18">
					<Fold v-if="isColl"></Fold>
					<Expand v-else></Expand>
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
		<!--		右侧快捷栏-->
		<el-col :xs="24" :sm="12">
			<div class="re-height-fill re-flex-row-reverse">
				<el-dropdown ref="dropdownUser" trigger="hover">
					<el-avatar :src="userInfoAvatar" fit="cover" class="re-cursor-pointer user-avatar re-m-l-10" @click="showDropdownUser" />
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>
								<el-icon><User></User></el-icon>
								<span>个人中心</span>
							</el-dropdown-item>
							<el-dropdown-item @click="logout">
								<el-icon><SwitchButton></SwitchButton></el-icon>
								<span>退出登录</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<div class="re-m-l-10">{{ userInfoName }}</div>
				<el-tooltip effect="dark" :content="isScreenFull ? '退出全屏' : '全屏'" placement="bottom">
					<i v-if="isScreenFull" class="iconfont icon-fullscreen-exit re-cursor-pointer re-m-l-10" @click="changeScreenFull"></i>
					<i v-else class="iconfont icon-fullscreen re-cursor-pointer re-m-l-10" @click="changeScreenFull"></i>
				</el-tooltip>
				<el-tooltip effect="dark" content="设置" placement="bottom">
					<i class="iconfont icon-pifu re-cursor-pointer re-m-l-10" @click="isShowDrawer = true"></i>
				</el-tooltip>
				<el-dropdown ref="dropdownLanguage" trigger="hover" @command="changeI18n">
					<i class="iconfont icon-duoyuyan re-cursor-pointer re-m-l-10" @click="showDropdownLanguage"></i>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="(item, index) in i18ns" :key="index" :command="item.value">
								<span>{{ item.label }}</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<el-dropdown ref="dropdownComponents" trigger="hover" @command="changeSize">
					<i class="iconfont icon-zujian2 re-cursor-pointer re-m-l-10" @click="showDropdownComponents"></i>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="(item, index) in sizes" :key="index" :command="item.value">
								<span>{{ item.label }}</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</el-col>
	</el-row>
	<el-drawer v-model="isShowDrawer" title="主题设置" size="20%">
		<!--		<template #header></template>-->
		<el-row :gutter="20" class="re-flex-row-center-ai" justify="space-between">
			<el-col :span="6" class="re-text-left">颜色</el-col>
			<el-col :span="18" class="re-text-right"><el-color-picker v-model="colorPicker" @change="changeColorPicker" /></el-col>
		</el-row>
		<el-row :gutter="20" class="re-flex-row-center-ai" justify="space-between">
			<el-col :span="6" class="re-text-left">暗黑</el-col>
			<el-col :span="18" class="re-text-right">
				<el-switch v-model="isThemDark" inline-prompt disabled :active-icon="Sunny" :inactive-icon="Moon" @change="changeDark" />
			</el-col>
		</el-row>
		<el-row :gutter="20" class="re-flex-row-center-ai" justify="space-between">
			<el-col :span="6" class="re-text-left">灰色</el-col>
			<el-col :span="18" class="re-text-right">
				<el-switch v-model="isThemGrey" inline-prompt @change="changeGrey" />
			</el-col>
		</el-row>
		<el-row :gutter="20" class="re-flex-row-center-ai" justify="space-between">
			<el-col :span="6" class="re-text-left">色弱</el-col>
			<el-col :span="18" class="re-text-right">
				<el-switch v-model="isThemInvert" inline-prompt @change="changeInvert" />
			</el-col>
		</el-row>
	</el-drawer>
</template>

<script lang="ts" setup name="Header">
	import { ref, computed, onMounted, getCurrentInstance } from "vue";
	import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
	import screenfull from "screenfull";
	import Utils from "@/plugins/utils";
	import ThemeSetConfig from "@/config/themeSetConfig";
	import RouterSetConfig from "@/config/routerSetConfig";
	import { storeToRefs } from "pinia";
	import Pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import { useRouterList } from "@/store/modules/routerMeta";
	import { Sunny, Moon } from "@element-plus/icons-vue";

	const storeThemeConfig = useThemeConfig(Pinia);
	const { themeConfig } = storeToRefs(storeThemeConfig);
	// 折叠菜单 start
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
	const route = useRoute();
	const storesRouterList = useRouterList(Pinia);
	const { menuList } = storeToRefs(storesRouterList);
	const breadcrumbList = ref<any[]>([]);
	const initBreadcrumbList = (path: string) => {
		if (RouterSetConfig.executeList.includes(path)) {
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
	// 面包屑导航 end
	// 个人中心 start
	const { proxy } = <any>getCurrentInstance();
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
	// i18n
	const i18ns = ThemeSetConfig.i18nKeys;
	const changeI18n = (lang: string) => {
		themeConfig.value.globalI18n = lang;
		proxy.$i18n.locale = lang;
		Utils.Storages.setLocalStorage(Utils.Constants.storageKey.i18nLocal, lang);
		setThemeConfig();
		proxy.mittBus.emit("getI18nConfig", proxy.$i18n.messages[lang]);
	};
	// 组件大小
	const sizes = ThemeSetConfig.sizeKeys;
	const changeSize = (size: string) => {
		themeConfig.value.globalComponentSize = size;
		setThemeConfig();
		proxy.mittBus.emit("getSizeConfig", size);
	};
	// 设置
	const isShowDrawer = ref(false);
	// 全屏
	const isScreenFull = ref(screenfull.isFullscreen);
	const changeScreenFull = () => {
		if (screenfull.isEnabled) {
			isScreenFull.value = !isScreenFull.value;
			screenfull.toggle();
		}
	};
	// 退出
	const router = useRouter();
	const logout = () => {
		Utils.Storages.removeSessionStorage(Utils.Constants.storageKey.token);
		Utils.Cookies.removeCookie(Utils.Constants.cookieKey.token);
		router.push({ path: RouterSetConfig.routeLogin });
	};
	// 个人中心 end

	// 设置 抽屉 start
	const colorPicker = ref();
	const changeColorPicker = () => {
		console.log("color is ", colorPicker.value);
	};
	const isThemDark = ref();
	const changeDark = (e) => {
		themeConfig.value.isDark = e;
		setThemeConfig();
		let html = document.documentElement as HTMLElement;
		if (e) {
			html.setAttribute("class", "dark");
		} else {
			html.removeAttribute("class");
		}
	};
	const isThemGrey = ref();
	const changeGrey = (e) => {
		themeConfig.value.isGrey = e;
		setThemeConfig();
		if (e) {
			document.querySelector("body")!.setAttribute("style", `filter: grayscale(1)`);
		} else {
			document.querySelector("body")!.removeAttribute("style");
		}
	};
	const isThemInvert = ref();
	const changeInvert = (e) => {
		themeConfig.value.isInvert = e;
		setThemeConfig();
		if (e) {
			document.querySelector("body")!.setAttribute("style", `filter: invert(1)`);
		} else {
			document.querySelector("body")!.removeAttribute("style");
		}
	};
	// 设置 抽屉 end

	// 本地持久化配置
	const setThemeConfig = () => {
		Utils.Storages.removeLocalStorage(Utils.Constants.storageKey.themeConfig);
		Utils.Storages.setLocalStorage(Utils.Constants.storageKey.themeConfig, themeConfig.value);
	};
	const userInfoAvatar = ref("");
	const userInfoName = ref("");
	const initData = () => {
		const userInfo = Utils.Storages.getLocalStorage(Utils.Constants.storageKey.userInfo) || null;
		userInfoAvatar.value = userInfo.avatar || "";
		userInfoName.value = userInfo.userName || "";
		isThemGrey.value = Utils.Storages.getLocalStorage(Utils.Constants.storageKey.themeConfig)?.isGrey || false;
		changeGrey(isThemGrey.value);
		isThemInvert.value = Utils.Storages.getLocalStorage(Utils.Constants.storageKey.themeConfig)?.isInvert || false;
		changeInvert(isThemInvert.value);
	};
	// 渲染调用
	onMounted(() => {
		initData();
		breadcrumbList.value = [];
		initBreadcrumbList(route.path);
		const localI18n = Utils.Storages.getLocalStorage(Utils.Constants.storageKey.i18nLocal);
		if (localI18n) {
			changeI18n(localI18n);
		}
	});
	onBeforeRouteUpdate((to) => {
		breadcrumbList.value = [];
		initBreadcrumbList(to.path);
	});
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
