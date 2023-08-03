<template>
	<template v-for="(item, index) in menuList">
		<template v-if="!item.isHide && !item.isMobile">
			<el-sub-menu v-if="!item.isHideSubMenu && item.children && item.children.length" :key="item.path + index" :index="item.path" v-bind="$attrs">
				<template #title>
					<i class="iconfont" :class="item.icon"></i>
					<span class="re-ml-5">{{ $t(item.title) }}</span>
				</template>
				<SubMenu :menus="item.children" :basePath="item.path + '/'"></SubMenu>
			</el-sub-menu>
			<el-menu-item v-else :key="item.path + index" :index="resolvePath(item.path)">
				<!-- 此处图标可以自定义 -->
				<i class="iconfont" :class="item.icon"></i>
				<template #title>
					<span class="re-ml-5">{{ $t(item.title) }}</span>
				</template>
			</el-menu-item>
		</template>
	</template>
</template>

<script lang="ts" setup name="SubItem">
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
