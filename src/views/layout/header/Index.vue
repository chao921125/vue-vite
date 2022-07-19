<template>
	<el-row :gutter="10" justify="space-between">
		<el-col :xs="24" :sm="12" class="test-a">
			<el-icon @click="changeCollapse">
				<ArrowLeftBold v-if="isColl" />
				<ArrowRightBold v-else />
			</el-icon>
		</el-col>
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
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Utils from "@/plugins/utils";
import { storeToRefs } from "pinia";
import pinia from "@/store";
import { useThemeConfig } from "@/store/modules/theme";

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

		const storeThemeConfig = useThemeConfig(pinia);
		const { themeConfig } = storeToRefs(storeThemeConfig);
		const isColl = computed(() => {
			let { isCollapse } = themeConfig.value;
			return !isCollapse;
		});
		const changeCollapse = () => {
			themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
		};

		return {
			isColl,
			isShowDrawer,
			changeCollapse,
			logout,
		};
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
