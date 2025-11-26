// 若非获取客户端本地IP，直接通过NG配置，在服务端获取即可
import Fetch from "@/plugins/http/fetch";

export const getLocalIpList = (callback: (ip: string) => void) => {
	const ip_dups: Record<string, boolean> = {};

	let RTCPeerConnection = window.RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection;
	// 如果不存在则使用一个iframe绕过
	if (!RTCPeerConnection) {
		// 因为这里用到了iframe，所以在调用这个方法的script上必须有一个iframe标签
		// <iframe id="iframe" sandbox="allow-same-origin"></iframe>
		const iframe = document.createElement("iframe");
		iframe.style.display = "none";
		document.body.appendChild(iframe);

		const win = iframe.contentWindow;

		if (win) {
			RTCPeerConnection = (win as any).RTCPeerConnection || (win as any).mozRTCPeerConnection || (win as any).webkitRTCPeerConnection;
		}
	}
	// let useWebKit = !!window.webkitRTCPeerConnection;
	const configuration = {
		optional: [{ RtpDataChannels: true }],
		iceServers: [{ urls: "stun:stun.services.mozilla.com" }, { urls: "stun:stun.l.google.com:19302" }],
	};
	// 这里就是需要的ICEServer了

	const pc = new (RTCPeerConnection as any)(configuration);
	const handleCandidate = (candidate: string) => {
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
		(result: any) => {
			pc.setLocalDescription(
				result,
				() => {},
				() => {},
			);
		},
		() => {},
	);
	setTimeout(() => {
		const lines = (pc as any).localDescription.sdp.split("\n");
		lines.forEach((line: string) => {
			if (line.indexOf("a=candidate:") === 0) handleCandidate(line);
		});
	}, 1000);
	// 网络协商的过程
	pc.onicecandidate = (ice: any) => {
		if (ice.candidate) {
			handleCandidate(ice.candidate.candidate);
		}
	};
};
export const getLocalIPs = () => {
	const myPeerConnection = window.RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection;
	// RTCPeerConnection是WebRTC用于构建点对点之间稳定、高效的流传输的组件。兼容火狐、谷歌等
	const pc = new (myPeerConnection as any)({
		// 创建点对点连接的RTCPeerConnection的实例

		iceServers: [{ url: "stun:stun.services.mozilla.com" }, { url: "stun:stun.l.google.com:19302" }] as any,
	}); // webRTC使用了ICE协议框架，包括STUN 和 TURN两个协议。我这里连接的是STUN协议服务器。STUN Server的作用是接受客户端的请求，并且把客户端的公网IP、Port封装到ICECandidate中。
	const noop = function () {};
	const localIPs: Record<string, boolean> = {}; // 记录有没有被调用到onNewIP这个listener上
	const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

	function ipIterate(ip: string) {
		// if (!localIPs[ip]) onNewIP(ip);
		localIPs[ip] = true;
	}
	pc.createDataChannel(""); // 创建数据信道
	pc.createOffer().then(function (sdp: any) {
		sdp.sdp.split("\n").forEach(function (line: string) {
			if (line.indexOf("candidate") < 0) return;

			line.match(ipRegex)?.forEach(ipIterate);
		});
		pc.setLocalDescription(sdp, noop, noop);
	});
	pc.onicecandidate = function (ice: any) {
		//listen for candidate events
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;

		ice.candidate.candidate.match(ipRegex)?.forEach(ipIterate);
	};
};

/**
 * 只获取 ip 信息
 * mode: "no-cors"
 * @param url
 */
export const getIp = (url: string) => {
	return Fetch.request(url, {}, { method: "GET" });
};

/**
 * 只能通过 ip 获取信息
 * @param url
 * @param ip
 */
export const getIpInfoByIp = (url: string, ip?: string) => {
	return Fetch.request(`${url}${ip || ""}`, {}, { method: "GET" });
};

/**
 * 获取真实的 ip 信息，或者，根据 ip 地址获取信息
 * @param url
 * @param ip
 */
export const getIpInfoReal = (url: string, ip?: string) => {
	return Fetch.request(`${url}${ip || ""}`, {}, { method: "GET" });
};

/**
 * 获取 IP 为代理后的地址
 * @param url
 */
export const getIpInfoProxy = (url: string) => {
	return Fetch.request(url, {}, { method: "GET" });
};

/**
 * 需要单独处理的
 */
export const getIpChaXun = () => {
	const url = `https://${new Date().getFullYear()}.ipchaxun.com/`;
	return Fetch.request(url, {}, { method: "GET" });
};

export const getIp138 = () => {
	const url = `https://${new Date().getFullYear()}.ip138.com`;
	let data = "";
	let xmlHttpRequest: XMLHttpRequest;
	if (window.XMLHttpRequest) {
		xmlHttpRequest = new XMLHttpRequest();
	} else {
		throw new Error("XMLHttpRequest not supported");
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
	const patt = [/[0-9]+.[0-9]+.[0-9]+.[0-9]+/, /来自/, []] as const;

	for (const i in datalist) {
		if (patt[0].test(datalist[i]) && patt[1].test(datalist[i])) {
			(patt[2] as unknown as string[]).push(patt[0].exec(datalist[i])![0]);

			(patt[2] as unknown as string[]).push(datalist[i].substr((patt[1].exec(datalist[i]) as RegExpExecArray).index + 3));
		}
	}
	return patt[2];
};
