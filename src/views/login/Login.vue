<template>
	<el-row justify="center" class="login-box">
		<el-col :span="14" class="login-logo re-flex-col-center">
			<!-- loading -->
			<div class="re-flex-row-center"><div class="loading"></div></div>
			<div class="re-flex-row-center">CC ADMIN</div>
		</el-col>
		<el-col :span="10" class="login-form re-flex-col-center">
			<el-form ref="formUserRef" :model="formUser" status-icon :rules="formRulesUser" label-width="0" :scroll-to-error="true" class="form-login">
				<el-form-item label="" prop="userName">
					<el-input v-model="formUser.userName" maxlength="11" placeholder="user name" />
				</el-form-item>
				<el-form-item label="" prop="password">
					<el-input v-model="formUser.password" type="password" placeholder="user password" />
				</el-form-item>
				<el-form-item label="" prop="">
					<el-button @click="loginUser(formUserRef)">login</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Login">
	import { ref, reactive, getCurrentInstance } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import type { FormInstance } from "element-plus";
	import Utils from "@/plugins/utils";
	import ValidateForm from "@/plugins/validate/validateForm";

	const { proxy } = <any>getCurrentInstance();
	const formUserRef = ref<FormInstance>();
	const formUser = reactive({
		userName: "",
		password: "",
	});
	const formRulesUser = reactive({
		userName: [{ validator: ValidateForm.userName, trigger: "blur" }],
		password: [{ validator: ValidateForm.password, trigger: "blur" }],
	});

	const route = useRoute();
	const router = useRouter();

	const loginUser = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.validate((valid) => {
			if (valid) {
				proxy.elMessage.success("登录成功");
				Utils.Cookies.setCookie(Utils.Constants.cookieKey.token, Math.random().toString(36));
				Utils.Storages.setSessionStorage(Utils.Constants.storageKey.token, Math.random().toString(36));
				const userInfo = {
					id: 1,
					userName: formUser.userName,
					avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
				};
				Utils.Storages.setLocalStorage(Utils.Constants.storageKey.userInfo, userInfo);
				if (route.query?.redirect && route.query?.redirect !== "/") {
					router.push({
						path: <string>route.query?.redirect,
						query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : "",
					});
				} else {
					router.push({ path: "/" });
				}
			} else {
				proxy.elMessage.error("登录失败");
				return false;
			}
		});
	};
</script>

<style scoped lang="scss">
	@import "login.scss";
</style>
