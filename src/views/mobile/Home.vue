<template>
	<van-button class="btn-font">aaa</van-button>
</template>

<script lang="ts" setup name="Home">
	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
</script>

<style scoped lang="scss">
	.btn-font {
		font-size: 20px;
	}
</style>
