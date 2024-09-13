<script setup lang="ts"></script>

<template>
	<RouterView v-slot="{ Component }">
		<KeepAlive>
			<component :is="Component" />
		</KeepAlive>
	</RouterView>
</template>

<style scoped lang="scss"></style>
