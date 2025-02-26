<script setup lang="ts">
import { ref } from "vue";
import Assets from "@/utils/constant/assets";
import Page from "@/components/page/Index.vue";
import SeamlessScroll from "@/components/seamless/SeamlessScroll.vue";

const props = defineProps({
	msg: {
		type: String,
		default: "Hello World",
	},
});

const count = ref(0);

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
</script>

<template>
	<h1>{{ props.msg }}</h1>

	<div class="card">
		<button type="button" @click="count++"> count is {{ count }} </button>
		<img alt="Vue logo" :src="Assets.logo" style="width: 30px; height: 30px" />
	</div>

	<div class="page-box">
		<Page :total="200"></Page>
	</div>
	<div style="width: 100%; height: 50px">
		<SeamlessScroll :speed="50" direction="up" :auto-play="true" :hover-stop="true">
			<div v-for="(item, index) in items" :key="index" class="scroll-item">
				{{ item }}
			</div>
		</SeamlessScroll>
	</div>
</template>

<style scoped lang="scss">
.read-the-docs {
	color: #888;
	display: flex;
}
.page-box {
	background-color: #421a74;
}

.scroll-item {
	padding: 10px;
	background: #f0f0f0;
	border-bottom: 1px solid #ddd;
}
</style>
