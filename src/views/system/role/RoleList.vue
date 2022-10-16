<template>
	<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
		<el-form-item prop="name" label="角色">
			<el-input v-model="formSearch.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="" label="">
			<el-button type="primary">查询</el-button>
			<el-button @click="resetForm(formSearchRef)">重置</el-button>
			<el-button type="success" @click="openAddRole">新增</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="name" label="名称" width="120" />
		<el-table-column prop="number" label="编码" width="120" />
		<el-table-column prop="desc" label="描述" />
		<el-table-column prop="" label="操作" width="120">
			<template #default="scope">
				<el-button type="success" link @click="openEditRole(scope.row)">
					<el-icon><EditPen /></el-icon>
				</el-button>
				<el-popconfirm title="确认删除？">
					<template #reference>
						<el-button type="danger" link>
							<el-icon><Delete /></el-icon>
						</el-button>
					</template>
				</el-popconfirm>
				<el-button type="danger" link @click="openEditRole(scope.row)">
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
	<AddEdit :data="roleInfo" ref="dialogForm" @result="getRoleList"></AddEdit>
</template>

<script lang="ts" setup name="RoleList">
	import { ref, reactive, onMounted } from "vue";
	import type { FormInstance } from "element-plus";
	import AddEdit from "./components/AddEdit.vue";

	const formSearchRef = ref();
	const formSearch = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getRoleList();
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
			menus: "",
			desc: "超级管理员",
		},
		{
			id: 2,
			number: "19920008007",
			name: "赵一找",
			menus: "",
			desc: "管理员",
		},
	];
	const pageChangeSize = (val: number) => {
		console.log(`${val} items per page`);
		getRoleList();
	};
	const pageChangeCurrent = (val: number) => {
		console.log(`${val} items per page`);
		getRoleList();
	};
	const roleInfo = ref();
	const dialogForm = ref();
	const openAddRole = () => {
		roleInfo.value = null;
		dialogForm.value.openDialog();
	};
	const openEditRole = (item: any) => {
		roleInfo.value = item;
		dialogForm.value.openDialog();
	};

	const roleParams = reactive({
		pageSize: 1,
		pageTotal: 100,
	});
	const initData = () => {
		roleParams.pageSize = 1;
		roleParams.pageTotal = 100;
		getRoleList();
	};
	const getRoleList = () => {};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
