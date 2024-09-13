<script setup lang="ts">
	const router = useRouter();
	const toAddEdit = () => {
		router.push({ path: "/demo/activity/add-edit" });
	};
</script>

<template>
	<el-button @click="toAddEdit">Add Edit</el-button>
</template>

<style scoped lang="scss"></style>
