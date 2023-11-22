<template>
	<el-button @click="toAddEdit">To Back</el-button>
</template>

<script lang="ts" setup name="">
	const router = useRouter();
	const toAddEdit = () => {
		router.push({ path: "/demo/activity" });
	};
</script>

<style scoped lang="scss"></style>
