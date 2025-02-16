<!--<script setup lang="ts">-->
<!--import { ref } from "vue";-->

<!--const props = defineProps({-->
<!--	src: {-->
<!--		type: String,-->
<!--		required: true,-->
<!--	},-->
<!--	loadingText: {-->
<!--		type: String,-->
<!--		default: "Loading...",-->
<!--	},-->
<!--	errorText: {-->
<!--		type: String,-->
<!--		default: "Failed to load image.",-->
<!--	},-->
<!--});-->
<!--const isLoading = ref(true);-->
<!--const hasError = ref(false);-->

<!--const onLoad = () => {-->
<!--	isLoading.value = false;-->
<!--};-->

<!--const onError = () => {-->
<!--	isLoading.value = false;-->
<!--	hasError.value = true;-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--	<div class="image-loader">-->
<!--		<div v-if="isLoading" class="loading">-->
<!--			<slot name="loading">-->
<!--				{{ props.loadingText }}-->
<!--			</slot>-->
<!--		</div>-->
<!--		<img v-else :src="props.src" alt="" @load="onLoad" @error="onError" />-->
<!--		<div v-if="hasError" class="error">-->
<!--			<slot name="error">-->
<!--				{{ props.errorText }}-->
<!--			</slot>-->
<!--		</div>-->
<!--	</div>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.image-loader {-->
<!--	position: relative;-->
<!--	display: inline-block; /* 或其他适合你的布局方式 */-->
<!--}-->

<!--.loading {-->
<!--	position: absolute;-->
<!--	top: 50%;-->
<!--	left: 50%;-->
<!--	transform: translate(-50%, -50%);-->
<!--	/* 添加你的 loading 样式 */-->
<!--}-->

<!--.error {-->
<!--	position: absolute;-->
<!--	top: 50%;-->
<!--	left: 50%;-->
<!--	transform: translate(-50%, -50%);-->
<!--	color: red; /* 或其他适合你的错误提示样式 */-->
<!--}-->

<!--img {-->
<!--	display: block; /* 防止图片底部出现空白 */-->
<!--}-->
<!--</style>-->
