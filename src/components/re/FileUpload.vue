<template>
	<el-upload
		v-show="props.isShowAlways && props.fileList && props.fileList.length === props.fileLimit"
		class="file-upload"
		:action="props.uploadUrl"
		:headers="props.uploadHeader"
		:method="props.uploadMethod"
		:multiple="props.isMultiple"
		:drag="props.isDrag"
		:show-file-list="props.isShowFileList"
		:file-list="props.fileList"
		:limit="props.fileLimit"
		:accept="props.fileAccept"
		:auto-upload="props.isAutoUpload"
		:disabled="props.isDisabled">
		<el-button
			v-if="props.fileStyle === 1"
			type="primary"
			>{{ props.buttonText }}</el-button
		>
		<el-icon v-if="props.fileStyle === 1"><Plus /></el-icon>
		<div v-if="props.fileStyle === 3">
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text"> Drop file here or <em>click to upload</em> </div>
		</div>
		<template #tip>
			<div
				v-if="props.tipsText"
				class="el-upload__tip"
				>{{ props.tipsText }}</div
			>
		</template>
	</el-upload>
</template>

<script lang="ts" setup name="">
	import type { UploadUserFile } from "element-plus";
	const props = defineProps({
		isShowAlways: {
			// 是否达到指定的数量隐藏上传图标
			type: Boolean,
			default: true,
		},
		isMultiple: {
			type: Boolean,
			default: false,
		},
		isAutoUpload: {
			type: Boolean,
			default: false,
		},
		isDisabled: {
			type: Boolean,
			default: false,
		},
		isShowFileList: {
			type: Boolean,
			default: true,
		},
		isDrag: {
			type: Boolean,
			default: false,
		},
		buttonText: {
			type: String,
			default: "Select File",
		},
		tipsText: {
			type: String,
			default: "",
		},
		uploadUrl: {
			required: true,
			type: String,
			default: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
		},
		uploadHeader: {
			type: Object,
			default: () => {
				return {};
			},
		},
		uploadMethod: {
			type: String,
			default: "",
		},
		uploadData: {
			type: [Object, Function],
			default: () => {
				return {};
			},
		},
		fileStyle: {
			// 1 Button 2 Add 3 Drop
			type: Number,
			default: 1,
		},
		fileList: {
			required: true,
			type: Array<UploadUserFile>,
			default: () => {
				return [];
			},
		},
		fileLimit: {
			type: Number,
			default: 1,
		},
		fileAccept: {
			type: String,
			default: "",
		},
		fileListType: {
			type: String,
			default: "text",
		},
		fileName: {
			type: String,
			default: "",
		},
	});
	const emits = defineEmits(["change"]);
	const changeClick = () => {
		emits("change", true);
	};
	defineExpose({
		changeClick,
	});
</script>

<style scoped lang="scss"></style>
