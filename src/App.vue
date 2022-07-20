<template>
	<el-config-provider>
		<RouterView />
	</el-config-provider>
</template>

<script lang="ts">
	import { defineComponent, getCurrentInstance, reactive, onBeforeMount, onMounted, onUnmounted, watch } from "vue";
	import { useRoute } from "vue-router";

	export default defineComponent({
		name: "App",
		setup() {
			const { proxy } = <any>getCurrentInstance();
			const state = reactive({
				i18nLocale: null,
			});

			onBeforeMount(() => {});

			onMounted(() => {});

			onUnmounted(() => {});

			const route = useRoute();
			watch(() => route.path, () => {});
		}
	});
</script>

<style lang="scss"></style>
