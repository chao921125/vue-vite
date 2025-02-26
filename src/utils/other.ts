import Fetch from "@/plugins/http/fetch";

// 获取图像
export const getImg = (data) => {
	const w = data.width || 200;
	const h = data.height || 200;
	return Fetch.request(`https://picsum.photos/${w}/${h}`, {}, { method: "GET" });
};
export const getImgCat = () => {
	return Fetch.request("https://api.thecatapi.com/v1/images/search?limit=1", {}, { method: "GET" });
};
export const getImgDog = () => {
	return Fetch.request("https://dog.ceo/api/breeds/image/random", {}, { method: "GET" });
};
