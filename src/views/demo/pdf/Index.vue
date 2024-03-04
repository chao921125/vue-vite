<template>
	<div
		ref="pdfRef"
		class="pdf-viewer"></div>
	<div class="pdf-option re-flex-row-between">
		<div @click="gotoPage(-1)">pre</div>
		<div>{{ pdfInfo.pageNum }}/{{ pdfInfo.pageSize }}</div>
		<div @click="gotoPage(1)">next</div>
	</div>
</template>

<script lang="ts" setup name="">
	import * as pdfjsLib from "pdfjs-dist/build/pdf.min.mjs";
	import "pdfjs-dist/build/pdf.worker.min.mjs";

	const pdfRef = ref();
	const pdfInfo = reactive({
		pageNum: 1,
		pageSize: 1,
	});

	const loadPDF = async (pdfUrl: string, pageNum?: number) => {
		const loadingTask = pdfjsLib.getDocument(pdfUrl);
		try {
			const pdf = await loadingTask.promise;
			pdfInfo.pageSize = pdf.numPages;
			const page = await pdf.getPage(pageNum || 1);

			const viewport = page.getViewport({ scale: 1.5 });
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			const renderContext = {
				canvasContext: context,
				viewport: viewport,
			};
			await page.render(renderContext).promise;
			pdfRef.value.innerHTML = "";
			pdfRef.value.appendChild(canvas);
		} catch (error: any) {
			console.error("Error loading PDF: ", error);
		}
	};
	const gotoPage = (num: number) => {
		if (pdfInfo.pageNum + num <= 0 || pdfInfo.pageNum + num >= pdfInfo.pageSize) {
			return false;
		}
		pdfInfo.pageNum += num;
		loadPDF("https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf", pdfInfo.pageNum + num);
	};
	onMounted(() => {
		loadPDF("https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf", 1);
	});
</script>

<style scoped lang="scss">
	.pdf-option {
		position: relative;
		bottom: 0;
	}
</style>
