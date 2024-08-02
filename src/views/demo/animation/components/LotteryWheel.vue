<template>
	<canvas
		id="canvas"
		width="300"
		height="300"></canvas>
	<button id="btn">click</button>
</template>

<script lang="ts" setup name="">
	import { onMounted } from "vue";

	const drawCanvas = () => {
		let canvas = document.getElementById("canvas")! as HTMLCanvasElement;
		let ct = canvas.getContext("2d")!;
		let num = Math.PI / 180;
		ct.translate(150, 150);
		const colorArr = ["#00eeff", "#0099ee", "#00eeff", "#0099ee", "#00eeff", "#0099ee", "#00eeff", "#0099ee"];
		const textArr = ["a", "b", "c", "d", "e", "f", "g", "h"];
		let angle = 0;
		let step = 10 + 10 * Math.random();

		let btn = document.getElementById("btn") as HTMLButtonElement;
		btn.onclick = () => {
			location.reload();
		};

		let timeInterval = setInterval(() => {
			if (step <= 0.3) {
				clearInterval(timeInterval);
				const numOne = Math.ceil(angle / 45);
				const con = textArr[textArr.length - numOne];
				ct.font = "18px sans-serif";
				ct.textAlign = "center";
				ct.fillText(con, 0, 0);
			} else {
				if (angle > 360) angle = 0;
				step *= 0.95;
				angle += step;
				ct.clearRect(-200, -200, 300, 300);
				ct.beginPath();
				ct.lineWidth = 5;
				ct.moveTo(135, 0);
				ct.lineTo(135, 0);
				ct.stroke();
				ct.lineWidth = 2;
				ct.save();
				ct.rotate(angle * num);
				for (let i = 0; i < textArr.length; i++) {
					ct.beginPath();
					ct.moveTo(0, 0);
					ct.fillStyle = colorArr[i];
					ct.arc(0, 0, 130, i * 45 * num, (i + 1) * 45 * num);
					ct.closePath();
					ct.stroke();
					ct.fill();
				}
				ct.beginPath();
				ct.fillStyle = "#fff";
				ct.arc(0, 0, 60, 0, 2 * Math.PI);
				ct.fill();
				for (let i = 0; i < colorArr.length; i++) {
					ct.save();
					ct.beginPath();
					ct.rotate((i * 45 + 20) * num);
					ct.fillStyle = "#222";
					ct.font = "18px sans-serif";
					ct.fillText(textArr[i], 75, 0);
					ct.restore();
				}
				ct.restore();
			}
		}, 60);
	};

	onMounted(() => {
		drawCanvas();
	});
</script>

<style scoped lang="scss"></style>
