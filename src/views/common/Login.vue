<script setup>
	// import { appStore } from "@/store/index.js";

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

	// const ignoredOnLogin = () => {
	// 	appStore.useUserInfo.setUserInfo({});
	// };
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
