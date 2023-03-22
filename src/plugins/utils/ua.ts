// PC 插件 https://github.com/faisalman/ua-parser-js
// M 插件 https://github.com/hgoebl/mobile-detect.js/
// IP 关于IP这一块，建议后端获取
function getBrowserInfo() {
	const n = navigator;
	// @ts-ignore
	const b = n.userAgentData;
	return {
		languageBrowser: n.language,
		languageSystem: n.languages,
		ua: n.userAgent,
		name: b.brands[b.brands.length - 1].brand,
		version: b.brands[b.brands.length - 1].version,
		isMobile: b.mobile,
		system: b.platform,
	};
}
export default {
	browserInfo: getBrowserInfo(),
};
