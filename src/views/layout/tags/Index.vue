<template>
	<el-row>
		<el-col :span="24" class="tags-space"></el-col>
	</el-row>
	<el-row>
		<el-col :span="24" class="tags-content">
			<el-tabs v-model="tabValue" type="card" closable @tab-remove="removeTab">
				<el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Tags">
	import { onBeforeRouteUpdate } from "vue-router";
	import Utils from "@/plugins/utils";
	import Constants from "@/plugins/constants";
	import { $t } from "@/plugins/i18n";

	let tabs = reactive<any[]>([
		{
			label: $t("message.menu.home"),
			name: "Home",
			closable: false,
		},
	]);
	const tabValue = ref("/");

	onBeforeRouteUpdate((to) => {
		Utils.Storages.setLocalStorage(Constants.storageKey.tags, addTab(to));
	});
	const addTab = (route: any) => {
		let tags = Utils.Storages.getLocalStorage(Constants.storageKey.tags);
		let setTags = new Set(tags);

		setTags.add({
			label: $t(route.meta.title),
			name: route.name,
			closable: true,
		});
		tabValue.value = String(route.name);
		tabs = [...setTags];
		return tabs;
	};
	const removeTab = () => {};
</script>

<style scoped lang="scss">
	@import "./index";
</style>
