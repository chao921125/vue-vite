<template>
	<el-row justify="center">
		<el-col :span="12" class="re-flex-row-center wifi-title">
			<icon-svg name="wifi" class="svg-icon-cus"></icon-svg>
			<h1 class="re-ml-10">WiFi-CARD</h1>
		</el-col>
	</el-row>
	<el-row justify="center">
		<el-col :span="12" class="re-flex-row-center re-mt-20">
			<el-card id="printCard" class="re-w-fill">
				<WifiCard></WifiCard>
			</el-card>
		</el-col>
	</el-row>
	<el-row justify="center">
		<el-col :span="12" class="re-mt-20">
			<WifiSettings></WifiSettings>
		</el-col>
	</el-row>
	<el-row justify="center">
		<el-col :span="12" class="re-flex-row-center re-mt-20">
			<el-button type="primary" v-print="'#printCard'">打印卡片</el-button>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="WifiCard">
	import WifiCard from "./components/WifiCard.vue";
	import WifiSettings from "./components/WifiSettings.vue";
	const printCard = () => {};
</script>

<style scoped lang="scss">
	@use "./index.scss";
</style>
