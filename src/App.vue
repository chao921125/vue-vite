<template>
	<el-config-provider :locale="state.i18n">
		<RouterView />
	</el-config-provider>
</template>

<script lang="ts">
	import { defineComponent, getCurrentInstance, reactive, onBeforeMount, onMounted, onUnmounted, watch, nextTick } from "vue";
	import { useRoute } from "vue-router";
	import pinia from "@/store";
	import { useThemeConfig } from "@/store/modules/theme";
	import Utils from "@/plugins/utils";

	export default defineComponent({
		name: "App",
		setup() {
			const { proxy } = <any>getCurrentInstance();
			const state = reactive({ i18n: null });

			const storesThemeConfig = useThemeConfig(pinia);
			onBeforeMount(() => {
				Utils.setCssCdn();
				Utils.setJsCdn();
			});

			onMounted(() => {
				nextTick(() => {
					if (Utils.Storages.getLocalStorage(Utils.Constants.storageKeys.themeConfig)) {
						storesThemeConfig.setThemeConfig(Utils.Storages.getLocalStorage(Utils.Constants.storageKeys.themeConfig));
					}
					proxy.mittBus.on("getI18nConfig", (local: string) => {
						(state.i18n as string | null) = local;
					});
				});
			});

			onUnmounted(() => {
				proxy.mittBus.off("getI18nConfig");
			});

			const route = useRoute();
			watch(
				() => route.path,
				() => {
					Utils.title();
				},
				{
					deep: true,
				},
			);

			return {
				state,
			};
		},
	});
</script>

<style lang="scss"></style>
