<template>
	<el-button @click="toAddEdit">Add Edit</el-button>
</template>

<script lang="ts" setup name="">
	const router = useRouter();
	const toAddEdit = () => {
		router.push({ path: "/demo/activity/add-edit" });
	};
</script>

<style scoped lang="scss"></style>
