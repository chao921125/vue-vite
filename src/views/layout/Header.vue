<script setup lang="ts">
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

<style scoped lang="scss">
	.user-avatar {
		width: 40px;
		height: 40px;
	}
</style>
