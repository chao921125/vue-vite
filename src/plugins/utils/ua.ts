// PC 插件 https://github.com/faisalman/ua-parser-js
// M 插件 https://github.com/hgoebl/mobile-detect.js/
// IP 关于IP这一块，建议后端获取
import UAParser from "ua-parser-js";

const getUaInfo = () => {
	return UAParser(navigator.userAgent) as any;
};

function getBrowserInfo() {
	const uaData = (navigator as any).userAgentData;
	return {
		languageBrowser: navigator.language,
		languageSystem: navigator.languages,
		online: navigator.onLine,
		cookiesEnabled: navigator.cookieEnabled,
		ua: navigator.userAgent,
		uaData: uaData,
		name: uaData.brands[uaData.brands.length - 1].brand,
		version: uaData.brands[uaData.brands.length - 1].version,
		isMobile: uaData.mobile,
		system: uaData.platform,
	};
}
export default {
	browserInfo: getBrowserInfo(),
	uaInfo: getUaInfo(),
};
