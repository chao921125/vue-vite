<template>
	<el-dialog v-model="dialogFormVisible" @close="closeDialog">
		<template #header>{{ departmentInfo.id ? "编辑部门" : "新增部门" }}</template>
		<el-form :model="form" :rules="rules" :label-width="formLabelWidth" ref="formRef">
			<el-form-item prop="parent" label="上级">
				<el-tree-select
					v-model="form.parent"
					:data="optionSelectMenu"
					:render-after-expand="false"
					:props="propsTreeMenu"
					value-key="id"
					check-strictly
					placeholder="菜单"
				>
					<template #default="{ data }">
						<span>{{ $t(data.name) }}</span>
					</template>
				</el-tree-select>
			</el-form-item>
			<el-form-item prop="name" label="名称">
				<el-input v-model="form.name" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="number" label="编码">
				<el-input v-model="form.number" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="userName" label="负责人">
				<el-input v-model="form.userName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="phone" label="联系方式">
				<el-input v-model="form.phone" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="status" label="状态">
				<el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="desc" label="备注">
				<el-input type="textarea" v-model="form.desc" placeholder="" :autosize="{ minRows: 2, maxRows: 5 }"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="changeDepartmentInfo">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEdit">
	import type { FormInstance, FormRules } from "element-plus";
	import { IDepartment, IMenu } from "@/interface/data";

	// 组件内部函数 接收及传递结果
	const propsData = defineProps({
		data: {
			type: Object,
			default: () => {
				return {};
			},
		},
	});
	const emits = defineEmits(["result"]);

	const propsTreeMenu = { children: "children", label: "name", disabled: "disabled" };
	const optionSelectMenu = ref<IMenu[]>([]);
	optionSelectMenu.value = [
		{
			id: 1,
			name: "message.menu.home",
			children: [],
		},
		{
			id: 9,
			name: "message.menu.system",
			children: [
				{
					id: 91,
					name: "message.menu.systemUser",
					children: [],
				},
				{
					id: 92,
					name: "message.menu.systemRole",
					children: [],
				},
				{
					id: 93,
					name: "message.menu.systemDepartment",
					children: [],
				},
				{
					id: 94,
					name: "message.menu.systemPost",
					children: [],
				},
				{
					id: 99,
					name: "message.menu.systemMenu",
					children: [
						{
							id: 941,
							name: "message.menu.systemMenuAdd",
							children: [],
						},
					],
				},
			],
		},
		{
			id: 9900,
			name: "message.menu.demo",
			children: [
				{
					id: 99001,
					name: "message.menu.demoIcon",
					children: [],
				},
				{
					id: 99002,
					name: "message.menu.demoAnimaCss",
					children: [],
				},
			],
		},
		{
			id: 9901,
			name: "message.menu.testLink",
			children: [],
		},
		{
			id: 9902,
			name: "message.menu.testIframe",
			children: [],
		},
	];

	// 表单
	const formLabelWidth = "100px";
	const formRef = ref<FormInstance>();
	const form = ref<IDepartment>({});
	const rules = reactive<FormRules>({});
	const departmentInfo = ref<IDepartment>({});

	// 弹窗
	const dialogFormVisible = ref(false);
	const openDialog = () => {
		dialogFormVisible.value = true;
	};
	const closeDialog = () => {
		form.value = {};
		departmentInfo.value = {};
		dialogFormVisible.value = false;
	};

	// 数据信息
	const changeDepartmentInfo = () => {
		closeDialog();
		emits("result", true);
	};
	onUpdated(() => {
		if (propsData.data && dialogFormVisible.value) {
			form.value = propsData.data;
			departmentInfo.value = propsData.data;
		}
	});

	// 组件内部函数 供外部调用函数
	defineExpose({
		openDialog,
		closeDialog,
	});
</script>

<style scoped lang="scss"></style>
