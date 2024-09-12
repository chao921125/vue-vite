<script setup lang="ts">
	import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
	<HelloWorld msg="Hello World!" />
	<div class="dis">test auto surfix</div>
</template>

<style scoped lang="scss">
	.dis {
		display: flex;
		font-size: 16px;
	}
	@media screen and (max-width: 768px) {
		.dis {
			font-size: 32px;
		}
	}
</style>
