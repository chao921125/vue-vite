<template>
	<el-form :model="form" :rules="rules" :label-width="formLabelWidth" ref="formRef" :inline="true">
		<div v-for="(item, index) in formList" :key="index">
			<el-form-item prop="number" label="内部编码">
				<el-input v-model="form.number" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="name" label="名称" :rules="rules.name">
				<el-input v-model="item.name" placeholder=""></el-input>
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
				<div class="re-flex-row-between re-w-fill">
					<label class="re-mr-5">长</label>
					<el-input v-model="form.volumeLength" placeholder=""></el-input>
					<label class="re-mr-5 re-ml-10">宽</label>
					<el-input v-model="form.volumeWight" placeholder=""></el-input>
					<label class="re-mr-5 re-ml-10">高</label>
					<el-input v-model="form.volumeHeight" placeholder=""></el-input>
				</div>
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
				<el-button v-if="index > 0" type="danger" circle @click="removeForm(index)">
					<el-icon><Minus /></el-icon>
				</el-button>
				<el-button v-if="index === formList.length - 1" type="success" circle @click="addForm">
					<el-icon><Plus /></el-icon>
				</el-button>
			</el-form-item>
		</div>
	</el-form>
	<el-form :model="form" :rules="rules" :label-width="formLabelWidth" ref="formRef">
		<el-form-item prop="desc" label="订单备注">
			<el-input type="textarea" v-model="form.desc" placeholder="" :autosize="{ minRows: 2, maxRows: 5 }"></el-input>
		</el-form-item>
	</el-form>
	<div class="re-flex-row-center">
		<el-button @click="goBack">取消</el-button>
		<el-button type="primary" @click="changeProductInfo">确认</el-button>
	</div>
</template>

<script lang="ts" setup name="InputAddEdit">
	import type { FormInstance, FormRules } from "element-plus";
	import { IProduct } from "@/interface/data";

	const route = useRoute();
	const router = useRouter();

	// 表单
	const formLabelWidth = "100px";
	const formRef = ref<FormInstance>();
	const form = ref<IProduct>({});
	const rules = reactive<FormRules>({
		name: [{ required: true, message: "", trigger: "blur" }],
	});
	const formList = ref<IProduct[]>([]);

	const removeForm = (index: number) => {
		formList.value.splice(index, 1);
	};
	const addForm = () => {
		formList.value.push({
			name: "",
			number: "",
			type: "",
			criterion: "",
			material: "",
			specification: "",
			weight: "",
			weightUnit: "",
			price: "",
			priceUnit: "",
			volumeLength: "",
			volumeWight: "",
			volumeHeight: "",
			volumeUnit: "",
			unit: "",
			total: "",
			desc: "",
			isStock: "",
		});
	};

	// 数据信息
	const changeProductInfo = () => {
		console.log(formList.value.length);
	};
	const goBack = () => {
		form.value = {};
		router.back();
	};

	const initData = () => {
		getProductInfoList();
	};

	const getProductInfoList = () => {
		formList.value = [
			{
				name: "111",
				number: "",
				type: "",
				criterion: "",
				material: "",
				specification: "",
				weight: "",
				weightUnit: "",
				price: "",
				priceUnit: "",
				volumeLength: "",
				volumeWight: "",
				volumeHeight: "",
				volumeUnit: "",
				unit: "",
				total: "",
				desc: "",
				isStock: "",
			},
			{
				name: "22",
				number: "",
				type: "",
				criterion: "",
				material: "",
				specification: "",
				weight: "",
				weightUnit: "",
				price: "",
				priceUnit: "",
				volumeLength: "",
				volumeWight: "",
				volumeHeight: "",
				volumeUnit: "",
				unit: "",
				total: "",
				desc: "",
				isStock: "",
			},
		];
	};

	onMounted(() => {
		if (route.query.id) {
			initData();
		} else {
			addForm();
		}
	});
</script>

<style scoped lang="scss"></style>
