import { MockMethod } from "vite-plugin-mock";
import Config from "../config";
export default [
	{
		url: `${Config.baseUrl}/login`,
		method: "post",
		response: ({ query }) => {
			if (query.length === 0) {
				return {
					code: 500,
					message: "",
					data: {
						name: query.name,
					},
				};
			} else {
				return {
					code: 0,
					data: {
						name: query.name,
					},
				};
			}
		},
	},
	{
		url: `${Config.baseUrl}/register`,
		method: "post",
		response: () => {
			return {
				code: 0,
				data: {
					name: "get",
				},
			};
		},
	},
] as MockMethod[];
