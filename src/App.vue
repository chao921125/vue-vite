<script setup></script>

<template>
	<RouterView v-slot="{ Component }">
		<KeepAlive>
			<component :is="Component" />
		</KeepAlive>
	</RouterView>
</template>

<style scoped lang="scss">
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}

	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}

	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
