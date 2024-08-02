<template>
	<div>回退旧位置</div>
</template>

<script lang="ts" setup name="">
	const placeScroll = ref();
	// @ts-ignore
	onBeforeRouteLeave((to, from, next) => {
		console.log(to, from);
		placeScroll.value = document.documentElement.scrollTop;
		next();
	});
	onActivated(() => {
		nextTick(() => {
			if (placeScroll.value) {
				setTimeout(() => {
					document.documentElement.scrollTo(0, placeScroll.value);
					document.body.scrollTo(0, placeScroll.value);
				}, 100);
			}
		});
	});
</script>

<style scoped lang="scss"></style>
