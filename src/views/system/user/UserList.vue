<template>
	<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
		<el-form-item label="姓名" prop="name">
			<el-input v-model="formSearch.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="" prop="">
			<el-button type="primary">查询</el-button>
			<el-button @click="resetForm(formSearchRef)">重置</el-button>
			<el-button type="success" @click="openAddUser">新增</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="realName" label="姓名" width="100" />
		<el-table-column prop="phone" label="手机号" width="120" />
		<el-table-column prop="mail" label="邮箱" />
		<el-table-column prop="departmentName" label="部门" width="120" />
		<el-table-column prop="jobName" label="岗位" width="120" />
		<el-table-column prop="roleName" label="角色" width="120" />
		<el-table-column prop="status" label="状态" width="60">
			<template #default="scope">
				<el-tag :type="scope.row.status ? 'success' : 'danger'">{{ StatusUse[scope.row.status] }}</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="desc" label="描述" />
		<el-table-column prop="" label="操作" width="120">
			<template #default="scope">
				<el-button type="success" link @click="openEditUser(scope.row)">
					<el-icon><EditPen /></el-icon>
				</el-button>
				<el-button type="danger" link @click="openEditUser(scope.row)">
					<el-icon><Delete /></el-icon>
				</el-button>
				<el-button type="danger" link @click="openEditUser(scope.row)">
					<el-icon><Switch /></el-icon>
				</el-button>
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
	<AddEdit :data="userInfo" ref="dialogForm" @result="dialogResult"></AddEdit>
</template>

<script lang="ts" setup name="UserList">
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
		getUserList();
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
			nickName: "小明",
			avatar: "",
			mail: "admin@ad.com",
			phone: "19920008007",
			realName: "小明",
			userName: "sp_admin",
			password: "123123",
			department: "1",
			departmentName: "事业部",
			job: "1",
			jobName: "管理岗",
			role: "2",
			roleName: "管理",
			flag: "super",
			sort: 1,
			status: 1,
			desc: "超级管理员",
		},
		{
			id: 2,
			nickName: "赵一找",
			avatar: "",
			mail: "admin@ad.com",
			phone: "19920008007",
			realName: "赵一找",
			userName: "sp_admin",
			password: "123123",
			department: "1",
			departmentName: "事业部",
			job: "1",
			jobName: "管理岗",
			role: "2",
			roleName: "管理",
			flag: "super",
			sort: 2,
			status: 0,
			desc: "管理员",
		},
	];
	const pageChangeSize = (val: number) => {
		console.log(`${val} items per page`);
		getUserList();
	};
	const pageChangeCurrent = (val: number) => {
		console.log(`${val} items per page`);
		getUserList();
	};
	const userInfo = ref();
	const dialogForm = ref();
	const openAddUser = () => {
		userInfo.value = null;
		dialogForm.value.openDialog();
	};
	const openEditUser = (item: any) => {
		userInfo.value = item;
		dialogForm.value.openDialog();
	};

	const userParams = reactive({
		pageSize: 1,
		pageTotal: 100,
	});
	const initData = () => {
		userParams.pageSize = 1;
		userParams.pageTotal = 100;
		getUserList();
	};
	const dialogResult = (result: any) => {
		if (result) getUserList();
	};
	const getUserList = () => {};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
