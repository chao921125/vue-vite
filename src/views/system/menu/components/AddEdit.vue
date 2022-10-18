<template>
	<el-dialog v-model="dialogFormVisible" @close="closeDialog">
		<template #header>{{ menuInfo.id ? "编辑菜单" : "新增菜单" }}</template>
		<el-form :model="form" :rules="rules" :label-width="formLabelWidth" ref="formRef">
			<el-form-item prop="parent" label="父节点">
				<el-select v-model="form.parent" clearable placeholder="" popper-class="select-tree" @visible-change="getCheckedTree">
					<el-option v-if="optionSelectMenu && optionSelectMenu.length > 0">
						<el-tree ref="treeRef" :data="optionSelectMenu" :props="propsTreeMenu" show-checkbox>
							<template #default="{ data }">
								<span>{{ $t(data.name) }}</span>
							</template>
						</el-tree>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="name" label="名称">
				<el-input v-model="form.name" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="title" label="标题">
				<el-input v-model="form.title" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="icon" label="图标">
				<el-select v-model="form.icon" clearable placeholder="" popper-class="select-icons">
					<el-option v-for="(item, index) in IconfontData" :key="index" :label="item" :value="item" class="re-flex-row-center">
						<i class="iconfont" :class="item"></i>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="path" label="URL">
				<el-input v-model="form.path" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="component" label="组件">
				<el-input v-model="form.component" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="form.sort" :min="1" :max="99999" controls-position="right"></el-input-number>
			</el-form-item>
			<el-form-item prop="isLink" label="是否外链">
				<el-switch v-model="form.isLink" :active-value="1" :inactive-value="0" :disabled="!!form.isIframe" />
			</el-form-item>
			<el-form-item prop="isIframe" label="是否内嵌">
				<el-switch v-model="form.isIframe" :active-value="1" :inactive-value="0" :disabled="!!form.isLink" />
			</el-form-item>
			<el-form-item prop="address" label="地址">
				<el-input v-model="form.address" placeholder="" :disabled="!(form.isIframe || form.isLink)"></el-input>
			</el-form-item>
			<el-form-item prop="isHide" label="是否隐藏">
				<el-switch v-model="form.isHide" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="isHideSubMenu" label="是否隐藏子节点">
				<el-switch v-model="form.isHideSubMenu" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="isDisable" label="是否禁用">
				<el-switch v-model="form.isDisable" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="isKeepAlive" label="是否缓存">
				<el-switch v-model="form.isKeepAlive" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item prop="isAffix" label="是否固定">
				<el-switch v-model="form.isAffix" :active-value="1" :inactive-value="0" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="changeMenuInfo">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEdit">
	import { onUpdated, reactive, ref } from "vue";
	import type { FormInstance, FormRules } from "element-plus";
	import { ElTree } from "element-plus";
	import { Menu } from "@/interface/menu";
	import IconfontData from "@/config/iconfontData";

	const treeRef = ref<InstanceType<typeof ElTree>>();
	const propsTreeMenu = { children: "children", label: "name", disabled: "disabled" };
	const optionSelectMenu = ref<Menu[]>([]);
	optionSelectMenu.value = [
		{
			id: 1,
			path: "home",
			component: "home/Home",
			name: "message.menu.home",
			title: "message.menu.home",
			icon: "icon-home",
			isLink: 0,
			isIframe: 0,
			address: "",
			isAffix: 1,
			isKeepAlive: 1,
			isDisable: 0,
			isHide: 0,
			isHideSubMenu: 0,
			roles: ["admin", "system"],
			children: [],
		},
		{
			id: 9,
			path: "system",
			component: "layout/Index",
			name: "message.menu.system",
			title: "message.menu.system",
			icon: "icon-setting",
			isLink: 0,
			isIframe: 0,
			address: "",
			isAffix: 0,
			isKeepAlive: 0,
			isDisable: 0,
			isHide: 0,
			isHideSubMenu: 0,
			roles: ["admin", "system"],
			children: [
				{
					id: 91,
					path: "user",
					component: "system/user/UserList",
					name: "message.menu.systemUser",
					title: "message.menu.systemUser",
					icon: "icon-user",
					isLink: 0,
					isIframe: 0,
					address: "",
					isAffix: 0,
					isKeepAlive: 0,
					isDisable: 0,
					isHide: 0,
					isHideSubMenu: 1,
					roles: ["admin", "system"],
					children: [],
				},
				{
					id: 92,
					path: "role",
					component: "system/role/RoleList",
					name: "message.menu.systemRole",
					title: "message.menu.systemRole",
					icon: "icon-user",
					isLink: 0,
					isIframe: 0,
					address: "",
					isAffix: 0,
					isKeepAlive: 0,
					isDisable: 0,
					isHide: 0,
					isHideSubMenu: 1,
					roles: ["admin", "system"],
					children: [],
				},
				{
					id: 93,
					path: "department",
					component: "system/department/DepartmentList",
					name: "message.menu.systemDepartment",
					title: "message.menu.systemDepartment",
					icon: "icon-user",
					isLink: 0,
					isIframe: 0,
					address: "",
					isAffix: 0,
					isKeepAlive: 0,
					isDisable: 0,
					isHide: 0,
					isHideSubMenu: 1,
					roles: ["admin", "system"],
					children: [],
				},
				{
					id: 94,
					path: "job",
					component: "system/job/JobList",
					name: "message.menu.systemJob",
					title: "message.menu.systemJob",
					icon: "icon-user",
					isLink: 0,
					isIframe: 0,
					address: "",
					isAffix: 0,
					isKeepAlive: 0,
					isDisable: 0,
					isHide: 0,
					isHideSubMenu: 1,
					roles: ["admin", "system"],
					children: [],
				},
				{
					id: 99,
					path: "menu",
					component: "system/menu/MenuList",
					name: "message.menu.systemMenu",
					title: "message.menu.systemMenu",
					icon: "icon-layout",
					isLink: 0,
					isIframe: 0,
					address: "",
					isAffix: 0,
					isKeepAlive: 0,
					isDisable: 0,
					isHide: 0,
					isHideSubMenu: 1,
					roles: ["admin", "system"],
					children: [
						{
							id: 941,
							path: "add",
							component: "system/menu/MenuAdd",
							name: "message.menu.systemMenuAdd",
							title: "message.menu.systemMenuAdd",
							icon: "icon-layout",
							isLink: 0,
							isIframe: 0,
							address: "",
							isAffix: 0,
							isKeepAlive: 0,
							isDisable: 0,
							isHide: 1,
							isHideSubMenu: 0,
							roles: ["admin", "system"],
							children: [],
						},
					],
				},
			],
		},
		{
			id: 9900,
			path: "demo",
			component: "layout/Index",
			name: "message.menu.demo",
			title: "message.menu.demo",
			icon: "icon-changyongshili",
			isLink: 0,
			isIframe: 0,
			address: "",
			isAffix: 1,
			isKeepAlive: 1,
			isDisable: 0,
			isHide: 0,
			isHideSubMenu: 0,
			roles: ["admin", "system"],
			children: [
				{
					id: 99001,
					path: "icon",
					component: "demo/icon/Iconify",
					name: "message.menu.demoIcon",
					title: "message.menu.demoIcon",
					icon: "icon-appstore",
					isLink: 0,
					isIframe: 0,
					address: "",
					isAffix: 1,
					isKeepAlive: 1,
					isDisable: 0,
					isHide: 0,
					isHideSubMenu: 1,
					roles: ["admin", "system"],
					children: [],
				},
				{
					id: 99002,
					path: "anim-css",
					component: "demo/animation/AnimationCss",
					name: "message.menu.demoAnimaCss",
					title: "message.menu.demoAnimaCss",
					icon: "icon-appstore",
					isLink: 0,
					isIframe: 0,
					address: "",
					isAffix: 1,
					isKeepAlive: 1,
					isDisable: 0,
					isHide: 0,
					isHideSubMenu: 1,
					roles: ["admin", "system"],
					children: [],
				},
			],
		},
		{
			id: 9901,
			path: "link",
			component: "layout/window/Link",
			name: "message.menu.testLink",
			title: "message.menu.testLink",
			icon: "icon-home",
			isLink: 1,
			isIframe: 0,
			address: "https://cn.bing.com/",
			isAffix: 1,
			isKeepAlive: 1,
			isDisable: 0,
			isHide: 0,
			isHideSubMenu: 0,
			roles: ["admin", "system"],
			children: [],
		},
		{
			id: 9902,
			path: "iframe",
			component: "layout/window/Iframe",
			name: "message.menu.testIframe",
			title: "message.menu.testIframe",
			icon: "icon-home",
			isLink: 0,
			isIframe: 1,
			address: "https://nodejs.org/zh-cn/",
			isAffix: 1,
			isKeepAlive: 1,
			isDisable: 0,
			isHide: 0,
			isHideSubMenu: 0,
			roles: ["admin", "system"],
			children: [],
		},
	];
	// 组件内部函数 接收及传递结果
	const propsData = defineProps({
		data: {
			type: Object,
			default: () => {
				return {};
			},
		},
	});
	const emits = defineEmits(["result"]);
	// 表单
	const formLabelWidth = "120px";
	const formRef = ref<FormInstance>();
	const form = ref<Menu>({});
	const rules = reactive<FormRules>({});
	const menuInfo = ref<Menu>({});
	// 弹窗
	const dialogFormVisible = ref(false);
	const openDialog = () => {
		dialogFormVisible.value = true;
	};
	const closeDialog = () => {
		form.value = {};
		menuInfo.value = {};
		dialogFormVisible.value = false;
	};
	// 数据信息
	const changeMenuInfo = () => {
		closeDialog();
		emits("result", true);
	};
	onUpdated(() => {
		if (propsData.data && dialogFormVisible.value) {
			form.value = propsData.data;
			menuInfo.value = propsData.data;
		}
	});
	const getCheckedTree = () => {
		console.log(treeRef.value?.getCheckedNodes(false, false));
	};
	// 组件内部函数 供外部调用函数
	defineExpose({
		openDialog,
		closeDialog,
	});
</script>

<style lang="scss">
	@import "./index.scss";
</style>
