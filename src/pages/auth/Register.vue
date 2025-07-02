<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Api from "@/plugins/api";

const formRef = ref(null);

const data = reactive({
	form: {
		userName: "",
		password: "",
		email: "",
		phone: "",
	},
});

const onSubmit = () => {
	Api.userApi.register(data.form).then((res) => {
		console.log(res);
	});
};

const router = useRouter();
const onToLogin = () => {
	router.push({ path: "/login" });
};
</script>

<template>
	<el-form ref="formRef" :model="data.form">
		<el-form-item label="userName"> <el-input v-model="data.form.userName" /> </el-form-item>
		<el-form-item label="password"> <el-input v-model="data.form.password" /> </el-form-item>
		<el-form-item label="email"> <el-input v-model="data.form.email" /> </el-form-item>
		<el-form-item label="phone"> <el-input v-model="data.form.phone" /> </el-form-item>
		<el-form-item label=""> <el-button @click="onSubmit">submit</el-button> </el-form-item>
	</el-form>
	<button @click="onToLogin">login</button>
</template>

<style scoped lang="scss"></style>
