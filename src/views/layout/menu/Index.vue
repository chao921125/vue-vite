<template>
	<div v-if="isColl" class="logo-full" @click="changeCollapse">Logo Full</div>
	<div v-else class="logo-only" @click="changeCollapse">Logo</div>
	<el-scrollbar>
		<el-menu
			class="el-menu-vertical-demo"
			:default-active="changeMenuKey"
			mode="vertical"
			:collapse="!isColl"
			:unique-opened="true"
			@select="toMenu"
		>
			<SubItem v-if="state.menuList && state.menuList.length > 0" :menuList="state.menuList"></SubItem>
		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onBeforeMount, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
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
		const state = reactive({
			menuList: Array<any>
		});
		const setMenu = () => {
			(state.menuList as any) = menuList.value || [];
		}

		const router = useRouter();
		const route = useRoute();


		const changeMenuKey = computed(() => {
			let menuHierarchy = 2;
			let path = route.path.replace("/", "");
			let pathArray = path.split("/");
			if (pathArray.length > menuHierarchy) {
				let returnPath = "";
				for (let i = 0; i < menuHierarchy; i++) {
					returnPath += `/${pathArray[i]}`;
				}
				return returnPath.replace("/", "");
			}
			return path.toString();
		});

		const toMenu = (index) => {
			router.push({path: "/" + index});
		};

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
			changeMenuKey,
			state,
			changeCollapse,
			toMenu,
		};
	},
});
</script>

<style scoped lang="scss"></style>
