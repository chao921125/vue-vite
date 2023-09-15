<template>
	<el-row justify="center" align="middle" class="login-box">
		<el-col :span="14" :xs="0">
			<div class="login-logo re-flex-col-center">
				<!-- loading -->
				<div class="re-flex-row-center"><div class="loading"></div></div>
				<div class="re-flex-row-center">CC ADMIN</div>
			</div>
		</el-col>
		<el-col :span="10" :xs="24">
			<div class="login-form re-flex-col-center">
				<el-form ref="formUserRef" :model="formUser" status-icon :rules="formRulesUser" label-width="0" :scroll-to-error="true" class="form-login">
					<el-form-item label="" prop="userName">
						<el-input v-model="formUser.userName" maxlength="11" placeholder="user name" autofocus @keyup.enter.native="loginUser(formUserRef)" />
					</el-form-item>
					<el-form-item label="" prop="password">
						<el-input v-model="formUser.password" type="password" placeholder="user password" @keyup.enter.native="loginUser(formUserRef)" class="re-mt-20" />
					</el-form-item>
					<el-form-item label="" prop="">
						<label>账号：admin/user 密码：随意</label>
					</el-form-item>
					<el-form-item label="" prop="">
						<el-button @click.native.prevent="loginUser(formUserRef)" @keyup.enter.native="loginUser(formUserRef)" :loading="isLoading">login</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Login">
	import type { FormInstance } from "element-plus";
	import Storage from "@/plugins/utils/storage";
	import Cookie from "@/plugins/utils/cookie";
	import Constants from "@/plugins/constants";
	import ValidateForm from "@/plugins/validate/validateForm";
	import api from "@/api";

	const { proxy } = getCurrentInstance() as any;
	const formUserRef = ref<FormInstance>();
	const formUser: Record<string, any> = reactive({
		userName: "",
		password: "",
	}) as any;
	const formRulesUser: Record<string, any> = reactive({
		userName: [{ validator: ValidateForm.userName, trigger: "blur" }],
		password: [{ validator: ValidateForm.password, trigger: "blur" }],
	}) as any;

	const route = useRoute();
	const router = useRouter();

	const isLoading = ref<boolean>(false);
	const loginUser = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.validate((valid) => {
			isLoading.value = true;
			if (valid) {
				api.userApi
					.loginUser(formUser)
					.then((res: any) => {
						proxy.elMessage.success("登录成功");
						Cookie.setCookie(Constants.cookieKey.token, res.data.token);
						Storage.setSessionStorage(Constants.storageKey.token, res.data.token);
						Storage.setLocalStorage(Constants.storageKey.userInfo, res.data);
						if (route.query?.redirect && route.query?.redirect !== "/") {
							router.push({
								path: <string>route.query?.redirect,
								query: Object.keys(<string>route.query?.params).length ? JSON.parse(<string>route.query?.params) : "",
							});
						} else {
							router.push({ path: "/" });
						}
						isLoading.value = false;
					})
					.catch(() => {
						isLoading.value = false;
					});
			} else {
				isLoading.value = false;
				proxy.elMessage.error("登录失败");
				return false;
			}
		});

		onMounted(() => {
			isLoading.value = false;
		});
	};
</script>

<style scoped lang="scss">
	@use "./login.scss";
</style>
