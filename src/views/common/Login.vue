<script setup lang="ts">
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
	const loginUser = async (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		// @ts-ignore
		await formEl.validate((valid, fields) => {
			isLoading.value = true;
			if (valid) {
				// window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1")
				if (new Date().getTime() === 0) {
					api.userApi
						.loginUser(formUser)
						.then((res: any) => {
							proxy.$message.success("登录成功");
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
					proxy.$message.success("登录成功");
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
				proxy.$message.error("登录失败", fields);
				return false;
			}
		});
	};

	onMounted(() => {
		isLoading.value = false;
	});
</script>

<template>
	<el-row
		justify="center"
		class="login-box">
		<el-col
			:span="0"
			:md="14">
			<div class="login-logo re-f-col-center">
				<!-- loading -->
				<div class="re-f-row-center"><div class="loading"></div></div>
				<div class="re-f-row-center">CC ADMIN</div>
			</div>
		</el-col>
		<el-col
			:span="24"
			:md="10">
			<div class="login-form re-f-col-center">
				<el-form
					ref="formUserRef"
					:model="formUser"
					status-icon
					:rules="formRulesUser"
					label-width="0"
					:scroll-to-error="true"
					class="form-login">
					<el-form-item
						label=""
						prop="userName">
						<el-input
							v-model="formUser.userName"
							maxlength="11"
							placeholder="user name"
							autofocus
							@keyup.enter.native="loginUser(formUserRef)" />
					</el-form-item>
					<el-form-item
						label=""
						prop="password">
						<el-input
							v-model="formUser.password"
							type="password"
							placeholder="user password"
							@keyup.enter.native="loginUser(formUserRef)" />
					</el-form-item>
					<el-form-item
						label=""
						prop="">
						<label>账号：admin/user 密码：随意</label>
					</el-form-item>
					<el-form-item
						label=""
						prop="">
						<el-button
							class="re-w-full"
							@click.native.prevent="loginUser(formUserRef)"
							@keyup.enter.native="loginUser(formUserRef)"
							:loading="isLoading">
							login
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-col>
	</el-row>
</template>

<style scoped lang="scss">
	.login-box {
		height: 100vh;
		background-color: #ffffff;
	}
	.login-logo {
		min-height: 500px;
	}
	.login-form {
		min-height: 500px;
	}
	.form-login {
		width: 100%;
		max-width: 300px;
	}

	// loading start
	.loading {
		position: relative;
		width: 60px;
		height: 60px;
		animation: heart infinite 0.85s linear;
	}
	.loading:before,
	.loading:after {
		position: absolute;
		top: 0;
		left: 30px;
		width: 30px;
		height: 50px;
		content: "";
		transform: rotate(-45deg);
		transform-origin: 0 100%;
		border-radius: 30px 30px 0 0;
		background: #ff0000;
	}

	.loading:after {
		left: 0;
		transform: rotate(45deg);
		transform-origin: 100% 100%;
	}

	@keyframes heart {
		0% {
			transform: scale(0.8);
		}

		50% {
			transform: scale(1);
		}

		100% {
			transform: scale(0.8);
		}
	}
	// loading end
</style>
