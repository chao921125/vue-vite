// mock/config.ts
var config_default = {
	baseUrl: "/api",
	timeout: 0,
	// 延迟时间，默认无延迟
};

// mock/modules/system.ts
var menuList = [
	{
		id: 1,
		path: "home",
		component: "Home",
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
		isMobile: 0,
		roles: ["admin", "system"],
		permission: ["C", "R", "U", "D"],
		children: [],
	},
	{
		id: 90,
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
		isMobile: 0,
		roles: ["admin", "system"],
		permission: ["C", "R", "U", "D"],
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
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
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
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
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
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
				children: [],
			},
			{
				id: 94,
				path: "job",
				component: "system/post/PostList",
				name: "message.menu.systemPost",
				title: "message.menu.systemPost",
				icon: "icon-user",
				isLink: 0,
				isIframe: 0,
				address: "",
				isAffix: 0,
				isKeepAlive: 0,
				isDisable: 0,
				isHide: 0,
				isHideSubMenu: 1,
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
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
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
				children: [],
			},
		],
	},
	{
		id: 900,
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
		isMobile: 0,
		roles: ["admin", "system"],
		permission: ["C", "R", "U", "D"],
		children: [
			{
				id: 901,
				path: "page",
				component: "demo/page/All",
				name: "message.menu.demoPage",
				title: "message.menu.demoPage",
				icon: "icon-appstore",
				isLink: 0,
				isIframe: 0,
				address: "",
				isAffix: 1,
				isKeepAlive: 1,
				isDisable: 0,
				isHide: 0,
				isHideSubMenu: 1,
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
				children: [],
			},
			{
				id: 902,
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
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
				children: [],
			},
			{
				id: 903,
				path: "internal",
				component: "demo/animation/Internal",
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
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
				children: [],
			},
			{
				id: 904,
				path: "office-xlsx",
				component: "demo/office/Xlsx",
				name: "message.menu.demoXlsx",
				title: "message.menu.demoXlsx",
				icon: "icon-appstore",
				isLink: 0,
				isIframe: 0,
				address: "",
				isAffix: 1,
				isKeepAlive: 1,
				isDisable: 0,
				isHide: 0,
				isHideSubMenu: 1,
				isMobile: 0,
				roles: ["admin", "system"],
				permission: ["C", "R", "U", "D"],
				children: [],
			},
		],
	},
	{
		id: 991,
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
		isMobile: 0,
		roles: ["admin", "system"],
		permission: ["C", "R", "U", "D"],
		children: [],
	},
	{
		id: 992,
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
		isMobile: 0,
		roles: ["admin", "system"],
		permission: ["C", "R", "U", "D"],
		children: [],
	},
	{
		id: 9e3,
		path: "m-home",
		component: "mobile/MHome",
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
		isMobile: 1,
		roles: ["admin", "system"],
		permission: ["C", "R", "U", "D"],
		children: [],
	},
];
var system_default = [
	{
		url: `${config_default.baseUrl}/menu-list`,
		method: "get",
		response: () => {
			return {
				code: 0,
				message: "",
				data: {
					list: menuList,
				},
			};
		},
	},
];
export { system_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9jb25maWcudHMiLCAibW9jay9tb2R1bGVzL3N5c3RlbS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvaHVhbmdjaGFvL1dvcmtTcGFjZS9HaXRIdWIvdnVlLXZpdGUvbW9jay9jb25maWcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL2h1YW5nY2hhby9Xb3JrU3BhY2UvR2l0SHViL3Z1ZS12aXRlL21vY2tcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL2h1YW5nY2hhby9Xb3JrU3BhY2UvR2l0SHViL3Z1ZS12aXRlL21vY2svY29uZmlnLnRzXCI7ZXhwb3J0IGRlZmF1bHQge1xuXHRiYXNlVXJsOiBcIi9hcGlcIixcblx0dGltZW91dDogMCwgLy8gXHU1RUY2XHU4RkRGXHU2NUY2XHU5NUY0XHVGRjBDXHU5RUQ4XHU4QkE0XHU2NUUwXHU1RUY2XHU4RkRGXG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL2h1YW5nY2hhby9Xb3JrU3BhY2UvR2l0SHViL3Z1ZS12aXRlL21vY2svbW9kdWxlcy9zeXN0ZW0udHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL2h1YW5nY2hhby9Xb3JrU3BhY2UvR2l0SHViL3Z1ZS12aXRlL21vY2svbW9kdWxlc1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvaHVhbmdjaGFvL1dvcmtTcGFjZS9HaXRIdWIvdnVlLXZpdGUvbW9jay9tb2R1bGVzL3N5c3RlbS50c1wiO2ltcG9ydCB7IE1vY2tNZXRob2QgfSBmcm9tIFwidml0ZS1wbHVnaW4tbW9ja1wiO1xuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbmNvbnN0IG1lbnVMaXN0ID0gW1xuXHR7XG5cdFx0aWQ6IDEsXG5cdFx0cGF0aDogXCJob21lXCIsXG5cdFx0Y29tcG9uZW50OiBcIkhvbWVcIixcblx0XHRuYW1lOiBcIm1lc3NhZ2UubWVudS5ob21lXCIsXG5cdFx0dGl0bGU6IFwibWVzc2FnZS5tZW51LmhvbWVcIixcblx0XHRpY29uOiBcImljb24taG9tZVwiLFxuXHRcdGlzTGluazogMCxcblx0XHRpc0lmcmFtZTogMCxcblx0XHRhZGRyZXNzOiBcIlwiLFxuXHRcdGlzQWZmaXg6IDEsXG5cdFx0aXNLZWVwQWxpdmU6IDEsXG5cdFx0aXNEaXNhYmxlOiAwLFxuXHRcdGlzSGlkZTogMCxcblx0XHRpc0hpZGVTdWJNZW51OiAwLFxuXHRcdGlzTW9iaWxlOiAwLFxuXHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRwZXJtaXNzaW9uOiBbXCJDXCIsIFwiUlwiLCBcIlVcIiwgXCJEXCJdLFxuXHRcdGNoaWxkcmVuOiBbXSxcblx0fSxcblx0e1xuXHRcdGlkOiA5MCxcblx0XHRwYXRoOiBcInN5c3RlbVwiLFxuXHRcdGNvbXBvbmVudDogXCJsYXlvdXQvSW5kZXhcIixcblx0XHRuYW1lOiBcIm1lc3NhZ2UubWVudS5zeXN0ZW1cIixcblx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUuc3lzdGVtXCIsXG5cdFx0aWNvbjogXCJpY29uLXNldHRpbmdcIixcblx0XHRpc0xpbms6IDAsXG5cdFx0aXNJZnJhbWU6IDAsXG5cdFx0YWRkcmVzczogXCJcIixcblx0XHRpc0FmZml4OiAwLFxuXHRcdGlzS2VlcEFsaXZlOiAwLFxuXHRcdGlzRGlzYWJsZTogMCxcblx0XHRpc0hpZGU6IDAsXG5cdFx0aXNIaWRlU3ViTWVudTogMCxcblx0XHRpc01vYmlsZTogMCxcblx0XHRyb2xlczogW1wiYWRtaW5cIiwgXCJzeXN0ZW1cIl0sXG5cdFx0cGVybWlzc2lvbjogW1wiQ1wiLCBcIlJcIiwgXCJVXCIsIFwiRFwiXSxcblx0XHRjaGlsZHJlbjogW1xuXHRcdFx0e1xuXHRcdFx0XHRpZDogOTEsXG5cdFx0XHRcdHBhdGg6IFwidXNlclwiLFxuXHRcdFx0XHRjb21wb25lbnQ6IFwic3lzdGVtL3VzZXIvVXNlckxpc3RcIixcblx0XHRcdFx0bmFtZTogXCJtZXNzYWdlLm1lbnUuc3lzdGVtVXNlclwiLFxuXHRcdFx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUuc3lzdGVtVXNlclwiLFxuXHRcdFx0XHRpY29uOiBcImljb24tdXNlclwiLFxuXHRcdFx0XHRpc0xpbms6IDAsXG5cdFx0XHRcdGlzSWZyYW1lOiAwLFxuXHRcdFx0XHRhZGRyZXNzOiBcIlwiLFxuXHRcdFx0XHRpc0FmZml4OiAwLFxuXHRcdFx0XHRpc0tlZXBBbGl2ZTogMCxcblx0XHRcdFx0aXNEaXNhYmxlOiAwLFxuXHRcdFx0XHRpc0hpZGU6IDAsXG5cdFx0XHRcdGlzSGlkZVN1Yk1lbnU6IDEsXG5cdFx0XHRcdGlzTW9iaWxlOiAwLFxuXHRcdFx0XHRyb2xlczogW1wiYWRtaW5cIiwgXCJzeXN0ZW1cIl0sXG5cdFx0XHRcdHBlcm1pc3Npb246IFtcIkNcIiwgXCJSXCIsIFwiVVwiLCBcIkRcIl0sXG5cdFx0XHRcdGNoaWxkcmVuOiBbXSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkOiA5Mixcblx0XHRcdFx0cGF0aDogXCJyb2xlXCIsXG5cdFx0XHRcdGNvbXBvbmVudDogXCJzeXN0ZW0vcm9sZS9Sb2xlTGlzdFwiLFxuXHRcdFx0XHRuYW1lOiBcIm1lc3NhZ2UubWVudS5zeXN0ZW1Sb2xlXCIsXG5cdFx0XHRcdHRpdGxlOiBcIm1lc3NhZ2UubWVudS5zeXN0ZW1Sb2xlXCIsXG5cdFx0XHRcdGljb246IFwiaWNvbi11c2VyXCIsXG5cdFx0XHRcdGlzTGluazogMCxcblx0XHRcdFx0aXNJZnJhbWU6IDAsXG5cdFx0XHRcdGFkZHJlc3M6IFwiXCIsXG5cdFx0XHRcdGlzQWZmaXg6IDAsXG5cdFx0XHRcdGlzS2VlcEFsaXZlOiAwLFxuXHRcdFx0XHRpc0Rpc2FibGU6IDAsXG5cdFx0XHRcdGlzSGlkZTogMCxcblx0XHRcdFx0aXNIaWRlU3ViTWVudTogMSxcblx0XHRcdFx0aXNNb2JpbGU6IDAsXG5cdFx0XHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRcdFx0cGVybWlzc2lvbjogW1wiQ1wiLCBcIlJcIiwgXCJVXCIsIFwiRFwiXSxcblx0XHRcdFx0Y2hpbGRyZW46IFtdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWQ6IDkzLFxuXHRcdFx0XHRwYXRoOiBcImRlcGFydG1lbnRcIixcblx0XHRcdFx0Y29tcG9uZW50OiBcInN5c3RlbS9kZXBhcnRtZW50L0RlcGFydG1lbnRMaXN0XCIsXG5cdFx0XHRcdG5hbWU6IFwibWVzc2FnZS5tZW51LnN5c3RlbURlcGFydG1lbnRcIixcblx0XHRcdFx0dGl0bGU6IFwibWVzc2FnZS5tZW51LnN5c3RlbURlcGFydG1lbnRcIixcblx0XHRcdFx0aWNvbjogXCJpY29uLXVzZXJcIixcblx0XHRcdFx0aXNMaW5rOiAwLFxuXHRcdFx0XHRpc0lmcmFtZTogMCxcblx0XHRcdFx0YWRkcmVzczogXCJcIixcblx0XHRcdFx0aXNBZmZpeDogMCxcblx0XHRcdFx0aXNLZWVwQWxpdmU6IDAsXG5cdFx0XHRcdGlzRGlzYWJsZTogMCxcblx0XHRcdFx0aXNIaWRlOiAwLFxuXHRcdFx0XHRpc0hpZGVTdWJNZW51OiAxLFxuXHRcdFx0XHRpc01vYmlsZTogMCxcblx0XHRcdFx0cm9sZXM6IFtcImFkbWluXCIsIFwic3lzdGVtXCJdLFxuXHRcdFx0XHRwZXJtaXNzaW9uOiBbXCJDXCIsIFwiUlwiLCBcIlVcIiwgXCJEXCJdLFxuXHRcdFx0XHRjaGlsZHJlbjogW10sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpZDogOTQsXG5cdFx0XHRcdHBhdGg6IFwiam9iXCIsXG5cdFx0XHRcdGNvbXBvbmVudDogXCJzeXN0ZW0vcG9zdC9Qb3N0TGlzdFwiLFxuXHRcdFx0XHRuYW1lOiBcIm1lc3NhZ2UubWVudS5zeXN0ZW1Qb3N0XCIsXG5cdFx0XHRcdHRpdGxlOiBcIm1lc3NhZ2UubWVudS5zeXN0ZW1Qb3N0XCIsXG5cdFx0XHRcdGljb246IFwiaWNvbi11c2VyXCIsXG5cdFx0XHRcdGlzTGluazogMCxcblx0XHRcdFx0aXNJZnJhbWU6IDAsXG5cdFx0XHRcdGFkZHJlc3M6IFwiXCIsXG5cdFx0XHRcdGlzQWZmaXg6IDAsXG5cdFx0XHRcdGlzS2VlcEFsaXZlOiAwLFxuXHRcdFx0XHRpc0Rpc2FibGU6IDAsXG5cdFx0XHRcdGlzSGlkZTogMCxcblx0XHRcdFx0aXNIaWRlU3ViTWVudTogMSxcblx0XHRcdFx0aXNNb2JpbGU6IDAsXG5cdFx0XHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRcdFx0cGVybWlzc2lvbjogW1wiQ1wiLCBcIlJcIiwgXCJVXCIsIFwiRFwiXSxcblx0XHRcdFx0Y2hpbGRyZW46IFtdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWQ6IDk5LFxuXHRcdFx0XHRwYXRoOiBcIm1lbnVcIixcblx0XHRcdFx0Y29tcG9uZW50OiBcInN5c3RlbS9tZW51L01lbnVMaXN0XCIsXG5cdFx0XHRcdG5hbWU6IFwibWVzc2FnZS5tZW51LnN5c3RlbU1lbnVcIixcblx0XHRcdFx0dGl0bGU6IFwibWVzc2FnZS5tZW51LnN5c3RlbU1lbnVcIixcblx0XHRcdFx0aWNvbjogXCJpY29uLWxheW91dFwiLFxuXHRcdFx0XHRpc0xpbms6IDAsXG5cdFx0XHRcdGlzSWZyYW1lOiAwLFxuXHRcdFx0XHRhZGRyZXNzOiBcIlwiLFxuXHRcdFx0XHRpc0FmZml4OiAwLFxuXHRcdFx0XHRpc0tlZXBBbGl2ZTogMCxcblx0XHRcdFx0aXNEaXNhYmxlOiAwLFxuXHRcdFx0XHRpc0hpZGU6IDAsXG5cdFx0XHRcdGlzSGlkZVN1Yk1lbnU6IDEsXG5cdFx0XHRcdGlzTW9iaWxlOiAwLFxuXHRcdFx0XHRyb2xlczogW1wiYWRtaW5cIiwgXCJzeXN0ZW1cIl0sXG5cdFx0XHRcdHBlcm1pc3Npb246IFtcIkNcIiwgXCJSXCIsIFwiVVwiLCBcIkRcIl0sXG5cdFx0XHRcdGNoaWxkcmVuOiBbXSxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSxcblx0e1xuXHRcdGlkOiA5MDAsXG5cdFx0cGF0aDogXCJkZW1vXCIsXG5cdFx0Y29tcG9uZW50OiBcImxheW91dC9JbmRleFwiLFxuXHRcdG5hbWU6IFwibWVzc2FnZS5tZW51LmRlbW9cIixcblx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUuZGVtb1wiLFxuXHRcdGljb246IFwiaWNvbi1jaGFuZ3lvbmdzaGlsaVwiLFxuXHRcdGlzTGluazogMCxcblx0XHRpc0lmcmFtZTogMCxcblx0XHRhZGRyZXNzOiBcIlwiLFxuXHRcdGlzQWZmaXg6IDEsXG5cdFx0aXNLZWVwQWxpdmU6IDEsXG5cdFx0aXNEaXNhYmxlOiAwLFxuXHRcdGlzSGlkZTogMCxcblx0XHRpc0hpZGVTdWJNZW51OiAwLFxuXHRcdGlzTW9iaWxlOiAwLFxuXHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRwZXJtaXNzaW9uOiBbXCJDXCIsIFwiUlwiLCBcIlVcIiwgXCJEXCJdLFxuXHRcdGNoaWxkcmVuOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGlkOiA5MDEsXG5cdFx0XHRcdHBhdGg6IFwicGFnZVwiLFxuXHRcdFx0XHRjb21wb25lbnQ6IFwiZGVtby9wYWdlL0FsbFwiLFxuXHRcdFx0XHRuYW1lOiBcIm1lc3NhZ2UubWVudS5kZW1vUGFnZVwiLFxuXHRcdFx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUuZGVtb1BhZ2VcIixcblx0XHRcdFx0aWNvbjogXCJpY29uLWFwcHN0b3JlXCIsXG5cdFx0XHRcdGlzTGluazogMCxcblx0XHRcdFx0aXNJZnJhbWU6IDAsXG5cdFx0XHRcdGFkZHJlc3M6IFwiXCIsXG5cdFx0XHRcdGlzQWZmaXg6IDEsXG5cdFx0XHRcdGlzS2VlcEFsaXZlOiAxLFxuXHRcdFx0XHRpc0Rpc2FibGU6IDAsXG5cdFx0XHRcdGlzSGlkZTogMCxcblx0XHRcdFx0aXNIaWRlU3ViTWVudTogMSxcblx0XHRcdFx0aXNNb2JpbGU6IDAsXG5cdFx0XHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRcdFx0cGVybWlzc2lvbjogW1wiQ1wiLCBcIlJcIiwgXCJVXCIsIFwiRFwiXSxcblx0XHRcdFx0Y2hpbGRyZW46IFtdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWQ6IDkwMixcblx0XHRcdFx0cGF0aDogXCJpY29uXCIsXG5cdFx0XHRcdGNvbXBvbmVudDogXCJkZW1vL2ljb24vSWNvbmlmeVwiLFxuXHRcdFx0XHRuYW1lOiBcIm1lc3NhZ2UubWVudS5kZW1vSWNvblwiLFxuXHRcdFx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUuZGVtb0ljb25cIixcblx0XHRcdFx0aWNvbjogXCJpY29uLWFwcHN0b3JlXCIsXG5cdFx0XHRcdGlzTGluazogMCxcblx0XHRcdFx0aXNJZnJhbWU6IDAsXG5cdFx0XHRcdGFkZHJlc3M6IFwiXCIsXG5cdFx0XHRcdGlzQWZmaXg6IDEsXG5cdFx0XHRcdGlzS2VlcEFsaXZlOiAxLFxuXHRcdFx0XHRpc0Rpc2FibGU6IDAsXG5cdFx0XHRcdGlzSGlkZTogMCxcblx0XHRcdFx0aXNIaWRlU3ViTWVudTogMSxcblx0XHRcdFx0aXNNb2JpbGU6IDAsXG5cdFx0XHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRcdFx0cGVybWlzc2lvbjogW1wiQ1wiLCBcIlJcIiwgXCJVXCIsIFwiRFwiXSxcblx0XHRcdFx0Y2hpbGRyZW46IFtdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWQ6IDkwMyxcblx0XHRcdFx0cGF0aDogXCJpbnRlcm5hbFwiLFxuXHRcdFx0XHRjb21wb25lbnQ6IFwiZGVtby9hbmltYXRpb24vSW50ZXJuYWxcIixcblx0XHRcdFx0bmFtZTogXCJtZXNzYWdlLm1lbnUuZGVtb0FuaW1hQ3NzXCIsXG5cdFx0XHRcdHRpdGxlOiBcIm1lc3NhZ2UubWVudS5kZW1vQW5pbWFDc3NcIixcblx0XHRcdFx0aWNvbjogXCJpY29uLWFwcHN0b3JlXCIsXG5cdFx0XHRcdGlzTGluazogMCxcblx0XHRcdFx0aXNJZnJhbWU6IDAsXG5cdFx0XHRcdGFkZHJlc3M6IFwiXCIsXG5cdFx0XHRcdGlzQWZmaXg6IDEsXG5cdFx0XHRcdGlzS2VlcEFsaXZlOiAxLFxuXHRcdFx0XHRpc0Rpc2FibGU6IDAsXG5cdFx0XHRcdGlzSGlkZTogMCxcblx0XHRcdFx0aXNIaWRlU3ViTWVudTogMSxcblx0XHRcdFx0aXNNb2JpbGU6IDAsXG5cdFx0XHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRcdFx0cGVybWlzc2lvbjogW1wiQ1wiLCBcIlJcIiwgXCJVXCIsIFwiRFwiXSxcblx0XHRcdFx0Y2hpbGRyZW46IFtdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWQ6IDkwNCxcblx0XHRcdFx0cGF0aDogXCJvZmZpY2UteGxzeFwiLFxuXHRcdFx0XHRjb21wb25lbnQ6IFwiZGVtby9vZmZpY2UvWGxzeFwiLFxuXHRcdFx0XHRuYW1lOiBcIm1lc3NhZ2UubWVudS5kZW1vWGxzeFwiLFxuXHRcdFx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUuZGVtb1hsc3hcIixcblx0XHRcdFx0aWNvbjogXCJpY29uLWFwcHN0b3JlXCIsXG5cdFx0XHRcdGlzTGluazogMCxcblx0XHRcdFx0aXNJZnJhbWU6IDAsXG5cdFx0XHRcdGFkZHJlc3M6IFwiXCIsXG5cdFx0XHRcdGlzQWZmaXg6IDEsXG5cdFx0XHRcdGlzS2VlcEFsaXZlOiAxLFxuXHRcdFx0XHRpc0Rpc2FibGU6IDAsXG5cdFx0XHRcdGlzSGlkZTogMCxcblx0XHRcdFx0aXNIaWRlU3ViTWVudTogMSxcblx0XHRcdFx0aXNNb2JpbGU6IDAsXG5cdFx0XHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRcdFx0cGVybWlzc2lvbjogW1wiQ1wiLCBcIlJcIiwgXCJVXCIsIFwiRFwiXSxcblx0XHRcdFx0Y2hpbGRyZW46IFtdLFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9LFxuXHR7XG5cdFx0aWQ6IDk5MSxcblx0XHRwYXRoOiBcImxpbmtcIixcblx0XHRjb21wb25lbnQ6IFwibGF5b3V0L3dpbmRvdy9MaW5rXCIsXG5cdFx0bmFtZTogXCJtZXNzYWdlLm1lbnUudGVzdExpbmtcIixcblx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUudGVzdExpbmtcIixcblx0XHRpY29uOiBcImljb24taG9tZVwiLFxuXHRcdGlzTGluazogMSxcblx0XHRpc0lmcmFtZTogMCxcblx0XHRhZGRyZXNzOiBcImh0dHBzOi8vY24uYmluZy5jb20vXCIsXG5cdFx0aXNBZmZpeDogMSxcblx0XHRpc0tlZXBBbGl2ZTogMSxcblx0XHRpc0Rpc2FibGU6IDAsXG5cdFx0aXNIaWRlOiAwLFxuXHRcdGlzSGlkZVN1Yk1lbnU6IDAsXG5cdFx0aXNNb2JpbGU6IDAsXG5cdFx0cm9sZXM6IFtcImFkbWluXCIsIFwic3lzdGVtXCJdLFxuXHRcdHBlcm1pc3Npb246IFtcIkNcIiwgXCJSXCIsIFwiVVwiLCBcIkRcIl0sXG5cdFx0Y2hpbGRyZW46IFtdLFxuXHR9LFxuXHR7XG5cdFx0aWQ6IDk5Mixcblx0XHRwYXRoOiBcImlmcmFtZVwiLFxuXHRcdGNvbXBvbmVudDogXCJsYXlvdXQvd2luZG93L0lmcmFtZVwiLFxuXHRcdG5hbWU6IFwibWVzc2FnZS5tZW51LnRlc3RJZnJhbWVcIixcblx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUudGVzdElmcmFtZVwiLFxuXHRcdGljb246IFwiaWNvbi1ob21lXCIsXG5cdFx0aXNMaW5rOiAwLFxuXHRcdGlzSWZyYW1lOiAxLFxuXHRcdGFkZHJlc3M6IFwiaHR0cHM6Ly9ub2RlanMub3JnL3poLWNuL1wiLFxuXHRcdGlzQWZmaXg6IDEsXG5cdFx0aXNLZWVwQWxpdmU6IDEsXG5cdFx0aXNEaXNhYmxlOiAwLFxuXHRcdGlzSGlkZTogMCxcblx0XHRpc0hpZGVTdWJNZW51OiAwLFxuXHRcdGlzTW9iaWxlOiAwLFxuXHRcdHJvbGVzOiBbXCJhZG1pblwiLCBcInN5c3RlbVwiXSxcblx0XHRwZXJtaXNzaW9uOiBbXCJDXCIsIFwiUlwiLCBcIlVcIiwgXCJEXCJdLFxuXHRcdGNoaWxkcmVuOiBbXSxcblx0fSxcblx0e1xuXHRcdGlkOiA5MDAwLFxuXHRcdHBhdGg6IFwibS1ob21lXCIsXG5cdFx0Y29tcG9uZW50OiBcIm1vYmlsZS9NSG9tZVwiLFxuXHRcdG5hbWU6IFwibWVzc2FnZS5tZW51LmhvbWVcIixcblx0XHR0aXRsZTogXCJtZXNzYWdlLm1lbnUuaG9tZVwiLFxuXHRcdGljb246IFwiaWNvbi1ob21lXCIsXG5cdFx0aXNMaW5rOiAwLFxuXHRcdGlzSWZyYW1lOiAwLFxuXHRcdGFkZHJlc3M6IFwiXCIsXG5cdFx0aXNBZmZpeDogMSxcblx0XHRpc0tlZXBBbGl2ZTogMSxcblx0XHRpc0Rpc2FibGU6IDAsXG5cdFx0aXNIaWRlOiAwLFxuXHRcdGlzSGlkZVN1Yk1lbnU6IDAsXG5cdFx0aXNNb2JpbGU6IDEsXG5cdFx0cm9sZXM6IFtcImFkbWluXCIsIFwic3lzdGVtXCJdLFxuXHRcdHBlcm1pc3Npb246IFtcIkNcIiwgXCJSXCIsIFwiVVwiLCBcIkRcIl0sXG5cdFx0Y2hpbGRyZW46IFtdLFxuXHR9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuXHR7XG5cdFx0dXJsOiBgJHtDb25maWcuYmFzZVVybH0vbWVudS1saXN0YCxcblx0XHRtZXRob2Q6IFwiZ2V0XCIsXG5cdFx0cmVzcG9uc2U6ICgpID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvZGU6IDAsXG5cdFx0XHRcdG1lc3NhZ2U6IFwiXCIsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRsaXN0OiBtZW51TGlzdCxcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0fSxcblx0fSxcbl0gYXMgTW9ja01ldGhvZFtdO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixJQUFPLGlCQUFRO0FBQUEsRUFDL1IsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBO0FBQ1Y7OztBQ0FB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
