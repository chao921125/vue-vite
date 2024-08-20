<template>
	<swiper-container>
		<swiper-slide>Slide 1</swiper-slide>
		<swiper-slide>Slide 2</swiper-slide>
		<swiper-slide>Slide 3</swiper-slide>
	</swiper-container>
</template>

<script lang="ts" setup name="">
	import { register } from "swiper/element";
	// import { Navigation, Pagination } from 'swiper/modules';

	onMounted(() => {
		register();
	});
</script>

<style scoped lang="scss"></style>
