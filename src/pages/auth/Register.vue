<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const formRef = ref(null);

const data = reactive({
	form: {
		name: "",
		region: "",
		date1: "",
		date2: "",
		delivery: false,
		type: [],
		resource: "",
		desc: "",
	},
});

const router = useRouter();
const onToLogin = () => {
	router.push({ path: "/login" });
};
</script>

<template>
	<el-form ref="formRef" :model="data.form" label-width="80px">
		<el-form-item label="Activity name"> <el-input v-model="data.form.name" /> </el-form-item>
	</el-form>
	<button @click="onToLogin">login</button>
</template>

<style scoped lang="scss"></style>
