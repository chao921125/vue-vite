<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Utils from "@/utils";

const linkUrl = ref("");
const route = useRoute();
const initData = () => {
	linkUrl.value = String(route.meta.address) || "";
	Utils.open(linkUrl.value);
};
onMounted(() => {
	initData();
});
</script>

<template>
	<div class="re-w-full">
		点击
		<el-link :href="linkUrl" underline="never" target="_blank">
			{{ linkUrl }}
		</el-link>
		访问
	</div>
</template>

<style scoped lang="scss"></style>
