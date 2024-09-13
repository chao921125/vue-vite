<script setup lang="ts">
	const props = defineProps({
		url: {
			type: String,
			default: "",
		},
	});
	const router = useRouter();
	const goBack = () => {
		if (props.url) {
			router.push({ path: props.url });
		} else {
			router.back();
		}
	};
</script>

<template>
	<el-button
		link
		@click="goBack"
		type="primary">
		back
	</el-button>
</template>

<style scoped lang="scss"></style>
