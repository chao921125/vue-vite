<template>
	<el-row>
		<el-col :span="24"> 复制指令 <el-button v-copy="copyValue" class="re-mr-20">点击复制</el-button> </el-col>
		<el-col :span="24">
			<el-input placeholder="请输入需要复制的内容" v-model="copyValue"></el-input>
		</el-col>
		<el-divider></el-divider>
		<el-col :span="24">权限指令 删除 由数据判断无法操作</el-col>
		<el-col :span="24">
			<el-checkbox-group v-model="authList">
				<el-checkbox label="C">创建</el-checkbox>
				<el-checkbox label="R">查询</el-checkbox>
				<el-checkbox label="U">修改</el-checkbox>
				<el-checkbox label="D" disabled>删除</el-checkbox>
			</el-checkbox-group>
			<el-button v-for="item in authList" :key="item" v-auth="item" class="re-mr-20">{{ item }}</el-button>
		</el-col>
	</el-row>
	<el-divider></el-divider>
	<el-row>
		<el-col :span="24">
			i18n国际化，点击之后查看国际化内容 <el-button @click="testI18nMessage" class="re-mr-20">{{ tI18n || "-" }}</el-button>
		</el-col>
	</el-row>
	<el-divider></el-divider>
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

	const isLoading = ref(true);
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);

	// 复制指令测试
	const copyValue = ref("copy test text");

	// 权限指令测试
	const authList = ref(["C", "R", "U", "D"]);

	// 国际化
	const tI18n = ref();
	const testI18nMessage = () => {
		tI18n.value = $t("message.title.login");
	};

	// 图片
	const imgStatic = ref("/src/assets/images/logo.png");
	const getImg = (name: string, suffix?: string) => {
		return api.commonApi.getImgLocale(name, suffix);
	};
</script>

<style scoped lang="scss"></style>
