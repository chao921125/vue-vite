<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="12">
				<el-badge :value="12" class="item">
					<el-button>库存预警</el-button>
				</el-badge>
			</el-col>
		</el-row>
	</el-skeleton>
	{{ tI18n }}
</template>

<script lang="ts" setup name="Home">
	import { ref, getCurrentInstance } from "vue";
	import { useI18n } from "vue-i18n";

	const { proxy } = <any>getCurrentInstance();
	console.log(proxy.$i18n.locale);
	const { t } = useI18n();
	let tI18n = t("i18n.title.login");

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
</script>

<style scoped lang="scss"></style>
