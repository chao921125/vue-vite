import { MockMethod } from "vite-plugin-mock";
import Config from "../config";

export default [
	{
		url: `${Config.baseUrl}/register`,
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
		url: `${Config.baseUrl}/login`,
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
						token: new Date().getTime(),
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
		url: `${Config.baseUrl}/user-info`,
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
		url: `${Config.baseUrl}/user-list`,
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
] as MockMethod[];
