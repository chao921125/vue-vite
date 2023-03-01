<template>
	<el-row class="tags-space">
		<el-col :span="24"></el-col>
	</el-row>
	<el-card class="main-tags tags-content">
		<el-row>
			<el-col :span="24" class="re-flex-row">
				<el-tag :disable-transitions="false" class="re-cursor-pointer re-m-r-10" @click="changeRouter('/home')" :type="tabValue === '/home' ? '' : 'info'">
					{{ $t("message.menu.home") }}
				</el-tag>
				<el-tag
					v-for="(item, index) in tabs"
					:key="index"
					closable
					:disable-transitions="false"
					:type="tabValue === item.name ? '' : 'info'"
					@close="removeTab(item.name)"
					@click="changeRouter(item.name)"
					class="re-cursor-pointer re-m-r-10"
				>
					{{ item.label }}
				</el-tag>
			</el-col>
		</el-row>
	</el-card>
</template>

<script lang="ts" setup name="Tags">
	import Utils from "@/plugins/utils";
	import Constants from "@/plugins/constants";
	import { $t } from "@/plugins/i18n";

	const router = useRouter();
	const route = useRoute();
	let tabs = ref<any[]>([]);
	const tabValue = ref("/home");
	const addTab = (route: any) => {
		if (route.meta.isHide) {
			return false;
		}
		tabValue.value = route.fullPath;
		if (route.fullPath === "/home") {
			return false;
		}
		let tags = Utils.Storages.getLocalStorage(Constants.storageKey.tags);
		tags.push({
			label: $t(route.meta.title),
			name: route.fullPath,
			closable: true,
		});
		tabs.value = Array.from(new Set(tags.map((v: any) => JSON.stringify(v)))).map((item: any) => JSON.parse(item));
		return tabs.value;
	};
	const removeTab = (name: string) => {
		if (name === "/home") {
			return false;
		}
		let activeName = tabValue.value;
		// const index = tabArray.map((item) => item.name).indexOf(name);
		const index = tabs.value.findIndex((item) => item.name === name);
		tabs.value.splice(index, 1);
		if (tabs.value.length) {
			if (name === activeName) {
				if (index === tabs.value.length) {
					activeName = tabs.value[index - 1].name;
				} else {
					activeName = tabs.value[index].name;
				}
			}
		} else {
			activeName = "/home";
		}
		tabValue.value = activeName;
		Utils.Storages.setLocalStorage(Constants.storageKey.tags, tabs.value);
		router.push({ path: tabValue.value });
	};
	const changeRouter = (tabName: any) => {
		router.push({ path: tabName });
	};
	onMounted(() => {
		// if (!Utils.Storages.getLocalStorage(Constants.storageKey.tags)) {
		// 	Utils.Storages.setLocalStorage(Constants.storageKey.tags, [
		// 		{
		// 			label: $t("message.menu.home"),
		// 			name: "/home",
		// 			closable: false,
		// 		},
		// 	]);
		// }
		tabs.value = Utils.Storages.getLocalStorage(Constants.storageKey.tags) || [];
		tabValue.value = route.path;
	});
	onBeforeRouteUpdate((to) => {
		Utils.Storages.setLocalStorage(Constants.storageKey.tags, addTab(to));
	});
</script>

<style scoped lang="scss">
	@import "./index";
</style>
