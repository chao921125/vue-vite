module.exports = {
	types: [
		// 新增功能
		{ value: "feat", name: "feat:     A new feature" },
		// 修复 bug
		{ value: "fix", name: "fix:      A bug fix" },
		// 文档变更
		{ value: "docs", name: "docs:     Documentation only changes" },
		// 代码格式（不影响功能，例如空格、分号等格式修正）
		{
			value: "style",
			name: "style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)",
		},
		// 代码重构（不包括 bug 修复、功能新增）
		{
			value: "refactor",
			name: "refactor: A code change that neither fixes a bug nor adds a feature",
		},
		// 性能优化
		{
			value: "perf",
			name: "perf:     A code change that improves performance",
		},
		// 添加、修改测试用例
		{ value: "test", name: "test:     Adding missing tests" },
		// 脚本配置、构建
		{
			value: "chore",
			name: "chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation",
		},
		// 回滚 commit
		{ value: "revert", name: "revert:   Revert to a commit" },
		{ value: "WIP", name: "WIP:      Work in progress" },
	],

	scopes: [
		["components", "组件相关"],
		["hooks", "hook 相关"],
		["utils", "utils 相关"],
		["element-ui", "对 element-ui 的调整"],
		["styles", "样式相关"],
		["deps", "项目依赖"],
		["auth", "对 auth 修改"],
		["other", "其他修改"],
		// 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
		["custom", "以上都不是？我要自定义"]
	].map(([value, description]) => {
		return {
			value,
			name: `${value.padEnd(30)} (${description})`
		}
	}),

	allowTicketNumber: false,
	isTicketNumberRequired: false,
	ticketNumberPrefix: "TICKET-",
	ticketNumberRegExp: "\\d{1,5}",

	// it needs to match the value for field type. Eg.: "fix"
	/*
	scopeOverrides: {
		fix: [
			{name: "merge"},
			{name: "style"},
			{name: "e2eTest"},
			{name: "unitTest"}
		]
	},
	*/
	// override the messages, defaults are as follows
	messages: {
		// type: "确保本次提交遵循 Angular 规范！\n选择你要提交的类型：",
		// scope: "\n选择一个 scope（可选）：",
		// // 选择 scope: custom 时会出下面的提示
		// customScope: "请输入自定义的 scope：",
		// subject: "填写简短精炼的变更描述：\n",
		// body: "填写更加详细的变更描述（可选）。使用 "|" 换行：\n",
		// breaking: "列举非兼容性重大的变更（可选）：\n",
		// footer: "列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n",
		// confirmCommit: "确认提交？"
		type: "Select the type of change that you're committing:",
		scope: "\nDenote the SCOPE of this change (optional):",
		// used if allowCustomScopes is true
		customScope: "Denote the SCOPE of this change:",
		subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
		body: "Provide a LONGER description of the change (optional). Use "|" to break new line:\n",
		breaking: "List any BREAKING CHANGES (optional):\n",
		footer: "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
		confirmCommit: "Are you sure you want to proceed with the commit above?",
	},

	allowCustomScopes: true,
	allowBreakingChanges: ["feat", "fix"],
	// skip any questions you want
	// skipQuestions: ["scope", "body"],

	// limit subject length
	subjectLimit: 100,
	breaklineChar: "|", // It is supported for fields body and footer.
	// footerPrefix : "ISSUES CLOSED:"
	// askForBreakingChangeFirst : true, // default is false
};
