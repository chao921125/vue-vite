<template>
	<el-row justify="end">
		<el-col :span="24" class="re-flex-row-end page-box">
			<el-pagination
				v-model:currentPage="pageOption.pageCurrent"
				v-model:page-size="pageOption.pageSize"
				:page-sizes="pageOption.pageSizes"
				:small="pageOption.small"
				:disabled="pageOption.disabled"
				:background="pageOption.background"
				:layout="pageOption.layout"
				:total="pageOption.pageTotal"
				@size-change="pageChangeSize"
				@current-change="pageChangeCurrent"
			/>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="ElPage">
	import { defineProps, defineEmits, defineExpose, reactive } from "vue";

	const propsData = defineProps({
		current: {
			type: Number,
			default: 1,
		},
		total: {
			type: Number,
			default: 0,
		},
	});
	const emits = defineEmits(["changeSize", "changeCurrent"]);

	const pageOption = reactive({
		pageCurrent: propsData.current,
		pageSize: 50,
		pageTotal: propsData.total,
		pageSizes: [10, 50, 100, 200],
		small: false,
		disabled: false,
		background: false,
		layout: "total, sizes, prev, pager, next, jumper",
	});

	const pageChangeSize = (val: number) => {
		emits("changeSize", val);
	};
	const pageChangeCurrent = (val: number) => {
		emits("changeCurrent", val);
	};

	defineExpose({
		pageChangeSize,
		pageChangeCurrent,
	});
</script>

<style scoped lang="scss"></style>
