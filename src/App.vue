<script setup lang="ts">
import { getStoreRefs, appStore } from "@/store";
import { elI18n } from "@/plugins/i18n";
import { font } from "js-use-core";
import Utils from "@/utils";
import Storage from "@/utils/storage";
import Constants from "@/utils/constant/constants";
import ThemeConfig from "@/config/themeConfig";

const { proxy } = getCurrentInstance() as any;
// large / default /small
const config: any = reactive({
	i18n: elI18n[ThemeConfig.i18nDef],
	size: "default",
	buttonSpace: {
		autoInsertSpace: false,
	},
});

const { themeConfig } = <any>getStoreRefs(appStore.useThemeConfig);
const route = useRoute();
const initData = () => {
	proxy.$mitt.emit("getI18nConfig", Storage.getLocalStorage(Constants.storageKey.i18nLocale));
	if (Storage.getLocalStorage(Constants.storageKey.themeConfig)) {
		appStore.useThemeConfig.setThemeConfig(Storage.getLocalStorage(Constants.storageKey.themeConfig));
	}
	proxy.$mitt.on("getI18nConfig", (locale: string) => {
		config.i18n = elI18n[locale];
	});
	proxy.$mitt.on("getSizeConfig", (size: string) => {
		config.size = size;
	});
};

onBeforeMount(() => {
	Utils.setCssCdn();
	Utils.setJsCdn();
	if (!Storage.getLocalStorage(Constants.storageKey.themeConfig)) {
		Storage.setLocalStorage(Constants.storageKey.themeConfig, themeConfig.value);
		config.i18n = elI18n[themeConfig.value.globalI18n];
	}
	if (!Storage.getLocalStorage(Constants.storageKey.i18nLocale)) {
		Storage.setLocalStorage(Constants.storageKey.i18nLocale, import.meta.env.VITE_LOCAL);
	}
});

onMounted(() => {
	initData();
	const checker = new font();
	checker.check(["NotoSans-Regular", "NotoSans-Medium"]).then((res) => {
		if (res.success) {
			console.log("字体库加载成功");
		} else {
			console.log("字体库加载失败");
		}
	});
});
onUnmounted(() => {
	proxy.$mitt.off("getI18nConfig");
	proxy.$mitt.off("getSizeConfig");
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
