<template>
	<el-row>
		<el-col :span="24" class="tags-space"></el-col>
	</el-row>
	<el-row>
		<el-col :span="24" class="tags-content">
			<el-tabs v-model="tabValue" type="card" closable @tab-remove="removeTab" @tab-click="changeRouter">
				<el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name" :closable="item.closable"></el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Tags">
	import Utils from "@/plugins/utils";
	import Constants from "@/plugins/constants";
	import { $t } from "@/plugins/i18n";

	const router = useRouter();
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
		if (name === activeName) {
			if (index === tabs.value.length - 1) {
				activeName = tabs.value[index - 1].name;
			} else {
				activeName = tabs.value[index].name;
			}
		}
		tabValue.value = activeName;
		Utils.Storages.setLocalStorage(Constants.storageKey.tags, tabs.value);
		router.push({ path: tabValue.value });
	};
	const changeRouter = (tab: any) => {
		router.push({ path: tab.props.name });
	};
	onMounted(() => {
		if (!Utils.Storages.getLocalStorage(Constants.storageKey.tags)) {
			Utils.Storages.setLocalStorage(Constants.storageKey.tags, [
				{
					label: $t("message.menu.home"),
					name: "/home",
					closable: false,
				},
			]);
		}
		tabs.value = Utils.Storages.getLocalStorage(Constants.storageKey.tags);
	});
	onBeforeRouteUpdate((to) => {
		Utils.Storages.setLocalStorage(Constants.storageKey.tags, addTab(to));
	});
</script>

<style scoped lang="scss">
	@import "./index";
</style>
