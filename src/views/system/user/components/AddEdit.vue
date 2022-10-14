<template>
	<el-dialog v-model="dialogFormVisible" :title="form ? '编辑用户' : '新增用户'" @close="closeDialog">
		<el-form :model="form" :label-width="formLabelWidth" ref="formRef">
			<el-form-item prop="avatar" label="头像">
				<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
			</el-form-item>
			<el-form-item prop="realName" label="姓名">
				<el-input v-model="form.realName" o placeholder=""></el-input>
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
				<el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
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

<script lang="ts" name="AddEdit">
	import { computed, defineComponent, reactive, ref } from "vue";
	import type { FormInstance, FormRules } from "element-plus";
	import { User } from "@/interface/user";

	export default defineComponent({
		name: "AddEdit",
		props: {
			data: {
				type: Object,
				default: () => {
					return {};
				},
			},
		},
		setup(props, context) {
			// 表单
			const formLabelWidth = "100px";
			const formRef = ref<FormInstance>();
			let form = reactive<User>({});
			const rules = reactive<FormRules>({});
			// 弹窗
			const dialogFormVisible = ref(false);
			const openDialog = () => {
				dialogFormVisible.value = true;
			};
			const closeDialog = () => {
				for (let key in form) form[key] = "";
				dialogFormVisible.value = false;
			};
			// 数据信息
			const userInfo = computed(() => {
				console.log(JSON.stringify(props.data));
				if (props.data) Object.assign(form, props.data);
				return props.data;
			});
			const changeUserInfo = () => {
				console.log(JSON.stringify(form));
				closeDialog();
				context.emit("result", true);
			};
			return {
				dialogFormVisible,
				openDialog,
				closeDialog,
				form,
				formRef,
				rules,
				formLabelWidth,
				userInfo,
				changeUserInfo,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
