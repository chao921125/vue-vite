<script setup>
	import { onMounted, reactive, watch } from "vue";
	import IcoPrev from "@/assets/ico/p-prev.png";
	import IcoPrevUn from "@/assets/ico/p-prev-un.png";
	import IcoPrevF from "@/assets/ico/p-prev_f.png";
	import IcoPrevFUn from "@/assets/ico/p-prev_f-un.png";
	import IcoNext from "@/assets/ico/p-next.png";
	import IcoNextUn from "@/assets/ico/p-next-un.png";
	import IcoNextL from "@/assets/ico/p-next_l.png";
	import IcoNextLUn from "@/assets/ico/p-next_l-un.png";

	const props = defineProps({
		current: {
			type: [Number, String],
			default: 1,
		},
		page: {
			type: [Number, String],
			default: 20,
		},
		total: {
			required: true,
			type: [Number, String],
			default: 0,
		},
	});

	const data = reactive({
		current: 1,
		page: 20,
		total: 0,
		listSize: 1,
		showList: [],
	});

	const emits = defineEmits(["onChange", "onPrev"]);

	const onPrev = () => {
		data.current = Number(data.current) - 1;
		onChangeArr();
		emits("onChange", data.current);
	};
	const onPrevFirst = () => {
		data.current = 1;
		onChangeArr();
		emits("onChange", 1);
	};
	const onNext = () => {
		data.current = Number(data.current) + 1;
		onChangeArr();
		emits("onChange", data.current);
	};
	const onNextLast = () => {
		data.current = data.listSize;
		onChangeArr();
		emits("onChange", data.listSize);
	};
	const onChange = (item) => {
		data.current = item;
		onChangeArr();
		emits("onChange", item);
	};

	const onChangeArr = () => {
		data.showList = [];
		if (data.listSize <= 5) {
			for (let i = 1; i <= data.listSize; i++) {
				data.showList.push(i);
			}
		} else {
			if (Number(data.current) > 3 && Number(data.current) < data.listSize - 2) {
				for (let i = Number(data.current) - 2; i <= Number(data.current) + 2; i++) {
					data.showList.push(i);
				}
			} else if (Number(data.current) <= 3) {
				for (let i = 2; i <= 5; i++) {
					data.showList.push(i);
				}
			} else {
				for (let i = data.listSize - 4; i <= data.listSize; i++) {
					data.showList.push(i);
				}
			}
		}
	};

	onMounted(() => {
		data.listSize = Math.ceil(Number(props.total) / Number(props.page));
		data.current = props.current;
		data.page = props.page;
		onChangeArr();
	});

	watch(props, () => {
		data.listSize = Math.ceil(Number(props.total) / Number(props.page));
		data.current = props.current;
		data.page = props.page;
		onChangeArr();
	});
</script>

<template>
	<div
		class="page-box"
		v-if="props.total">
		<div class="page-btn">
			<img
				:src="IcoPrevFUn"
				alt=""
				class="ico-img"
				v-if="Number(data.current) === 1" />
			<img
				:src="IcoPrevF"
				alt=""
				class="ico-img"
				v-else
				@click="onPrevFirst" />
		</div>
		<div class="page-btn">
			<img
				:src="IcoPrevUn"
				alt=""
				class="ico-img"
				v-if="Number(data.current) === 1" />
			<img
				:src="IcoPrev"
				alt=""
				class="ico-img"
				v-else
				@click="onPrev" />
		</div>
		<div class="page-nums">
			<div
				class="page-num"
				v-if="data.listSize > 5"
				:class="{ 'btn-act': Number(data.current) === 1 }"
				@click="onChange(1)"
				>1</div
			>
			<div
				class="page-num"
				v-if="data.listSize > 5 && data.current > 3"
				>...</div
			>
			<div
				class="page-num"
				v-for="item in data.showList"
				:key="item"
				:class="{ 'btn-act': Number(data.current) === item }"
				@click="onChange(item)"
				>{{it em}}</div
			>
			<div
				class="page-num"
				v-if="data.listSize > 5 && data.current < data.listSize - 2"
				>...</div
			>
			<template v-if="data.listSize > 5 && data.current < data.listSize - 2">
				<div
					class="page-num"
					:class="{ 'btn-act': Number(data.current) === data.listSize }"
					@click="onChange(data.listSize)"
					>{{ data.listSize }}</div
				>
			</template>
		</div>
		<div class="page-btn">
			<img
				:src="IcoNextUn"
				alt=""
				class="ico-img"
				v-if="Number(data.current) === data.listSize" />
			<img
				:src="IcoNext"
				alt=""
				class="ico-img"
				v-else
				@click="onNext" />
		</div>
		<div class="page-btn">
			<img
				:src="IcoNextLUn"
				alt=""
				class="ico-img"
				v-if="Number(data.current) === data.listSize" />
			<img
				:src="IcoNextL"
				alt=""
				class="ico-img"
				v-else
				@click="onNextLast" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	.page-box {
		display: flex;
		align-items: center;

		.ico-img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		.page-nums {
			display: flex;
			align-items: center;
		}

		.page-num {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 9px;
			height: 8px;
			font-family: Barlow-Medium, Barlow;
			font-weight: 800;
			font-size: 7px;
			color: #ffffff;
			line-height: 1;
			text-align: center;
			font-style: normal;
			border-radius: 2px;
			padding-bottom: 1px;

			.btn-act {
				font-family: Barlow-ExtraBold, Barlow;
			}
		}

		.page-btn {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 9px;
			height: 8px;
			background: radial-gradient(377% 109% at 25% 16%, #8a4dda 0%, #34288b 100%);
			margin-left: 2px;
			margin-right: 2px;
			border-radius: 2px;
			padding: 1px 2px;

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}
		}

		.btn-act {
			background: radial-gradient(377% 109% at 25% 16%, #8a4dda 0%, #34288b 100%);
		}
	}
</style>
