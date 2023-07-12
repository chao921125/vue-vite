<template>
	<el-button link @click="goBack" type="primary">back</el-button>
</template>

<script lang="ts" setup name="CcBack">
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

<style scoped lang="scss"></style>
