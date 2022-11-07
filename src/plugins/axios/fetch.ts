let fetch: any = {};

fetch.post = async (url: string = "", data: any = {}, options: any = {}) => {
	let request: any = {
		method: "POST",
		headers: Object.assign({}, options),
		body: JSON.stringify(data),
	};
	let response: any = {};
	if (!url) return response;
	response = await fetch(url, request);
	return response.json();
};

fetch.get = async (url: string = "", data: any = {}, options: any = {}) => {
	let request: any = {
		method: "GET",
		headers: Object.assign({}, options),
		body: JSON.stringify(data),
	};
	let response: any = {};
	if (!url) return response;
	response = await fetch(url, request);
	return response.json();
};

export default fetch;
