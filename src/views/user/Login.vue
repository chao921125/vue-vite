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
					<el-input v-model="formUser.userName" maxlength="11" placeholder="user name" autofocus @keyup.enter.native="loginUser(formUserRef)" />
				</el-form-item>
				<el-form-item label="" prop="password">
					<el-input v-model="formUser.password" type="password" placeholder="user password" @keyup.enter.native="loginUser(formUserRef)" />
				</el-form-item>
				<el-form-item label="" prop="">
					<label>账号：admin/user 密码：随意</label>
				</el-form-item>
				<el-form-item label="" prop="">
					<el-button @click.native.prevent="loginUser(formUserRef)" @keyup.enter.native="loginUser(formUserRef)" :loading="isLoading">login</el-button>
				</el-form-item>
			</el-form>
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
				if (window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1")) {
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
						})
						.catch(() => {
							isLoading.value = false;
						});
				} else {
					const token = new Date().getTime();
					proxy.elMessage.success("登录成功");
					Cookie.setCookie(Constants.cookieKey.token, token);
					Storage.setSessionStorage(Constants.storageKey.token, token);
					Storage.setLocalStorage(Constants.storageKey.userInfo, {
						avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
						name: formUser.userName,
						token: token,
					});
					if (route.query?.redirect && route.query?.redirect !== "/") {
						router.push({
							path: <string>route.query?.redirect,
							query: Object.keys(<string>route.query?.params).length ? JSON.parse(<string>route.query?.params) : "",
						});
					} else {
						router.push({ path: "/" });
					}
				}
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
