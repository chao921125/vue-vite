// 若非获取客户端本地IP，直接通过NG配置，在服务端获取即可
import Fetch from "@/plugins/axios/fetch";
export const getLocalIpList = (callback) => {
	let ip_dups = {};
	// @ts-ignore
	let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	// 如果不存在则使用一个iframe绕过
	if (!RTCPeerConnection) {
		// 因为这里用到了iframe，所以在调用这个方法的script上必须有一个iframe标签
		// <iframe id="iframe" sandbox="allow-same-origin"></iframe>
		let iframe = document.createElement("iframe");
		// @ts-ignore
		let win = iframe.contentWindow;
		// @ts-ignore
		RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
	}
	// let useWebKit = !!window.webkitRTCPeerConnection;
	let mediaConstraints = {
		optional: [{ RtpDataChannels: true }],
	};
	// 这里就是需要的ICEServer了
	let servers = {
		iceServers: [{ urls: "stun:stun.services.mozilla.com" }, { urls: "stun:stun.l.google.com:19302" }],
	};
	// @ts-ignore
	let pc = new RTCPeerConnection(servers, mediaConstraints);
	const handleCandidate = (candidate) => {
		// /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/g
		let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
		let hasIp = ip_regex.exec(candidate);
		if (hasIp) {
			// candidate.match(ip_regex)[1];
			// @ts-ignore
			let ip_addr = ip_regex.exec(candidate)[1];
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
		// @ts-ignore
		let lines = pc.localeDescription.sdp.split("\n");
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
// getLocaleIp((ip) => {console.log(ip);});

/**
 * 淘宝获取本地IP
 * ipCallback({ip:"123.58.106.170"})
 */
export const getLocalIpByTaoBao = () => {
	return Fetch.request("https://www.taobao.com/help/getip.php", {}, { method: "GET" });
};
// http://www.net.cn/static/customercare/yourip.asp
// https://www.ip.cn/
// https://www.ip138.com/
// https://www.hao7188.com/
// https://www.lingfengyun.com/
export const getlocalIPs = () => {
	// @ts-ignore
	let myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	// RTCPeerConnection是WebRTC用于构建点对点之间稳定、高效的流传输的组件。兼容火狐、谷歌等
	let pc = new myPeerConnection({
		// 创建点对点连接的RTCPeerConnection的实例
		// @ts-ignore
		iceServers: [{ url: "stun:stun.services.mozilla.com" }, { url: "stun:stun.l.google.com:19302" }],
	}); // webRTC使用了ICE协议框架，包括STUN 和 TURN两个协议。我这里连接的是STUN协议服务器。STUN Server的作用是接受客户端的请求，并且把客户端的公网IP、Port封装到ICECandidate中。
	let noop = function () {};
	let localIPs = {}; // 记录有没有被调用到onNewIP这个listener上
	let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

	function ipIterate(ip) {
		// @ts-ignore
		if (!localIPs[ip]) onNewIP(ip);
		localIPs[ip] = true;
	}
	pc.createDataChannel(""); // 创建数据信道
	pc.createOffer().then(function (sdp) {
		// @ts-ignore
		sdp.sdp.split("\n").forEach(function (line) {
			if (line.indexOf("candidate") < 0) return;
			// @ts-ignore
			line.match(ipRegex).forEach(ipIterate);
		});
		pc.setLocalDescription(sdp, noop, noop);
	});
	pc.onicecandidate = function (ice) {
		//listen for candidate events
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		// @ts-ignore
		ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
	};
};

export const getIp = () => {
	return Fetch.request("https://ip.cn/api/index?ip=&type=0", {}, { method: "GET" });
};

export const getIpPconline = () => {
	return Fetch.request("http://whois.pconline.com.cn/ipJson.jsp?ip=&json=true", {}, { method: "GET" });
};

// 获取最后一层ip，即无法获取正确的真实IP
// https://ipapi.co/json/
export const getIpApi = () => {
	return Fetch.request("http://ip-api.com/json/?lang=zh-CN", {}, { method: "GET" });
};

export const getIpVore = () => {
	return Fetch.request("https://api.vore.top/api/IPdata?ip=", {}, { method: "GET", mode: "no-cors" });
};

export const getIpUser = () => {
	return Fetch.request("https://ip.useragentinfo.com/json", {}, { method: "GET" });
};

export const getIpIpify = () => {
	return fetch("https://api.ipify.org?format=json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
};

export const getIp138 = () => {
	let data;
	let xmlHttpRequest;
	if (window.ActiveXObject) {
		xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttpRequest = new XMLHttpRequest();
	}
	xmlHttpRequest.onreadystatechange = function () {
		if (xmlHttpRequest.readyState == 4) {
			if (xmlHttpRequest.status == 200) {
				data = xmlHttpRequest.responseText;
			} else {
				alert("error:HTTP状态码为:" + xmlHttpRequest.status);
			}
		}
	};
	xmlHttpRequest.open("get", "https://2022.ip138.com", false);
	xmlHttpRequest.send(null);
	let datalist = data.split("\n");
	let patt = [/[0-9]+.[0-9]+.[0-9]+.[0-9]+/, /来自/, []];
	// @ts-ignore
	for (let i in datalist) {
		// @ts-ignore
		if (patt[0].test(datalist[i]) && patt[1].test(datalist[i])) {
			// @ts-ignore
			patt[2].push(patt[0].exec(datalist[i])[0]);
			// @ts-ignore
			patt[2].push(datalist[i].substr(patt[1].exec(datalist[i]).index + 3));
		}
	}
	return patt[2];
};
