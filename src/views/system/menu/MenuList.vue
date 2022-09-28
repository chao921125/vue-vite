<template>
	<el-form :inline="true" :model="formInline" class="demo-form-inline">
		<el-form-item label="Approved by">
			<el-input v-model="formInline.user" placeholder="Approved by" />
		</el-form-item>
		<el-form-item label="Activity zone">
			<el-select v-model="formInline.region" placeholder="Activity zone">
				<el-option label="Zone one" value="shanghai" />
				<el-option label="Zone two" value="beijing" />
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="toAdd">to add</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" style="width: 100%" row-key="id" border lazy :load="load" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
		<el-table-column prop="date" label="Date" width="180" />
		<el-table-column prop="name" label="Name" width="180" />
	</el-table>
</template>

<script lang="ts">
	import { defineComponent, reactive } from "vue";
	import { useRouter } from "vue-router";
	interface User {
		id: number;
		date: string;
		name: string;
		hasChildren?: boolean;
		children?: User[];
	}
	export default defineComponent({
		name: "MenuList",
		setup() {
			const formInline = reactive({
				user: "",
				region: "",
			});

			const load = (_row: User, _treeNode: unknown, resolve: (date: User[]) => void) => {
				setTimeout(() => {
					resolve([
						{
							id: 31,
							date: "2016-05-01",
							name: "wangxiaohu",
						},
						{
							id: 32,
							date: "2016-05-01",
							name: "wangxiaohu",
						},
					]);
				}, 1000);
			};

			const tableData: User[] = [
				{
					id: 1,
					date: "2016-05-02",
					name: "wangxiaohu",
				},
				{
					id: 2,
					date: "2016-05-04",
					name: "wangxiaohu",
				},
				{
					id: 3,
					date: "2016-05-01",
					name: "wangxiaohu",
					children: [
						{
							id: 31,
							date: "2016-05-01",
							name: "wangxiaohu",
						},
						{
							id: 32,
							date: "2016-05-01",
							name: "wangxiaohu",
						},
					],
				},
				{
					id: 4,
					date: "2016-05-03",
					name: "wangxiaohu",
				},
			];

			const router = useRouter();
			const toAdd = () => {
				router.push({ path: "/system/menu/add" });
			};
			return {
				formInline,
				load,
				tableData,
				toAdd,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
