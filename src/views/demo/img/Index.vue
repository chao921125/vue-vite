<script setup lang="ts">
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

<template>
	<el-row>
		<el-col :span="24">
			<img
				alt="Vue logo"
				src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgd2lkdGg9IjM2Ij48cGF0aCBkPSJNMzQuMzIgMTguMzljMC0xLjE3LS4xMS0yLjMtLjI5LTMuMzlIMTh2Ni40OGg5LjRjLS4zOCAyLjE5LTEuNTkgNC4wNS0zLjQyIDUuMzF2NC4xaDUuMjhjMy4yLTIuOTcgNS4wNi03LjMzIDUuMDYtMTIuNXoiIGZpbGw9IiM0Mjg1RjQiLz48cGF0aCBkPSJNMTggMzVjNC41OSAwIDguNDQtMS41MiAxMS4yNS00LjEybC01LjI4LTQuMWMtMS41NyAxLjA4LTMuNTkgMS43MS01Ljk3IDEuNzEtNC41MSAwLTguMzMtMy4wMi05LjczLTcuMTFIMi44MnY0LjIzQzUuNjIgMzEuMTggMTEuMzYgMzUgMTggMzV6IiBmaWxsPSIjMzRBODUzIi8+PHBhdGggZD0iTTguMjcgMjEuMzljLS4zNi0xLjA3LS41Ny0yLjIxLS41Ny0zLjM5cy4yMS0yLjMyLjU4LTMuMzl2LTQuMjNIMi44MkMxLjY3IDEyLjY3IDEgMTUuMjUgMSAxOHMuNjcgNS4zMyAxLjgyIDcuNjNsNS40NS00LjI0eiIgZmlsbD0iI0ZCQkMwNSIvPjxwYXRoIGQ9Ik0xOCA3LjVjMi41NiAwIDQuODYuODggNi42NyAyLjYxbC4wMS4wMiA0LjctNC43QzI2LjQzIDIuNjggMjIuNTkgMSAxOCAxIDExLjM2IDEgNS42MiA0LjgyIDIuODIgMTAuMzdsNS40NSA0LjIzYzEuNC00LjA4IDUuMjItNy4xIDkuNzMtNy4xeiIgZmlsbD0iI0VBNDMzNSIvPjxwYXRoIGQ9Ik0xIDFoMzR2MzRIMXoiIGZpbGw9Im5vbmUiLz48L3N2Zz4="
				lowsrc="https://www.bing.com/th?id=OJ.ilrwlLiKV5AQIA&w=80&h=80&c=8&rs=1&pid=academic" />
		</el-col>
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

<style scoped lang="scss"></style>
