<template>
	<van-button>aaa</van-button>
</template>

<script lang="ts" setup name="Home">
	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
</script>

<style scoped lang="scss"></style>
