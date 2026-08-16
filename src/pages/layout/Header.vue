<script setup lang="ts">
import { FullscreenManager } from "js-use-core";
import Storage from "@/utils/browser/storage";
import Constants from "@/utils/constant/constants";
import ThemeConfig from "@/config/themeConfig";
import RouterConfig from "@/config/routerConfig";
import { getStoreRefs, appStore } from "@/store";
import { Sunny, Moon, Fold, Expand } from "@element-plus/icons-vue";
import Utils from "@/utils";

import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";

const emit = defineEmits<{
  (e: "toggle-menu"): void;
}>();

const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
// 折叠菜单 start
const isColl = computed(() => {
  let { isCollapse } = themeConfig.value;
  return !isCollapse;
});
const props = defineProps<{
  isMobile?: boolean;
}>();
const changeCollapse = () => {
  // 移动端：触发抽屉开关；PC端：折叠/展开菜单
  if (props.isMobile) {
    emit("toggle-menu");
  } else {
    themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
    setThemeConfig();
  }
};
// 折叠菜单 end
// 面包屑导航 start
const route = useRoute();
const { menuList } = getStoreRefs(appStore.useRouterList);
const breadcrumbList = ref<any[]>([]);
// 取路径的最后一段（兼容 "system" 父项与 "users" 子项两种形式）
const getLastSegment = (p: string) => (p || "").split("/").filter(Boolean).pop() || "";
const initBreadcrumbList = (path: string) => {
  // 登录/注册等无授权页面：不展示面包屑
  const noBreadcrumbPaths = ["/login", "/register", "/auth", "/no-data", "/403", "/404", "/500"];
  if (noBreadcrumbPaths.includes(path)) {
    return;
  }
  // 工作台/根路径：只显示工作台一项
  const home = menuList.value?.[0];
  const isHomePath =
    RouterConfig.executeList.includes(path) ||
    path === "/" ||
    path === RouterConfig.routeHome ||
    (home && (path === "/" + home.path || path === "/" + home.path + "/"));
  if (isHomePath) {
    if (home) {
      breadcrumbList.value.push({
        name: home.path,
        title: home.title,
        path: "/" + home.path,
      });
    }
    return;
  }
  // 非工作台路径：仅展示当前所在菜单的层级路径（不再强制前置工作台）
  const pathArr = path.split("/").filter(Boolean);
  for (let i = 0; i < pathArr.length; i++) {
    breadcrumbList.value.push({
      name: pathArr[i],
      title: "",
      path: "/" + pathArr.slice(0, i + 1).join("/"),
    });
  }
  setBreadcrumbList(menuList.value);
  // 移除因路径段与菜单命名空间不匹配而留空的占位项
  breadcrumbList.value = breadcrumbList.value.filter((item) => item.title !== "");
  // 按 path 去重
  const seen = new Set<string>();
  breadcrumbList.value = breadcrumbList.value.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
};
const setBreadcrumbList = (array: Array<any>) => {
  if (!Array.isArray(array)) return;
  array.forEach((item) => {
    if (!item || !item.path) return;
    // 兼容 item.path 为 "system"（父项）与 "users"（子项）两种形式
    const lastSeg = getLastSegment(item.path);
    breadcrumbList.value.forEach((obj: any) => {
      if (lastSeg === obj.name) {
        obj.title = item.title;
      }
    });
    // 递归处理子菜单
    if (Array.isArray(item.children) && item.children.length > 0) {
      setBreadcrumbList(item.children);
    }
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
  // 内置
  proxy.$i18n.locale = lang;
  Storage.setLocalStorage(Constants.keys.i18nLocale, lang);
  setThemeConfig();
  proxy.$mitt.emit("getI18nConfig", lang);
  Utils.setTitle?.();
};
// 组件大小
const sizes = ThemeConfig.sizeKeys;
const changeSize = (size: string) => {
  themeConfig.value.globalComponentSize = size;
  setThemeConfig();
  proxy.$mitt.emit("getSizeConfig", size);
};
// 设置
const isShowDrawer = ref(false);
// 全屏
const fullscreen = new FullscreenManager();
const isScreenFull = ref(fullscreen.isFullscreen);
const changeScreenFull = () => {
  if (fullscreen.isSupported && fullscreen.isEnabled) {
    fullscreen.toggle();
    isScreenFull.value = fullscreen.isFullscreen;
  }
};
// 退出
const router = useRouter();
const onLogout = () => {
  Storage.removeSessionStorage(Constants.keys.token);
  Storage.removeCookie(Constants.keys.token);
  Storage.removeLocalStorage(Constants.keys.token);
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
const changeDark = (e: boolean) => {
  themeConfig.value.isDark = e;
  setThemeConfig();
  toggleDark();
};
const isThemGrey = ref(themeConfig.value.isGrey);
const changeGrey = (e: boolean) => {
  themeConfig.value.isGrey = e;
  setThemeConfig();
  if (e) {
    document.querySelector("body")!.setAttribute("style", `filter: grayscale(1)`);
  } else {
    document.querySelector("body")!.removeAttribute("style");
  }
};
const isThemInvert = ref(themeConfig.value.isInvert);
const changeInvert = (e: boolean) => {
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
  Storage.removeLocalStorage(Constants.keys.themeConfig);
  Storage.setLocalStorage(Constants.keys.themeConfig, themeConfig.value);
};
const userInfoAvatar = ref("");
const userInfoName = ref("");
const initData = () => {
  const userInfo = Storage.getLocalStorage(Constants.keys.userInfo) || null;
  if (userInfo) {
    userInfoAvatar.value = userInfo.avatar || "";
    userInfoName.value = userInfo.name || "";
  }
  isThemGrey.value = Storage.getLocalStorage(Constants.keys.themeConfig)?.isGrey || false;
  changeGrey(isThemGrey.value);
  isThemInvert.value = Storage.getLocalStorage(Constants.keys.themeConfig)?.isInvert || false;
  changeInvert(isThemInvert.value);
};
// 渲染调用
onMounted(() => {
  initData();
  breadcrumbList.value = [];
  initBreadcrumbList(route.path);
  const localI18n = Storage.getLocalStorage(Constants.keys.i18nLocale);
  if (localI18n) {
    changeI18n(localI18n);
  }
});

onBeforeRouteUpdate((to) => {
  breadcrumbList.value = [];
  initBreadcrumbList(to.path);
});
</script>

<template>
  <el-row :gutter="10" justify="space-between" class="re-h-full">
    <!--		面包屑导航（移动端隐藏）-->
    <el-col :xs="24" :sm="12">
      <div class="re-h-full re-flex-cv">
        <el-icon @click="changeCollapse" class="re-cp" :size="18">
          <Fold v-if="isColl && !isMobile"></Fold>
          <Expand v-else-if="!isColl && !isMobile"></Expand>
          <Fold v-else></Fold>
        </el-icon>
        <el-breadcrumb
          v-if="!isMobile"
          separator-icon="ArrowRight"
          class="re-ml-20 breadcrumb-display"
        >
          <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
              {{ $t(item.title) }}
            </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
      </div>
    </el-col>
    <!--		右侧快捷栏-->
    <el-col :xs="24" :sm="12">
      <div class="re-h-full re-flex-end">
        <!-- 移动端隐藏：组件大小、语言切换 -->
        <el-dropdown
          v-if="!isMobile"
          ref="dropdownComponents"
          trigger="hover"
          @command="changeSize"
        >
          <i class="iconfont icon-zujian2 re-cp re-ml-10" @click="showDropdownComponents"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in sizes" :key="index" :command="item.value">
                <span>{{ item.label }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown v-if="!isMobile" ref="dropdownLanguage" trigger="hover" @command="changeI18n">
          <i class="iconfont icon-duoyuyan re-cp re-ml-10" @click="showDropdownLanguage"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in i18ns" :key="index" :command="item.value">
                <span>{{ item.label }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-tooltip effect="dark" content="设置" placement="bottom">
          <i class="iconfont icon-pifu re-cp re-ml-10" @click="isShowDrawer = true"></i>
        </el-tooltip>
        <!-- 移动端隐藏：全屏按钮 -->
        <el-tooltip
          v-if="!isMobile"
          effect="dark"
          :content="isScreenFull ? '退出全屏' : '全屏'"
          placement="bottom"
        >
          <i
            v-if="isScreenFull"
            class="iconfont icon-fullscreen-exit re-cp re-ml-10"
            @click="changeScreenFull"
          ></i>
          <i v-else class="iconfont icon-fullscreen re-cp re-ml-10" @click="changeScreenFull"></i>
        </el-tooltip>
        <div v-if="!isMobile" class="re-ml-10">{{ userInfoName }}</div>
        <el-dropdown ref="dropdownUser" trigger="hover">
          <el-avatar
            :src="userInfoAvatar"
            fit="cover"
            class="re-cp user-avatar re-ml-10"
            @click="showDropdownUser"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon><User></User></el-icon>
                <span>个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item @click="onLogout">
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
    <el-row :gutter="20" class="re-flex-cv" justify="space-between">
      <el-col :span="6" class="re-text-left"> 颜色 </el-col>
      <el-col :span="18" class="re-text-right">
        <el-color-picker v-model="colorPicker" @change="changeColorPicker" />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="re-flex-cv" justify="space-between">
      <el-col :span="6" class="re-text-left"> 暗黑 </el-col>
      <el-col :span="18" class="re-text-right">
        <el-switch
          v-model="isThemDark"
          :disabled="isThemGrey || isThemInvert"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
          @change="changeDark"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="re-flex-cv" justify="space-between">
      <el-col :span="6" class="re-text-left"> 灰色 </el-col>
      <el-col :span="18" class="re-text-right">
        <el-switch
          v-model="isThemGrey"
          :disabled="isThemDark || isThemInvert"
          inline-prompt
          @change="changeGrey"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="re-flex-cv" justify="space-between">
      <el-col :span="6" class="re-text-left"> 色弱 </el-col>
      <el-col :span="18" class="re-text-right">
        <el-switch
          v-model="isThemInvert"
          :disabled="isThemDark || isThemGrey"
          inline-prompt
          @change="changeInvert"
        />
      </el-col>
    </el-row>
  </el-drawer>
</template>

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

.user-avatar {
  width: 40px;
  height: 40px;
}

// 面包屑导航字体
:deep(.el-breadcrumb__inner) {
  font-size: 0.14rem;
}

// 纯展示面包屑：去掉可点击指针与链接色
:deep(.breadcrumb-display .el-breadcrumb__inner) {
  cursor: default;
  color: var(--el-text-color-primary);
  &:hover {
    color: var(--el-text-color-primary);
  }
}

// 用户名
.re-ml-10 {
  font-size: 0.14rem;
}
</style>
