<template>
	<el-row :gutter="10" justify="space-between">
		<el-col :xs="24" :sm="12" class="test-a">nav<label class="test-b">123</label></el-col>
		<el-col :xs="24" :sm="12">
			<el-button @click="isShowDrawer = true">setting</el-button>
			<el-button @click="logout">logout</el-button>
		</el-col>
	</el-row>
	<el-drawer v-model="isShowDrawer" title="system setting" :with-header="false">
		<span>Hi there!</span>
	</el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Utils from "@/plugins/utils";

export default defineComponent({
	name: "Index",
	setup() {
		let isShowDrawer = ref(false);

		const router = useRouter();
		function logout() {
			Utils.Storages.removeSessionStorage(Utils.Constants.storageKeys.token);
			Utils.Cookies.removeCookie(Utils.Constants.cookieKeys.token);
			router.push({ path: "/login" });
		}
		return {
			isShowDrawer,
			logout,
		}
	},
});
</script>

<style scoped lang="scss">
.test-a {
	.test-b {
		font-weight: bold;
	}
}
</style>
