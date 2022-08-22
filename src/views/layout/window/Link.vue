<template>
	<el-row>
		<el-col :span="24">
			点击 <el-link :href="linkUrl" :underline="false" target="_blank">{{ linkUrl }}</el-link> 访问
		</el-col>
	</el-row>
</template>

<script lang="ts">
	import { defineComponent, onMounted, watch, ref } from "vue";
	import { useRoute } from "vue-router";
	import Utils from "@/plugins/utils";

	export default defineComponent({
		// eslint-disable-next-line vue/no-reserved-component-names
		name: "Link",
		setup() {
			const linkUrl = ref("");
			const route = useRoute();
			const initData = () => {
				linkUrl.value = String(route.meta.address) || "";
				Utils.open(linkUrl.value);
			};
			onMounted(() => {
				initData();
			});
			watch(
				() => route.path,
				() => {
					initData();
				},
			);
			return {
				linkUrl,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
