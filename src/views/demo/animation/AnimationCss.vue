<template>
	<el-row>
		<el-col :span="24">
			<el-button @click="changeShow">click</el-button>
			<transition-group appear tag="h2" name="animate__animated animate__bounce" enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
				<h2 v-show="isShow" key="1">动画效果1</h2>
				<h2 v-show="!isShow" key="2">动画效果2</h2>
				<div v-html="htmlTest"></div>
			</transition-group>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="AnimationCss">
	import { ref } from "vue";

	const htmlTest = "<div style='color: red'>1231233</div>";
	const text = ref("");
	const textHtml = ref("");
	const textRe = ref("");
	const isShow = ref(false);
	const changeShow = () => {
		isShow.value = !isShow.value;
		textHtml.value = "";
		if (text.value.replace(/\r\n/g, "|rn|").includes("|rn|")) {
			textHtml.value = text.value.replace(/\r\n/g, "@rn@</br>");
		}
		if (text.value.replace(/\n/g, "|n|").includes("|n|")) {
			textHtml.value = text.value.replace(/\n/g, "@n@</br>");
		}
		textHtml.value = textHtml.value.replace(/@n@/g, "");

		textRe.value = textHtml.value.replace(/<\/br>/g, "\r\n");
	};
</script>

<style scoped lang="scss"></style>
