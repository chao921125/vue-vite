<template>
	<el-row :gutter="10" justify="space-between" class="re-h-fill">
		<!--		面包屑导航-->
		<el-col :xs="24" :sm="12">
			<div class="re-h-fill re-flex-row-center-ai">
				<el-icon @click="changeCollapse" class="re-cursor-pointer" :size="18">
					<Fold v-if="isColl"></Fold>
					<Expand v-else></Expand>
				</el-icon>
				<el-breadcrumb separator-icon="ArrowRight" class="re-ml-20">
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
			<div class="re-h-fill re-flex-row-end">
				<el-dropdown ref="dropdownComponents" trigger="hover" @command="changeSize">
					<i class="iconfont icon-zujian2 re-cursor-pointer re-ml-10" @click="showDropdownComponents"></i>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="(item, index) in sizes" :key="index" :command="item.value">
								<span>{{ item.label }}</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<el-dropdown ref="dropdownLanguage" trigger="hover" @command="changeI18n">
					<i class="iconfont icon-duoyuyan re-cursor-pointer re-ml-10" @click="showDropdownLanguage"></i>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="(item, index) in i18ns" :key="index" :command="item.value">
								<span>{{ item.label }}</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<el-tooltip effect="dark" content="设置" placement="bottom">
					<i class="iconfont icon-pifu re-cursor-pointer re-ml-10" @click="isShowDrawer = true"></i>
				</el-tooltip>
				<el-tooltip effect="dark" :content="isScreenFull ? '退出全屏' : '全屏'" placement="bottom">
					<i v-if="isScreenFull" class="iconfont icon-fullscreen-exit re-cursor-pointer re-ml-10" @click="changeScreenFull"></i>
					<i v-else class="iconfont icon-fullscreen re-cursor-pointer re-ml-10" @click="changeScreenFull"></i>
				</el-tooltip>
				<div class="re-ml-10">{{ userInfoName }}</div>
				<el-dropdown ref="dropdownUser" trigger="hover">
					<el-avatar :src="userInfoAvatar" fit="cover" class="re-cursor-pointer user-avatar re-ml-10" @click="showDropdownUser" />
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
				<el-switch v-model="isThemDark" :disabled="isThemGrey || isThemInvert" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @change="changeDark" />
			</el-col>
		</el-row>
		<el-row :gutter="20" class="re-flex-row-center-ai" justify="space-between">
			<el-col :span="6" class="re-text-left">灰色</el-col>
			<el-col :span="18" class="re-text-right">
				<el-switch v-model="isThemGrey" :disabled="isThemDark || isThemInvert" inline-prompt @change="changeGrey" />
			</el-col>
		</el-row>
		<el-row :gutter="20" class="re-flex-row-center-ai" justify="space-between">
			<el-col :span="6" class="re-text-left">色弱</el-col>
			<el-col :span="18" class="re-text-right">
				<el-switch v-model="isThemInvert" :disabled="isThemDark || isThemGrey" inline-prompt @change="changeInvert" />
			</el-col>
		</el-row>
	</el-drawer>
</template>

<script lang="ts" setup name="Header">
	import screenfull from "screenfull";
	import Storage from "@/plugins/utils/storage";
	import Cookie from "@/plugins/utils/cookie";
	import Constants from "@/plugins/constants";
	import ThemeConfig from "@/config/themeConfig";
	import RouterConfig from "@/config/routerConfig";
	import { getStoreRefs, appStore } from "@/store";
	import { Sunny, Moon } from "@element-plus/icons-vue";
	import Utils from "@/plugins/utils";

	const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
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
	const { menuList } = getStoreRefs(appStore.useRouterList);
	const breadcrumbList = ref<any[]>([]);
	const initBreadcrumbList = (path: string) => {
		if (RouterConfig.executeList.includes(path)) {
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
		// 去掉包含首页的面包屑
		// breadcrumbList.value.unshift({
		// 	name: menuList.value[0].path,
		// 	title: menuList.value[0].title,
		// 	path: "/" + menuList.value[0].path,
		// });
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
	const { proxy } = getCurrentInstance() as any;
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
	const i18ns = ThemeConfig.i18nKeys;
	const changeI18n = (lang: string) => {
		themeConfig.value.globalI18n = lang;
		proxy.$i18n.locale = lang;
		Storage.setLocalStorage(Constants.storageKey.i18nLocale, lang);
		setThemeConfig();
		proxy.mittBus.emit("getI18nConfig", lang);
		Utils.setTitle();
	};
	// 组件大小
	const sizes = ThemeConfig.sizeKeys;
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
		Storage.removeSessionStorage(Constants.storageKey.token);
		Cookie.removeCookie(Constants.cookieKey.token);
		router.push({ path: RouterConfig.routeLogin });
	};
	// 个人中心 end

	// 设置 抽屉 start
	const colorPicker = ref();
	const changeColorPicker = () => {
		console.log("color is ", colorPicker.value);
	};
	// 暗黑模式 有两种方式，利用vueuse和自定义
	const isDark = useDark();
	const toggleDark = useToggle(isDark);
	const isThemDark = ref(themeConfig.value.isDark);
	const changeDark = (e) => {
		themeConfig.value.isDark = e;
		setThemeConfig();
		toggleDark();
		// let html = document.documentElement as HTMLElement;
		// if (e) {
		// 	html.setAttribute("class", "dark");
		// } else {
		// 	html.removeAttribute("class");
		// }
	};
	const isThemGrey = ref(themeConfig.value.isGrey);
	const changeGrey = (e) => {
		themeConfig.value.isGrey = e;
		setThemeConfig();
		if (e) {
			document.querySelector("body")!.setAttribute("style", `filter: grayscale(1)`);
		} else {
			document.querySelector("body")!.removeAttribute("style");
		}
	};
	const isThemInvert = ref(themeConfig.value.isInvert);
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
		Storage.removeLocalStorage(Constants.storageKey.themeConfig);
		Storage.setLocalStorage(Constants.storageKey.themeConfig, themeConfig.value);
	};
	const userInfoAvatar = ref("");
	const userInfoName = ref("");
	const initData = () => {
		const userInfo = Storage.getLocalStorage(Constants.storageKey.userInfo) || null;
		if (userInfo) {
			userInfoAvatar.value = userInfo.avatar || "";
			userInfoName.value = userInfo.name || "";
		}
		isThemGrey.value = Storage.getLocalStorage(Constants.storageKey.themeConfig)?.isGrey || false;
		changeGrey(isThemGrey.value);
		isThemInvert.value = Storage.getLocalStorage(Constants.storageKey.themeConfig)?.isInvert || false;
		changeInvert(isThemInvert.value);
	};
	// 渲染调用
	onMounted(() => {
		initData();
		breadcrumbList.value = [];
		initBreadcrumbList(route.path);
		const localI18n = Storage.getLocalStorage(Constants.storageKey.i18nLocale);
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
	@use "./index.scss";
</style>
