<template>
	<el-row justify="center">
		<el-col :span="12" class="re-flex-row-center wifi-title">
			<icon-svg name="wifi" class="svg-icon-cus"></icon-svg>
			<h1 class="re-ml-10">WiFi-CARD</h1>
		</el-col>
	</el-row>
	<el-row justify="center">
		<el-col :span="wifiInfo.settings.direction ? 12 : 6" class="re-flex-row-center re-mt-20">
			<el-card class="re-w-fill" id="printCard">
				<WifiCard ref="wifiCardRef" :settings="wifiInfo.settings" @changeSettings="changeSettings"></WifiCard>
			</el-card>
		</el-col>
	</el-row>
	<el-row justify="center">
		<el-col :span="12" class="re-mt-20">
			<WifiSettings :settings="wifiInfo.settings" @changeSettings="changeSettings"></WifiSettings>
		</el-col>
	</el-row>
	<el-row justify="center">
		<el-col :span="12" class="re-flex-row-center re-mt-20">
			<el-button type="primary" @click="printCard">打印卡片</el-button>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="WifiCard">
	import WifiCard from "./components/WifiCard.vue";
	import WifiSettings from "./components/WifiSettings.vue";
	import printJS from "print-js";
	import html2canvas from "html2canvas";

	const wifiInfo = reactive({
		// 设置
		settings: {
			// Network SSID name
			ssid: "",
			// Network password
			password: "",
			// Settings: EAP identity
			eapIdentity: "",
			// Settings: Network encryption mode
			encryptionMode: "WPA",
			// Settings: EAP Method
			eapMethod: "PWD",
			// Settings: Hide password on the printed card
			hidePassword: 0,
			// Settings: Mark your network as hidden SSID
			hiddenSSID: 0,
			// Settings: Direction true transverse false portrait
			direction: 1,
		},
		errorMsg: {},
		is: {
			isSubmit: false,
		},
	});

	const changeSettings = (value: any) => {
		Object.assign(wifiInfo.settings, value);
	};

	// 打印
	const wifiCardRef = ref();

	const printCard = () => {
		if (wifiCardRef.value.validWifiForm()) {
			printJS({
				printable: "printCard",
				type: "html",
				documentTitle: "WiFi Card - " + wifiInfo.settings.ssid,
			});
			const element = document.querySelector("#printCard") as HTMLElement;
			html2canvas(element, {
				useCORS: true,
				allowTaint: true,
				scale: window.devicePixelRatio * 2,
				windowWidth: element.scrollWidth,
				windowHeight: element.scrollHeight,
			}).then((canvas: any) => {
				let imgUrl = canvas.toDataURL("image/png");
				let linkTemp = document.createElement("a");
				linkTemp.style.display = "none";
				linkTemp.href = imgUrl;
				linkTemp.setAttribute("download", new Date().getTime().toString());
				if (typeof linkTemp.download === "undefined") {
					linkTemp.setAttribute("target", "_blank");
				}
				document.body.appendChild(linkTemp);
				linkTemp.click();
				document.body.removeChild(linkTemp);
				window.URL.revokeObjectURL(imgUrl);
			});
		}
	};
</script>

<style scoped lang="scss">
	@use "./index.scss";
</style>
