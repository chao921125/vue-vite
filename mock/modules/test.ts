import { MockMethod } from "vite-plugin-mock";
export default [
	{
		url: "/api/get",
		method: "get",
		response: ({ url, body, query, headers }) => {
			return {
				code: 0,
				data: {
					name: "get",
					url: url,
					body: body, // post
					query: query, // get
					headers: headers,
				},
			};
		},
	},
	{
		url: "/api/post",
		method: "post",
		timeout: 2000,
		response: {
			code: 0,
			data: {
				name: "post",
			},
		},
	},
	{
		url: "/api/text",
		method: "post",
		rawResponse: async (req, res) => {
			let reqbody = "";
			await new Promise((resolve) => {
				req.on("data", (chunk) => {
					reqbody += chunk;
				});
				req.on("end", () => resolve(undefined));
			});
			res.setHeader("Content-Type", "text/plain");
			res.statusCode = 200;
			res.end(`hello, ${reqbody}`);
		},
	},
] as MockMethod[];

// export default function (config: MockConfig) {
//   return [
//     {
//       url: '/api/text',
//       method: 'post',
//       rawResponse: async (req, res) => {
//         let reqbody = ''
//         await new Promise((resolve) => {
//           req.on('data', (chunk) => {
//             reqbody += chunk
//           })
//           req.on('end', () => resolve(undefined))
//         })
//         res.setHeader('Content-Type', 'text/plain')
//         res.statusCode = 200
//         res.end(`hello, ${reqbody}`)
//       },
//     },
//   ]
// }
