<template>
	<el-form ref="formWifiRef" :model="formWifi" label-width="120px" status-icon>
		<el-form-item :label="`卡片方向(${formWifi.direction ? '横' : '竖'})`" prop="direction">
			<el-radio-group v-model="formWifi.direction" @change="onChangeSettings">
				<el-radio v-for="item in directionOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="隐藏 WIFI 名称" prop="hiddenSSID">
			<el-radio-group v-model="formWifi.hiddenSSID" @change="onChangeSettings">
				<el-radio v-for="item in hideSsidOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="隐藏 WIFI 密码" prop="hidePassword">
			<el-radio-group v-model="formWifi.hidePassword" @change="onChangeSettings">
				<el-radio v-for="item in hidePasswordOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="加密方式" prop="encryptionMode">
			<el-radio-group v-model="formWifi.encryptionMode" @change="onChangeSettings">
				<el-radio v-for="item in encryptionOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="EAP 加密方式" prop="eapMethod">
			<el-radio-group v-model="formWifi.eapMethod" @change="onChangeSettings">
				<el-radio v-for="item in eapOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
			</el-radio-group>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup name="Settings">
	import type { FormInstance } from "element-plus";
	import { IFormWifi } from "@/interface/data";

	const props = defineProps({
		settings: {
			type: Object,
			default: () => {
				return {
					ssid: {
						type: String,
						default: "",
					},
					password: {
						type: String,
						default: "",
					},
					eapIdentity: {
						type: String,
						default: "",
					},
					encryptionMode: {
						type: String,
						default: "WPA",
					},
					eapMethod: {
						type: String,
						default: "PWD",
					},
					hidePassword: {
						type: Number,
						default: 0,
					},
					hiddenSSID: {
						type: Number,
						default: 0,
					},
					direction: {
						type: Number,
						default: 1,
					},
				};
			},
		},
	});

	const directionOptions = [
		{ label: "横", value: 1 },
		{ label: "竖", value: 0 },
	];
	const hideSsidOptions = [
		{ label: "是", value: 1 },
		{ label: "否", value: 0 },
	];
	const hidePasswordOptions = [
		{ label: "是", value: 1 },
		{ label: "否", value: 0 },
	];
	const encryptionOptions = [
		{ label: "无", value: "" },
		{ label: "WPA/WPA2/WPA3", value: "WPA" },
		{ label: "WPA2-EAP", value: "WPA2-EAP" },
		{ label: "WEP", value: "WEP" },
	];
	const eapOptions = [{ label: "PWD", value: "PWD" }];

	const formWifiRef = ref<FormInstance>();
	let formWifi = reactive<IFormWifi>({
		// Network SSID name
		ssid: props.settings.ssid,
		// Network password
		password: props.settings.password,
		// Settings: EAP identity
		eapIdentity: props.settings.eapIdentity,
		// Settings: Network encryption mode
		encryptionMode: props.settings.encryptionMode,
		// Settings: EAP Method
		eapMethod: props.settings.eapMethod,
		// Settings: Mark your network as hidden SSID
		hiddenSSID: props.settings.hiddenSSID,
		// Settings: Hide password on the printed card
		hidePassword: props.settings.hidePassword,
		// Settings: Direction true transverse false portrait
		direction: props.settings.direction,
	});

	const emits = defineEmits(["changeSettings"]);
	const onChangeSettings = () => {
		emits("changeSettings", { ...formWifi });
	};
	watch(
		() => props.settings,
		(newValue) => {
			// formWifi.direction = newValue.direction;
			Object.assign(formWifi, newValue);
		},
		{
			deep: true,
		},
	);
</script>

<style scoped lang="scss">
	@use "./Wifi.scss";
</style>
