<template>
	<el-row>
		<el-col :span="24">
			<div class="ani-tr rotate-center">zhuan zhuan zhuan</div>
		</el-col>
		<el-col :span="24">
			<lottery-wheel></lottery-wheel>
		</el-col>
		<el-col :span="24">
			<el-button @click="changeTransition()">点击 测试自带过渡效果</el-button>
			<Transition
				name="fade"
				mode="out-in"
				appear>
				<div v-if="transition">toggled content</div>
			</Transition>
		</el-col>
		<el-col
			:span="24"
			class="re-mt-20">
			<el-button @click="addTransition()">插入</el-button>
			<el-button @click="shuffleTransition()">随机排序</el-button>
			<el-button @click="resetTransition()">重置</el-button>
			<TransitionGroup
				tag="ul"
				name="fade"
				class="container">
				<li
					v-for="(item, index) in items"
					:key="index"
					class="item">
					{{ item }}
				</li>
			</TransitionGroup>
		</el-col>
		<el-col
			:span="24"
			class="re-mt-20">
			<SelfMadeSystem></SelfMadeSystem>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="">
	import { shuffle } from "lodash-es";
	import LotteryWheel from "./components/LotteryWheel.vue";
	import SelfMadeSystem from "./loading/SelfMadeSystem.vue";

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
		border: 1px solid;
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
	.ani-tr {
		width: 200px;
		height: 200px;
		border-radius: 50%;
	}
</style>
