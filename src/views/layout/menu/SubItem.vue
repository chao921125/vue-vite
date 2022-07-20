<template>
	<template v-for="(item, index) in menuList" :key="index">
		<template v-if="!item.isHide">
			<el-sub-menu
				v-if="!item.isHideSubMenu && item.children && item.children.length > 0"
				:key="item.id"
				:index="item.path"
				v-bind="$attrs"
			>
				<template #title>
					<i class="iconfont" :class="item.icon"></i>
					<span>{{ $t(item.title) }}</span>
				</template>
				<SubItem :menuList="item.children" :basePath="item.path + '/'"></SubItem>
			</el-sub-menu>
			<el-menu-item v-else :key="item.id" :index="resolvePath(item.path)">
				<!-- 此处图标可以自定义 -->
				<i class="iconfont" :class="item.icon"></i>
				<template #title>{{ $t(item.title) }}</template>
			</el-menu-item>
		</template>
	</template>
</template>

<script lang="ts">
	import { defineComponent, computed } from "vue";

	export default defineComponent({
		name: "SubItem",
		props: {
			menuList: {
				type: Object,
				default: () => [],
			},
			basePath: {
				type: String,
				default: "",
			},
		},
		setup(props) {
			const menuList = computed(() => {
				return <any>props.menuList || [];
			});

			const resolvePath = (path: string) => {
				return props.basePath + path;
			};
			return {
				menuList,
				resolvePath,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
