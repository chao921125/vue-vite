<template>
	<div @click="changeClick">template {{ props.name }}</div>
</template>

<script lang="ts" setup name="TempScriptSetup">
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

<style scoped lang="scss"></style>
