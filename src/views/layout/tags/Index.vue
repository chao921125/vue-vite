<script setup lang="ts">
	import Storage from "@/plugins/utils/storage";
	import Constants from "@/plugins/constants";
	import RouterConfig from "@/config/routerConfig";
	import { $t } from "@/plugins/i18n";

	const router = useRouter();
	const route = useRoute();
	let tabs = ref<any>([]);
	const tabValue = ref<string>("/home");
	const addTab = (routeCurrent: any) => {
		if (routeCurrent.meta.isHide) {
			return false;
		}
		tabValue.value = routeCurrent.fullPath;
		if (routeCurrent.fullPath === "/home") {
			return false;
		}
		let tags = Storage.getLocalStorage(Constants.storageKey.tags) || [];
		tags.push({
			label: routeCurrent.meta.title,
			name: routeCurrent.fullPath,
			closable: true,
		});
		tabs.value = Array.from(new Set(tags.map((value: any) => JSON.stringify(value)))).map((item: any) => JSON.parse(item));
		return tabs.value;
	};
	const removeTab = (name: string) => {
		if (name === RouterConfig.routeHome) {
			return false;
		}
		let activeName = tabValue.value;
		if (tabs.value.length) {
			// const index = tabArray.map((item) => item.name).indexOf(name);
			const index = tabs.value.findIndex((item: any) => item.name === name);
			tabs.value.splice(index, 1);
			if (name === activeName) {
				if (!tabs.value.length) {
					activeName = RouterConfig.routeHome;
				} else if (index === tabs.value.length) {
					activeName = tabs.value[index - 1].name;
				} else {
					activeName = tabs.value[index].name;
				}
			}
		} else {
			activeName = RouterConfig.routeHome;
		}
		tabValue.value = activeName;
		Storage.setLocalStorage(Constants.storageKey.tags, tabs.value);
		router.push({ path: tabValue.value });
	};
	const changeRouter = (tabName: any) => {
		router.push({ path: tabName });
	};
	// 点击更多
	const clickChange = (command: string | number | object) => {
		let routeTemp = {},
			activeName = tabValue.value;
		if (command === "0" || command === 0) {
			routeTemp = {
				label: String(route.meta.title!),
				name: route.fullPath,
				closable: true,
			};
			activeName = route.fullPath;
			tabs.value = [];
			tabs.value.push(routeTemp);
		}
		if (command === "1" || command === 1) {
			activeName = RouterConfig.routeHome;
			tabs.value = [];
		}
		Storage.setLocalStorage(Constants.storageKey.tags, tabs.value);
		tabValue.value = activeName;
		router.push({ path: tabValue.value });
	};
	onMounted(() => {
		// if (!Storage.getLocalStorage(Constants.storageKey.tags)) {
		// 	Storage.setLocalStorage(Constants.storageKey.tags, [
		// 		{
		// 			label: $t("message.menu.home"),
		// 			name: "/home",
		// 			closable: false,
		// 		},
		// 	]);
		// }
		tabs.value = Storage.getLocalStorage(Constants.storageKey.tags) || [];
		tabValue.value = route.path;
	});
	onBeforeRouteUpdate((to) => {
		Storage.setLocalStorage(Constants.storageKey.tags, addTab(to));
	});
</script>

<template>
	<div class="re-f-row-between tags-content">
		<el-scrollbar class="tags-list">
			<div class="re-f-row">
				<el-tag
					:disable-transitions="false"
					class="re-cursor-pointer re-mr-10"
					@click="changeRouter('/home')"
					:type="tabValue === '/home' ? 'primary' : 'info'">
					{{ $t("message.menu.home") }}
				</el-tag>
				<el-tag
					v-for="(item, index) in tabs"
					:key="index"
					:closable="true"
					:disable-transitions="false"
					:type="tabValue === item.name ? 'primary' : 'info'"
					@close="removeTab(item.name)"
					@click="changeRouter(item.name)"
					class="re-cursor-pointer re-mr-10">
					{{ $t(item.label) }}
				</el-tag>
			</div>
		</el-scrollbar>
		<el-dropdown
			@command="clickChange"
			class="tags-option">
			<el-button
				type="primary"
				size="small">
				更多
			</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="0">关闭其他标签</el-dropdown-item>
					<el-dropdown-item command="1">关闭所有标签</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<style scoped lang="scss">
	.tags-space {
		width: 100%;
		height: 25px;
	}
	.tags-content {
		background-color: var(--el-bg-color);
		box-sizing: border-box;
		//position: fixed;
		//z-index: 99999;
		//top: 60px;
		padding: 5px 20px;
		//background-color: #fff;
		.tags-list {
			width: calc(100% - 70px);
		}
		.tags-option {
			width: 50px;
		}
	}
</style>
