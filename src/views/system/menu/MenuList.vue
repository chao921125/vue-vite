<template>
	<el-form ref="formSearchRef" :model="formSearch" status-icon label-width="" :inline="true">
		<el-form-item prop="name" label="菜单">
			<el-input v-model="formSearch.name" placeholder=""></el-input>
		</el-form-item>
		<el-form-item prop="" label="">
			<el-button type="primary">查询</el-button>
			<el-button @click="resetForm(formSearchRef)">重置</el-button>
			<el-button type="success" @click="openAddJob">新增</el-button>
		</el-form-item>
	</el-form>
	<el-table :data="tableData" style="width: 100%" row-key="id">
		<el-table-column prop="name" label="名称" width="200">
			<template #default="scope">
				<span>{{ $t(scope.row.name) }}</span>
			</template>
		</el-table-column>
		<!--		<el-table-column prop="title" label="标题" width="120" />-->
		<el-table-column prop="path" label="URL" />
		<el-table-column prop="component" label="组件" />
		<el-table-column prop="icon" label="图标" width="60">
			<template #default="scope">
				<i class="iconfont" :class="scope.row.icon"></i>
			</template>
		</el-table-column>
		<el-table-column prop="" label="操作" width="120">
			<template #default="scope">
				<el-button type="success" link @click="openEditJob(scope.row)">
					<el-icon><EditPen /></el-icon>
				</el-button>
				<el-popconfirm title="确认删除？">
					<template #reference>
						<el-button type="danger" link>
							<el-icon><Delete /></el-icon>
						</el-button>
					</template>
				</el-popconfirm>
			</template>
		</el-table-column>
	</el-table>
	<el-row justify="end">
		<el-col :span="24" class="re-flex-row-end page-box">
			<el-pagination
				v-model:currentPage="pageOption.pageCurrent"
				v-model:page-size="pageOption.pageSize"
				:page-sizes="pageOption.pageSizes"
				:small="pageOption.small"
				:disabled="pageOption.disabled"
				:background="pageOption.background"
				:layout="pageOption.layout"
				:total="pageOption.pageTotal"
				@size-change="pageChangeSize"
				@current-change="pageChangeCurrent"
			/>
		</el-col>
	</el-row>
	<AddEdit :data="jobInfo" ref="dialogForm" @result="getJobList"></AddEdit>
</template>

<script lang="ts" setup name="MenuList">
	import { ref, reactive, onMounted } from "vue";
	import type { FormInstance } from "element-plus";
	import AddEdit from "./components/AddEdit.vue";

	const formSearchRef = ref();
	const formSearch = reactive({
		name: "",
	});
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return false;
		formEl.resetFields();
		getJobList();
	};
	const pageOption = reactive({
		pageCurrent: 1,
		pageSize: 50,
		pageTotal: 100,
		pageSizes: [10, 50, 100, 200],
		small: false,
		disabled: false,
		background: false,
		layout: "total, sizes, prev, pager, next, jumper",
	});
	const tableData = ref<any[]>([]);
	tableData.value = [
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
	const pageChangeSize = (val: number) => {
		console.log(`${val} items per page`);
		getJobList();
	};
	const pageChangeCurrent = (val: number) => {
		console.log(`${val} items per page`);
		getJobList();
	};
	const jobInfo = ref();
	const dialogForm = ref();
	const openAddJob = () => {
		jobInfo.value = null;
		dialogForm.value.openDialog();
	};
	const openEditJob = (item: any) => {
		jobInfo.value = item;
		dialogForm.value.openDialog();
	};

	const jobParams = reactive({
		pageSize: 1,
		pageTotal: 100,
	});
	const initData = () => {
		jobParams.pageSize = 1;
		jobParams.pageTotal = 100;
		getJobList();
	};
	const getJobList = () => {};
	onMounted(() => {
		initData();
	});
</script>

<style scoped lang="scss"></style>
