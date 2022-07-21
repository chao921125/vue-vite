<template>
	<el-config-provider :locale="state.i18n">
		<RouterView />
	</el-config-provider>
</template>

<script lang="ts">
	import { defineComponent, getCurrentInstance, reactive, onBeforeMount, onMounted, onUnmounted, watch } from "vue";
	import { useRoute } from "vue-router";
	import Utils from  "@/plugins/utils";

	export default defineComponent({
		name: "App",
		setup() {
			const { proxy } = <any>getCurrentInstance();
			const state = reactive({
				i18n: null,
			});

			onBeforeMount(() => {
				Utils.setCssCdn();
				Utils.setJsCdn();
			});

			onMounted(() => {
				proxy.mittBus.on("getI18nConfig", (local: string) => {
					(state.i18n as string | null) = local;
				});
			});

			onUnmounted(() => {
				proxy.mittBus.off("getI18nConfig");
			});

			const route = useRoute();
			watch(
				() => route.path,
				() => {},
			);

			return {
				state,
			};
		},
	});
</script>

<style lang="scss"></style>
