<template>
	<svg class="svg-icon" aria-hidden="true">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script lang="ts" setup name="IconSvg">
	const props = defineProps({
		prefix: {
			type: String,
			default: "svg",
		},
		name: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: "#333",
		},
		width: {
			type: Number,
			default: 16,
		},
		height: {
			type: Number,
			default: 16,
		},
	});
	const symbolId = computed(() => `#${props.prefix}-${props.name}`);
	// const symbolId = computed({
	// 	get() {
	// 		return `#${props.prefix}-${props.name}`;
	// 	},
	// 	set() {},
	// });
</script>

<style scoped lang="scss">
	.svg-icon {
		width: 20px;
		height: 20px;
		overflow: hidden;
		vertical-align: -0.1px; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
		fill: currentcolor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
		animation: loadingCircle 1s infinite linear;
	}
</style>
