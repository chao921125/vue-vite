<script setup lang="ts">
import { getStoreRefs, appStore } from "@/store";
import { elI18n } from "@/plugins/i18n";
import { FontManager } from "js-use-core";
import Utils from "@/utils";
import Storage from "@/utils/browser/storage";
import Constants from "@/utils/constant/constants";
import ThemeConfig from "@/config/themeConfig";
import { useRoute } from "vue-router";

const instance = getCurrentInstance();
const proxy = instance?.proxy as any;
// large / default /small
const config = reactive({
  i18n: elI18n[ThemeConfig.i18nDef],
  size: "default", //"default" | "large" | "small",
  buttonSpace: {
    autoInsertSpace: false,
  },
});

const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
const route = useRoute();

/**
 * 需要缓存的路由名称列表
 * 根据路由 meta.isKeepAlive 配置动态生成
 */
const cachedRoutes = computed(() => {
  const routerList = appStore.useRouterList.routerList;
  if (!routerList || routerList.length === 0) return [];

  // 递归收集所有需要缓存的路由名称
  const collectKeepAliveRoutes = (routes: any[]): string[] => {
    const names: string[] = [];
    routes.forEach((route) => {
      if (route.meta?.isKeepAlive && route.name) {
        names.push(route.name);
      }
      if (route.children?.length) {
        names.push(...collectKeepAliveRoutes(route.children));
      }
    });
    return names;
  };

  return collectKeepAliveRoutes(routerList);
});
const initData = () => {
  Utils.setTitle?.();
  if (proxy) {
    proxy.$mitt.emit("getI18nConfig", Storage.getLocalStorage(Constants.keys.i18nLocale));
    if (Storage.getLocalStorage(Constants.keys.themeConfig)) {
      appStore.useThemeConfig.setThemeConfig(Storage.getLocalStorage(Constants.keys.themeConfig));
    }
    proxy.$mitt.on("getI18nConfig", (locale: any) => {
      config.i18n = elI18n[locale];
    });
    // "default" | "large" | "small"
    proxy.$mitt.on("getSizeConfig", (size: any) => {
      config.size = size;
    });
  }
};

onBeforeMount(() => {
  Utils.setCssCdn?.();
  Utils.setJsCdn?.();
  if (!Storage.getLocalStorage(Constants.keys.themeConfig)) {
    Storage.setLocalStorage(Constants.keys.themeConfig, themeConfig.value);
    config.i18n = elI18n[themeConfig.value.globalI18n];
  }
  if (!Storage.getLocalStorage(Constants.keys.i18nLocale)) {
    Storage.setLocalStorage(Constants.keys.i18nLocale, import.meta.env.VITE_LOCAL);
  }
});
onMounted(async () => {
  initData();

  // 使用非阻塞方式检测字体
  // 页面立即渲染，字体在后台异步检测
  checkFontsAsync();
});

/**
 * 异步字体检测（不阻塞渲染）
 * 使用 requestIdleCallback 在浏览器空闲时执行
 */
const checkFontsAsync = () => {
  const detect = async () => {
    try {
      // 创建 FontManager 实例
      const checker = new FontManager();

      // 检查关键字体
      const result = await checker.check(["NotoSans-Regular", "NotoSans-Medium"]);

      if (result.success) {
        console.log("字体检测成功:", (result as any).loadedFonts);
      } else {
        console.warn("字体检测失败，使用系统字体降级:", (result as any).failedFonts);
      }
    } catch (error) {
      console.error("字体检测异常:", error);
    }
  };

  // 使用 requestIdleCallback 在浏览器空闲时检测
  if ("requestIdleCallback" in window) {
    requestIdleCallback(
      () => {
        detect();
      },
      { timeout: 2000 }, // 最多等待2秒，超时也会执行
    );
  } else {
    // 降级方案：延迟1秒后检测
    setTimeout(detect, 1000);
  }
};
onUnmounted(() => {
  if (proxy) {
    proxy.$mitt.off("getI18nConfig");
    proxy.$mitt.off("getSizeConfig");
  }
});
watch(
  () => route.path,
  () => {
    Utils.setTitle?.();
  },
  {
    deep: true,
  },
);
</script>

<template>
  <el-config-provider :locale="config.i18n" :size="config.size" :button="config.buttonSpace">
    <RouterView v-slot="{ Component }">
      <!-- 根据路由 meta.isKeepAlive 决定是否缓存 -->
      <KeepAlive :include="cachedRoutes">
        <component :is="Component" :key="route.name" />
      </KeepAlive>
    </RouterView>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
