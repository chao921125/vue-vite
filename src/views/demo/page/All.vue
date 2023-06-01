<template>
	<el-button v-copy="'copyData'">自定义指令 copy</el-button>
	<el-button v-auth="['system']">自定义指令 auth</el-button>
	<el-button @click="testI18nMessage"> i18n {{ tI18n }}</el-button>
	<el-row class="re-mt-20">
		<el-col :span="8">
			<h1>静态引入图片：直接 import 导入</h1>
			<el-image :src="Logo" alt="" class=""></el-image>
		</el-col>
		<el-col :span="8">
			<h1>静态引入图片：直接 ref 引入，注意从 src 开始</h1>
			<el-image :src="imgStatic" alt="" class=""></el-image>
		</el-col>
		<el-col :span="8">
			<h1>动态引入图片：import.meta.url 或 return 请看api</h1>
			<el-image :src="getImg('logo')" alt="" class=""></el-image>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="All">
	import { $t } from "@/plugins/i18n";
	import Logo from "@/assets/images/logo.png";
	import api from "@/api";

	const tI18n = ref();

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);

	const testI18nMessage = () => {
		tI18n.value = $t("message.title.login");
	};

	const imgStatic = ref("/src/assets/images/logo.png");

	const getImg = (name: string, suffix?: string) => {
		return api.commonApi.getImgLocale(name, suffix);
	};
</script>

<style scoped lang="scss"></style>
