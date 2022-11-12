<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="12">
				<el-badge :value="12" class="item">
					<el-button v-auth @click="testI18nMessage">库存预警</el-button>
				</el-badge>
			</el-col>
		</el-row>
	</el-skeleton>
	<el-button v-copy="'wo de'">click me</el-button>
	{{ tI18n }}
</template>

<script lang="ts" setup name="Home">
	import { ref } from "vue";
	import { $t } from "@/plugins/language";

	let tI18n = ref();

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);

	const testI18nMessage = () => {
		tI18n.value = $t("i18n.title.login");
	};
</script>

<style scoped lang="scss"></style>
