<script setup lang="ts">
import { ref } from "vue";
import Assets from "@/utils/constant/assets";
import Page from "@/components/page/Index.vue";

const props = defineProps({
	msg: {
		type: String,
		default: "Hello World",
	},
});

const count = ref(0);
</script>

<template>
	<h1>{{ props.msg }}</h1>

	<div class="card">
		<button type="button" @click="count++"> count is {{ count }} </button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code> to test HMR
		</p>
	</div>

	<p>
		Check out
		<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"> create-vue </a>
		, the official Vue + Vite starter
	</p>
	<p>
		Learn more about IDE Support for Vue in the
		<a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank"> Vue Docs Scaling up Guide </a>
		.
	</p>
	<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
	<div class="page-box">
		<Page :total="200"></Page>
	</div>
	<img alt="Vue logo" :src="Assets.logo" />
</template>

<style scoped lang="scss">
.read-the-docs {
	color: #888;
	display: flex;
}
.page-box {
	background-color: #421a74;
}
</style>
