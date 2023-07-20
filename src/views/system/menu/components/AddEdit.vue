<template>
	<el-dialog v-model="dialogFormVisible" @close="closeDialog">
		<template #header>{{ menuInfo.id ? "编辑菜单" : "新增菜单" }}</template>
		<el-form :model="form" :rules="rules" :label-width="formLabelWidth" ref="formRef">
			<el-form-item prop="parent" label="菜单">
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
			<el-form-item prop="title" label="标题">
				<el-input v-model="form.title" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="icon" label="图标">
				<el-select v-model="form.icon" clearable placeholder="" popper-class="select-icons">
					<el-option v-for="(item, index) in IconfontData" :key="index" :label="item" :value="item" class="re-flex-row-center">
						<i class="iconfont" :class="item"></i>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="path" label="URL">
				<el-input v-model="form.path" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="component" label="组件">
				<el-input v-model="form.component" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="form.sort" :min="1" :max="99999" controls-position="right"></el-input-number>
			</el-form-item>
			<el-form-item prop="isLink" label="是否外链">
				<el-switch v-model="form.isLink" :active-value="1" :inactive-value="0" :disabled="!!form.isIframe" />
			</el-form-item>
			<el-form-item prop="isIframe" label="是否内嵌">
				<el-switch v-model="form.isIframe" :active-value="1" :inactive-value="0" :disabled="!!form.isLink" />
			</el-form-item>
			<el-form-item prop="address" label="地址">
				<el-input v-model="form.address" placeholder="" :disabled="!(form.isIframe || form.isLink)"></el-input>
			</el-form-item>
			<el-form-item prop="isHide" label="是否隐藏">
				<el-switch v-model="form.isHide" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="isHideSubMenu" label="是否隐藏子节点">
				<el-switch v-model="form.isHideSubMenu" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="isDisable" label="是否禁用">
				<el-switch v-model="form.isDisable" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="isKeepAlive" label="是否缓存">
				<el-switch v-model="form.isKeepAlive" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="isAffix" label="是否固定">
				<el-switch v-model="form.isAffix" :active-value="1" :inactive-value="0" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="changeMenuInfo">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEdit">
	import type { FormInstance, FormRules } from "element-plus";
	import { IMenu } from "@/interface/data";
	import IconfontData from "@/config/iconfontData";

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

	// 表单
	const formLabelWidth = "120px";
	const formRef = ref<FormInstance>();
	const form = ref<IMenu>({});
	const rules = reactive<FormRules>({});
	const menuInfo = ref<IMenu>({});

	// 弹窗
	const dialogFormVisible = ref(false);
	const openDialog = () => {
		dialogFormVisible.value = true;
	};
	const closeDialog = () => {
		form.value = {};
		menuInfo.value = {};
		dialogFormVisible.value = false;
	};

	// 数据信息
	const changeMenuInfo = () => {
		closeDialog();
		emits("result", true);
	};
	onUpdated(() => {
		if (propsData.data && dialogFormVisible.value) {
			form.value = propsData.data;
			menuInfo.value = propsData.data;
		}
	});
	// 组件内部函数 供外部调用函数
	defineExpose({
		openDialog,
		closeDialog,
	});
</script>

<style lang="scss">
	@use "./index.scss";
</style>
