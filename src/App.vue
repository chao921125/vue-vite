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
	onBeforeMount(() => {
		Utils.setCssCdn();
		Utils.setJsCdn();
		if (!Utils.Storages.getLocalStorage(Utils.Constants.storageKey.themeConfig)) {
			Utils.Storages.setLocalStorage(Utils.Constants.storageKey.themeConfig, themeConfig.value);
			(config.i18n as unknown as string | null) = themeConfig.value.globalI18n;
		}
	});

	onMounted(() => {
		initData();
		if (Utils.Storages.getLocalStorage(Utils.Constants.storageKey.themeConfig)) {
			storeThemeConfig.setThemeConfig(Utils.Storages.getLocalStorage(Utils.Constants.storageKey.themeConfig));
		}
		proxy.mittBus.on("getI18nConfig", (local: string) => {
			(config.i18n as unknown as string | null) = local;
		});
		proxy.mittBus.on("getSizeConfig", (size: string) => {
			config.size = size;
		});
	});
	const initData = () => {
		proxy.mittBus.emit("getI18nConfig", Utils.Storages.getLocalStorage(Utils.Constants.storageKey.i18nLocal) || import.meta.env.VITE_LOCAL);
	};

	onUnmounted(() => {
		proxy.mittBus.off("getI18nConfig");
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
