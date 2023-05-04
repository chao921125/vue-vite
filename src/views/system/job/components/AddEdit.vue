<template>
	<el-dialog v-model="dialogFormVisible" @close="closeDialog">
		<template #header>{{ jobInfo.id ? "编辑岗位" : "新增岗位" }}</template>
		<el-form :model="form" :rules="rules" :label-width="formLabelWidth" ref="formRef">
			<el-form-item prop="realName" label="名称">
				<el-input v-model="form.name" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="mail" label="编码">
				<el-input v-model="form.number" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="mail" label="联系人">
				<el-input v-model="form.userName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="mail" label="联系电话">
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
				<el-button type="primary" @click="changeJobInfo">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEdit">
	import type { FormInstance, FormRules } from "element-plus";
	import { IJob } from "@/interface/data";

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
	const formLabelWidth = "100px";
	const formRef = ref<FormInstance>();
	const form = ref<IJob>({});
	const rules = reactive<FormRules>({});
	const jobInfo = ref<IJob>({});

	// 弹窗
	const dialogFormVisible = ref(false);
	const openDialog = () => {
		dialogFormVisible.value = true;
	};
	const closeDialog = () => {
		form.value = {};
		jobInfo.value = {};
		dialogFormVisible.value = false;
	};

	// 数据信息
	const changeJobInfo = () => {
		closeDialog();
		emits("result", true);
	};
	onUpdated(() => {
		if (propsData.data && dialogFormVisible.value) {
			form.value = propsData.data;
			jobInfo.value = propsData.data;
		}
	});

	// 组件内部函数 供外部调用函数
	defineExpose({
		openDialog,
		closeDialog,
	});
</script>

<style scoped lang="scss"></style>
