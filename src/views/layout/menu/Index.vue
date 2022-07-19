<template>
	<div v-if="isColl" class="logo-full" @click="changeCollapse">Logo Full</div>
	<div v-else class="logo-only" @click="changeCollapse">Logo</div>
	<el-scrollbar>
		<el-menu
			active-text-color="#ffd04b"
			background-color="#545c64"
			class="el-menu-vertical-demo"
			default-active="2"
			text-color="#fff"
			:collapse="!isColl"
			@open="handleOpen"
			@close="handleClose"
		>
			<SubItem v-if="state.menuList && state.menuList.length > 0" :menuList="state.menuList"></SubItem>
		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onBeforeMount, watch } from "vue";
import SubItem from "./SubItem.vue";
import { storeToRefs } from "pinia";
import pinia from "@/store";
import { useThemeConfig } from "@/store/modules/theme";
import { useRouterList } from "@/store/modules/routerMeta";

export default defineComponent({
	name: "Index",
	components: {SubItem},
	setup() {
		const storeThemeConfig = useThemeConfig(pinia);
		const { themeConfig } = storeToRefs(storeThemeConfig);
		const isColl = computed(() => {
			let { isCollapse } = themeConfig.value;
			return !isCollapse;
		});
		const changeCollapse = () => {
			themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
		};

		const storeRouterList = useRouterList(pinia);
		const { menuList } = storeToRefs(storeRouterList);
		let state = reactive({
			menuList: Array<any>
		});
		const setMenu = () => {
			(state.menuList as any) = menuList.value || [];
		}

		const handleOpen = (key: string, keyPath: string[]) => {
			console.log("ig", key, keyPath)
		}
		const handleClose = (key: string, keyPath: string[]) => {
			console.log("ig",  	key, keyPath)
		}

		watch(pinia.state, (value) => {
			console.log(value);
			setMenu();
		}, {
			deep: true,
		});
		onBeforeMount(() => {
			setMenu();
		});

		return {
			isColl,
			state,
			handleOpen,
			handleClose,
			changeCollapse,
		};
	},
});
</script>

<style scoped lang="scss"></style>
