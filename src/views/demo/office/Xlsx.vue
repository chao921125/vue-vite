<template>
	<input type="file" ref="fileUpload" class="file-upload" multiple accept=".xlsx, xls" @change="fileChange" />
	<div @drop="handleDrop" @dragover="handleDragover">
		<el-button :loading="isLoading" size="mini" type="primary" @click="handleUpload">upload</el-button>
	</div>
	<div v-for="(item, index) in fileObj.fileList" :key="index">
		<el-link :underline="false" type="info">{{ item.name }}</el-link>
		<el-link :underline="false" type="success" class="re-m-l-10" @click="previewFile(index)">预览</el-link>
		<el-link :underline="false" type="primary" class="re-m-l-10">下载</el-link>
		<el-link :underline="false" type="danger" class="re-m-l-10">删除</el-link>
	</div>
</template>

<script lang="ts" setup name="Xlsx">
	import * as XLSX from "xlsx/xlsx.mjs";

	const fileUrl = ref("");
	const fileUpload = ref();
	const isLoading = ref(false);
	const fileObj = reactive({
		fileList: <any>[{ id: "id-xxxxxxx", name: "file.xlsx", url: "https://domain.com/id-xxxxxxx" }],
	});

	const initData = () => {
		if (fileUrl) {
			readXlsxOnline();
		} else {
			readXlsxLocal();
		}
	};
	const previewFile = () => {};
	const fileChange = (file: any) => {
		if (fileObj.fileList.length) {
			fileObj.fileList = [...fileObj.fileList, ...file.target.files];
		} else {
			fileObj.fileList = file.target.files;
		}
	};
	const readXlsxLocal = () => {
		XLSX.utils.sheet_to_html();
	};
	const readXlsxOnline = () => {
		XLSX.utils.sheet_to_html();
	};

	const handleUpload = () => {
		fileUpload.value.click();
	};
	const handleDrop = (e: any) => {
		e.stopPropagation();
		e.preventDefault();
		if (isLoading) return false;
		if (fileObj.fileList.length) {
			fileObj.fileList = [...fileObj.fileList, ...e.dataTransfer.files];
		} else {
			fileObj.fileList = e.dataTransfer.files;
		}
	};
	const handleDragover = (e: any) => {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	};

	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss">
	@import "./Xlsx.scss";
</style>
