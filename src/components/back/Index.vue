<template>
	<el-button link @click="goBack" type="primary">back</el-button>
</template>

<script lang="ts" setup name="Back">
	const propsData = defineProps({
		url: {
			type: String,
			default: "",
		},
	});
	const router = useRouter();
	const goBack = () => {
		if (propsData.url) {
			router.push({ path: propsData.url });
		} else {
			router.back();
		}
	};
</script>

<style scoped lang="scss"></style>
