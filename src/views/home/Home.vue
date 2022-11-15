<template>
	<el-row>
		<el-col :span="24">
			<el-date-picker></el-date-picker>
			<el-date-picker></el-date-picker>
		</el-col>
	</el-row>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="12">
				<el-badge :value="12" class="item">
					<el-button @click="testI18nMessage">库存预警</el-button>
				</el-badge>
				<el-button @click="testI18nMessage">待审核</el-button>
			</el-col>
		</el-row>
	</el-skeleton>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="12">
				<el-card>
					<div>采购金额</div>
					<div>金额：999999999</div>
					<div>统计时间：2022-18-31 至 2022-11-31</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card>
					<div>销售金额</div>
					<div>金额：999999999</div>
					<div>统计时间：2022-18-31 至 2022-11-31</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card>
					<div>入库金额</div>
					<div>金额：999999999</div>
					<div>统计时间：2022-18-31 至 2022-11-31</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card>
					<div>出库金额</div>
					<div>金额：999999999</div>
					<div>统计时间：2022-18-31 至 2022-11-31</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card>
					<div>库存金额</div>
					<div>金额：999999999</div>
					<div>统计时间：2022-18-31 至 2022-11-31</div>
				</el-card>
			</el-col>
		</el-row>
	</el-skeleton>
	<el-button v-copy="'copyData'">click me copy</el-button>
	<el-button v-auth>test auth</el-button>
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
		tI18n.value = $t("message.title.login");
	};
</script>

<style scoped lang="scss"></style>
