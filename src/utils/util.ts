/**consignment
 * {
 *   "url": "string"
 * }
 * */
export function UrlToObj(params: string) {
	let obj = {
		id: "",
	};
	// @ts-ignore
	params.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, key, value) => (obj[key] = value));
	// @ts-ignore
	params.replace(/#([^?=&#]+)/g, (_, hash) => (obj["HASH"] = hash));
	return obj;
}
