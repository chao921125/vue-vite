<script setup lang="ts">
import MenuSub from "./MenuSub.vue";
import Store, { getStoreRefs, appStore } from "@/store";

// 折叠菜单
const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
const isColl = computed(() => {
	let { isCollapse } = themeConfig.value;
	return !isCollapse;
});
// 渲染菜单
const { menuList } = getStoreRefs(appStore.useRouterList);
const state = reactive({ menuList: [] });
const setMenu = () => {
	state.menuList = menuList.value || [];
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
const toRouter = (index) => {
	router.push({ path: "/" + index });
};
/**
 * 解决点击父菜单也需要跳转页面（不知道哪个脑残公司才会设计这种逻辑，给大家提供一个解决方案思路）
 * 要点一：菜单的命名规则必须统一，比如父菜单：parent，对应的子菜单应该为：parent/children
 * 要点二：所有的展开菜单必须定义好，写到常量文件中和配置的菜单对应上，这个必须是开发人员提供配置
 */
const openMenu = (index) => {
	console.log("openMenu", index);
	// if (["/menu1", "/menu2"].includes(index) && route.path.indexOf(`${index}/`) === -1) {
	// 	router.push({ path: index });
	// }
};
const closeMenu = (index) => {
	console.log("closeMenu", index);
	// if (["/menu1", "/menu2"].includes(index)) {
	// 	router.push({ path: index });
	// }
};
// 回首页
const toHome = () => {
	router.push({ path: "/" });
};
// 监听路由及状态，改变菜单
watch(
	Store.state,
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

<template>
  <div v-if="isColl" class="logo-full re-flex-center">
    <el-link underline="never" @click="toHome">
      <i class="iconfont icon-shouye"></i>
      <span class="re-ml-10">CC ADMIN</span>
    </el-link>
  </div>
  <div v-else class="animate__animated animate__zoomIn logo-only re-flex-center">
    <el-link underline="never" @click="toHome">
      <i class="iconfont icon-shouye"></i>
    </el-link>
  </div>
  <el-scrollbar>
    <el-menu
      class="menu-box"
      :default-active="changeMenuKey"
      mode="vertical"
      :collapse="!isColl"
      :unique-opened="true"
      @select="toRouter"
      @open="openMenu"
      @close="closeMenu"
    >
      <MenuSub v-if="state.menuList && state.menuList.length" :menus="state.menuList"></MenuSub>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
