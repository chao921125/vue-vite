<template>
	<el-row :gutter="20" justify="center" class="login-box">
		<el-col :span="14" class="login-logo">
			<!-- loading -->
			<div class="re-flex-row-center"><div class="loading"></div></div>
			<div class="re-flex-row-center">CC ADMIN</div>
		</el-col>
		<el-col :span="10" class="login-form">
			<el-form ref="formUserRef" :model="formUser" status-icon :rules="formRulesUser" label-width="0" :scroll-to-error="true">
				<el-form-item label="" prop="userName">
					<el-input v-model="formUser.userName" placeholder="user name" />
				</el-form-item>
				<el-form-item label="" prop="password">
					<el-input v-model="formUser.password" type="password" placeholder="user password" />
				</el-form-item>
				<el-form-item label="" prop="rePassword">
					<el-input v-model="formUser.rePassword" type="password" placeholder="user password" />
				</el-form-item>
			</el-form>
			<el-button @click="loginUser">login</el-button>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Register">
	import { ref, reactive } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import type { FormInstance } from "element-plus";
	import Utils from "@/plugins/utils";
	import ValidateForm from "@/plugins/validate/validateForm";

	const formUserRef = ref<FormInstance>();
	const formUser = reactive({
		userName: "",
		password: "",
		rePassword: "",
	});
	const formRulesUser = reactive({
		userName: [{ validator: ValidateForm.userName, trigger: "blur" }],
		password: [{ validator: ValidateForm.password, trigger: "blur" }],
		rePassword: [{ validator: ValidateForm.rePassword, reForm: formUser, reColumn: "password", trigger: "blur" }],
	});

	const route = useRoute();
	const router = useRouter();

	const loginUser = () => {
		Utils.Cookies.setCookie(Utils.Constants.cookieKey.token, Math.random().toString(36));
		Utils.Storages.setSessionStorage(Utils.Constants.storageKey.token, Math.random().toString(36));
		if (route.query?.redirect && route.query?.redirect !== "/") {
			router.push({
				path: <string>route.query?.redirect,
				query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : "",
			});
		} else {
			router.push({ path: "/" });
		}
	};
</script>

<style scoped lang="scss">
	@import "login.scss";
</style>
