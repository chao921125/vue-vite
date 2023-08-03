<template>
	<div>
		<canvas id="canvas" style="width: 320px; height: 240px"></canvas>
	</div>
</template>

<script lang="ts">
	export default defineComponent({
		name: "MapOne",
		setup() {
			const getImg = (name: string) => {
				// const imgArr = import.meta.glob("../../../assets/images/map_slices/*.png");
				// const path = `../../../assets/images/map_slices/${name}.png`;
				// return imgArr[path];
				const path = `../../../assets/images/map_slices/${name}.png`;
				return new URL(path, import.meta.url).href;
			};
			// 起始坐标
			let mousedownXy: { x: number; y: number }[] = reactive([]);
			// 是否移动canvas
			let isMove = ref(false);
			let enableLine = ref(false);
			let moveStartXy: { x: number; y: number } = reactive({ x: 0, y: 0 }); // 点击记录当前位置
			let moveLogXy: { x: number; y: number } = reactive({ x: 0, y: 0 }); // 移动记录当前位置
			// 是否可开始画图
			let isStart = ref(false);
			// 放大缩小
			let zoom = ref(1);
			nextTick(async () => {
				const canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
				const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
				const xNumber = 17;
				const yNumber = 12;
				canvas.width = 6912;
				canvas.height = 4864;
				canvas.style.width = "6912px";
				canvas.style.height = "4864px";
				const block = 400;
				ctx.fillStyle = "#f9f9f9";
				ctx.strokeStyle = "#f1f1f1"; // 边框的颜色

				const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
				for (let i = 0; i < xNumber; i++) {
					const nameS = keys[i];
					for (let j = 1; j <= yNumber; j++) {
						const imgObj = new Image();
						imgObj.src = getImg(`${nameS + j}`);
						imgObj.onload = async function () {
							console.log(imgObj);
							ctx.fillRect(i * block, j * block, block, block);
							ctx.strokeRect(i * block, j * block, block, block);
							ctx.drawImage(imgObj, i * block, j * block);
						};
					}
				}

				// const imgObj = new Image();
				// imgObj.src = "https://nft-1259661131.cos.ap-hongkong.myqcloud.com/test/fang-test/map-hk.jpeg";
				// imgObj.onload = async function () {
				// 	for (let i = 0; i < xNumber; i++) {
				// 		for (let j = 0; j < yNumber; j++) {
				// 			console.log(i, j);
				// 			const mapBit = await createImageBitmap(imgObj, i * block, j * block, block, block);
				// 			console.log(mapBit);
				// 			ctx.fillRect(i * block, j * block, block, block);
				// 			// 绘制边框;
				// 			ctx.strokeRect(i * block, j * block, block, block);
				// 			ctx.drawImage(mapBit, i * block, j * block);
				// 			console.log("----" + i, j);
				// 		}
				// 	}
				// };

				// 键盘事件
				document.addEventListener("keydown", (res: KeyboardEvent) => {
					if (!isStart.value || !["w", "s", "a", "d"].includes(res.key)) {
						return;
					}
					let mXy = mousedownXy[mousedownXy.length - 1];
					switch (res.key) {
						case "w":
							mXy = { x: mXy.x, y: mXy.y - 10 };
							break;
						case "s":
							mXy = { x: mXy.x, y: mXy.y + 10 };
							break;
						case "a":
							mXy = { x: mXy.x - 10, y: mXy.y };
							break;
						case "d":
							mXy = { x: mXy.x + 10, y: mXy.y };
							break;
					}

					// 移动起始位置
					const startXy = {
						x: mousedownXy[mousedownXy.length - 1].x,
						y: mousedownXy[mousedownXy.length - 1].y,
					};

					if (mXy.x == mousedownXy[0].x && mXy.y == mousedownXy[0].y) {
						isStart.value = false;
					} else if (mousedownXy.length > 1 && mXy.x == mousedownXy[mousedownXy.length - 2].x && mXy.y == mousedownXy[mousedownXy.length - 2].y) {
						return false;
					} else {
						mousedownXy.push(mXy);
					}

					// 画选择的方块
					// ctx.fillStyle = "red";
					// ctx.fillRect(mXy.x, mXy.y, 10, 10);

					ctx.beginPath();
					ctx.moveTo(startXy.x, startXy.y);
					ctx.lineTo(mXy.x, mXy.y);
					ctx.stroke();
				});

				// 鼠标按下弹起事件
				canvas.addEventListener("mouseup", (res: MouseEvent) => {
					// 移动了取消不画画
					isMove.value = false;
					if (!enableLine.value) {
						return;
					}
					// 鼠标按下弹起开始画地图
					mousedownXy = [
						{
							x: Math.floor(res.offsetX / 10) * 10,
							y: Math.floor(res.offsetY / 10) * 10,
						},
					];
					// ctx.fillStyle = "red";
					// ctx.fillRect(mousedownXy[0].x, mousedownXy[0].y, 10, 10);
					isStart.value = true;
					// 点击坐标点 画点
					const clickRes = mousedownXy[0];
					ctx.fillStyle = "red";
					ctx.strokeStyle = "red";
					ctx.fillRect(clickRes.x - 2, clickRes.y - 2, 4, 4);
					ctx.strokeRect(clickRes.x - 2, clickRes.y - 2, 4, 4);
				});

				// 鼠标按下时
				canvas.addEventListener("mousedown", (res) => {
					// 计算移动开始位置
					moveStartXy = {
						x: res.clientX - moveLogXy.x,
						y: res.clientY - moveLogXy.y,
					};
					isMove.value = true;
					enableLine.value = true;
				});

				// 鼠标移动
				canvas.addEventListener("mousemove", (e) => {
					if (isMove.value) {
						const leftVal = e.clientX - moveStartXy.x;
						const topVal = e.clientY - moveStartXy.y;
						canvas.style.marginLeft = leftVal + "px";
						canvas.style.marginTop = topVal + "px";
						moveLogXy = { x: leftVal, y: topVal };
						enableLine.value = false;
					}
				});

				// 放大缩小
				canvas.addEventListener("mousewheel", (e: any) => {
					if (e.wheelDeltaY < 0 && zoom.value < 3) {
						zoom.value = Number((zoom.value + 0.01).toFixed(2));
						canvas.style.transform = "scale(" + zoom.value + ")";
					} else if (e.wheelDeltaY > 0 && zoom.value > 0.3) {
						zoom.value = Number((zoom.value - 0.01).toFixed(2));
						canvas.style.transform = "scale(" + zoom.value + ")";
					} else {
						return;
					}
				});
			});
			return {
				getImg,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
