<template>
	<el-row class="icon-box">
		<el-col :span="24">
			element icon 示例：<el-link :underline="false" type="primary" target="_blank" href="https://element-plus.gitee.io/zh-CN/">官网</el-link>
		</el-col>
		<el-col :span="24">
			<code>
				1、使用 el-icon 配合使用 &lt;el-icon size="16"&gt;&lt;Edit /&gt;&lt;/el-icon&gt;
				<el-icon :size="16">
					<Edit />
				</el-icon>
			</code>
		</el-col>
		<el-col :span="24">
			<code>
				2、直接使用 &lt;Edit style="font-size: 16px; width: 16px; height: 16px;"/&gt;
				<Edit style="width: 16px; height: 16px; font-size: 16px" />
			</code>
		</el-col>
	</el-row>
	<el-divider />
	<el-row class="icon-box">
		<el-col :span="24"> iconfont 示例 <el-link :underline="false" type="primary" target="_blank" href="https://www.iconfont.cn/">官网</el-link> </el-col>
		<el-col :span="24">
			<code>iconfont &lt;i class="iconfont icon-detail"&gt;&lt;/i&gt; <i class="iconfont icon-detail" /></code>
		</el-col>
	</el-row>
	<el-divider />
	<el-row class="icon-box">
		<el-col :span="24"> svg 示例 <el-link :underline="false" type="primary" target="_blank" href="https://www.svgrepo.com/">某图标库</el-link></el-col>
		<el-col :span="24">
			<icon-svg name="accessibility-outline" class="svg-icon-cus"></icon-svg>
			<icon-svg name="democrat" class="svg-icon-cus"></icon-svg>
			<icon-svg name="wifi" class="svg-icon-cus"></icon-svg>
		</el-col>
	</el-row>
	<el-divider />
	<el-row class="icon-box">
		<el-col :span="24">
			iconify 示例：<el-link :underline="false" type="primary" target="_blank" href="https://icon-sets.iconify.design/">官网</el-link>
		</el-col>
		<el-col :span="24">
			<p>由于这个包体积太大，本项目未使用该包，借此只提供使用方法不提供展示demo，如需要使用该图标库，请在 package.json 文件中添加以下内容</p>
			<p>dependencies "@iconify/iconify": "^0.0.0",</p>
			<p>devDependencies "@iconify/json": "^0.0.0","@iconify/vue": "^0.0.0",</p>
		</el-col>
		<el-col :span="24">
			<code>
				1、原生使用 import 导入(不推荐) import { Icon } from '@iconify/vue'; &lt;Icon icon="mdi-light:home"&gt;&lt;/Icon&gt;
				<!-- <Icon icon="mdi-light:home" /> -->
			</code>
		</el-col>
		<el-col :span="24">
			<code>
				2、unplugin-icons 示例 <el-link :underline="false" type="primary" target="_blank" href="https://icones.netlify.app/">官网</el-link>
				unplugin-icons &lt;i-mdi-account-reactivate style="font-size: 2em; color: red"&gt;&lt;/i&gt;
				<!-- <i-mdi-account-reactivate style="font-size: 2em; color: red" /> -->
				<!-- <el-icon :size="20"> -->
				<!--  <i-material-symbols-10k-outline /> -->
				<!-- </el-icon> -->
			</code>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup name="Iconify">
	// import { Icon } from "@iconify/vue";
</script>

<style scoped lang="scss">
	.icon-box {
		line-height: 1.5;
	}
	.icon {
		font-size: 200px;
		color: #ff0000;
	}
</style>
