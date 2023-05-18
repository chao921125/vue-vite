<template>
	<el-config-provider :locale="config.i18n" :size="config.size" :button="config.buttonSpace">
		<RouterView />
	</el-config-provider>
</template>

<script lang="ts" setup name="App">
	import Store, { getStoreRefs } from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import { elMessages } from "@/plugins/i18n";
	// import { getStoreRefs, appStore } from "@/store";
	import Utils from "@/plugins/utils";
	import Storage from "@/plugins/utils/storage";
	import Constants from "@/plugins/constants";
	import RouterConfig from "@/config/routerConfig";
	import ThemeConfig from "@/config/themeConfig";

	const { proxy } = <any>getCurrentInstance();
	// large / default /small
	const config: any = reactive({
		i18n: elMessages[ThemeConfig.i18nDef],
		size: "default",
		buttonSpace: {
			autoInsertSpace: false,
		},
	});

	const storeThemeConfig = useThemeConfig(Store);
	const { themeConfig } = getStoreRefs(storeThemeConfig);
	// const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
	const route = useRoute();
	const router = useRouter();
	const initData = () => {
		proxy.mittBus.emit("getI18nConfig", Storage.getLocalStorage(Constants.storageKey.i18nLocale));
	};

	onBeforeMount(() => {
		Utils.setCssCdn();
		Utils.setJsCdn();
		if (!Storage.getLocalStorage(Constants.storageKey.themeConfig)) {
			Storage.setLocalStorage(Constants.storageKey.themeConfig, themeConfig.value);
			config.i18n = elMessages[themeConfig.value.globalI18n];
		}
		if (!Storage.getLocalStorage(Constants.storageKey.i18nLocale)) {
			Storage.setLocalStorage(Constants.storageKey.i18nLocale, import.meta.env.VITE_LOCAL);
		}
	});

	onMounted(() => {
		if (Utils.isMobile()) {
			router.replace({ path: RouterConfig.routeMHome });
		} else {
			initData();
			if (Storage.getLocalStorage(Constants.storageKey.themeConfig)) {
				storeThemeConfig.setThemeConfig(Storage.getLocalStorage(Constants.storageKey.themeConfig));
			}
			proxy.mittBus.on("getI18nConfig", (locale: string) => {
				config.i18n = elMessages[locale];
			});
			proxy.mittBus.on("getSizeConfig", (size: string) => {
				config.size = size;
			});
		}
	});
	onUnmounted(() => {
		proxy.mittBus.off("getI18nConfig");
		proxy.mittBus.off("getSizeConfig");
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

<style scoped lang="scss"></style>
