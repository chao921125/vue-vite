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
	<el-table :data="tableData" v-loading="isLoadData" style="width: 100%">
		<el-table-column prop="name" label="名称" width="120" />
		<el-table-column prop="number" label="编码" width="120" />
		<el-table-column prop="status" label="状态" width="100">
			<template #default="scope">
				<el-tag class="ml-2" :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? "开始" : "关闭" }}</el-tag>
			</template>
		</el-table-column>
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
	<RePagination :current="params.pageCurrent" :total="params.pageTotal" @change-size="pageChangeSize" @change-current="pageChangeCurrent"></RePagination>
	<AddEdit :data="roleInfo" ref="dialogForm" @result="getRoleList"></AddEdit>
</template>

<script lang="ts" setup name="RoleList">
	import type { FormInstance } from "element-plus";
	import AddEdit from "./components/AddEdit.vue";

	const formSearchRef = ref();
	const formSearch: any = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getRoleList();
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
		getRoleList();
	};
	const pageChangeCurrent = (val: number) => {
		params.pageCurrent = val;
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

	const initData = () => {
		isLoadData.value = true;
		getRoleList();
	};
	const getRoleList = () => {
		isLoadData.value = false;
		params.pageCurrent = 1;
		params.pageSize = 10;
		params.pageTotal = 0;
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
	};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
