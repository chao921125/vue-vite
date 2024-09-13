<script setup lang="ts">
	import ExcelJS from "exceljs";

	const fileObj = <any>reactive({
		fileData: [],
	});

	const importExcel = async (file: any) => {
		if (!file.target.files.length) {
			return false;
		}
		const files = file.target.files;
		const workbook = new ExcelJS.Workbook();
		const fileReader = new FileReader();
		fileReader.readAsArrayBuffer(files[0]);
		fileReader.onload = (fileEvent: any) => {
			workbook.xlsx.load(fileEvent.target.result).then((wb: any) => {
				const sheet = wb.getWorksheet();
				for (let i = 1; i <= sheet.rowCount; i++) {
					let row = <any[]>[];
					sheet.getRow(i).eachCell((cell: any) => {
						console.log(cell);
						// console.log(typeof cell.value);
						// console.log(cell.value instanceof Object);
						if (cell.value instanceof Object) {
							row.push(cell.value.result || "");
						} else {
							row.push(cell.value || "");
						}
					});
					fileObj.fileData.push(row);
				}
			});
		};
	};
	// ExcelJS
</script>

<template>
	<div>
		<input
			type="file"
			accept=".xlsx, .xls"
			@change="importExcel" />
	</div>
	<div
		v-for="(item, index) in fileObj.fileData"
		:key="index"
		>{{ item }}</div
	>
</template>

<style scoped lang="scss"></style>
