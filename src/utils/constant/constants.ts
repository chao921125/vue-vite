export default {
	keys: {
		token: "auth-token",
		themeConfig: "theme-config",
		i18nLocale: "i18n-locale",
		userInfo: "user-info",
		tags: "tags",
		routerPrev: "router-prev",
		routerNext: "router-next",
	},
	mittBusKey: {},
	ipUrl: {
		ip: {
			/* Proxy */
			ipinfo: "https://ipv4.my.ipinfo.app/api/ipDetails.php",
			geolocation_db: "https://geolocation-db.com/json/",
			wtfismyip: "https://wtfismyip.com/json",
			ipbase: "https://api.ipbase.com/v1/json",
			ipquery: "https://api.ipquery.io/?format=json",
			// ifconfig: "https://ifconfig.me/all.json", // 大陆无法访问
			// CORS
			ipify: "https://api.ipify.org/?format=json",
			// CORS
			myip: "https://api.myip.com/",
			// CORS
			ipify64: "https://api64.ipify.org/?format=json",
			// CORS
			httpbin: "https://httpbin.org/ip",
			// CORS
			ipinfo2: "https://ipinfo.io/ip",
			// CORS
			ipecho: "https://ipecho.net/ip",
			// CORS
			ident: "https://a.ident.me/", // https://4.ident.me/
			// CORS
			eth0: "https://eth0.me/",
			// CORS
			ipaddr: "https://ipaddr.site/",
			// CORS
			ipaddress: "https://ipaddress.sh/",
			// CORS
			amazonaws: "https://checkip.amazonaws.com/",
			// CORS
			curlmyip: "https://curlmyip.net/",
			// CORS
			wgetip: "https://wgetip.com/",
			// CORS
			l2: "https://l2.io/ip",
			// CORS
			icanhazip: "https://icanhazip.com/",
			// CORS
			tyk: "https://ip.tyk.nu/",
			// CORS
			iplark: "https://iplark.com/ipstack",
			// CORS
			1111: "https://1.1.1.1/cdn-cgi/trace",
			// CORS
			torproject: "https://check.torproject.org/api/ip",
			/* Real */
			// CORS
			ipplus360: "https://www.ipplus360.com/getIP",
			// CORS
			aa1: "https://v.api.aa1.cn/api/myip/index.php?aa1=json",
			// CORS
			c_ctrip: "https://cdid.c-ctrip.com/model-poc2/h",
			// CORS
			video: "https://vv.video.qq.com/checktime?otype=ojson",
			// CORS
			ipw: "https://test.ipw.cn/api/ip/myip?json",
			// CORS
			letv: "https://g3.letv.com/r?format=1",
			// CORS
			gdt: "https://ipv4.gdt.qq.com/get_client_ip",
		},
		info: {
			ipapi: "https://ipapi.com/ip_api.php?ip=", // ip 不能为空
			geojs: "https://get.geojs.io/v1/ip/geo/0.0.0.0.json", // ip 不能为空 https://get.geojs.io
			ipinfo: "https://ipinfo.io/widget/demo/", // ip 不能为空
			openstreetmap: "https://nominatim.openstreetmap.org/search?format=json&q=", // q（位置)  不能为空
			// CORS
			ipplus360: "https://www.ipplus360.com/getLocation?ip=",
			// CORS
			baidu: "https://opendata.baidu.com/api.php?co=&resource_id=6006&oe=utf8&query=", // ip 不能为空
			// CORS
			db_ip: "https://db-ip.com/demo/home.php?s=", // ip 不能为空
		},
		real: {
			qjqq: "https://api.qjqq.cn/api/Local",
			useragentinfo: "https://ip.useragentinfo.com/json",
			ipip: "https://myip.ipip.net/json", //
			// CORS
			ip: "https://ip.cn/api/index?type=0&ip=",
			// CORS
			meitu: "https://webapi-pc.meitu.com/common/ip_location?ip=",
			// CORS
			songzixian: "https://api.songzixian.com/api/ip?dataSource=GLOBAL_IP&ip=",
			// CORS
			pconline: "https://whois.pconline.com.cn/ipJson.jsp?ip=&json=true", // https://whois.pconline.com.cn/ipJson.jsp?ip=0.0.0.0&json=true
			// CORS
			bilibili: "https://api.live.bilibili.com/xlive/web-room/v1/index/getIpInfo", //
			// CORS
			inews: "https://r.inews.qq.com/api/ip2city", // https://i.news.qq.com/api/ip2city
		},
		proxy: {
			ip: "https://api.ip.sb/geoip/", // https://api.ip.sb/geoip/0.0.0.0
			vore: "https://api.vore.top/api/IPdata?ip=", // https://api.vore.top/api/IPdata?ip=0.0.0.0
			ipapi: "https://api.ipapi.is/", // https://api.ipapi.is/?ip=0.0.0.0
			freeipapi: "https://freeipapi.com/api/json", // https://freeipapi.com/api/json/0.0.0.0
			ipwhois: "https://ipwhois.app/json/?format=json", // https://ipwhois.app/json/0.0.0.0?format=json
			// CORS
			ip2location: "https://api.ip2location.io/", // https://api.ip2location.io/?ip=0.0.0.0
			// CORS
			db_ip: "https://api.db-ip.com/v2/free/self", // https://api.db-ip.com/v2/free/0.0.0.0
			// CORS
			realip: "https://realip.cc/json", // https://realip.cc/?ip=121.8.215.106
		},
	},
};
