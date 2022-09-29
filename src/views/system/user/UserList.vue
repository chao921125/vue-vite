<template>
	<el-form ref="formUserRef" :model="formUser" status-icon label-width="" :inline="true">
		<el-form-item label="用户" prop="name">
			<el-input v-model="formUser.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="" prop="">
			<el-button>查询</el-button>
			<el-button @click="resetForm(formUserRef)">重置</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column type="index" label="序号" width="60" />
		<el-table-column prop="name" label="名称" width="180" />
		<el-table-column prop="flag" label="标识" width="180" />
		<el-table-column prop="sort" label="排序" width="180" />
		<el-table-column prop="status" label="状态" width="180">
			<template #default="scope">
				<div>{{ StatusUse[scope.row.status] }}</div>
			</template>
		</el-table-column>
		<el-table-column prop="desc" label="描述" />
		<el-table-column prop="" label="操作" width="180">
			<template #default="scope">
				<el-button link>编辑{{ scope.row.id }}</el-button>
				<el-button link>删除</el-button>
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
</template>

<script lang="ts" setup name="UserList">
	import { ref, reactive } from "vue";
	import type { FormInstance } from "element-plus";
	import { StatusUse } from "@/plugins/enums";

	const formUserRef = ref();
	const formUser = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
	};
	const tableData = ref<any[]>([]);
	tableData.value = [
		{
			id: 1,
			name: "超级管理员",
			flag: "super",
			sort: 1,
			status: 1,
			desc: "超级管理员",
		},
		{
			id: 2,
			name: "管理员",
			flag: "super",
			sort: 2,
			status: 0,
			desc: "超级管理员",
		},
	];
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
	const pageChangeSize = (val: number) => {
		console.log(`${val} items per page`);
	};
	const pageChangeCurrent = (val: number) => {
		console.log(`${val} items per page`);
	};
</script>

<style scoped lang="scss"></style>
