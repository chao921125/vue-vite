<template>
	<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
		<el-form-item prop="name" label="岗位">
			<el-input v-model="formSearch.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="" label="">
			<el-button type="primary">查询</el-button>
			<el-button @click="resetForm(formSearchRef)">重置</el-button>
			<el-button type="success" @click="openAddPost">新增</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" v-loading="isLoadData" style="width: 100%">
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
	<RePagination :current="params.pageCurrent" :total="params.pageTotal" @change-size="pageChangeSize" @change-current="pageChangeCurrent"></RePagination>
	<AddEdit :data="postInfo" ref="dialogForm" @result="getPostList"></AddEdit>
</template>

<script lang="ts" setup name="PostList">
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
		getPostList();
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
		getPostList();
	};
	const pageChangeCurrent = (val: number) => {
		params.pageCurrent = val;
		getPostList();
	};

	const postInfo = ref();
	const dialogForm = ref();
	const openAddPost = () => {
		postInfo.value = null;
		dialogForm.value.openDialog();
	};
	const openEditJob = (item: any) => {
		postInfo.value = item;
		dialogForm.value.openDialog();
	};

	const initData = () => {
		isLoadData.value = true;
		getPostList();
	};
	const getPostList = () => {
		isLoadData.value = false;
		params.pageCurrent = 1;
		params.pageSize = 10;
		params.pageTotal = 0;
		tableData.value = [
			{
				id: 1,
				number: "19920008007",
				name: "董事长",
				status: 1,
				userName: "王五",
				phone: "19920008007",
				desc: "超级管理员",
			},
			{
				id: 2,
				number: "19920008007",
				name: "项目经理",
				status: 0,
				userName: "赵六",
				phone: "19920008007",
				desc: "管理员",
			},
			{
				id: 3,
				number: "19920008007",
				name: "人力资源",
				status: 0,
				userName: "赵六",
				phone: "19920008007",
				desc: "管理员",
			},
			{
				id: 4,
				number: "19920008007",
				name: "普通员工",
				status: 0,
				userName: "赵六",
				phone: "19920008007",
				desc: "管理员",
			},
		];
	};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
