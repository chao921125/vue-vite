<template>
	<el-date-picker
		v-model="dateValue"
		type="daterange"
		unlink-panels
		range-separator="To"
		start-placeholder="Start date"
		end-placeholder="End date"
		:shortcuts="dateOptions.shortcuts"
		@change="changeDate"
	/>
</template>

<script lang="ts" setup name="ReDateQuick">
	import { onMounted, reactive, ref } from "vue";
	import { differenceInDays, format } from "date-fns";

	const props = defineProps({
		defaultValue: {
			type: Array,
			default: () => [],
		},
		defaultDays: {
			type: [String, Number],
			default: "",
		},
	});

	const emit = defineEmits(["change", "getDays"]);

	const dateOptions: any = reactive({
		shortcuts: [
			{
				text: "Last week",
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					return [start, end];
				},
			},
			{
				text: "Last month",
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					return [start, end];
				},
			},
			{
				text: "Last 3 months",
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					return [start, end];
				},
			},
		],
	});

	const dateValue: any = ref<any[]>([]);

	const changeDate = (value: any[]) => {
		emit("getDays", Math.abs(differenceInDays(value[0], value[1])));
		emit("change", [format(new Date(dateValue.value[0]), "yyyy-MM-dd"), format(new Date(dateValue.value[1]), "yyyy-MM-dd")]);
	};

	const initValue = () => {
		dateValue.value.push(new Date());
		dateValue.value.push(new Date().getTime() - 3600 * 1000 * 24 * 7);
		if (props.defaultValue?.length) {
			dateValue.value = props.defaultValue;
		} else if (props.defaultDays) {
			dateValue.value.push(new Date());
			dateValue.value.push(new Date().getTime() - 3600 * 1000 * 24 * Number(props.defaultDays));
		}
		emit("change", [format(new Date(dateValue.value[0]), "yyyy-MM-dd"), format(new Date(dateValue.value[1]), "yyyy-MM-dd")]);
	};
	onMounted(() => {
		initValue();
	});

	defineExpose({});
</script>

<style scoped lang="scss"></style>
