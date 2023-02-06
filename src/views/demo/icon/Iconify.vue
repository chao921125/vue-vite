<template>
	<p>element icon 示例：<el-link :underline="false" type="primary" target="_blank" href="https://element-plus.gitee.io/zh-CN/">官网</el-link></p>
	<code>
		1、使用 el-icon 配合使用 &lt;el-icon size="16"&gt;&lt;Edit /&gt;&lt;/el-icon&gt;
		<el-icon :size="16">
			<Edit />
		</el-icon>
	</code>
	<br />
	<code>
		2、直接使用 &lt;Edit style="font-size: 16px; width: 16px; height: 16px;"/&gt;
		<Edit style="font-size: 16px; width: 16px; height: 16px" />
	</code>
	<p>iconify 示例：<el-link :underline="false" type="primary" target="_blank" href="https://icon-sets.iconify.design/">官网</el-link></p>
	<code>
		1、不推荐 原生使用 import 导入 import { Icon } from '@iconify/vue'; &lt;Icon icon="mdi-light:home"&gt;&lt;/Icon&gt;
		<Icon icon="mdi-light:home" />
	</code>
	<br />
	<code>
		2、unplugin-icons 示例 <el-link :underline="false" type="primary" target="_blank" href="https://icones.netlify.app/">官网</el-link>
		unplugin-icons &lt;i-mdi-account-reactivate style="font-size: 2em; color: red"&gt;&lt;/i&gt;
		<i-mdi-account-reactivate style="font-size: 2em; color: red" />
		<el-icon :size="20">
			<i-material-symbols-10k-outline />
		</el-icon>
	</code>
	<br />
	<p>iconfont 示例 <el-link :underline="false" type="primary" target="_blank" href="https://www.iconfont.cn/">官网</el-link></p>
	<code>iconfont &lt;i class="iconfont icon-detail"&gt;&lt;/i&gt; <i class="iconfont icon-detail" /></code>
</template>

<script lang="ts" setup name="Iconify">
	import { Icon } from "@iconify/vue";
</script>

<style scoped lang="scss"></style>
