<template
	>menu list
	<el-button @click="toAdd">to add</el-button>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useRouter } from "vue-router";

	export default defineComponent({
		name: "MenuList",
		setup() {
			const router = useRouter();
			const toAdd = () => {
				router.push({ path: "/system/menu/add" });
			};
			return {
				toAdd,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
