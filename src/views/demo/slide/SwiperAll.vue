<template>
	<swiper loop :modules="[EffectFade, Autoplay]" autoplay effect="fade">
		<swiper-slide style="background-color: #44eeaa">Slide 1</swiper-slide>
		<swiper-slide style="background-color: #eeeeaa">Slide 2</swiper-slide>
		<swiper-slide style="background-color: #ffee11">Slide 3</swiper-slide>
	</swiper>
</template>

<script lang="ts" setup name="SwiperAll">
	import { Swiper, SwiperSlide } from "swiper/swiper-vue";
	import { EffectFade, Autoplay } from "swiper/modules";

	import "swiper/css";
	import "swiper/css/effect-fade";
</script>

<style scoped lang="scss"></style>
