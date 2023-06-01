<template>
	<el-row>
		<el-col :span="24">
			<el-button @click="changeTransition()">点击</el-button>
			<Transition name="fade" mode="out-in" appear>
				<div v-if="transition">toggled content</div>
			</Transition>
		</el-col>
		<el-col :span="24" class="re-mt-20">
			<el-button @click="addTransition()">插入</el-button>
			<el-button @click="shuffleTransition()">随机排序(大家先新增，然后再随机排序，嘿嘿～～～～～～)</el-button>
			<el-button @click="resetTransition()">重置</el-button>
			<TransitionGroup tag="ul" name="fade" class="container">
				<li v-for="item in items" :key="item" class="item">
					{{ item }}
				</li>
			</TransitionGroup>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="AnimationCss">
	import { shuffle } from "lodash-es";

	const transition = ref(true);
	const changeTransition = () => {
		transition.value = !transition.value;
	};
	const initItems = () => {
		return [1, 2, 3, 4];
	};
	const items = ref(initItems());
	const addTransition = () => {
		const l = Math.round(Math.random() * items.value.length);
		items.value.splice(l, 0, Math.round(Math.random() * items.value.length));
	};
	const shuffleTransition = () => {
		items.value = shuffle(items.value);
	};
	const resetTransition = () => {
		items.value = initItems();
	};
</script>

<style scoped lang="scss">
	.container {
		position: relative;
		padding: 0;
	}

	.item {
		box-sizing: border-box;
		width: 100%;
		height: 30px;
		background-color: #f3f3f3;
		border: 1px solid #666666;
	}

	/* 1. 声明过渡效果 */
	.fade-move,
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
	}

	/* 2. 声明进入和离开的状态 */
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: scaleY(0.01) translate(30px, 0);
	}

	/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
	.fade-leave-active {
		position: absolute;
	}
</style>
