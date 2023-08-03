<template>
	<el-dialog v-model="dialogFormVisible" @close="closeDialog">
		<template #header>{{ productInfo.id ? "编辑仓库库存" : "新增仓库库存" }}</template>
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
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="changeproductInfo">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEdit">
	import type { FormInstance, FormRules } from "element-plus";
	import { IProduct } from "@/interface/data";

	// 组件内部函数 接收及传递结果
	const propsData = defineProps({
		data: {
			type: Object,
			default: () => {
				return {};
			},
		},
	});
	const emits = defineEmits(["result"]);

	// 表单
	const formLabelWidth = "100px";
	const formRef = ref<FormInstance>();
	const form = ref<IProduct>({});
	const rules = reactive<FormRules>({});
	const productInfo = ref<IProduct>({});

	// 弹窗
	const dialogFormVisible = ref(false);
	const openDialog = () => {
		dialogFormVisible.value = true;
	};
	const closeDialog = () => {
		form.value = {};
		productInfo.value = {};
		dialogFormVisible.value = false;
	};

	// 数据信息
	const changeproductInfo = () => {
		closeDialog();
		emits("result", true);
	};
	onUpdated(() => {
		if (propsData.data && dialogFormVisible.value) {
			form.value = propsData.data;
			productInfo.value = propsData.data;
		}
	});

	// 组件内部函数 供外部调用函数
	defineExpose({
		openDialog,
		closeDialog,
	});
</script>

<style scoped lang="scss"></style>
