<script setup lang="ts">
import { onMounted, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const isFont = async () => {
	const fontFaces = document.fonts.values();
	let item = fontFaces.next();
	let count = 0;
	while (!item.done) {
		// let ff = item.value;
		item = fontFaces.next();
		count += 1;
	}
	return document.fonts.ready.then(() => {
		return document.fonts.size === count;
	});
};

const isLoadFont = ref(false);
onMounted(() => {
	isFont().then((res) => {
		isLoadFont.value = res;
	});
});
</script>

<template>
	<div class="tf">ASDF</div>
	<HelloWorld msg="Hello World!" />
</template>

<style scoped lang="scss">
.tf {
	font-family: "NotoSans-Medium";
}
</style>
