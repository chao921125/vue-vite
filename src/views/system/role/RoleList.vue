<template>
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
				<div>{{ scope.row.id }}</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup name="RoleList">
	import StatusUse from "@/plugins/enums";
	const tableData = [
		{
			id: 1,
			name: "超级管理员",
			flag: "super",
			sort: 1,
			status: 1,
			desc: "超级管理员",
		},
	];
</script>

<style scoped lang="scss"></style>
