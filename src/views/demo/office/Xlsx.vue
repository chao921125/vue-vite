<template>
	<div>如果借助于element的话，那么获取File对象则是file.raw；这里只做一个示例，原生的无需深度获取。</div>
	<input type="file" ref="fileUpload" class="file-upload" multiple accept=".xlsx, xls, .csv" @change="fileChange" />
	<div @drop="handleDrop" @dragover="handleDragover" @dragleave="handleDragleave" style="border: 1px dotted #000000">
		<span>Drop a spreadsheet file here to upload sites</span>
		<el-button :loading="isLoading" size="small" type="primary" @click="handleUpload">upload</el-button>
	</div>
	<div v-for="(item, index) in fileObj.fileList" :key="index">
		<el-link :underline="false" type="info">{{ item.name }}</el-link>
		<el-link :underline="false" type="success" class="re-ml-10" @click="previewFile(Number(index))">预览</el-link>
		<el-link :underline="false" type="primary" class="re-ml-10">下载</el-link>
		<el-link :underline="false" type="danger" class="re-ml-10">删除</el-link>
	</div>
	<div v-html="fileObj.fileReaderHtml" class="file-reader-box"></div>
	<div class="table-box" v-loading="isLoading">
		<table v-if="fileObj.fileReader.headers.length" class="excel-table" border="0" cellpadding="0" cellspacing="0">
			<thead>
				<tr class="excel-column">
					<th class="column-item" scope="col"></th>
					<th class="column-item" scope="col" v-for="(item, index) in fileObj.fileReader.headers" :key="item">
						{{ String.fromCharCode(65 + (index % 26)) }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr class="excel-row">
					<th class="row-item" scope="row">{{ 1 }}</th>
					<td v-for="(item, index) in fileObj.fileReader.headers" :key="index">{{ item }}</td>
				</tr>
				<tr class="excel-row" v-for="(item, index) in fileObj.fileReader.dataList" :key="index">
					<th class="row-item" scope="row">{{ index + 2 }}</th>
					<td v-for="(itemH, indexH) in fileObj.fileReader.headers" :key="item + indexH">{{ item[itemH] }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts" setup name="Xlsx">
	import * as XLSX from "xlsx/xlsx.mjs";

	// online
	// let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src='+url
	const fileUpload = ref();
	const isLoading = ref(false);
	const fileObj: any = reactive({
		fileList: [{ id: "id-xxxxxxx", name: "file.xlsx", url: "https://domain.com/id-xxxxxxx" }] as any,
		fileReaderHtml: "",
		fileReader: {
			headers: [],
			dataList: [],
		},
	});

	const initData = () => {};
	const previewFile = (index: number) => {
		if (fileObj.fileList[index].url) {
			readXlsxOnline(index);
		} else {
			readXlsxLocale(index);
		}
	};
	const fileChange = (file: any) => {
		if (fileObj.fileList.length) {
			fileObj.fileList = [...fileObj.fileList, ...file.target.files];
		} else {
			fileObj.fileList = file.target.files;
		}
	};
	const readXlsxLocale = (index: number) => {
		const file = fileObj.fileList[index];
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const data = e.target.result;
			const workbook = XLSX.read(data, { type: "array" });
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const header = getHeaderRow(worksheet);
			fileObj.fileReaderHtml = XLSX.utils.sheet_to_html(worksheet);
			fileObj.fileReader.headers = header;
			fileObj.fileReader.dataList = XLSX.utils.sheet_to_json(worksheet);
		};
		reader.readAsArrayBuffer(file);
	};
	const readXlsxOnline = (index: number) => {
		// 获取远程url
		// 设置请求 responseType: "blob",
		let xhr = new XMLHttpRequest();
		xhr.open("get", "url", true);
		xhr.responseType = "arraybuffer";
		xhr.onload = () => {
			console.log(xhr.status, xhr.response);
			console.log(new Uint8Array(xhr.response));
		};
		const file = fileObj.fileList[index];
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const data = e.target.result;
			const workbook = XLSX.read(data, { type: "array" });
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const header = getHeaderRow(worksheet);
			fileObj.fileReaderHtml = XLSX.utils.sheet_to_html(worksheet);
			fileObj.fileReader.headers = header;
			fileObj.fileReader.dataList = XLSX.utils.sheet_to_json(worksheet);
		};
		reader.readAsArrayBuffer(file);
	};
	const getHeaderRow = (sheet: any) => {
		const headers = [] as any;
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

	const handleUpload = () => {
		fileUpload.value.click();
	};
	const proxy = getCurrentInstance() as any;
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
	@use "./Xlsx.scss";
</style>
