<template>
	<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
		<el-form-item prop="name" label="部门">
			<el-input v-model="formSearch.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="" label="">
			<el-button type="primary">查询</el-button>
			<el-button @click="resetForm(formSearchRef)">重置</el-button>
			<el-button type="success" @click="openAddDepartment">新增</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" v-loading="isLoadData" row-key="id" default-expand-all style="width: 100%">
		<el-table-column prop="name" label="名称" />
		<el-table-column prop="number" label="编码" width="120" />
		<el-table-column prop="userName" label="负责人" />
		<el-table-column prop="phone" label="联系方式" width="120" />
		<el-table-column prop="status" label="状态" width="80">
			<template #default="scope">
				<el-tag :type="scope.row.status ? 'success' : 'danger'">{{ StatusUse[scope.row.status] }}</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="desc" label="描述" />
		<el-table-column prop="" label="操作" width="120">
			<template #default="scope">
				<el-button type="success" link @click="openEditDepartment(scope.row)">
					<el-icon><EditPen /></el-icon>
				</el-button>
				<el-popconfirm title="确认删除？">
					<template #reference>
						<el-button type="danger" link v-show="!scope.row.root">
							<el-icon><Delete /></el-icon>
						</el-button>
					</template>
				</el-popconfirm>
			</template>
		</el-table-column>
	</el-table>
	<AddEdit :data="departmentInfo" ref="dialogForm" @result="getDepartmentList"></AddEdit>
</template>

<script lang="ts" setup name="DepartmentList">
	import type { FormInstance } from "element-plus";
	import { StatusUse } from "@/plugins/constants";
	import AddEdit from "./components/AddEdit.vue";

	const formSearchRef = ref<FormInstance>();
	const formSearch: any = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getDepartmentList();
	};

	const params: any = reactive({
		pageCurrent: 1,
		pageSize: 10,
		pageTotal: 0,
	});
	const isLoadData = ref<boolean>(false);
	const tableData = ref<any[]>([]);

	const departmentInfo = ref();
	const dialogForm = ref();
	const openAddDepartment = () => {
		departmentInfo.value = null;
		dialogForm.value.openDialog();
	};
	const openEditDepartment = (item: any) => {
		departmentInfo.value = item;
		dialogForm.value.openDialog();
	};

	const initData = () => {
		isLoadData.value = true;
		getDepartmentList();
	};
	const getDepartmentList = () => {
		isLoadData.value = false;
		params.pageCurrent = 1;
		params.pageSize = 10;
		params.pageTotal = 0;
		tableData.value = [
			{
				id: 1,
				root: true,
				number: "0",
				name: "菜菜集团",
				status: 1,
				desc: "超级管理员",
				children: [
					{
						id: 11,
						number: "19920008007",
						name: "菜菜国际",
						status: 0,
						desc: "管理员",
						children: [
							{
								id: 112,
								number: "19920008007",
								name: "财务部门",
								status: 0,
								desc: "管理员",
							},
							{
								id: 113,
								number: "19920008007",
								name: "市场部门",
								status: 0,
								desc: "管理员",
							},
						],
					},
					{
						id: 12,
						number: "19920008007",
						name: "菜菜国际2",
						status: 0,
						desc: "管理员",
						children: [
							{
								id: 121,
								number: "19920008007",
								name: "董事会",
								status: 0,
								desc: "管理员",
							},
							{
								id: 122,
								number: "19920008007",
								name: "研发部门",
								status: 0,
								desc: "管理员",
							},
						],
					},
				],
			},
		];
	};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
