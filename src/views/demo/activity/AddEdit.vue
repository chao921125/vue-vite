<script setup lang="ts">
	import Bpmn from "./components/Bpmn.vue";
	const router = useRouter();
	const toAddEdit = () => {
		router.push({ path: "/demo/activity" });
	};
</script>

<template>
	<el-button @click="toAddEdit">To Back</el-button>
	<bpmn></bpmn>
</template>

<style scoped lang="scss"></style>
