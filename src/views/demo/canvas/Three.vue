<template>
	<div ref="threeJsContainer" id="threeJsContainer"></div>
</template>

<script lang="ts" setup name="">
	import { onMounted, onBeforeUnmount, ref } from "vue";
	import * as THREE from "three";
	import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
	import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
	import { OrbitControls } from "three/addons/controls/OrbitControls.js";
	import Utils from "@/plugins/utils";

	const threeJsContainer = ref(null);
	let scene, camera, renderer, animationFrameId, threeObj, threeMtl;

	onMounted(() => {
		let testUrl = "";
		// testUrl = "https://metagaia-model.s3.ap-east-1.amazonaws.com/prod/model-file/1702032047715RGY5GF.usdzoutput"
		// testUrl = "https://metagaia-model.s3.ap-east-1.amazonaws.com/prod/model-file/1702343256151GD0ZYH/output"
		testUrl = "https://metagaia-model.s3.ap-east-1.amazonaws.com/test/test-folder/output";
		threeObj = testUrl + ".obj";
		threeMtl = testUrl + ".mtl";
		const startTime = performance.now();
		initThreeJs();
		animate();
		const endTime = performance.now();
		console.log(endTime - startTime + "ms");

		// const params = Utils.urlToObj(window.location.href);
		// threeObj = params.obj;
		// threeMtl = params.mtl;
		// if (params.obj && params.mtl) {
		// 	initThreeJs();
		// 	animate();
		// }
	});

	onBeforeUnmount(() => {
		// 停止动画循环
		cancelAnimationFrame(animationFrameId);
		// 清理资源
		renderer.dispose();
	});

	const initThreeJs = () => {
		const domThree = document.querySelector("#threeJsContainer");
		let fov = 45;
		let aspect = window.innerWidth / window.innerHeight;
		let near = 0.01;
		let far = 1000;
		let progressLoading = 0;

		// 创建相机
		camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		// 设置相机位置
		camera.position.set(0, 0, 1);
		camera.lookAt(new THREE.Vector3());

		// 创建场景
		scene = new THREE.Scene();
		const ambientLight = new THREE.AmbientLight(0xffffff);
		scene.add(ambientLight);

		const pointLight = new THREE.PointLight(0xffffff, 0.1);
		camera.add(pointLight);
		scene.add(camera);

		// model
		const onProgress = function (xhr) {
			if (xhr.lengthComputable) {
				const percentComplete = (xhr.loaded / xhr.total) * 100;
				progressLoading = percentComplete;
				console.log(percentComplete.toFixed(2) + "% downloaded");
			}
		};
		new MTLLoader().load(threeMtl, function (materials) {
			materials.preload();
			new OBJLoader().setMaterials(materials).load(
				threeObj,
				function (object) {
					const box = new THREE.Box3().setFromObject(object);
					camera.position.z = box.getSize(new THREE.Vector3()).length();

					const x = box.max.x - box.min.x;
					const y = box.max.y - box.min.y;
					const z = box.max.z - box.min.z;
					console.log(window.innerWidth, window.innerHeight, x, y, z);
					console.log(domThree.clientWidth, domThree.clientHeight);

					const maxValue = Math.max(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);
					const scaleValue = camera.position.z / maxValue;
					const scaleVal = scaleValue > 1 ? scaleValue / 2 : scaleValue;
					object.scale.setScalar(scaleVal, scaleVal, scaleVal);
					object.position.y = -1 * (camera.position.z - maxValue);

					scene.add(object);

					if (progressLoading >= 100) {
						let flagDiv = document.createElement("div");
						flagDiv.id = "completed";
						setTimeout(() => {
							document.body.appendChild(flagDiv);
						}, 500);
					}
				},
				onProgress,
			);
		});

		// 创建渲染器
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		// 将渲染器的 DOM 元素添加到 Vue 组件
		if (threeJsContainer.value) {
			threeJsContainer.value.appendChild(renderer.domElement);
		}
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.minDistance = 0.1;
		controls.maxDistance = 999;

		window.addEventListener("resize", onWindowResize);
	};

	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};

	const animate = () => {
		animationFrameId = requestAnimationFrame(animate);
		// 更新你的场景和相机状态
		renderer.render(scene, camera);
	};
</script>

<style scoped lang="scss"></style>
