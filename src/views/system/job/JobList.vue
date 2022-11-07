<template>
	<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
		<el-form-item prop="name" label="岗位">
			<el-input v-model="formSearch.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="" label="">
			<el-button type="primary">查询</el-button>
			<el-button @click="resetForm(formSearchRef)">重置</el-button>
			<el-button type="success" @click="openAddJob">新增</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="name" label="名称" width="120" />
		<el-table-column prop="number" label="编码" width="120" />
		<el-table-column prop="userName" label="联系人" width="120" />
		<el-table-column prop="phone" label="联系电话" width="120" />
		<el-table-column prop="status" label="状态" width="60">
			<template #default="scope">
				<el-tag :type="scope.row.status ? 'success' : 'danger'">{{ StatusUse[scope.row.status] }}</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="desc" label="描述" />
		<el-table-column prop="" label="操作" width="120">
			<template #default="scope">
				<el-button type="success" link @click="openEditJob(scope.row)">
					<el-icon><EditPen /></el-icon>
				</el-button>
				<el-popconfirm title="确认删除？">
					<template #reference>
						<el-button type="danger" link>
							<el-icon><Delete /></el-icon>
						</el-button>
					</template>
				</el-popconfirm>
			</template>
		</el-table-column>
	</el-table>
	<el-row justify="end">
		<el-col :span="24" class="re-flex-row-end page-box">
			<el-pagination
				v-model:currentPage="pageOption.pageCurrent"
				v-model:page-size="pageOption.pageSize"
				:page-sizes="pageOption.pageSizes"
				:small="pageOption.small"
				:disabled="pageOption.disabled"
				:background="pageOption.background"
				:layout="pageOption.layout"
				:total="pageOption.pageTotal"
				@size-change="pageChangeSize"
				@current-change="pageChangeCurrent"
			/>
		</el-col>
	</el-row>
	<AddEdit :data="jobInfo" ref="dialogForm" @result="getJobList"></AddEdit>
</template>

<script lang="ts" setup name="JobList">
	import { ref, reactive, onMounted } from "vue";
	import type { FormInstance } from "element-plus";
	import { StatusUse } from "@/plugins/enums";
	import AddEdit from "./components/AddEdit.vue";

	const formSearchRef = ref();
	const formSearch = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getJobList();
	};
	const pageOption = reactive({
		pageCurrent: 1,
		pageSize: 50,
		pageTotal: 100,
		pageSizes: [10, 50, 100, 200],
		small: false,
		disabled: false,
		background: false,
		layout: "total, sizes, prev, pager, next, jumper",
	});
	const tableData = ref<any[]>([]);
	tableData.value = [
		{
			id: 1,
			number: "19920008007",
			name: "小明",
			status: 1,
			userName: "王五",
			phone: "13312341234",
			desc: "超级管理员",
		},
		{
			id: 2,
			number: "19920008007",
			name: "赵一找",
			status: 0,
			userName: "赵六",
			phone: "19900001111",
			desc: "管理员",
		},
	];
	const pageChangeSize = (val: number) => {
		console.log(`${val} items per page`);
		getJobList();
	};
	const pageChangeCurrent = (val: number) => {
		console.log(`${val} items per page`);
		getJobList();
	};
	const jobInfo = ref();
	const dialogForm = ref();
	const openAddJob = () => {
		jobInfo.value = null;
		dialogForm.value.openDialog();
	};
	const openEditJob = (item: any) => {
		jobInfo.value = item;
		dialogForm.value.openDialog();
	};

	const jobParams = reactive({
		pageSize: 1,
		pageTotal: 100,
	});
	const initData = () => {
		jobParams.pageSize = 1;
		jobParams.pageTotal = 100;
		getJobList();
	};
	const getJobList = () => {};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
