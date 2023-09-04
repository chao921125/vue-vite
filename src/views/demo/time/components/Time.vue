<template>
	<el-dialog custom-class="customWidth" v-model="props.timeQuantumProps.show" title="选择时间段" width="29%">
		<div class="gantt-chart">
			<div class="scale-line">
				<div class="scale-box">
					<span v-for="item in [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]" :key="item">{{ item }}</span>
				</div>
				<div class="line-box">
					<span v-for="item in 12" :key="item"></span>
				</div>
			</div>
			<div class="table-chart">
				<div class="set-date-table" v-for="(item, index) in weektableDate" :key="item.week">
					<div class="week">{{ item.weekName }}</div>
					<div class="scale-line-week"></div>
					<div class="table-box">
						<div
							class="progress-bar"
							v-for="(t, k) in 6"
							:key="t"
							:style="{ left: item['left' + k], right: item['right' + k] }"
							v-show="item['left' + k] && item['right' + k]"
							@click="cancelingSchedule(item, k)"
						></div>
						<div
							class="box"
							:style="[1, 3, 5].includes(index) ? 'background:#E3E5E8' : ''"
							v-for="val in 48 * 3"
							:key="val"
							@mousedown="
								(event) => {
									onmousedown(event, item, index);
								}
							"
							@mouseup="
								(event) => {
									onmouseup(event, item, index);
								}
							"
						></div>
					</div>
					<el-button class="bth" type="primary" size="small" @click="setUpTheClick(item)">设置</el-button>
				</div>
			</div>
		</div>
		<div class="select-time-area">
			<div class="week-select">
				<el-checkbox v-model="allweek" label="全部" size="large" :disabled="props.timeQuantumProps.disabled" @change="selectAllWeek" />
				<el-checkbox
					v-for="item in TimeData"
					:key="item.week"
					v-model="item.weekBooleanVal"
					:label="item.weekName"
					size="large"
					:disabled="item.currentBool || props.timeQuantumProps.disabled"
				/>
			</div>
			<div class="time-select" v-for="item in TimeData" :key="item.week" v-show="item.currentBool">
				<div class="time-box" v-for="(val, key) in item.periods" :key="key">
					<el-checkbox
						v-model="val.booleanVal"
						:label="val.time"
						size="large"
						:disabled="props.timeQuantumProps.disabled"
						@change="operationTimeRange(item, val, key)"
					/>
					<el-time-picker
						style="margin-left: 10px"
						size="default"
						v-model="val.value"
						is-range
						range-separator="-"
						value-format="HH:mm:ss"
						:disabled="props.timeQuantumProps.disabled"
						@change="operationTimeRange(item, val, key)"
					/>
				</div>
			</div>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="props.timeQuantumProps.show = false">取 消</el-button>
				<el-button v-show="!props.timeQuantumProps.disabled" type="primary" @click="submit">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup name="Time">
	import { onMounted, reactive, ref } from "vue";

	const props = defineProps({
		timeQuantumProps: {
			type: Object,
			default: () => {},
			require: true,
		},
	});

	// 表格数据
	const weektableDate = reactive([
		{ week: 7, weekName: "星期日", left0: "0px", right0: "0px" },
		{ week: 1, weekName: "星期一", left0: "0px", right0: "0px" },
		{ week: 2, weekName: "星期二", left0: "0px", right0: "0px" },
		{ week: 3, weekName: "星期三", left0: "0px", right0: "0px" },
		{ week: 4, weekName: "星期四", left0: "0px", right0: "0px" },
		{ week: 5, weekName: "星期五", left0: "0px", right0: "0px" },
		{ week: 6, weekName: "星期六", left0: "0px", right0: "0px" },
	]);

	// 全部选择
	const allweek = ref(false);
	// 选择时间绑定的数据
	const TimeData = reactive([]);

	// 初始化时间绑定的默认数据
	const initializeDefaultData = () => {
		const weekData = {
			0: "星期日",
			1: "星期一",
			2: "星期二",
			3: "星期三",
			4: "星期四",
			5: "星期五",
			6: "星期六",
		};
		for (let i = 0; i < 7; i++) {
			const periods = [];
			for (let j = 1; j < 7; j++) {
				periods.push({
					time: "时间段" + j,
					value: ["00:00:00", "23:59:59"],
					booleanVal: j === 1,
				});
			}
			TimeData.push({
				periods,
				week: i === 0 ? 7 : i,
				weekName: weekData[i],
				weekBooleanVal: i === 0,
				currentBool: i === 0,
			});
		}
		console.log(TimeData, "TimeData");
	};
	initializeDefaultData();

	// 点击设置
	const setUpTheClick = (value) => {
		// console.log(value.week, TimeData, '1111')
		TimeData.map((item) => {
			Object.assign(item, {
				weekBooleanVal: value.week === item.week,
				currentBool: value.week === item.week,
			});
		});
	};
	// 监听是否全选
	watch(
		() => TimeData,
		(val) => {
			const boollist = val.map((item) => item.weekBooleanVal).filter(Boolean);
			allweek.value = boollist.length >= 7;
		},
		{ deep: true, immediate: true },
	);

	// 选择全部周
	function selectAllWeek(rows) {
		TimeData.map((item) => {
			Object.assign(item, {
				weekBooleanVal: rows,
			});
		});
	}

	// 点击选中区域取消时间段
	function cancelingSchedule(item, k) {
		delete item["left" + k];
		delete item["right" + k];
		const data = TimeData.find((va) => va.week === item.week);
		data.periods.map((e, i) => {
			if (i === k) {
				Object.assign(e, {
					booleanVal: false,
					value: ["00:00:00", "23:59:59"],
				});
			}
		});
	}

	// 操作时间段
	function operationTimeRange(item, rows, key) {
		// console.log('rows,key=>', item, rows, key)
		if (rows.booleanVal) {
			periodContrastProcessing(item, rows);
		} else {
			// console.log(item.periods.find(e => e.booleanVal), '2222')
			const _rows = item.periods.find((e) => e.booleanVal);
			if (_rows) {
				periodContrastProcessing(item, _rows);
			}
		}
	}
	// 选择时段的处理
	function periodContrastProcessing(item, rows) {
		// console.log('item, rows=>', item, rows)
		const { leftOffset, rightOffset } = calculateOffset(item, rows);
		// 这里总有六条选中区域的线，跟时间段编号进行
		const trueList = item.periods.filter((i) => i.booleanVal);
		trueList.map((val, key) => {
			const data = calculateOffset(item, val);
			Object.assign(
				weektableDate.find((t) => t.week === item.week),
				{
					["left" + key]: data.leftOffset + "px",
					["right" + key]: data.rightOffset + "px",
				},
			);
		});
	}
	// 计算偏移量
	function calculateOffset(item, rows) {
		const stra = countTotalNumberSeconds(rows.value[0]);
		const end = countTotalNumberSeconds(rows.value[1]);

		// 计算出1s的偏移量
		const secondsOffset = 18.07 / (60 * 60);

		// 计算开始偏移量
		const leftOffset = secondsOffset * stra;
		// 计算结束的偏移量
		const rightOffset = secondsOffset * (countTotalNumberSeconds("23:59:59") - end);

		// console.log('time=>', leftOffset, rightOffset)
		return { leftOffset, rightOffset };
	}
	// 传入一个时间计算总共多少秒
	const countTotalNumberSeconds = (timeStr) => {
		// timeStr 00:00:00
		const timeList = timeStr.split(":");
		const seconds = Number(timeList[0]) * 60 * 60 + Number(timeList[1]) * 60 + Number(timeList[2]);
		return seconds;
	};

	// 如果有数据就进行初始化
	if (props.timeQuantumProps.ruleForm[props.timeQuantumProps.tag]) {
		const data = JSON.parse(props.timeQuantumProps.ruleForm[props.timeQuantumProps.tag]);
		const TimeDataMap = new Map();
		data.map((item) => {
			TimeDataMap.set(item.week, item);
		});
		TimeData.map((rows) => {
			if (TimeDataMap.get(rows.week)) {
				const { periods } = TimeDataMap.get(rows.week);
				rows.periods.map((v, k) => {
					if (periods[k]) {
						// rows.weekBooleanVal = true
						Object.assign(v, {
							booleanVal: true,
							value: [periods[k]?.start, periods[k]?.end],
						});
						// console.log(rows, v, k, 'rows, v, k')
						operationTimeRange(rows, v, k);
					}
				});
			}
		});
	}

	// 记录当前的鼠标按下的x轴坐标值
	const pageXValue = ref(undefined);
	// 鼠标按下
	const onmousedown = (e, item, index) => {
		pageXValue.value = e.pageX;
		console.log("鼠标按下=>", e.pageX, index);
	};
	// 鼠标抬起
	const onmouseup = (e, item, index) => {
		const a = document.getElementsByClassName("table-box");
		const tableBox = a[index].getBoundingClientRect();
		console.log("鼠标抬起=>", e.pageX, index, tableBox.left, tableBox.right, tableBox);

		// 鼠标抬起时候计算 pageX 和left起始tableBox.left 的数值差,得到偏移量left
		// 如果鼠标按下和抬起数值一致，不进行操作
		if (e.pageX === pageXValue.value) return;
		// 计算出1s的偏移量
		const secondsOffset = 18.07 / (60 * 60);
		// 开始时间
		const start =
			pageXValue.value < e.pageX ? secTotime((pageXValue.value - tableBox.left) / secondsOffset) : secTotime((e.pageX - tableBox.left) / secondsOffset);
		// 结束时间
		const end =
			pageXValue.value < e.pageX ? secTotime((e.pageX - tableBox.left) / secondsOffset) : secTotime((pageXValue.value - tableBox.left) / secondsOffset);

		const data = TimeData.find((val) => val.week === item.week);
		const _rows = data.periods.filter((item) => !item.booleanVal);

		if (_rows.length) {
			Object.assign(data.periods[data.periods.indexOf(_rows[0])], {
				booleanVal: true,
				value: [start, end],
			});
			operationTimeRange(data, data.periods, data.periods.indexOf(_rows[0]));
		}

		console.log(
			"计算偏移量=>",
			secTotime((pageXValue.value - tableBox.left) / secondsOffset),
			secTotime((e.pageX - pageXValue.value + (pageXValue.value - tableBox.left)) / secondsOffset),
			_rows,
			data.periods.indexOf(_rows[0]),
		);
	};
	// 秒转时分秒
	const secTotime = (s) => {
		let t = "";
		if (s > -1) {
			const hour = Math.floor(s / 3600);
			const min = Math.floor(s / 60) % 60;
			const sec = s % 60;
			if (hour < 10) {
				t = "0" + hour + ":";
			} else {
				t = hour + ":";
			}
			if (min < 10) {
				t += "0";
			}
			t += min + ":";
			if (sec < 10) {
				t += "0";
			}
			t += sec.toFixed(0);
		}
		return t;
	};

	const currentCpn = getCurrentInstance();
	const parent = currentCpn.parent;
	// 提交
	function submit() {
		// console.log(TimeData, props.timeQuantumProps.ruleForm, 'TimeData')
		const resultsData = [];
		const selectData = TimeData.filter((item) => item.weekBooleanVal);
		selectData.map((val) => {
			const obj = {
				week: val.week,
				periods: [],
			};
			val.periods.map((e) => {
				if (e.booleanVal) {
					obj.periods.push({ start: e.value[0], end: e.value[1] });
				}
			});
			resultsData.push(obj);
		});
		// eslint-disable-next-line vue/no-mutating-props
		props.timeQuantumProps.ruleForm[`${props.timeQuantumProps.tag}s`] = resultsData;
		// eslint-disable-next-line vue/no-mutating-props
		props.timeQuantumProps.ruleForm[`${props.timeQuantumProps.tag}`] = JSON.stringify(resultsData);
		// eslint-disable-next-line vue/no-mutating-props
		props.timeQuantumProps.show = false;
		console.log("resultsData", resultsData, props.timeQuantumProps.ruleForm);
	}
</script>
<style lang="scss">
	.customWidth {
		min-width: 620px !important;
	}
</style>
<style lang="scss" scoped>
	.dialog-footer button:first-child {
		margin-right: 10px;
	}

	.gantt-chart {
		.scale-line {
			margin-left: 50px;

			.scale-box {
				margin-bottom: 10px;
				margin-left: -4px;
				display: flex;

				span {
					width: 18px;
					height: 16px;
					display: block;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 13px;
					color: #313442;
					margin-right: 18px;
				}
			}

			.line-box {
				width: 435px;
				display: flex;
				position: relative;

				&::after {
					content: "";
					position: absolute;
					width: 1.5px;
					height: 8px;
					bottom: 0;
					right: 0;
					background: #c6c7ca;
				}

				span {
					display: block;
					width: 40px;
					height: 1.5px;
					background: #c6c7ca;
					position: relative;

					&::before {
						content: "";
						position: absolute;
						width: 1.5px;
						height: 8px;
						bottom: 0;
						left: 0;
						background: #c6c7ca;
					}

					&::after {
						content: "";
						position: absolute;
						width: 1.5px;
						height: 5px;
						bottom: 0;
						left: 50%;
						background: #c6c7ca;
					}
				}
			}
		}

		.table-chart {
			margin-top: 2px;

			.set-date-table {
				display: flex;
				align-content: center;
				height: 28px;
				line-height: 28px;

				.week {
					width: 39px;
					height: 16px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 13px;
					color: #313442;
					margin-right: 8px;
				}

				.scale-line-week {
					width: 1.5px;
					height: 28px;
					background: #c6c7ca;
					margin-right: 2px;
					position: relative;

					&::before {
						content: "";
						position: absolute;
						width: 1.5px;
						height: 6px;
						top: -2px;
						left: -2px;
						background: #c6c7ca;
						transform: rotate(90deg);
					}
				}

				&:last-child {
					.scale-line-week {
						&::after {
							content: "";
							position: absolute;
							width: 1.5px;
							height: 5px;
							bottom: -3px;
							left: -2px;
							background: #c6c7ca;
							transform: rotate(90deg);
						}
					}

					.table-box {
						border-bottom: 1px solid #c6c7ca;
					}
				}

				.table-box {
					width: 435px;
					display: flex;
					flex-wrap: wrap;
					position: relative;
					border-right: 1px solid #c6c7ca;
					cursor: crosshair;

					.progress-bar {
						position: absolute;
						height: 9px;
						left: 0px;
						right: 0px;
						background: #21e88d;
					}

					.box {
						width: 2.083%;
						height: 9px;
						background: #f2f4f7;
						//   background: #21E88D;
						border: 1px solid #c6c7ca;
						border-right: none;
						border-bottom: none;
					}
				}

				.bth {
					margin-left: 9px;
				}
			}
		}
	}

	.select-time-area {
		width: 580px;
		background: #f7f8fa;
		border: 1px solid #eff0f2;
		border-radius: 4px;
		margin-top: 22px;
		padding: 14px;

		.week-select {
			display: flex;

			.el-checkbox {
				margin-right: 8px;
			}
		}
	}
</style>
