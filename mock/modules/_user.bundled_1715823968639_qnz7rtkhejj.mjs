// mock/config.ts
var config_default = {
	baseUrl: "/api",
	timeout: 0,
	// 延迟时间，默认无延迟
};

// mock/modules/user.ts
var user_default = [
	{
		url: `${config_default.baseUrl}/register`,
		method: "post",
		response: () => {
			return {
				code: 0,
				message: "",
				data: {
					name: "get",
				},
			};
		},
	},
	{
		url: `${config_default.baseUrl}/login`,
		method: "post",
		response: ({ body }) => {
			const user = ["admin", "user"];
			if (user.includes(body.userName)) {
				return {
					code: 0,
					message: "",
					data: {
						avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
						name: body.userName,
						token: /* @__PURE__ */ new Date().getTime(),
					},
				};
			} else {
				return {
					code: 400,
					message: "no user",
					data: {},
				};
			}
		},
	},
	{
		url: `${config_default.baseUrl}/user-info`,
		method: "get",
		response: () => {
			return {
				code: 0,
				message: "",
				data: {
					name: "get",
				},
			};
		},
	},
	{
		url: `${config_default.baseUrl}/user-list`,
		method: "get",
		response: ({ query }) => {
			return {
				code: 0,
				message: "",
				data: {
					pageSize: query.pageSize,
					total: 20,
					rows: [],
				},
			};
		},
	},
];
export { user_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9jb25maWcudHMiLCAibW9jay9tb2R1bGVzL3VzZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL2h1YW5nY2hhby9Xb3JrU3BhY2UvR2l0SHViL3Z1ZS12aXRlL21vY2svY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy9odWFuZ2NoYW8vV29ya1NwYWNlL0dpdEh1Yi92dWUtdml0ZS9tb2NrXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy9odWFuZ2NoYW8vV29ya1NwYWNlL0dpdEh1Yi92dWUtdml0ZS9tb2NrL2NvbmZpZy50c1wiO2V4cG9ydCBkZWZhdWx0IHtcblx0YmFzZVVybDogXCIvYXBpXCIsXG5cdHRpbWVvdXQ6IDAsIC8vIFx1NUVGNlx1OEZERlx1NjVGNlx1OTVGNFx1RkYwQ1x1OUVEOFx1OEJBNFx1NjVFMFx1NUVGNlx1OEZERlxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy9odWFuZ2NoYW8vV29ya1NwYWNlL0dpdEh1Yi92dWUtdml0ZS9tb2NrL21vZHVsZXMvdXNlci50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvaHVhbmdjaGFvL1dvcmtTcGFjZS9HaXRIdWIvdnVlLXZpdGUvbW9jay9tb2R1bGVzXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy9odWFuZ2NoYW8vV29ya1NwYWNlL0dpdEh1Yi92dWUtdml0ZS9tb2NrL21vZHVsZXMvdXNlci50c1wiO2ltcG9ydCB7IE1vY2tNZXRob2QgfSBmcm9tIFwidml0ZS1wbHVnaW4tbW9ja1wiO1xuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFtcblx0e1xuXHRcdHVybDogYCR7Q29uZmlnLmJhc2VVcmx9L3JlZ2lzdGVyYCxcblx0XHRtZXRob2Q6IFwicG9zdFwiLFxuXHRcdHJlc3BvbnNlOiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb2RlOiAwLFxuXHRcdFx0XHRtZXNzYWdlOiBcIlwiLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0bmFtZTogXCJnZXRcIixcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0fSxcblx0fSxcblx0e1xuXHRcdHVybDogYCR7Q29uZmlnLmJhc2VVcmx9L2xvZ2luYCxcblx0XHRtZXRob2Q6IFwicG9zdFwiLFxuXHRcdHJlc3BvbnNlOiAoeyBib2R5IH0pID0+IHtcblx0XHRcdGNvbnN0IHVzZXIgPSBbXCJhZG1pblwiLCBcInVzZXJcIl07XG5cdFx0XHRpZiAodXNlci5pbmNsdWRlcyhib2R5LnVzZXJOYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNvZGU6IDAsXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJcIixcblx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRhdmF0YXI6IFwiaHR0cHM6Ly9jdWJlLmVsZW1lY2RuLmNvbS8wLzg4LzAzYjBkMzk1ODNmNDgyMDY3NjhhNzUzNGU1NWJjcG5nLnBuZ1wiLFxuXHRcdFx0XHRcdFx0bmFtZTogYm9keS51c2VyTmFtZSxcblx0XHRcdFx0XHRcdHRva2VuOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRjb2RlOiA0MDAsXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJubyB1c2VyXCIsXG5cdFx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSxcblx0fSxcblx0e1xuXHRcdHVybDogYCR7Q29uZmlnLmJhc2VVcmx9L3VzZXItaW5mb2AsXG5cdFx0bWV0aG9kOiBcImdldFwiLFxuXHRcdHJlc3BvbnNlOiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb2RlOiAwLFxuXHRcdFx0XHRtZXNzYWdlOiBcIlwiLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0bmFtZTogXCJnZXRcIixcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0fSxcblx0fSxcblx0e1xuXHRcdHVybDogYCR7Q29uZmlnLmJhc2VVcmx9L3VzZXItbGlzdGAsXG5cdFx0bWV0aG9kOiBcImdldFwiLFxuXHRcdHJlc3BvbnNlOiAoeyBxdWVyeSB9KSA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb2RlOiAwLFxuXHRcdFx0XHRtZXNzYWdlOiBcIlwiLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0cGFnZVNpemU6IHF1ZXJ5LnBhZ2VTaXplLFxuXHRcdFx0XHRcdHRvdGFsOiAyMCxcblx0XHRcdFx0XHRyb3dzOiBbXSxcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0fSxcblx0fSxcbl0gYXMgTW9ja01ldGhvZFtdO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixJQUFPLGlCQUFRO0FBQUEsRUFDL1IsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBO0FBQ1Y7OztBQ0FBLElBQU8sZUFBUTtBQUFBLEVBQ2Q7QUFBQSxJQUNDLEtBQUssR0FBRyxlQUFPLE9BQU87QUFBQSxJQUN0QixRQUFRO0FBQUEsSUFDUixVQUFVLE1BQU07QUFDZixhQUFPO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0E7QUFBQSxJQUNDLEtBQUssR0FBRyxlQUFPLE9BQU87QUFBQSxJQUN0QixRQUFRO0FBQUEsSUFDUixVQUFVLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDdkIsWUFBTSxPQUFPLENBQUMsU0FBUyxNQUFNO0FBQzdCLFVBQUksS0FBSyxTQUFTLEtBQUssUUFBUSxHQUFHO0FBQ2pDLGVBQU87QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULE1BQU07QUFBQSxZQUNMLFFBQVE7QUFBQSxZQUNSLE1BQU0sS0FBSztBQUFBLFlBQ1gsUUFBTyxvQkFBSSxLQUFLLEdBQUUsUUFBUTtBQUFBLFVBQzNCO0FBQUEsUUFDRDtBQUFBLE1BQ0QsT0FBTztBQUNOLGVBQU87QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULE1BQU0sQ0FBQztBQUFBLFFBQ1I7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBO0FBQUEsSUFDQyxLQUFLLEdBQUcsZUFBTyxPQUFPO0FBQUEsSUFDdEIsUUFBUTtBQUFBLElBQ1IsVUFBVSxNQUFNO0FBQ2YsYUFBTztBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1A7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBO0FBQUEsSUFDQyxLQUFLLEdBQUcsZUFBTyxPQUFPO0FBQUEsSUFDdEIsUUFBUTtBQUFBLElBQ1IsVUFBVSxDQUFDLEVBQUUsTUFBTSxNQUFNO0FBQ3hCLGFBQU87QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxVQUNMLFVBQVUsTUFBTTtBQUFBLFVBQ2hCLE9BQU87QUFBQSxVQUNQLE1BQU0sQ0FBQztBQUFBLFFBQ1I7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRDsiLAogICJuYW1lcyI6IFtdCn0K
