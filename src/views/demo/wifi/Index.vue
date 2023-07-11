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

	const wifiInfo = reactive({
		// 设置
		settings: {
			// Network SSID name
			ssid: "",
			// Network password
			password: "",
			// Settings: Network encryption mode
			encryptionMode: "WPA",
			// Settings: EAP Method
			eapMethod: "PWD",
			// Settings: EAP identity
			eapIdentity: "",
			// Settings: Hide password on the printed card
			hidePassword: false,
			// Settings: Mark your network as hidden SSID
			hiddenSSID: false,
			// Settings: Direction true transverse false portrait
			direction: true,
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
		}
	};
</script>

<style scoped lang="scss">
	@use "@/assets/styles/medias/print.scss";
	@use "./index.scss";
</style>
