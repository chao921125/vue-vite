<template>
	<input type="file" ref="fileUpload" class="file-upload" multiple accept=".xlsx, xls, .csv" @change="fileChange" />
	<div @drop="handleDrop" @dragover="handleDragover" @dragleave="handleDragleave" style="border: 1px dotted #000000">
		<span>Drop a spreadsheet file here to upload sites</span>
		<el-button :loading="isLoading" size="mini" type="primary" @click="handleUpload">upload</el-button>
	</div>
	<div v-for="(item, index) in fileObj.fileList" :key="index">
		<el-link :underline="false" type="info">{{ item.name }}</el-link>
		<el-link :underline="false" type="success" class="re-m-l-10" @click="previewFile(index)">预览</el-link>
		<el-link :underline="false" type="primary" class="re-m-l-10">下载</el-link>
		<el-link :underline="false" type="danger" class="re-m-l-10">删除</el-link>
	</div>
	<div v-html="fileObj.fileReader" class="file-reader-box"></div>
</template>

<script lang="ts" setup name="Xlsx">
	import * as XLSX from "xlsx/xlsx.mjs";

	const fileUrl = ref("");
	const fileUpload = ref();
	const isLoading = ref(false);
	const fileObj = reactive({
		fileList: <any>[{ id: "id-xxxxxxx", name: "file.xlsx", url: "https://domain.com/id-xxxxxxx" }],
		fileReader: "",
	});

	const initData = () => {
		if (fileUrl) {
			readXlsxOnline();
		} else {
			readXlsxLocal();
		}
	};
	const previewFile = (index: number) => {
		console.log(index);
		const file = fileObj.fileList[index];
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const data = e.target.result;
			const workbook = XLSX.read(data, { type: "array" });
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const header = getHeaderRow(worksheet);
			const results = XLSX.utils.sheet_to_html(worksheet);
			console.log({ header, results });
			fileObj.fileReader = results;
		};
		reader.readAsArrayBuffer(file);
	};
	const getHeaderRow = (sheet: any) => {
		const headers = <any>[];
		const range = XLSX.utils.decode_range(sheet["!ref"]);
		let C;
		const R = range.s.r;
		/* start in the first row */
		for (C = range.s.c; C <= range.e.c; ++C) {
			/* walk every column in the range */
			const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
			/* find the cell in the first row */
			let hdr = "UNKNOWN " + C; // <-- replace with your desired default
			if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
			headers.push(hdr);
		}
		return headers;
	};
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
	const proxy = <any>getCurrentInstance();
	const handleDrop = (event: any) => {
		proxy.elMessage.info("aaaa");
		event.stopPropagation();
		event.preventDefault();
		if (isLoading) return false;
		fileChange(event.dataTransfer.files);
	};
	const handleDragover = (event: any) => {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = "copy";
	};
	const handleDragleave = (event: any) => {
		event.stopPropagation();
		event.preventDefault();
	};

	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss">
	@import "./Xlsx.scss";
</style>
