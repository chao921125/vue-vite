<template>
	<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
		<el-form-item prop="name" label="登录时间">
			<el-date-picker v-model="formSearch.name" type="date" placeholder="" />
		</el-form-item>
		<el-form-item prop="" label="">
			<el-button type="primary">查询</el-button>
			<el-button @click="resetForm(formSearchRef)">重置</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="userName" label="登录账号" />
		<el-table-column prop="date" label="登录时间" />
		<el-table-column prop="ip" label="登录IP" />
		<el-table-column prop="desc" label="登录设备" />
	</el-table>
	<RePagination :current="params.pageCurrent" :total="params.pageTotal" @change-size="pageChangeSize" @change-current="pageChangeCurrent"></RePagination>
</template>

<script lang="ts" setup name="LoginList">
	import { FormInstance } from "element-plus";

	const formSearchRef = ref<FormInstance>();
	const formSearch: any = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getProductList();
	};

	const tableData = ref<any[]>([]);
	const params: any = reactive({
		pageCurrent: 1,
		pageSize: 10,
		pageTotal: 100,
	});
	const pageChangeSize = (val: number) => {
		params.pageSize = val;
		getProductList();
	};
	const pageChangeCurrent = (val: number) => {
		params.pageCurrent = val;
		getProductList();
	};
	const initData = () => {
		params.pageSize = 1;
		params.pageTotal = 100;
		getProductList();
	};
	const getProductList = () => {
		tableData.value = [
			{
				id: 1,
				ip: "12.22.11.2",
				date: "2022-11-20 22:22:11",
				userName: "大光光",
				status: "待审核",
				desc: "管道一批",
			},
			{
				id: 2,
				ip: "222.111.2.1",
				date: "2022-11-20 22:22:11",
				userName: "大光光",
				status: "审核中",
				desc: "配件多多多",
			},
			{
				id: 3,
				ip: "44.22.33.1",
				date: "2022-11-20 22:22:11",
				userName: "大光光",
				status: "已完成",
				desc: "管道一批",
			},
		];
	};

	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
