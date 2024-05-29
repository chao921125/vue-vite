export default {
	storageKey: {
		token: "auth-token",
		themeConfig: "theme-config",
		i18nLocale: "i18n-locale",
		userInfo: "user-info",
		tags: "tags",
		routerPrev: "router-prev",
		routerNext: "router-next",
	},
	cookieKey: {
		token: "auth-token",
	},
	mittBusKey: {},
	ipUrl: {
		ip: {
			ipify: "https://api.ipify.org/?format=json",
			ipify64: "https://api64.ipify.org/?format=json",
			ipplus360: "https://www.ipplus360.com/getIP",
			fkcoder: "https://www.fkcoder.com/myip",
			aa1: "https://v.api.aa1.cn/api/myip/index.php?aa1=json",
			httpbin: "https://httpbin.org/ip",
			c_ctrip: "https://cdid.c-ctrip.com/model-poc2/h",
			video: "https://vv.video.qq.com/checktime?otype=ojson",
			uomg: "https://api.uomg.com/api/visitor.info?skey=1",
			ipw: "https://test.ipw.cn/api/ip/myip?json",
			ipinfo: "https://ipv4.my.ipinfo.app/api/ipDetails.php",
			ipinfo2: "https://ipinfo.io/ip",
			ipecho: "https://ipecho.net/ip",
			ident: "https://ident.me/",
			eth0: "https://eth0.me/",
			ipaddr: "https://ipaddr.site/",
			ipaddress: "https://ipaddress.sh/",
			amazonaws: "https://checkip.amazonaws.com/",
			curlmyip: "https://curlmyip.net/",
			tyk: "http://ip.tyk.nu/",
			wgetip: "https://wgetip.com/",
			l2: "https://l2.io/ip",
			icanhazip: "https://icanhazip.com/",
		},
		info: {
			geojs: "https://get.geojs.io/v1/ip/geo/",
			ipinfo: "https://ipinfo.io/widget/demo/",
			baidu: "https://opendata.baidu.com/api.php?co=&resource_id=6006&oe=utf8&query=",
			csdn: "https://searchplugin.csdn.net/api/v1/ip/get?ip=",
			ipplus360: "https://www.ipplus360.com/getLocation?ip=",
			fkcoder: "https://www.fkcoder.com/ip?ip=",
			ipapi: "https://ipapi.com/ip_api.php?ip=",
			db_ip: "https://db-ip.com/demo/home.php?s=",
		},
		real: {
			// 跨域
			ip: "https://ip.cn/api/index?type=0&ip=",
			// 跨域
			pconline: "http://whois.pconline.com.cn/ipJson.jsp?json=true&ip=",
			// 跨域
			csdn: "https://searchplugin.csdn.net/api/v1/ip/get?ip=",
			// 跨域
			meitu: "https://webapi-pc.meitu.com/common/ip_location?ip=",
			// 跨域
			qjqq: "https://api.qjqq.cn/api/Local",
			// 跨域
			useragentinfo: "https://ip.useragentinfo.com/json",
			songzixian: "https://api.songzixian.com/api/ip?dataSource=GLOBAL_IP&ip=",
		},
		proxy: {
			ip: "https://api.ip.sb/geoip/",
			ip2location: "https://api.ip2location.io/",
			realip: "https://realip.cc/",
			ipapi: "https://ipapi.co/json/",
			ip_api: "http://ip-api.com/json/?lang=zh-CN",
			ip_api2: "https://ip-api.io/json",
		},
	},
};
