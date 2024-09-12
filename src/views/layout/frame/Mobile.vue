<script setup lang="ts">
	import { appStore, getStoreRefs } from "@/store";

	const { themeConfig } = <any>getStoreRefs(appStore.useThemeConfig);
	const isThemDark = ref(themeConfig.value.isDark);
</script>

<template>
	<van-config-provider :theme="isThemDark ? 'dark' : 'light'">
		<router-view></router-view>
	</van-config-provider>
</template>

<style scoped lang="scss"></style>
