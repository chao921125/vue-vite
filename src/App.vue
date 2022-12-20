<template>
	<el-config-provider :locale="config.i18n" :size="config.size" :button="config.buttonSpace">
		<RouterView />
	</el-config-provider>
</template>

<script lang="ts" setup name="App">
	import { getCurrentInstance, reactive, onBeforeMount, onMounted, onUnmounted, watch } from "vue";
	import { useRoute } from "vue-router";
	import { storeToRefs } from "pinia";
	import Pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import Utils from "@/plugins/utils";
	import Constants from "@/plugins/constants";

	const { proxy } = <any>getCurrentInstance();
	// large / default /small
	const config = reactive({
		i18n: import.meta.env.VITE_LOCAL,
		size: "default",
		buttonSpace: {
			autoInsertSpace: false,
		},
	});

	const storeThemeConfig = useThemeConfig(Pinia);
	const { themeConfig } = storeToRefs(storeThemeConfig);
	const initData = () => {
		proxy.mittBus.emit("getI18nConfig", Utils.Storages.getLocalStorage(Constants.storageKey.i18nLocal) || import.meta.env.VITE_LOCAL);
	};

	onBeforeMount(() => {
		Utils.setCssCdn();
		Utils.setJsCdn();
		if (!Utils.Storages.getLocalStorage(Constants.storageKey.themeConfig)) {
			Utils.Storages.setLocalStorage(Constants.storageKey.themeConfig, themeConfig.value);
			(config.i18n as unknown as string | null) = themeConfig.value.globalI18n;
		}
	});

	onMounted(() => {
		initData();
		if (Utils.Storages.getLocalStorage(Constants.storageKey.themeConfig)) {
			storeThemeConfig.setThemeConfig(Utils.Storages.getLocalStorage(Constants.storageKey.themeConfig));
		}
		proxy.mittBus.on("getI18nConfig", (local: string) => {
			(config.i18n as unknown as string | null) = local;
		});
		proxy.mittBus.on("getSizeConfig", (size: string) => {
			config.size = size;
		});
	});
	onUnmounted(() => {
		proxy.mittBus.off("getI18nConfig");
		proxy.mittBus.off("getSizeConfig");
	});
	const route = useRoute();
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
