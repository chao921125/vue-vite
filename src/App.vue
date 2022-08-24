<template>
	<el-config-provider :locale="config.i18n" :size="config.size" :button="config.buttonSpace">
		<RouterView />
	</el-config-provider>
</template>

<script lang="ts">
	import { defineComponent, getCurrentInstance, reactive, onBeforeMount, onMounted, onUnmounted, watch, nextTick } from "vue";
	import { useRoute } from "vue-router";
	import Pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import Utils from "@/plugins/utils";

	export default defineComponent({
		name: "App",
		setup() {
			const { proxy } = <any>getCurrentInstance();
			// large / default /small
			const config = reactive({
				i18n: process.env.VITE_LOCAL,
				size: "default",
				buttonSpace: {
					autoInsertSpace: true,
				}
			});

			const storesThemeConfig = useThemeConfig(Pinia);
			onBeforeMount(() => {
				Utils.setCssCdn();
				Utils.setJsCdn();
			});

			onMounted(() => {
				nextTick(() => {
					initData();
					if (Utils.Storages.getLocalStorage(Utils.Constants.storageKey.themeConfig)) {
						storesThemeConfig.setThemeConfig(Utils.Storages.getLocalStorage(Utils.Constants.storageKey.themeConfig));
					}
					proxy.mittBus.on("getI18nConfig", (local: string) => {
						(config.i18n as unknown as string | null) = local;
					});
					proxy.mittBus.on("getSizeConfig", (size: string) => {
						config.size = size;
					})
				});
			});

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

			const initData = () => {
				config.i18n = Utils.Storages.getLocalStorage(Utils.Constants.storageKey.i18nLocal);
			}
			return {
				config,
			};
		},
	});
</script>

<style lang="scss"></style>
