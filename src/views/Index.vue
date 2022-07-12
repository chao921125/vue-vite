<template>
	<div class="test_two_box">
		<video
			id="myVideo"
			class="video-js"
			width="100%"
			height="100%"
			controls
			muted
			autoplay
			webkit-playsinline
			playsinline
			x5-playsinline
			x5-video-player
		>
			<source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
			<p class="vjs-no-js">不支持播放</p>
		</video>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Index",
	data() {
		return {};
	},
	mounted() {
		this.initVideo();
	},
	methods: {
		initVideo() {
			//初始化视频方法
			// this.$video(myVideo, {
			//   //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
			//   controls: false,
			//   //自动播放属性,muted:静音播放
			//   autoplay: 'true',
			//   //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
			//   preload: 'auto',
			//   //设置视频播放器的显示宽度（以像素为单位）
			//   width: '300px',
			//   //设置视频播放器的显示高度（以像素为单位）
			//   height: '300px',
			// });
		},
	},
});
</script>

<style scope lang="less">
.test_two_box {
	width: 100%;
	height: 300px;
}
</style>
