<template>
	<template v-for="(item, index) in menuList" :key="index">
		<template v-if="!item.isHide">
			<el-sub-menu v-if="!item.isHideSubMenu && item.children && item.children.length > 0" :key="item.id" :index="item.path" v-bind="$attrs">
				<template #title>
					<i class="iconfont" :class="item.icon"></i>
					<span class="re-m-l-5">{{ $t(item.title) }}</span>
				</template>
				<SubMenu :menus="item.children" :basePath="item.path + '/'"></SubMenu>
			</el-sub-menu>
			<el-menu-item v-else :key="item.id" :index="resolvePath(item.path)">
				<!-- 此处图标可以自定义 -->
				<i class="iconfont" :class="item.icon"></i>
				<template #title>
					<span class="re-m-l-5">{{ $t(item.title) }}</span>
				</template>
			</el-menu-item>
		</template>
	</template>
</template>

<script lang="ts" setup name="SubItem">
	import { defineProps, computed } from "vue";

	const props = defineProps({
		menus: {
			type: Object,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: () => [],
		},
		basePath: {
			type: String,
			default: "",
		},
	});
	const menuList = computed(() => {
		return props.menus || [];
	});
	const resolvePath = (path: string) => {
		return props.basePath + path;
	};
</script>

<style scoped lang="scss"></style>
