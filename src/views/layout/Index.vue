<template>
	<el-container v-if="isAdmin" class="">
		<el-aside width="200px"><AdminMenu></AdminMenu></el-aside>
		<el-container>
			<el-header><AdminHeader></AdminHeader></el-header>
			<el-main><router-view></router-view></el-main>
			<el-footer><AdminFooter></AdminFooter></el-footer>
		</el-container>
	</el-container>
	<el-container v-else class="">
		<el-header>Web 下因需求不同，请重写</el-header>
		<el-main><router-view></router-view></el-main>
		<el-footer>Web 下因需求不同，请重写</el-footer>
	</el-container>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";
	import Settings from "@/router/common";
	import AdminMenu from "./menu/Index.vue";
	import AdminHeader from "./header/Index.vue";
	import AdminFooter from "./footer/Index.vue";

	export default defineComponent({
		name: "Layout",
		components: { AdminMenu, AdminHeader, AdminFooter },
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
