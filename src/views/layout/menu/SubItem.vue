<template>
	<template v-for="(item, index) in menuList" :key="index">
		<template v-if="!item.isHide">
			<el-sub-menu v-if="!item.isHideSubMenu && item.children && item.children.length > 0" :key="item.id" :index="item.path" v-bind="$attrs">
				<template #title>
					<span>{{ item.title }}</span>
				</template>
				<SubMenu :sub-menu-list="item.children" :base-path="item.path + '/'"></SubMenu>
			</el-sub-menu>
			<el-menu-item v-else :key="item.id" :index="resolvePath(item.path)">
				<!-- 此处图标可以自定义 -->
				<template #title>{{ item.title }}</template>
			</el-menu-item>
		</template>
	</template>
			<el-sub-menu index="1-4">
				<template #title>item four</template>
				<el-menu-item index="1-4-1">item one</el-menu-item>
			</el-sub-menu>
<!--		<SubItem v-if="item === 6"></SubItem>-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
	name: "SubItem",
	props: {
		menuList: {
			type: Array,
			default: () => [],
		}
	},
	setup(props) {
		const menuList = computed(() => {
			return <any>props.menuList || [];
		});
		return {
			menuList,
		}
	},
});
</script>

<style scoped lang="scss"></style>
