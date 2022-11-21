<template>
	<el-form :model="form" :rules="rules" :label-width="formLabelWidth" ref="formRef">
		<el-form-item prop="number" label="内部编码">
			<el-input v-model="form.number" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="name" label="名称">
			<el-input v-model="form.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="type" label="种类">
			<el-input v-model="form.type" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="criterion" label="标准">
			<el-input v-model="form.criterion" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="material" label="材质">
			<el-input v-model="form.material" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="specification" label="规格">
			<el-input v-model="form.specification" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="price" label="价格">
			<el-input v-model="form.price" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="priceUnit" label="价格单位">
			<el-input v-model="form.priceUnit" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="weight" label="重量">
			<el-input v-model="form.weight" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="weightUnit" label="重量单位">
			<el-input v-model="form.weightUnit" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="weightUnit" label="体积">
			<el-input v-model="form.volumeLength" placeholder=""></el-input>
			<el-input v-model="form.volumeWight" placeholder=""></el-input>
			<el-input v-model="form.volumeHeight" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="volumeUnit" label="体积单位">
			<el-input v-model="form.volumeUnit" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="unit" label="单位">
			<el-input v-model="form.unit" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="total" label="数量">
			<el-input v-model="form.total" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="desc" label="备注">
			<el-input type="textarea" v-model="form.desc" placeholder="" :autosize="{ minRows: 2, maxRows: 5 }"></el-input>
		</el-form-item>
		<el-form-item prop="" label="">
			<el-button @click="goBack">取消</el-button>
			<el-button type="primary" @click="changeProductInfo">确认</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup name="InputAddEdit">
	import { reactive, ref } from "vue";
	import { useRouter } from "vue-router";
	import type { FormInstance, FormRules } from "element-plus";
	import { Product } from "@/interface/product";

	// 表单
	const formLabelWidth = "100px";
	const formRef = ref<FormInstance>();
	const form = ref<Product>({});
	const rules = reactive<FormRules>({});

	// 数据信息
	const changeProductInfo = () => {};
	const router = useRouter();
	const goBack = () => {
		form.value = {};
		router.back();
	};
</script>

<style scoped lang="scss"></style>
