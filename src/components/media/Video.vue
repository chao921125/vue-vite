<script setup lang="ts">
const props = defineProps({
	url: {
		type: String,
		default: "",
	},
});
</script>

<template>
	<video
		autoPlay
		muted
		loop
		playsInline
		object-fit="contain"
		class="video"
		id="headerVideo"
		controlsList="nodownload nofullscreen"
		:disablePictureInPicture="true"
		:poster="props.url + '?x-oss-process=video/snapshot,t_50,f_jpg,w_0,h_0'">
		<source :src="props.url" type="video/mp4" />
		Your browser does not support the video。
	</video>
</template>

<style scoped lang="scss">
.video {
	width: 100%;
	height: 100%;
}
</style>
