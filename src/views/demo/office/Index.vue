<template>
	<div>exceljs: <el-button @click="toPageExcel">To ExcelJS</el-button></div>
	<div>xlsx: <el-button @click="toPageXlsx">To Xlsx</el-button> 请注意此库有安全漏洞</div>
</template>

<script lang="ts" setup name="">
	import RouterConfig from "@/config/routerConfig";

	// const { proxy } = getCurrentInstance() as any;
	const router = useRouter();
	const toPageExcel = () => {
		router.push({ path: RouterConfig.routeEnum.file.excelJS });
	};

	const toPageXlsx = () => {
		// proxy.elMessage.error("由于安全性原因，请下载源代码后进行测试");
		router.push({ path: RouterConfig.routeEnum.file.xlsx });
		return false;
	};
</script>

<style scoped lang="scss">
	@use "./Xlsx.scss";
</style>
