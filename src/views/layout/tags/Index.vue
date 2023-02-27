<template>
	<el-row>
		<el-col :span="24" class="tags-space"></el-col>
	</el-row>
	<el-row>
		<el-col :span="24" class="tags-content">
			<el-tabs v-model="tabValue" type="card" closable addable editable @tab-remove="removeTab">
				<el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name" :closable="item.closable"></el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Tags">
	import { onBeforeRouteUpdate } from "vue-router";
	import Utils from "@/plugins/utils";
	import Constants from "@/plugins/constants";
	import { $t } from "@/plugins/i18n";

	let tabs = reactive<any[]>([]);
	const tabValue = ref("/");
	onMounted(() => {
		if (!Utils.Storages.getLocalStorage(Constants.storageKey.tags)) {
			Utils.Storages.setLocalStorage(Constants.storageKey.tags, [
				{
					label: $t("message.menu.home"),
					name: "Home",
					closable: false,
				},
			]);
		}
		tabs = Utils.Storages.getLocalStorage(Constants.storageKey.tags);
	});
	onBeforeRouteUpdate((to) => {
		Utils.Storages.setLocalStorage(Constants.storageKey.tags, addTab(to));
	});
	const addTab = (route: any) => {
		let tags = Utils.Storages.getLocalStorage(Constants.storageKey.tags);
		tags.push({
			label: $t(route.meta.title),
			name: route.name,
			closable: true,
		});
		tabValue.value = String(route.name);
		tabs = Array.from(new Set(tags.map((v: any) => JSON.stringify(v)))).map((item: any) => JSON.parse(item));
		return tabs;
	};
	const removeTab = () => {
		// name: string
		// const isCurrent = name === tabValue;
		// if ()
	};
</script>

<style scoped lang="scss">
	@import "./index";
</style>
