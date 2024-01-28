<template>
	<el-row>
		<el-col :span="24" class="re-mb-20">支持 heic 格式转换，默认上传就开始转换</el-col>
		<el-col :span="24" class="re-mb-20">
			<el-select v-model="file.fileType" class="m-2" placeholder="Select" size="large" style="width: 240px">
				<el-option v-for="item in file.optionsFileType" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
			<el-radio-group v-model="file.isCompress">
				<el-radio :label="true">压缩</el-radio>
				<el-radio :label="false">不压缩</el-radio>
			</el-radio-group>
			<el-slider v-model="file.compressValue" :disabled="!file.isCompress" :min="0" :max="1" :step="0.05" />
		</el-col>
		<el-col :span="24" class="re-mb-20" v-loading="file.isLoading" element-loading-text="Loading..." element-loading-background="rgba(122, 122, 122, 0.8)">
			<el-upload
				drag
				action="#"
				multiple
				ref="fileUploadRef"
				:file-list="file.fileList"
				:show-file-list="false"
				:auto-upload="false"
				accept="image/png, image/jpeg, image/heic, image/jpg"
				:on-change="changeFile"
			>
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

	const fileUploadRef = ref<UploadInstance>();
	const file = reactive({
		optionsFileType: [
			{
				label: "jpg",
				value: "jpg",
			},
			{
				label: "jpeg",
				value: "jpeg",
			},
			{
				label: "png",
				value: "png",
			},
		],
		fileType: "jpg",
		isCompress: false,
		compressValue: 1,
		fileList: [],
		fileListCompress: [],
		fileListUrl: [],
		isLoading: false,
	});

	const changeFile = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
		console.log(uploadFile, uploadFiles);
	};

	const clearFileList = () => {
		fileUploadRef.value.clearFiles();
	};
</script>

<style scoped lang="scss"></style>
