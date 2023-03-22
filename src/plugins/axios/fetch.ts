let Fetch: any = {};

Fetch.request = async (url: string = "", data: any = {}, options: any = { method: "GET" }) => {
	const headers = new Headers(
		Object.assign(
			{
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
			},
			(options && options.headers) || {},
		),
	);
	const request = new Request(
		url,
		Object.assign(
			{
				// *GET, POST, PUT, DELETE, etc.
				method: options.method,
				headers: headers,
				// no-cors, *cors, same-origin
				mode: options.mode || "cors",
				// *default, no-cache, reload, force-cache, only-if-cached
				cache: "default",
				// 发送带凭据的请求  include, *same-origin, omit
				credentials: "same-origin",
				// manual, *follow, error
				redirect: "follow",
				// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				referrerPolicy: "no-referrer",
			},
			(options && options.method === "GET") || { body: JSON.stringify(data) },
		),
	);
	let response: any = {};
	if (!url) return response;
	try {
		response = await fetch(request);
		if (!response.ok) return { code: 0, message: response };
		return response.json();
	} catch (e) {
		return { code: 0, message: e };
	}
};

Fetch.upload = async () => {};

export default Fetch;
