<template>
	<el-button @click="toAddEdit">To Back</el-button>
	<bpmn></bpmn>
</template>

<script lang="ts" setup name="">
	import Bpmn from "./components/Bpmn.vue";
	const router = useRouter();
	const toAddEdit = () => {
		router.push({ path: "/demo/activity" });
	};
</script>

<style scoped lang="scss"></style>
