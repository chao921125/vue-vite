<script setup lang="ts">
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { EffectFade, Autoplay } from "swiper/modules";
	import "swiper/css";
	import "swiper/css/effect-fade";

	// import { register } from "swiper/element";
	// onMounted(() => {
	// 	register();
	// });
</script>

<template>
	<el-row>
		<el-col :span="24">基本示例 动画 自动播放 手动滑动后自动播放失效</el-col>
		<el-col :span="24">
			<swiper
				loop
				:modules="[EffectFade, Autoplay]"
				autoplay
				effect="fade">
				<swiper-slide style="background-color: #44eeaa">Slide 1</swiper-slide>
				<swiper-slide style="background-color: #eeeeaa">Slide 2</swiper-slide>
				<swiper-slide style="background-color: #ffee11">Slide 3</swiper-slide>
			</swiper>
		</el-col>
	</el-row>
	<el-divider />
	<el-row>
		<el-col :span="24">基本示例 动画 自动播放 禁止手动控制 class="swiper-no-swiping"</el-col>
		<el-col :span="24">
			<swiper
				loop
				:modules="[EffectFade, Autoplay]"
				autoplay
				effect="fade"
				class="swiper-no-swiping">
				<swiper-slide style="background-color: #44eeaa">Slide 1</swiper-slide>
				<swiper-slide style="background-color: #eeeeaa">Slide 2</swiper-slide>
				<swiper-slide style="background-color: #ffee11">Slide 3</swiper-slide>
			</swiper>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="24">
			<!--			<swiper-container>-->
			<!--				<swiper-slide>Slide 1</swiper-slide>-->
			<!--				<swiper-slide>Slide 2</swiper-slide>-->
			<!--				<swiper-slide>Slide 3</swiper-slide>-->
			<!--			</swiper-container>-->
		</el-col>
	</el-row>
</template>

<style scoped lang="scss"></style>
