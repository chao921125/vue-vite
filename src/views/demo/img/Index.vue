<template>
	<el-row>
		<el-col
			:span="24"
			class="re-mb-20"
			>支持 heic 格式转换，默认上传就开始转换</el-col
		>
		<el-col
			:span="24"
			class="re-mb-20">
			<el-select
				v-model="file.fileType"
				class="m-2"
				placeholder="Select"
				size="large"
				style="width: 240px">
				<el-option
					v-for="item in file.optionsFileType"
					:key="item.value"
					:label="item.label"
					:value="item.value" />
			</el-select>
			<el-radio-group v-model="file.isCompress">
				<el-radio :label="true">压缩</el-radio>
				<el-radio :label="false">不压缩</el-radio>
			</el-radio-group>
			<el-slider
				v-model="file.compressValue"
				:disabled="!file.isCompress"
				:min="0"
				:max="1"
				:step="0.05"
				show-stops
				:marks="file.marks" />
		</el-col>
		<el-col
			:span="24"
			class="re-mb-20"
			v-loading="file.isLoading"
			element-loading-text="Loading..."
			element-loading-background="rgba(122, 122, 122, 0.8)">
			<el-upload
				drag
				action="#"
				multiple
				ref="fileUploadRef"
				:file-list="file.fileList"
				:show-file-list="false"
				:auto-upload="false"
				accept="image/png, image/jpeg, image/heic, image/jpg"
				:on-change="changeFile">
				<el-icon class="el-icon--upload"><upload-filled /></el-icon>
				<div class="el-upload__text"> Drop file here or <em>click to upload</em> </div>
				<template #tip>
					<div class="el-upload__tip"> jpg/jpeg/png/heic => jpg/jpeg/png </div>
				</template>
			</el-upload>
		</el-col>
		<el-col :span="24">
			<el-button @click="clearFileList">清除文件列表</el-button>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="">
	import type { UploadInstance, UploadFile, UploadFiles } from "element-plus";
	// import { imgConvert } from "@/plugins/utils/img";

	const fileUploadRef = ref<UploadInstance>();
	const file = reactive({
		optionsFileType: [
			{
				label: "jpg",
				value: "image/jpg",
			},
			{
				label: "jpeg",
				value: "image/jpeg",
			},
			{
				label: "png",
				value: "image/png",
			},
		],
		fileType: "image/png",
		isCompress: false,
		compressValue: 1,
		marks: {},
		fileList: [],
		fileListCompress: [],
		fileListUrl: [],
		isLoading: false,
	});

	const changeFile = async (uploadFile: UploadFile | File, uploadFiles: UploadFiles) => {
		file.isLoading = true;
		// imgConvert(uploadFile, file.fileType, (result: any) => {
		// 	console.log(result);
		// 	file.isLoading = false;
		// });
		console.log(uploadFile, uploadFiles);
	};

	const clearFileList = () => {
		nextTick(() => {
			if (fileUploadRef.value) {
				fileUploadRef.value.clearFiles();
			}
		});
	};

	const init = () => {
		for (let i = 0; i <= 1; i = i + 0.05) {
			file.marks[i] = (i * 100).toFixed(0) + "%";
		}
	};

	onMounted(() => {
		init();
	});
</script>

<style scoped lang="scss"></style>
