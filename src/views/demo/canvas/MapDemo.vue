<template>
	<div class="map-box" id="mapBox">
		<canvas id="canvas">你的浏览器不支持 canvas 请升级你的浏览器</canvas>
	</div>
</template>

<script lang="ts">
	export default defineComponent({
		name: "MapDemo",
		setup() {
			// 定义状态枚举
			const initConfig = {
				// 初始状态
				INIT: 0,
				// 拖动状态
				DRAG_START: 1,
				DRAG_ING: 12,
				// 移动状态
				MOVE_START: 2,
				MOVE_ING: 21,
			};

			let canvasTarget: any = reactive({
				// 清除画布
				clear: 100,
				// 全局标记是否拖拽
				isDragFlag: false,
				// 缩放倍数 默认 1
				scale: 1,
				// 缩放步长 默认 1
				scaleStep: 0.1,
				// 缩放倍数 最大
				scaleMax: 2,
				// 缩放倍数 最小
				scaleMin: 0.5,
				// 缩放 偏移量
				scaleOffset: { x: 0, y: 0 },
				// 最小移动步长 含 拖拽和缩放
				stepNum: 5,
				// 位置 偏移量
				canvasOffset: null,
				// 拖拽对象 最后一次拖拽的位置
				lastPosition: null,
				// 拖拽对象是否开始拖拽
				status: initConfig.INIT,
				// 拖拽对象
				dragTarget: null,
				// 拖拽对象索引
				dragTargetIndex: null,
				// 拖拽对象的数据
				dragData: [] as any,
				// 拖拽对象的偏移量
				dragOffsetPosition: null,
			});
			onMounted(() => {
				initCanvas();
				window.onresize = () => {
					initCanvas();
				};
			});
			onUnmounted(() => {
				window.onresize = null;
			});
			const initCanvas = () => {
				//	重置窗口
				const pWindow = <HTMLElement>document!.querySelector("#mapBox")!.parentElement!.parentElement!.parentElement;
				const realWidth = pWindow.clientWidth - 50;
				const realHeight = pWindow.clientHeight - 50;
				document!.querySelector("#mapBox")!.setAttribute("width", realWidth.toString());
				document!.querySelector("#mapBox")!.setAttribute("height", realHeight.toString());

				let canvas = <HTMLCanvasElement>document!.querySelector("#canvas");
				canvas.width = realWidth;
				canvas.height = realHeight;
				canvas.style.width = realWidth.toString();
				canvas.style.height = realHeight.toString();
				canvas.style.border = "0";
				let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
				ctx.save();

				canvasEvent(canvas, ctx);

				drawDrag(ctx, 100, 100, 10);
				canvasTarget.dragData.push({
					x: 100,
					y: 100,
					r: 10,
				});
				drawDrag(ctx, 200, 200, 20);
				canvasTarget.dragData.push({
					x: 200,
					y: 200,
					r: 20,
				});
			};

			// 绘画拖拽对象
			const drawDrag = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
				ctx.save();
				ctx.beginPath();

				ctx.strokeStyle = "red";
				ctx.arc(cx, cy, r, 0, Math.PI * 2);
				ctx.stroke();

				ctx.closePath();
				ctx.restore();
			};

			const resetDrawDrag = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
				ctx.clearRect(0, 0, canvas.width * canvasTarget.clear, canvas.height * canvasTarget.clear);
				canvasTarget.dragData.forEach((item) => {
					drawDrag(ctx, item.x, item.y, item.r);
				});
			};

			// 判断当前点击是否在对象上
			const isDragTarget = (curPos: any, targetData: any[] = []) => {
				if (targetData.length) {
					// 计算当前鼠标活动点与目标点的距离
					for (let i in targetData) {
						if (getDistance(targetData[i], curPos) < targetData[i].r) return targetData[i];
					}
					return false;
				} else {
					return false;
				}
			};

			// 获取当前点击距离目标对象的距离
			const getDistance = (posStart: any = { x: 0, y: 0 }, posEnd: any = { x: 0, y: 0 }) => {
				return Math.sqrt((posStart.x - posEnd.x) ** 2 + (posStart.y - posEnd.y) ** 2);
			};

			// 获取鼠标再画布的位置
			const getMousePosCanvas = (event: any, offset: any = { x: 0, y: 0 }, scale: number = 1) => {
				return {
					x: (event.offsetX - offset.x) / scale,
					y: (event.offsetY - offset.y) / scale,
				};
			};
			// 获取鼠标当前的坐标位置

			// 注册事件、处理拖拽 缩放
			const canvasEvent = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
				canvas.onmousedown = (event: any) => {
					canvas.style.cursor = "grab";
					const canvasPos = getMousePosCanvas(event, canvasTarget.scaleOffset, canvasTarget.scaleMax);
					const targetRef = isDragTarget(canvasPos, canvasTarget.dragData);
					canvasTarget.isDragFlag = false;
					if (targetRef && canvasTarget.status === initConfig.INIT) {
						canvas.style.cursor = "all-scroll";

						canvasTarget.dragTarget = targetRef;
						canvasTarget.status = initConfig.DRAG_START;
						canvasTarget.lastPosition = canvasPos;
						canvasTarget.dragOffsetPosition = canvasPos;
					}
					if (!targetRef) {
						canvasTarget.status = initConfig.MOVE_START;
					}
				};
				canvas.onmousemove = (event: any) => {
					const canvasPos = getMousePosCanvas(event, canvasTarget.scaleOffset, canvasTarget.scaleMax);
					canvasTarget.isDragFlag = true;
					if (canvasTarget.status === initConfig.DRAG_START && getDistance(canvasPos, canvasTarget.lastPosition) > canvasTarget.stepNum) {
						canvasTarget.status = initConfig.DRAG_ING;
						canvasTarget.dragOffsetPosition = canvasPos;
					} else if (canvasTarget.status === initConfig.DRAG_ING) {
						canvasTarget.dragTarget.x += canvasPos.x - canvasTarget.dragOffsetPosition.x;
						canvasTarget.dragTarget.y += canvasPos.y - canvasTarget.dragOffsetPosition.y;

						resetDrawDrag(canvas, ctx);
						canvasTarget.dragOffsetPosition = canvasPos;
					}
				};
				canvas.onmouseup = () => {
					canvas.style.cursor = "default";
					if (canvasTarget.status !== initConfig.INIT) {
						canvasTarget.status = initConfig.INIT;
					}
					if (canvasTarget.isDragFlag) {
						console.log("drag");
					} else {
						console.log("no drag");
					}
				};
				canvas.onwheel = (event: any) => {
					event.preventDefault();
					const canvasPos = getMousePosCanvas(event, canvasTarget.scaleOffset, canvasTarget.scaleMax);

					const dealX = (canvasPos.x / canvasTarget.scale) * canvasTarget.scaleStep;
					const dealY = (canvasPos.y / canvasTarget.scale) * canvasTarget.scaleStep;

					if (event.wheelDelta > 0 && canvasTarget.scale < canvasTarget.scaleMax) {
						canvasTarget.scaleOffset.x -= dealX;
						canvasTarget.scaleOffset.y -= dealY;
						canvasTarget.scale += canvasTarget.scaleStep;
					} else if (event.wheelDelta <= 0 && canvasTarget.scale > canvasTarget.scaleMin) {
						canvasTarget.scaleOffset.x += dealX;
						canvasTarget.scaleOffset.y += dealY;
						canvasTarget.scale -= canvasTarget.scaleStep;
					}
					ctx.setTransform(canvasTarget.scale, 0, 0, canvasTarget.scale, canvasTarget.scaleOffset.x, canvasTarget.scaleOffset.y);
					resetDrawDrag(canvas, ctx);
					canvasTarget.dragOffsetPosition = canvasPos;
				};
				// canvas.onclick = (event: any) => {
				// 	console.log("unUse onclick", event);
				// }
				// canvas.ondblclick = (event: any) => {
				// 	console.log("unUse ondblclick", event);
				// }
				canvas.ontouchstart = (event: any) => {
					console.log(event);
				};
				canvas.ontouchmove = (event: any) => {
					console.log(event);
				};
				canvas.ontouchend = (event: any) => {
					console.log(event);
				};
			};
			return {};
		},
	});
</script>

<style scoped lang="scss">
	.map-box {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #262539;
		transform: scale(1, 1);
	}

	canvas {
		display: block;
		margin: 0 auto;
		overflow: hidden;
		background-color: #262539;
		border: 1px solid #1d1c2d;

		/* scroll-behavior: unset; */

		/* transform: rotateX(180deg); */
	}
</style>
