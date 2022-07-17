<template>
	<el-container v-if="isAdmin" class="">
		<el-aside width="200px">Aside</el-aside>
		<el-container>
			<el-header>Header</el-header>
			<el-main><router-view></router-view></el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
	<el-container v-else class="">
		<el-header>Header</el-header>
		<el-main><router-view></router-view></el-main>
		<el-footer>Footer</el-footer>
	</el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Settings from "@/router/common";

export default defineComponent({
	name: "Layout",
	setup() {
		const isAdmin = ref(true);
		isAdmin.value = Settings.isAdminIframe;

		return {
			isAdmin,
		};
	},
});
</script>

<style scoped></style>
