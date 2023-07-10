<template>
	<div class="card-box re-flex-row-between" :class="isV ? '' : ''">
		<div>
			<QrcodeVue value="4567898765678" size="200"></QrcodeVue>
		</div>
		<div>
			<el-form ref="formWifiRef" :model="formWifi" :rules="formWifiRules" label-width="120px" label-position="top" status-icon>
				<el-form-item label="Activity name" prop="name">
					<el-input v-model="formWifi.name" />
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" setup name="WifiCard">
	import QrcodeVue from "qrcode.vue";
	import type { FormInstance, FormRules } from "element-plus";
	interface IFormWifi {
		name: string;
	}
	const formWifiRef = ref<FormInstance>(null);
	let formWifi = reactive<IFormWifi>({
		name: "",
	});
	const formWifiRules = reactive<FormRules<IFormWifi>>({
		name: [
			{ required: true, message: "Please input Activity name", trigger: "blur" },
			{ min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
		],
	});
	const isV = false;
</script>

<style scoped lang="scss">
	@use "./Wifi.scss";
</style>
