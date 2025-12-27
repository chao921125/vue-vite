<script setup lang="ts">
import { getStoreRefs, appStore } from "@/store";
import { elI18n } from "@/plugins/i18n";
import { FontManager } from "js-use-core";
import Utils from "@/utils";
import Storage from "@/utils/storage";
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
const initData = () => {
	if (proxy) {
		proxy.$mitt.emit("getI18nConfig", Storage.getLocalStorage(Constants.keys.i18nLocale));
		if (Storage.getLocalStorage(Constants.keys.themeConfig)) {
			appStore.useThemeConfig.setThemeConfig(Storage.getLocalStorage(Constants.keys.themeConfig));
		}
		proxy.$mitt.on("getI18nConfig", (locale) => {
			config.i18n = elI18n[locale];
		});
		// "default" | "large" | "small"
		proxy.$mitt.on("getSizeConfig", (size) => {
			config.size = size;
		});
	}
};

onBeforeMount(() => {
	Utils.setCssCdn();
	Utils.setJsCdn();
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

	// 等待字体加载完成后再进行检测
	const checkFonts = async () => {
		try {
			// 首先等待 document.fonts 准备就绪
			if (document.fonts && document.fonts.ready) {
				await document.fonts.ready;
			}

			// 创建 FontManager 实例
			const checker = new FontManager();

			// 检查字体是否可用
			// 使用多次尝试机制，因为字体可能需要时间加载
			let result = await checker.check(["NotoSans-Regular", "NotoSans-Medium"]);

			// 如果检测失败，等待更多时间再试
			if (!result.success) {
				console.log("首次检测失败，等待字体加载...");
				await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒

				// 再次检查
				result = await checker.check(["NotoSans-Regular", "NotoSans-Medium"]);
			}

			if (result.success) {
				console.log("FontManager 检测: 字体库加载成功");
			} else {
				console.log("FontManager 检测: 字体库加载失败");
				console.log("失败的字体:", result.failedFonts);
			}
		} catch (error) {
			console.error("字体检测失败:", error);
		}
	};

	// 执行字体检查
	checkFonts();
});
onUnmounted(() => {
	if (proxy) {
		proxy.$mitt.off("getI18nConfig");
		proxy.$mitt.off("getSizeConfig");
	}
});
watch(
	() => route.path,
	() => {
		Utils.setTitle();
	},
	{
		deep: true,
	},
);
</script>

<template>
  <el-config-provider :locale="config.i18n" :size="config.size" :button="config.buttonSpace">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
