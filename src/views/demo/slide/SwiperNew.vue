<script setup lang="ts">
	import { register } from "swiper/element";
	// import { Navigation, Pagination } from 'swiper/modules';

	onMounted(() => {
		register();
	});
</script>

<template>
	<swiper-container>
		<swiper-slide>Slide 1</swiper-slide>
		<swiper-slide>Slide 2</swiper-slide>
		<swiper-slide>Slide 3</swiper-slide>
	</swiper-container>
</template>

<style scoped lang="scss"></style>
