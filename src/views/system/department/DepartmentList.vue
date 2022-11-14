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
	<el-table :data="tableData" v-loading="isLoadData" style="width: 100%">
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
				<el-button type="success" link @click="openEditDepartment(scope.row)">
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
	<ElPage :current="params.pageCurrent" :total="params.pageTotal" @change-size="pageChangeSize" @change-current="pageChangeCurrent"></ElPage>
	<AddEdit :data="departmentInfo" ref="dialogForm" @result="getDepartmentList"></AddEdit>
</template>

<script lang="ts" setup name="DepartmentList">
	import { ref, reactive, onMounted } from "vue";
	import type { FormInstance } from "element-plus";
	import { StatusUse } from "@/plugins/enums";
	import ElPage from "@/components/pagenation/ElPage.vue";
	import AddEdit from "./components/AddEdit.vue";

	const formSearchRef = ref();
	const formSearch = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getDepartmentList();
	};

	const params = reactive({
		pageCurrent: 1,
		pageSize: 10,
		pageTotal: 0,
	});
	const isLoadData = ref<boolean>(false);
	const tableData = ref<any[]>([]);
	const pageChangeSize = (val: number) => {
		params.pageSize = val;
		getDepartmentList();
	};
	const pageChangeCurrent = (val: number) => {
		params.pageCurrent = val;
		getDepartmentList();
	};

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
	};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
