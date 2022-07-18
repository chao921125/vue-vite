<template>
	<div v-if="isColl" class="logo-full" @click="changeCollapse">Logo Full</div>
	<div v-else class="logo-only" @click="changeCollapse">Logo</div>
	<el-scrollbar>
		<el-menu>

		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme";
import SubItem from "@/views/layout/menu/SubItem.vue";

export default defineComponent({
	name: "Index",
	components: {SubItem},
	setup() {
		const storeThemeConfig = useThemeConfig();
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
			changeCollapse,
		};
	},
});
</script>

<style scoped lang="scss"></style>
