<template>
	<van-button class="m-btn-font" type="success">button</van-button>
	<van-grid>
		<van-grid-item icon="photo-o" text="文字" />
		<van-grid-item icon="photo-o" text="文字" />
		<van-grid-item icon="photo-o" text="文字" />
		<van-grid-item icon="photo-o" text="文字" />
	</van-grid>
	<van-tabbar v-model="active">
		<van-tabbar-item badge="3">
			<span>自定义</span>
			<template #icon="props">
				<img :src="props.active ? icon.active : icon.inactive" />
			</template>
		</van-tabbar-item>
		<van-tabbar-item icon="search">标签</van-tabbar-item>
		<van-tabbar-item icon="setting-o">标签</van-tabbar-item>
	</van-tabbar>
</template>

<script lang="ts" setup name="">
	const isLoading = ref(true);
	const active = ref(0);
	const icon = {
		active: "https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png",
		inactive: "https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png",
	};
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
</script>

<style scoped lang="scss">
	.m-btn-font {
		font-size: 20px;
	}
</style>
