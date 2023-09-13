<template>
	<el-row>
		<el-col :span="24">
			<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
				<el-form-item prop="name" label="姓名">
					<el-input v-model="formSearch.name" placeholder=""></el-input>
				</el-form-item>
				<el-form-item prop="" label="">
					<el-button type="primary">查询</el-button>
					<el-button @click="resetForm(formSearchRef)">重置</el-button>
					<el-button type="success" @click="openAddUser">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="4">
			<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
		</el-col>
		<el-col :span="20">
			<el-table :data="tableData" v-loading="isLoadData" style="width: 100%">
				<el-table-column prop="realName" label="姓名" width="100" />
				<el-table-column prop="phone" label="手机号" width="120" />
				<el-table-column prop="mail" label="邮箱" />
				<el-table-column prop="departmentName" label="部门" width="120" />
				<el-table-column prop="jobName" label="岗位" width="120" />
				<el-table-column prop="roleName" label="角色" width="120" />
				<el-table-column prop="status" label="状态" width="80">
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
			<RePagination :current="params.pageCurrent" :total="params.pageTotal" @change-size="pageChangeSize" @change-current="pageChangeCurrent"></RePagination>
		</el-col>
	</el-row>
	<AddEdit :data="userInfo" ref="dialogForm" @result="getUserList"></AddEdit>
</template>

<script lang="ts" setup name="UserList">
	import type { FormInstance } from "element-plus";
	import { StatusUse } from "@/plugins/constants";
	import AddEdit from "./components/AddEdit.vue";
	import { ITree } from "@/interface/common";

	const formSearchRef = ref<FormInstance>();
	const formSearch: any = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getUserList();
	};

	const params: any = reactive({
		pageCurrent: 1,
		pageSize: 10,
		pageTotal: 0,
	});
	const isLoadData = ref<boolean>(false);
	const tableData = ref<any[]>([]);
	const pageChangeSize = (val: number) => {
		params.pageSize = val;
		getUserList();
	};
	const pageChangeCurrent = (val: number) => {
		params.pageCurrent = val;
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

	const initData = () => {
		isLoadData.value = true;
		getUserList();
	};
	const getUserList = () => {
		isLoadData.value = false;
		params.pageCurrent = 1;
		params.pageSize = 10;
		params.pageTotal = 0;
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
	};

	const data: ITree[] = [
		{
			id: 0,
			label: "菜菜集团",
			children: [
				{
					id: 1,
					label: "董事会",
					children: [
						{
							id: 11,
							label: "董事长",
						},
						{
							id: 12,
							label: "股东",
						},
					],
				},
				{
					id: 2,
					label: "业务部",
					children: [
						{
							id: 21,
							label: "业务总监",
						},
						{
							id: 22,
							label: "业务组长",
						},
						{
							id: 23,
							label: "业务员",
						},
					],
				},
			],
		},
	];
	const handleNodeClick = (data: ITree) => {
		console.log(data);
	};

	const defaultProps = {
		children: "children",
		label: "label",
	};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
