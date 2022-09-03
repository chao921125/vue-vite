<template>
	<el-button @click="changeShow">click</el-button>
	<transition-group appear tag="h2" name="animate__animated animate__bounce" enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
		<h2 v-show="isShow" key="1">动画效果1</h2>
		<h2 v-show="!isShow" key="2">动画效果2</h2>
	</transition-group>
	<div v-html="htmlTest"></div>
	<el-input v-model="text" maxlength="100" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="Please input" show-word-limit type="textarea" />
	<div v-html="textHtml"></div>
	<el-input v-model="textRe" maxlength="100" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="Please input" show-word-limit type="textarea" />
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";
	import { useRouter } from "vue-router";
	import Utils from "@/plugins/utils";

	export default defineComponent({
		name: "Home",
		setup() {
			const router = useRouter();
			const logout = () => {
				Utils.Storages.removeSessionStorage(Utils.Constants.storageKey.token);
				Utils.Cookies.removeCookie(Utils.Constants.cookieKey.token);
				router.push({ path: "/login" });
			};

			const htmlTest = "<div style='color: red'>1231233</div>";
			const text = ref("");
			const textHtml = ref("");
			const textRe = ref("");

			const isShow = ref(false);
			const changeShow = () => {
				isShow.value = !isShow.value;
				textHtml.value = "";
				if (text.value.replace(/\r\n/g, "|rn|").includes("|rn|")) {
					textHtml.value = text.value.replace(/\r\n/g, "@rn@</br>");
				}
				if (text.value.replace(/\n/g, "|n|").includes("|n|")) {
					textHtml.value = text.value.replace(/\n/g, "@n@</br>");
				}
				textHtml.value = textHtml.value.replace(/@n@/g, "");

				textRe.value = textHtml.value.replace(/<\/br>/g, "\r\n");
			};
			return {
				text,
				textHtml,
				textRe,
				isShow,
				htmlTest,
				changeShow,
				logout,
			};
		},
	});
</script>

<style scope lang="less"></style>
