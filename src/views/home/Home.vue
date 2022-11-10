<template>
	<el-skeleton :rows="1" animated :loading="isLoading">
		<el-row>
			<el-col :span="12">
				<el-badge :value="12" class="item">
					<el-button>库存预警</el-button>
				</el-badge>
			</el-col>
		</el-row>
	</el-skeleton>
</template>

<script lang="ts" setup name="Home">
	import { ref } from "vue";

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 3000);
</script>

<style scoped lang="scss"></style>
