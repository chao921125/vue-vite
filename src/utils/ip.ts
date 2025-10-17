// 若非获取客户端本地IP，直接通过NG配置，在服务端获取即可
import Fetch from "@/plugins/http/fetch";

export const getLocalIpList = (callback) => {
	const ip_dups = {};

	let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	// 如果不存在则使用一个iframe绕过
	if (!RTCPeerConnection) {
		// 因为这里用到了iframe，所以在调用这个方法的script上必须有一个iframe标签
		// <iframe id="iframe" sandbox="allow-same-origin"></iframe>
		const iframe = document.createElement("iframe");

		const win = iframe.contentWindow;

		RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
	}
	// let useWebKit = !!window.webkitRTCPeerConnection;
	const configuration = {
		optional: [{ RtpDataChannels: true }],
		iceServers: [{ urls: "stun:stun.services.mozilla.com" }, { urls: "stun:stun.l.google.com:19302" }],
	};
	// 这里就是需要的ICEServer了

	const pc = new RTCPeerConnection(configuration);
	const handleCandidate = (candidate) => {
		// /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/g
		const ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
		const hasIp = ip_regex.exec(candidate);
		if (hasIp) {
			// candidate.match(ip_regex)[1];

			const ip_addr = ip_regex.exec(candidate)![1];
			if (ip_dups[ip_addr] === undefined) callback(ip_addr);
			ip_dups[ip_addr] = true;
		}
	};
	pc.createDataChannel("");
	//创建一个SDP(session description protocol)会话描述协议 是一个纯文本信息 包含了媒体和网络协商的信息
	pc.createOffer(
		(result) => {
			pc.setLocalDescription(
				result,
				() => {},
				() => {},
			);
		},
		() => {},
	);
	setTimeout(() => {
		const lines = pc.localeDescription.sdp.split("\n");
		lines.forEach((line) => {
			if (line.indexOf("a=candidate:") === 0) handleCandidate(line);
		});
	}, 1000);
	// 网络协商的过程
	pc.onicecandidate = (ice) => {
		if (ice.candidate) {
			handleCandidate(ice.candidate.candidate);
		}
	};
};
export const getLocalIPs = () => {
	const myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	// RTCPeerConnection是WebRTC用于构建点对点之间稳定、高效的流传输的组件。兼容火狐、谷歌等
	const pc = new myPeerConnection({
		// 创建点对点连接的RTCPeerConnection的实例

		iceServers: <any>[{ url: "stun:stun.services.mozilla.com" }, { url: "stun:stun.l.google.com:19302" }],
	}); // webRTC使用了ICE协议框架，包括STUN 和 TURN两个协议。我这里连接的是STUN协议服务器。STUN Server的作用是接受客户端的请求，并且把客户端的公网IP、Port封装到ICECandidate中。
	const noop = function () {};
	const localIPs = {}; // 记录有没有被调用到onNewIP这个listener上
	const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

	function ipIterate(ip) {
		// if (!localIPs[ip]) onNewIP(ip);
		localIPs[ip] = true;
	}
	pc.createDataChannel(""); // 创建数据信道
	pc.createOffer().then(function (sdp) {
		sdp.sdp.split("\n").forEach(function (line) {
			if (line.indexOf("candidate") < 0) return;

			line.match(ipRegex).forEach(ipIterate);
		});
		pc.setLocalDescription(sdp, noop, noop);
	});
	pc.onicecandidate = function (ice) {
		//listen for candidate events
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;

		ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
	};
};

// Test
// getLocalIpList((ip) => {console.log(ip);});

// TODO https://github.com/ihmily/ip-info-api
// http://ip-api.com/json/

// http://www.net.cn/static/customercare/yourip.asp
// https://www.ip.cn/
// https://www.ip138.com/
// https://www.hao7188.com/
// https://www.lingfengyun.com/

/**
 * mode: "no-cors"
 * @param url
 */
export const getIp = (url) => {
	return Fetch.request(url, {}, { method: "GET" });
};

/**
 * 只能通过 ip 获取信息
 * @param url
 * @param ip
 */
export const getInfoByIp = (url, ip) => {
	return Fetch.request(`${url}${ip || ""}`, {}, { method: "GET" });
};

/**
 * 获取 ip 信息，或者，根据 ip 地址获取信息
 * @param url
 * @param ip
 */
export const getIpInfo = (url, ip?) => {
	return Fetch.request(`${url}${ip || ""}`, {}, { method: "GET" });
};

/**
 * 获取真实的 ip 信息，或者，根据 ip 地址获取信息
 * @param url
 * @param ip
 */
export const getRealIpInfo = (url, ip?) => {
	return Fetch.request(`${url}${ip || ""}`, {}, { method: "GET" });
};

/**
 * 获取 IP 为代理后的地址
 * @param url
 */
export const getProxyIpInfo = (url) => {
	return Fetch.request(url, {}, { method: "GET" });
};

/**
 * 需要单独处理的
 */

// https://ifconfig.me/
// https://ifconfig.es/
// https://ipcalf.com/
// https://tnx.nl/ip

export const getIpChaXun = () => {
	const url = `https://${new Date().getFullYear()}.ipchaxun.com/`;
	return Fetch.request(url, {}, { method: "GET" });
};

export const getIp138 = () => {
	const url = `https://${new Date().getFullYear()}.ip138.com`;
	let data;
	let xmlHttpRequest;
	if (window.ActiveXObject) {
		xmlHttpRequest = new window.ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttpRequest = new XMLHttpRequest();
	}
	xmlHttpRequest.onreadystatechange = function () {
		if (xmlHttpRequest.readyState === 4) {
			if (xmlHttpRequest.status === 200) {
				data = xmlHttpRequest.responseText;
			} else {
				alert("error:HTTP状态码为:" + xmlHttpRequest.status);
			}
		}
	};
	xmlHttpRequest.open("get", url, false);
	xmlHttpRequest.send(null);
	const datalist = data.split("\n");
	const patt = [/[0-9]+.[0-9]+.[0-9]+.[0-9]+/, /来自/, []];

	for (const i in datalist) {
		if (patt[0].test(datalist[i]) && patt[1].test(datalist[i])) {
			patt[2].push(patt[0].exec(datalist[i])[0]);

			patt[2].push(datalist[i].substr(patt[1].exec(datalist[i]).index + 3));
		}
	}
	return patt[2];
};
