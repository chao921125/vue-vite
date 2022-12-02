<template>
	<el-dialog v-model="dialogFormVisible" @close="closeDialog" width="90%">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="number" label="内部编码" width="120" />
			<el-table-column prop="name" label="名称" width="120" />
			<el-table-column prop="type" label="种类" width="120" />
			<el-table-column prop="criterion" label="标准" width="120" />
			<el-table-column prop="material" label="材质" width="120">
				<template #default="scope"> {{ replaceNullLine(scope.row.material) }} </template>
			</el-table-column>
			<el-table-column prop="specification" label="规格" width="120" />
			<el-table-column prop="price" label="价格" width="120">
				<template #default="scope"> {{ scope.row.price }}/{{ scope.row.priceUnit }} </template>
			</el-table-column>
			<el-table-column prop="weight" label="重量" width="120">
				<template #default="scope"> {{ scope.row.weight }}/{{ scope.row.weightUnit }} </template>
			</el-table-column>
			<el-table-column prop="volumeLength" label="体积" width="120">
				<template #default="scope"> {{ scope.row.volumeLength }}*{{ scope.row.volumeWight }}*{{ scope.row.volumeHeight }}/{{ scope.row.volumeUnit }} </template>
			</el-table-column>
			<el-table-column prop="unit" label="单位" width="120" />
			<el-table-column prop="desc" label="备注" />
			<el-table-column prop="total" label="数量" width="120" fixed="right" />
		</el-table>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="closeDialog">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="Detail">
	import { defineProps, defineExpose, onUpdated, ref } from "vue";
	import { Product } from "@/interface/product";
	import { replaceNullLine } from "@/plugins/utils/format";

	// 组件内部函数 接收及传递结果
	const propsData = defineProps({
		data: {
			type: Object,
			default: () => {
				return {};
			},
		},
	});

	// 表单
	const tableData = ref<Product[]>([]);

	// 弹窗
	const dialogFormVisible = ref(false);
	const openDialog = () => {
		dialogFormVisible.value = true;
	};
	const closeDialog = () => {
		dialogFormVisible.value = false;
	};

	// 数据信息
	const initData = () => {
		console.log(propsData.data);
		tableData.value = [
			{
				id: 1,
				name: "外丝接头",
				type: "NPT螺纹",
				criterion: "国标",
				number: "DN1233",
				material: "钢",
				specification: "DN52'R33",
				weight: 123,
				weightUnit: "g",
				price: 3.33,
				priceUnit: "元",
				volumeLength: 12,
				volumeWight: 23,
				volumeHeight: 33,
				volumeUnit: "m³",
				unit: "个",
				total: 123,
				isStock: 0,
			},
			{
				id: 1,
				name: "扳手",
				type: "配件",
				criterion: "欧标",
				number: "DN1233",
				material: "",
				specification: "DN52'R33",
				weight: 123,
				weightUnit: "g",
				price: 3.33,
				priceUnit: "元",
				volumeLength: 12,
				volumeWight: 23,
				volumeHeight: 33,
				volumeUnit: "m³",
				unit: "个",
				total: 123,
				isStock: 0,
			},
		];
	};

	onUpdated(() => {
		if (propsData.data && dialogFormVisible.value) {
			initData();
		}
	});

	// 组件内部函数 供外部调用函数
	defineExpose({
		openDialog,
		closeDialog,
	});
</script>

<style scoped lang="scss"></style>
