<script setup lang="ts">
import Storage from "@/utils/storage";
import Constants from "@/utils/constant/constants";
import ValidateForm from "@/utils/validate/validateForm";
// import Api from "@/plugins/api";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance() as any;
const formRef = ref();
const formData: Record<string, any> = reactive({
	userName: "",
	password: "",
}) as any;
const formRules: Record<string, any> = reactive({
	userName: [{ validator: ValidateForm.userName, trigger: "blur" }],
	password: [{ validator: ValidateForm.password, trigger: "blur" }],
}) as any;

const route = useRoute();
const router = useRouter();
const data = reactive({
	isLoading: false,
});

const onLogin = async (formEl) => {
	if (!formEl) return false;
	await formEl.validate((valid: boolean, fields) => {
		console.log("====", valid, fields);
		if (valid) {
			data.isLoading = true;
			const token = new Date().getTime();
			Storage.setCookie(Constants.cookieKey.token, token);
			Storage.setSessionStorage(Constants.storageKey.token, token);
			Storage.setLocalStorage(Constants.storageKey.token, token);
			Storage.setLocalStorage(Constants.storageKey.userInfo, token);
			// Storage.setCookie(Constants.cookieKey.token, res.data.token);
			// Storage.setSessionStorage(Constants.storageKey.token, res.data.token);
			// Storage.setLocalStorage(Constants.storageKey.token, res.data);
			// Storage.setLocalStorage(Constants.storageKey.userInfo, res.data);
			if (route.query?.redirect && route.query?.redirect !== "/") {
				router.push({
					path: <string>route.query?.redirect,
					query: Object.keys(<string>route.query?.params).length ? JSON.parse(<string>route.query?.params) : "",
				});
			} else {
				router.push({ path: "/" });
			}
			// Api.userApi
			// 	.login({
			// 		userName: "admin",
			// 		password: "123123",
			// 	})
			// 	.then((res) => {
			// 		console.log(res);
			// 	});
		} else {
			data.isLoading = false;
			proxy.$message.error("登录失败", fields);
			return false;
		}
	});
};

const onToLogin = () => {
	router.push({ path: "/login" });
};
const onToReg = () => {
	router.push({ path: "/register" });
};
</script>

<template>
	<section class="body-pd login re-f-row-center">
		<el-form class="form" ref="formRef" :model="formData" :rules="formRules">
			<h1 class="title re-tc re-full-w">CCNET</h1>
			<el-form-item class="form-item" label="" prop="userName">
				<el-input v-model="formData.userName" autofocus @keyup.enter.native="onLogin(formRef)" :disabled="data.isLoading" class="form-in" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item class="form-item" label="" prop="password">
				<el-input v-model="formData.password" @keyup.enter.native="onLogin(formRef)" :disabled="data.isLoading" class="form-in" type="password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item class="form-item">
				<div class="re-f-row-between re-full-w">
					<el-text class="re-cp txt" type="info" @click="onToReg">忘记密码</el-text>
					<el-text class="re-cp txt" type="primary" @click="onToLogin">登录</el-text>
				</div>
			</el-form-item>
			<el-form-item class="form-item re-f-row-center">
				<el-button class="re-full-w btn" type="primary" @click.native.prevent="onLogin(formRef)" @keyup.enter.native="onLogin(formRef)" :loading="data.isLoading">注册</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<style scoped lang="scss">
.login {
	position: relative;
}

.form {
	margin-top: 300px;
	width: 100%;
	max-width: 30vw;
	.form-item {
		width: 100%;
		margin-top: 20px;
	}
	.form-mt {
		margin-top: 20px;
	}
}
@media screen and (max-width: 768px) {
	.form {
		margin-top: 600px;
		max-width: 100%;
		.form-item {
			width: 100%;
			margin-top: 60px;
		}
		.form-mt {
			margin-top: 60px;
		}
	}
}
</style>
