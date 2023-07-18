<template>
	<el-dialog v-model="dialogFormVisible" @close="closeDialog">
		<template #header>{{ form.id ? "编辑用户" : "新增用户" }}</template>
		<el-form :model="form" :rules="rules" :label-width="formLabelWidth" ref="formRef">
			<el-form-item prop="avatar" label="头像">
				<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
			</el-form-item>
			<el-form-item prop="realName" label="姓名">
				<el-input v-model="form.realName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="mail" label="邮箱">
				<el-input v-model="form.mail" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="phone" label="手机号">
				<el-input v-model="form.phone" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="userName" label="账号">
				<el-input v-model="form.userName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="password" label="密码">
				<el-input v-model="form.password" placeholder="默认密码 qq123456"></el-input>
			</el-form-item>
			<el-form-item prop="department" label="部门">
				<el-select v-model="form.department" placeholder="">
					<el-option label="总部" value="1" />
					<el-option label="业务部" value="2" />
				</el-select>
			</el-form-item>
			<el-form-item prop="job" label="岗位">
				<el-select v-model="form.job" placeholder="">
					<el-option label="管理" value="1" />
					<el-option label="销售" value="2" />
				</el-select>
			</el-form-item>
			<el-form-item prop="role" label="角色">
				<el-select v-model="form.role" placeholder="">
					<el-option label="管理" value="1" />
					<el-option label="员工" value="2" />
				</el-select>
			</el-form-item>
			<el-form-item prop="status" label="状态">
				<el-switch v-model="form.status" :active-value="1" :inactive-value="0" /> （{{ form.status ? "启用" : "停用" }}）
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="form.sort" :min="1" :max="99999" controls-position="right"></el-input-number>
			</el-form-item>
			<el-form-item prop="desc" label="备注">
				<el-input type="textarea" v-model="form.desc" placeholder="" :autosize="{ minRows: 2, maxRows: 5 }"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="changeUserInfo">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEdit">
	import type { FormInstance, FormRules } from "element-plus";
	import { IUser } from "@/interface/data";

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
	const form = ref<IUser>({});
	const rules = reactive<FormRules>({});

	// 弹窗
	const dialogFormVisible = ref(false);
	const openDialog = () => {
		dialogFormVisible.value = true;
	};
	const closeDialog = () => {
		form.value = {};
		dialogFormVisible.value = false;
	};

	// 数据信息
	const changeUserInfo = () => {
		closeDialog();
		emits("result", true);
	};
	onUpdated(() => {
		if (propsData.data && dialogFormVisible.value) {
			form.value = propsData.data;
		}
	});

	// 组件内部函数 供外部调用函数
	defineExpose({
		openDialog,
		closeDialog,
	});
</script>

<style scoped lang="scss"></style>
