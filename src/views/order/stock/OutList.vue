<template>
	<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
		<el-form-item prop="name" label="出库时间">
			<el-date-picker v-model="formSearch.name" type="date" placeholder="" />
		</el-form-item>
		<el-form-item prop="" label="">
			<el-button type="primary">查询</el-button>
			<el-button @click="resetForm(formSearchRef)">重置</el-button>
			<el-button type="success" @click="openAddProduct">新增</el-button>
			<el-button @click="resetForm(formSearchRef)">下载出库模板</el-button>
			<el-button @click="resetForm(formSearchRef)">导入出库数据</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="number" label="单号" />
		<el-table-column prop="date" label="出库时间" />
		<el-table-column prop="userName" label="操作人" />
		<el-table-column prop="status" label="状态" />
		<el-table-column prop="desc" label="备注" />
		<el-table-column prop="" label="操作" width="120">
			<template #default="scope">
				<el-button type="success" link @click="scope.row.id">
					<el-icon><EditPen /></el-icon>
				</el-button>
				<el-popconfirm title="确认删除？">
					<template #reference>
						<el-button type="danger" link>
							<el-icon><Delete /></el-icon>
						</el-button>
					</template>
				</el-popconfirm>
				<el-button type="success" link @click="scope.row.id">
					<el-icon><More /></el-icon>
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	<RePagination :current="params.pageCurrent" :total="params.pageTotal" @change-size="pageChangeSize" @change-current="pageChangeCurrent"></RePagination>
</template>

<script lang="ts" setup name="OutList">
	import { onMounted, reactive, ref } from "vue";
	import { FormInstance } from "element-plus";

	const formSearchRef = ref();
	const formSearch = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getUserList();
	};

	const productInfo = ref();
	const dialogForm = ref();
	const openAddProduct = () => {
		productInfo.value = null;
		dialogForm.value.openDialog();
	};

	const tableData = ref<any[]>([]);
	const params = reactive({
		pageCurrent: 1,
		pageSize: 10,
		pageTotal: 100,
	});
	const pageChangeSize = (val: number) => {
		params.pageSize = val;
		getUserList();
	};
	const pageChangeCurrent = (val: number) => {
		params.pageCurrent = val;
		getUserList();
	};
	const initData = () => {
		params.pageSize = 1;
		params.pageTotal = 100;
		getUserList();
	};
	const getUserList = () => {
		tableData.value = [
			{
				id: 1,
				number: "202211120113188",
				date: "2022-11-20 22:22:11",
				userName: "大光光",
				status: "已完成",
				desc: "管道一批",
			},
			{
				id: 2,
				number: "202211120113188",
				date: "2022-11-20 22:22:11",
				userName: "大光光",
				status: "待审核",
				desc: "管道一批",
			},
			{
				id: 2,
				number: "202211120113188",
				date: "2022-11-20 22:22:11",
				userName: "大光光",
				status: "审核中",
				desc: "管道一批",
			},
		];
	};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
