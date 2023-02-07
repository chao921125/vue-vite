<template>
	<el-button v-copy="'copyData'">test copy</el-button>
	<el-button v-auth>test auth</el-button>
	<el-button @click="testI18nMessage">test i18n</el-button>
	{{ tI18n }}
</template>

<script lang="ts" setup name="All">
	import { $t } from "@/plugins/i18n";

	const tI18n = ref();

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);

	const testI18nMessage = () => {
		tI18n.value = $t("message.title.login");
	};
</script>

<style scoped lang="scss"></style>
