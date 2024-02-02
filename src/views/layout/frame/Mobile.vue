<template>
	<van-config-provider :theme="isThemDark ? 'dark' : 'light'">
		<router-view></router-view>
	</van-config-provider>
</template>

<script lang="ts" setup name="">
	import { appStore, getStoreRefs } from "@/store";

	const { themeConfig } = getStoreRefs(appStore.useThemeConfig);
	const isThemDark = ref(themeConfig.value.isDark);
</script>

<style scoped lang="scss"></style>
