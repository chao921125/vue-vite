<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, Ref } from "vue";

// 定义 props
const props = defineProps({
	// 滚动方向：'up'、'down'、'left'、'right'
	direction: {
		type: String,
		default: "up",
		validator: (value: string) => ["up", "down", "left", "right"].includes(value),
	},
	// 滚动速度（像素/秒）
	speed: {
		type: Number,
		default: 30,
	},
	// 是否自动滚动
	autoPlay: {
		type: Boolean,
		default: true,
	},
	// 鼠标悬停时是否停止滚动
	hoverStop: {
		type: Boolean,
		default: true,
	},
});

// 引用 DOM 元素
const scrollContainer: Ref<HTMLElement | null> = ref(null);
const scrollContent: Ref<HTMLElement | null> = ref(null);

// 滚动偏移量
const offset = ref(0);
// 是否暂停滚动
const isPaused = ref(false);
// 动画帧 ID
let animationFrameId: number | null = null;
// 上一帧时间戳
let lastTime: number | null = null;

// 计算滚动内容的样式
const contentStyle = computed(() => {
	if (props.direction === "up" || props.direction === "down") {
		return { transform: `translateY(-${offset.value}px)` };
	} else {
		return { transform: `translateX(-${offset.value}px)` };
	}
});

// 更新滚动位置
const updateScroll = (timestamp: number) => {
	if (!lastTime) lastTime = timestamp;
	const deltaTime = (timestamp - lastTime) / 1000; // 转换为秒
	lastTime = timestamp;

	if (!isPaused.value) {
		const container = scrollContainer.value;
		const content = scrollContent.value;
		if (!container || !content) return;

		const isVertical = props.direction === "up" || props.direction === "down";
		const size = isVertical ? content.clientHeight / 2 : content.clientWidth / 2;

		// 根据方向和速度更新偏移量
		const speedPerFrame = props.speed * deltaTime;
		if (props.direction === "up" || props.direction === "left") {
			offset.value += speedPerFrame;
			if (offset.value >= size) offset.value -= size;
		} else {
			offset.value -= speedPerFrame;
			if (offset.value <= -size) offset.value += size;
		}
	}

	animationFrameId = requestAnimationFrame(updateScroll);
};

// 鼠标悬停处理
const handleMouseEnter = () => {
	if (props.hoverStop) isPaused.value = true;
};
const handleMouseLeave = () => {
	if (props.hoverStop) isPaused.value = false;
};

// 组件生命周期
onMounted(() => {
	if (props.autoPlay) {
		animationFrameId = requestAnimationFrame(updateScroll);
	}
});

onUnmounted(() => {
	if (animationFrameId) {
		cancelAnimationFrame(animationFrameId);
	}
});
</script>

<template>
	<div class="scroll-container" ref="scrollContainer" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
		<div class="scroll-content" :style="contentStyle">
			<slot></slot>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
.scroll-container {
	overflow: hidden;
	position: relative;
}

.scroll-content {
	display: flex;
	flex-direction: column;
	transition: transform 0s linear; /* 确保重置时无过渡动画 */
}

.scroll-content.horizontal {
	flex-direction: row;
}
</style>
