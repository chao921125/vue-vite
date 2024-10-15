<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import HelloWorld from "./components/HelloWorld.vue";

	const isLoadFont = ref(false);
	onMounted(() => {
		const fontFaces = document.fonts.values();
		let item = fontFaces.next();
		let count = 0;
		while (!item.done) {
			// let ff = item.value;
			item = fontFaces.next();
			count += 1;
		}
		document.fonts.ready.then(() => {
			isLoadFont.value = document.fonts.size === count;
		});
	});
</script>

<template>
	<HelloWorld msg="Hello World!" />
</template>

<style scoped lang="scss"></style>
