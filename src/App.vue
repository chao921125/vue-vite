<template>
	<el-config-provider :locale="config.i18n" :size="config.size" :button="config.buttonSpace">
		<RouterView />
	</el-config-provider>
</template>

<script lang="ts" setup name="App">
	import Store, { getStoreRefs } from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	// import { getStoreRefs, appStore } from "@/store";
	import Utils from "@/plugins/utils";
	import Constants from "@/plugins/constants";
	import RouterConfig from "@/config/routerConfig";

	const { proxy } = <any>getCurrentInstance();
	// large / default /small
	const config: any = reactive({
		i18n: import.meta.env.VITE_LOCALE,
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
		proxy.mittBus.emit("getI18nConfig", Utils.Storages.getLocalStorage(Constants.storageKey.i18nLocale));
	};

	onBeforeMount(() => {
		Utils.setCssCdn();
		Utils.setJsCdn();
		if (!Utils.Storages.getLocalStorage(Constants.storageKey.themeConfig)) {
			Utils.Storages.setLocaleStorage(Constants.storageKey.themeConfig, themeConfig.value);
			(config.i18n as unknown as string | null) = themeConfig.value.globalI18n;
		}
		if (!Utils.Storages.getLocalStorage(Constants.storageKey.i18nLocale)) {
			Utils.Storages.setLocaleStorage(Constants.storageKey.i18nLocale, import.meta.env.VITE_LOCAL);
		}
	});

	onMounted(() => {
		if (Utils.isMobile()) {
			router.replace({ path: RouterConfig.routeMHome });
		} else {
			initData();
			if (Utils.Storages.getLocalStorage(Constants.storageKey.themeConfig)) {
				storeThemeConfig.setThemeConfig(Utils.Storages.getLocalStorage(Constants.storageKey.themeConfig));
			}
			proxy.mittBus.on("getI18nConfig", (locale: string) => {
				(config.i18n as unknown as string | null) = locale;
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
