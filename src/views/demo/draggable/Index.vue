<template>
	<div
		class="drag-area"
		@dragover.prevent="handleDragOver"
		@drop="handleDrop">
		<div
			v-for="box in boxes"
			:key="box.id"
			:class="['drop-box', box.id === draggedBoxId ? 'dragging' : '']"
			@drop="handleBoxDrop(box.id)">
			<!-- 根据 box.content 来动态显示内容 -->
			<div v-if="draggedBoxId !== box.id">{{ box.content }}</div>
		</div>
		<div
			v-for="item in items"
			:key="item.id"
			draggable="true"
			:class="['drag-item', item.id === draggedItemId ? 'dragging' : '']"
			@dragstart="handleDragStart(item.id)">
			<!-- 根据 item.content 来动态显示内容 -->
			{{ item.content }}
		</div>
	</div>
</template>

<script lang="ts" setup name="">
	const draggedItemId = ref(null);
	const draggedBoxId = ref(null);

	// 初始化盒子和项目的数据
	const boxes = reactive([
		{ id: "box1", content: "Box 1" },
		{ id: "box2", content: "Box 2" },
		// 更多盒子...
	]);

	const items = reactive([
		{ id: "item1", content: "Item 1" },
		{ id: "item2", content: "Item 2" },
		// 更多项目...
	]);

	// 当开始拖拽项目时触发
	function handleDragStart(itemId) {
		draggedItemId.value = itemId;
	}

	// 当拖拽进区域时触发
	function handleDragOver(event) {
		event.preventDefault();
	}

	// 当项目在区域内放下时触发
	function handleDrop(event) {
		event.preventDefault();
		draggedBoxId.value = null; // 重置拖拽的盒子ID
	}

	// 当项目在盒子内放下时触发
	function handleBoxDrop(boxId) {
		if (draggedItemId.value) {
			const item = items.find((i) => i.id === draggedItemId.value);
			if (item) {
				// 逻辑处理: 你可以根据业务需求来更新盒子的内容
				console.log(`Item ${item.content} dropped in ${boxId}`);
			}
		}
		draggedItemId.value = null; // 重置拖拽的项目ID
	}
</script>

<style scoped lang="scss">
	.drag-area {
		border: 2px solid #ccc;
		padding: 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.drop-box {
		width: 120px;
		height: 120px;
		border: 1px dashed #aaa;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px;
	}

	.drag-item {
		margin: 10px;
		padding: 10px;
		background-color: #ddd;
		cursor: grab;
	}

	.dragging {
		opacity: 0.4;
	}
</style>
