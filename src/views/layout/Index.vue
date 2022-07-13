<template>
	<template v-if="isAdmin">
		<router-view></router-view>
	</template>
	<template v-else>
		<div>header</div>
		<div><router-view></router-view></div>
		<div>footer</div>
	</template>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Config from "@/router/config";

export default defineComponent({
	name: "Layout",
	setup() {
		const isAdmin = ref(true);
		isAdmin.value = Config.isAdminIframe;

		return {
			isAdmin,
		}
	},
});
</script>

<style scoped></style>
