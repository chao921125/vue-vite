import { MockMethod } from "vite-plugin-mock";
import Config from "../config";
export default [
	{
		url: `${Config.baseUrl}/login`,
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
