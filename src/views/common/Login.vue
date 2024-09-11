<script setup>
	const props = defineProps({
		name: {
			required: false,
			type: String,
			default: "",
		},
	});
	const emits = defineEmits(["change"]);
	const changeClick = () => {
		emits("change", true);
	};
	defineExpose({
		changeClick,
	});
</script>

<template>
	<div
		@click="changeClick"
		class="">
		template {{ props.name }}
	</div>
</template>

<style scoped lang="scss"></style>
