// @see: https://cz-git.qbenben.com/zh/guide

import type { UserConfig } from "@commitlint/types";
// import pkg from "./package.json";
// const version = pkg.version;

const Configuration: UserConfig = {
	// 必须安装引用的软件包
	extends: ["@commitlint/config-conventional"],
	parserPreset: "conventional-changelog-conventionalcommits",
	formatter: "@commitlint/format",
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
		"body-leading-blank": [2, "always"],
		"footer-leading-blank": [1, "always"],
		"header-max-length": [2, "always", 108],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
		"subject-case": [0],
		"type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]],
	},
	ignores: [(commit) => commit.includes("init")],
	defaultIgnores: true,
	helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
	prompt: {
		settings: {},
		messages: {
			skip: ":skip",
			max: "upper %d chars",
			min: "%d chars at least",
			emptyWarning: "can not be empty",
			upperLimitWarning: "over limit",
			lowerLimitWarning: "below limit",
		},
		questions: {
			type: {
				description: "Select the type of change that you're committing:",
				enum: {
					feat: {
						description: "A new feature",
						title: "Features",
						emoji: "✨",
					},
					fix: {
						description: "A bug fix",
						title: "Bug Fixes",
						emoji: "🐛",
					},
					docs: {
						description: "Documentation only changes",
						title: "Documentation",
						emoji: "📚",
					},
					style: {
						description: "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
						title: "Styles",
						emoji: "💎",
					},
					refactor: {
						description: "A code change that neither fixes a bug nor adds a feature",
						title: "Code Refactoring",
						emoji: "📦",
					},
					perf: {
						description: "A code change that improves performance",
						title: "Performance Improvements",
						emoji: "🚀",
					},
					test: {
						description: "Adding missing tests or correcting existing tests",
						title: "Tests",
						emoji: "🚨",
					},
					build: {
						description: "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
						title: "Builds",
						emoji: "🛠",
					},
					ci: {
						description: "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
						title: "Continuous Integrations",
						emoji: "⚙️",
					},
					chore: {
						description: "Other changes that don't modify src or test files",
						title: "Chores",
						emoji: "♻️",
					},
					revert: {
						description: "Reverts a previous commit",
						title: "Reverts",
						emoji: "🗑",
					},
				},
			},
			scope: {
				description: "What is the scope of this change (e.g. component or file name)",
			},
			subject: {
				description: "Write a short, imperative tense description of the change",
			},
			body: {
				description: "Provide a longer description of the change",
			},
			isBreaking: {
				description: "Are there any breaking changes?",
			},
			breakingBody: {
				description: "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself",
			},
			breaking: {
				description: "Describe the breaking changes",
			},
			isIssueAffected: {
				description: "Does this change affect any open issues?",
			},
			issuesBody: {
				description: "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself",
			},
			issues: {
				description: 'Add issue references (e.g. "fix #123", "re #123".)',
			},
		},
	},
};

export default Configuration;
