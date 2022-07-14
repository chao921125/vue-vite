<template>
	<div v-if="isAdmin" class="common-layout">
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">Aside</el-aside>
				<el-container>
					<el-main><router-view></router-view></el-main>
					<el-footer>Footer</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
	<div v-else class="common-layout">
		<el-container>
			<el-header>Header</el-header>
			<el-main><router-view></router-view></el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Config from "@/router/config";

export default defineComponent({
	name: "Layout",
	setup() {
		const isAdmin = ref(true);
		isAdmin.value = Config.isAdminIframe;

		return {
			isAdmin,
		};
	},
});
</script>

<style scoped></style>
