<template>
	<el-dialog v-model="dialogFormVisible" :title="userInfo ? '编辑用户' : '新增用户'">
		<el-form :model="form" :label-width="formLabelWidth">
			<el-form-item prop="name" label="头像">
				<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
			</el-form-item>
			<el-form-item prop="name" label="姓名">
				<el-input></el-input>
			</el-form-item>
			<el-form-item prop="name" label="邮箱">
				<el-input></el-input>
			</el-form-item>
			<el-form-item prop="name" label="手机号">
				<el-input></el-input>
			</el-form-item>
			<el-form-item prop="name" label="部门">
				<el-select v-model="form.region" placeholder="Please select a zone">
					<el-option label="Zone No.1" value="shanghai" />
					<el-option label="Zone No.2" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item prop="name" label="岗位">
				<el-select v-model="form.region" placeholder="Please select a zone">
					<el-option label="Zone No.1" value="shanghai" />
					<el-option label="Zone No.2" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item prop="name" label="角色">
				<el-select v-model="form.region" placeholder="Please select a zone">
					<el-option label="Zone No.1" value="shanghai" />
					<el-option label="Zone No.2" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item prop="delivery" label="状态">
				<el-switch v-model="form.delivery" />
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

	export default defineComponent({
		name: "TempScriptSetup",
		props: {
			data: {
				type: Object,
				default: () => {
					return {};
				},
			},
		},
		setup(props, context) {
			const dialogFormVisible = ref(false);
			const formLabelWidth = "100px";
			const openDialog = () => {
				dialogFormVisible.value = true;
			};
			const closeDialog = () => {
				dialogFormVisible.value = false;
			};
			const userInfo = computed(() => {
				return props.data;
			});
			const form = reactive({
				name: "",
				region: "",
				date1: "",
				date2: "",
				delivery: true,
				type: [],
				resource: "",
				desc: "",
			});
			const changeUserInfo = () => {
				closeDialog();
				context.emit("result", true);
			};
			return {
				dialogFormVisible,
				openDialog,
				closeDialog,
				form,
				formLabelWidth,
				userInfo,
				changeUserInfo,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
