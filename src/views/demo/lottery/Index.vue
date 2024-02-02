<template>
	<el-row justify="space-between">
		<el-col :lg="8" :sm="24">
			<LuckyWheel
				ref="wheelRef"
				width="300px"
				height="300px"
				:prizes="wheelOptions.prizes"
				:blocks="wheelOptions.blocks"
				:buttons="wheelOptions.buttons"
				@start="startWheel"
				@end="endWheel"
			></LuckyWheel>
		</el-col>
		<el-col :lg="8" :sm="24">
			<LuckyGrid
				ref="gridRef"
				width="300px"
				height="300px"
				:prizes="girdOptions.prizes"
				:blocks="girdOptions.blocks"
				:buttons="girdOptions.buttons"
				:default-style="girdOptions.defaultStyle"
				@start="startGrid"
				@end="endGrid"
			></LuckyGrid>
		</el-col>
		<el-col :lg="8" :sm="24">
			<SlotMachine
				width="300px"
				height="300px"
				ref="machineRef"
				:prizes="machineOptions.prizes"
				:blocks="machineOptions.blocks"
				:slots="machineOptions.slots"
				:default-config="machineOptions.defaultConfig"
				:default-style="machineOptions.defaultStyle"
				@end="endMachine"
			></SlotMachine>
			<el-button @click="startMachine" type="primary">Start</el-button>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="">
	const wheelOptions = reactive({
		prizes: [
			{ background: "#e9e8fe", fonts: [{ text: "旅游" }] },
			{ background: "#b8c5f2", fonts: [{ text: "游乐场" }] },
			{ background: "#e9e8fe", fonts: [{ text: "商场" }] },
			{ background: "#b8c5f2", fonts: [{ text: "吃吃吃" }] },
			{ background: "#e9e8fe", fonts: [{ text: "爬山" }] },
			{ background: "#b8c5f2", fonts: [{ text: "游泳" }] },
		],
		blocks: [{ padding: "10px", background: "#869cfa" }],
		buttons: [
			{ radius: "40%", background: "#617df2" },
			{ radius: "35%", background: "#afc8ff" },
			{
				radius: "30%",
				background: "#869cfa",
				pointer: true,
				fonts: [{ text: "开始", top: "-10px" }],
			},
		],
	});
	const wheelRef = ref();
	const startWheel = () => {
		wheelRef.value.play();
		setTimeout(() => {
			// 假设后端返回的中奖索引是0
			const index = 0;
			// 调用stop停止旋转并传递中奖索引
			wheelRef.value.stop(index);
		}, 3000);
	};
	const endWheel = (prize: any) => {
		console.log(prize);
	};
	//   grid
	const girdOptions = reactive({
		prizes: [
			{ x: 0, y: 0, fonts: [{ text: "旅游" }] },
			{ x: 1, y: 0, fonts: [{ text: "游乐场" }] },
			{ x: 2, y: 0, fonts: [{ text: "商场" }] },
			{ x: 2, y: 1, fonts: [{ text: "吃吃吃" }] },
			{ x: 2, y: 2, fonts: [{ text: "爬山" }] },
			{ x: 1, y: 2, fonts: [{ text: "游泳" }] },
			{ x: 0, y: 2, fonts: [{ text: "玩玩玩" }] },
			{ x: 0, y: 1, fonts: [{ text: "睡睡睡" }] },
		],
		blocks: [
			{ padding: "10px", background: "#869cfa" },
			{ padding: "10px", background: "#e9e8fe" },
		],
		buttons: [
			{
				x: 1,
				y: 1,
				background: "#9c9dd8",
				fonts: [{ text: "开始", top: "25%" }],
			},
		],
		defaultStyle: {
			background: "#b8c5f2",
		},
	});
	const gridRef = ref();
	const startGrid = () => {
		gridRef.value.play();
		setTimeout(() => {
			const index = (Math.random() * 6) >> 0;
			gridRef.value.stop(index);
		}, 2500);
	};
	const endGrid = (prize) => {
		console.log("抽到奖品为：", prize);
	};
	//   Machine
	const machineOptions = reactive({
		prizes: [
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "旅游" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "游乐场" }] },
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "商场" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "吃吃吃" }] },
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "爬山" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "游泳" }] },
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "玩玩玩" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "睡睡睡" }] },
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "宅宅宅" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "约约约" }] },
		],
		blocks: [
			{ padding: "10px", background: "#869cfa" },
			{ padding: "10px", background: "#e9e8fe" },
		],
		slots: [
			{ order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], speed: 3, direction: 1 },
			{ order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], speed: 3, direction: -1 },
			{ order: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1], speed: 3, direction: 1 },
		],
		defaultStyle: {
			borderRadius: Infinity,
			background: "#bac5ee",
			fontSize: "32px",
			fontColor: "#333",
		},
		defaultConfig: {
			rowSpacing: "20px",
			colSpacing: "10px",
		},
	});

	const isLoading = ref(false);
	const machineRef = ref();
	const startMachine = () => {
		isLoading.value = true;
		machineRef.value.play();
		setTimeout(() => {
			const res = [
				[9, 9, 6],
				[0, 0, 7],
				[6, 6, 6],
				[8, 8, 8],
			];
			const index = res[(Math.random() * 4) >> 0];
			machineRef.value.stop(index);
		}, 2500);
	};
	const endMachine = (prize) => {
		console.log("抽到奖品为：", prize);
		isLoading.value = false;
	};
</script>

<style scoped lang="scss"></style>
