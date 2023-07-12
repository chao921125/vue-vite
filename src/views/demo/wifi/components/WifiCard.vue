<template>
	<div style="text-align: center">
		<h1 style="font-size: 24px; font-weight: bold">WiFi: {{ formWifi.ssid || "" }}</h1>
	</div>
	<div
		class="re-w-fill re-flex-row-between card-box"
		:style="`width: 100%; margin-top: 20px; display: ${formWifi.direction ? 'flex' : 'block'}; justify-content: space-between; align-items: center;`"
	>
		<div
			class="card-qr"
			:style="`flex-shrink: 0; display: flex; justify-content: center; align-items: center; width: ${formWifi.direction ? '200px' : '100%'};`"
		>
			<QrcodeVue :value="qrValue" :size="150"></QrcodeVue>
		</div>
		<div class="card-form" :style="`flex-shrink: 0; align-self: flex-start; width: ${formWifi.direction ? 'calc(100% - 200px)' : '100%'};`">
			<el-form
				ref="formWifiRef"
				:model="formWifi"
				label-width="120px"
				label-position="top"
				status-icon
				:style="`maring-left: ${formWifi.direction ? '20px' : '0'};`"
			>
				<el-form-item label="WIFI 名称" prop="ssid" v-show="!formWifi.hiddenSSID" style="maring-top: 10px">
					<el-input v-model="formWifi.ssid" placeholder="WIFI 名称" @input="onChangeSettings" />
				</el-form-item>
				<el-form-item label="用户名" prop="eapIdentity" v-show="formWifi.encryptionMode === 'WPA2-EAP'" style="maring-top: 10px">
					<el-input v-model="formWifi.eapIdentity" placeholder="用户名" @input="onChangeSettings" />
				</el-form-item>
				<el-form-item label="WIFI 密码" prop="password" v-show="!formWifi.hidePassword" style="maring-top: 10px">
					<el-input v-model="formWifi.password" placeholder="WIFI 密码" @input="onChangeSettings" />
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" setup name="WifiCard">
	import QrcodeVue from "qrcode.vue";
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
	const { proxy } = getCurrentInstance() as any;

	const onChangeSettings = () => {
		// emits("changeSettings", {ssid: formWifi.ssid, password: formWifi.password, eapIdentity: formWifi.eapIdentity});
		emits("changeSettings", { ...formWifi });
	};
	const validWifiForm = () => {
		let result = true;
		if (!formWifi.ssid) {
			proxy.elMessage.error("WIFI 名称 不能为空");
			result = false;
		} else if (formWifi.encryptionMode === "WPA2-EAP" && !formWifi.eapIdentity) {
			proxy.elMessage.error("用户名 不能为空");
			result = false;
		} else if (!formWifi.password) {
			proxy.elMessage.error("WIFI 密码 不能为空");
			result = false;
		}
		return result;
	};

	// 二维码
	const escape = (v) => {
		const needsEscape = ['"', ";", ",", ":", "\\"];
		let escaped = "";
		for (const c of v) {
			if (needsEscape.includes(c)) {
				escaped += `\\${c}`;
			} else {
				escaped += c;
			}
		}
		return escaped;
	};
	const qrValue = computed(() => {
		let options: any = {};
		options.T = props.settings.encryptionMode || "nopass";
		if (props.settings.encryptionMode === "WPA2-EAP") {
			options.E = props.settings.eapMethod;
			options.I = props.settings.eapIdentity;
		}
		options.S = escape(props.settings.ssid);
		options.P = escape(props.settings.password);
		options.H = !!props.settings.hiddenSSID;

		let data: string = "";
		Object.entries(options).forEach(([k, v]) => (data += `${k}:${v};`));
		return `WIFI:${data};`;
	});
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
	defineExpose({
		onChangeSettings,
		validWifiForm,
	});
</script>

<style scoped lang="scss">
	@use "./Wifi.scss";
</style>
