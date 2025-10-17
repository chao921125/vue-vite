const Fetch: any = {};

interface IRequestOptions {
	method?: string;
	headers?: Record<string, string>;
	mode?: RequestMode;
	cache?: RequestCache;
	credentials?: RequestCredentials;
	redirect?: RequestRedirect;
	referrerPolicy?: ReferrerPolicy;
	body?: string;
}

interface IFetchResponse {
	code?: number;
	message?: any;
	[key: string]: any;
}

Fetch.request = async (url = "", data = {}, options: IRequestOptions = { method: "GET" }): Promise<IFetchResponse> => {
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
				cache: "default" as RequestCache,
				// 发送带凭据的请求  include, *same-origin, omit
				credentials: "same-origin" as RequestCredentials,
				// manual, *follow, error
				redirect: "follow" as RequestRedirect,
				// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				referrerPolicy: "no-referrer" as ReferrerPolicy,
			},
			// GET 请求通常不包含 body，其他请求方法可以包含 body
			options && options.method && options.method.toUpperCase() === "GET" ? {} : { body: JSON.stringify(data) },
		),
	);
	const response: IFetchResponse = { code: 0, message: "" };
	if (!url) return response;
	try {
		const fetchResponse = await fetch(request);
		if (!fetchResponse.ok) return { code: 0, message: fetchResponse };
		return await fetchResponse.json();
	} catch (e) {
		return { code: 0, message: e };
	}
};

Fetch.upload = async (): Promise<void> => {};

export default Fetch;
