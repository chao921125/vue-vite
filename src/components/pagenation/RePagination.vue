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

<script lang="ts" setup name="RePagination">
	const props = defineProps({
		current: {
			required: true,
			type: Number,
			default: 1,
		},
		limit: {
			type: Number,
			default: 10,
		},
		total: {
			type: Number,
			default: 0,
		},
		sizes: {
			type: Array,
			default: () => {
				return [10, 20, 50, 100, 200];
			},
		},
		autoScroll: {
			type: Boolean,
			default: true,
		},
	});
	const emits = defineEmits(["changeSize", "changeCurrent", "pagination"]);

	const pageOption: any = reactive({
		pageCurrent: props.current,
		pageSize: props.limit,
		pageTotal: props.total,
		pageSizes: props.sizes,
		pagerCount: 7,
		small: false,
		disabled: false,
		background: false,
		layout: "total, sizes, prev, pager, next, jumper",
	});

	const pageChangeSize = (val: number) => {
		emits("changeSize", val);
		emits("pagination", { page: pageOption.pageSizes, limit: val });
		if (props.autoScroll) {
			scrollTo(0, 800);
		}
	};
	const pageChangeCurrent = (val: number) => {
		emits("changeCurrent", val);
		emits("pagination", { page: val, limit: pageOption.pageCurrent });
		if (props.autoScroll) {
			scrollTo(0, 800);
		}
	};

	defineExpose({
		pageChangeSize,
		pageChangeCurrent,
	});
</script>

<style scoped lang="scss"></style>
