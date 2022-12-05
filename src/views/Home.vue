<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="3">
				<el-badge :value="12" class="item">
					<el-button @click="testI18nMessage">库存预警</el-button>
				</el-badge>
			</el-col>
			<el-col :span="3">
				<el-badge :value="0" class="item">
					<el-button @click="testI18nMessage">待审核</el-button>
				</el-badge>
			</el-col>
		</el-row>
	</el-skeleton>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="24" class="re-m-tb-20">
				<el-date-picker
					v-model="form.date"
					type="daterange"
					unlink-panels
					range-separator="-"
					start-placeholder="Start date"
					end-placeholder="End date"
					:shortcuts="shortcuts"
					@change="searchCount"
				/>
			</el-col>
		</el-row>
	</el-skeleton>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row gutter="20">
			<el-col :span="8">
				<el-card>
					<div class="count-title">采购金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<div class="count-title">销售金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<div class="count-title">入库金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
			<el-col :span="8" class="re-m-t-20">
				<el-card>
					<div class="count-title">出库金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
			<el-col :span="8" class="re-m-t-20">
				<el-card>
					<div class="count-title">库存金额</div>
					<div class="re-flex-row-between count-item">金额：<span class="count-num">999999999</span></div>
					<div class="re-flex-row-between count-item">统计时间：<span class="count-date">2022-08-31 - 2022-11-31</span></div>
				</el-card>
			</el-col>
		</el-row>
	</el-skeleton>
</template>

<script lang="ts" setup name="Home">
	import { ref, reactive } from "vue";
	import { $t } from "@/plugins/i18n";

	const tI18n = ref();
	const form = reactive({
		date: ["2022-08-31", "2022-11-31"],
	});

	const shortcuts = [
		{
			text: $t("message.dateTime.week"),
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				return [start, end];
			},
		},
		{
			text: $t("message.dateTime.month"),
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				return [start, end];
			},
		},
		{
			text: $t("message.dateTime.monthThree"),
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				return [start, end];
			},
		},
	];

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);

	const testI18nMessage = () => {
		tI18n.value = $t("message.title.login");
	};

	const searchCount = () => {
		console.log(form.date);
	};
</script>

<style scoped lang="scss">
	@import "./home.scss";
</style>
