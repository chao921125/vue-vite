<template>
	<el-dialog v-model="dialogFormVisible" @close="closeDialog" width="90%">
		<template #default>
			<el-checkbox-group v-model="checkTableColumn">
				<el-checkbox v-for="(item, index) in tableColumn" :key="index" :label="item.value" :disabled="item.disabled">{{ item.name }}</el-checkbox>
			</el-checkbox-group>
			<el-button v-print="optionPrint">打印</el-button>
			<el-table :data="tableData" id="printBox" style="width: 100%">
				<el-table-column v-if="checkTableColumn.includes('number')" prop="number" label="内部编码" />
				<el-table-column v-if="checkTableColumn.includes('name')" prop="name" label="名称" />
				<el-table-column v-if="checkTableColumn.includes('type')" prop="type" label="种类" />
				<el-table-column v-if="checkTableColumn.includes('criterion')" prop="criterion" label="标准" />
				<el-table-column v-if="checkTableColumn.includes('material')" prop="material" label="材质">
					<template #default="scope"> {{ replaceNullLine(scope.row.material) }} </template>
				</el-table-column>
				<el-table-column prop="specification" label="规格" />
				<el-table-column prop="price" label="价格">
					<template #default="scope"> {{ scope.row.price }}/{{ scope.row.priceUnit }} </template>
				</el-table-column>
				<el-table-column prop="weight" label="重量">
					<template #default="scope"> {{ scope.row.weight }}/{{ scope.row.weightUnit }} </template>
				</el-table-column>
				<el-table-column prop="volumeLength" label="体积">
					<template #default="scope">
						{{ scope.row.volumeLength }}*{{ scope.row.volumeWight }}*{{ scope.row.volumeHeight }}/{{ scope.row.volumeUnit }}
					</template>
				</el-table-column>
				<el-table-column prop="unit" label="单位" />
				<el-table-column prop="desc" label="备注" />
				<el-table-column prop="total" label="数量" />
			</el-table>
		</template>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="closeDialog">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="Detail">
	import { defineProps, defineExpose, onUpdated, ref, reactive } from "vue";
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
	const tableColumn = [
		{
			name: "内部编码",
			value: "number",
			disabled: false,
		},
		{
			name: "名称",
			value: "name",
			disabled: false,
		},
		{
			name: "种类",
			value: "type",
			disabled: false,
		},
		{
			name: "标准",
			value: "criterion",
			disabled: false,
		},
	];
	const checkTableColumn = ref<any[]>(["number"]);

	const optionPrint = reactive({
		// 打印指定容器
		id: "printBox",
		// 打印标准
		standard: "html5",
		// 排除标头 "<...>,<...>"
		extraHead: "",
		// 排除样式 "...,..."
		extraCss: "",
		popTitle: "popTitle",
		// 打印指定url
		// url: "",
		// 预览
		preview: false,
		previewTitle: "", // The title of the preview window. The default is 打印预览
		previewPrintBtnLabel: "", // The title of the preview window. The default is 打印预览
		zIndex: "99999",
		previewBeforeOpenCallback(vue) {
			vue.printLoading = true;
			console.log("正在加载预览窗口");
		},
		previewOpenCallback(vue) {
			vue.printLoading = false;
			console.log("已经加载完预览窗口");
		},
		// 异步打印指定url
		// asyncUrl(reslove, vue) {
		// 	vue.printLoading = false;
		// 	setTimeout(() => {
		// 		reslove("");
		// 	}, 2000);
		// },
		beforeOpenCallback(vue) {
			vue.printLoading = true;
			console.log("打开之前");
		},
		openCallback(vue) {
			vue.printLoading = false;
			console.log("执行了打印");
		},
		closeCallback(vue) {
			vue.printLoading = false;
			console.log("关闭了打印工具");
		},
	});

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
