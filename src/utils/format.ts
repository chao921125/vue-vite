export const FORMAT_ENUM = {
	y: "YYYY",
	ym: "YYYY-mm",
	ymd: "YYYY-mm-dd",
	ymdh: "YYYY-mm-dd HH",
	ymdhm: "YYYY-mm-dd HH:MM",
	ymdhms: "YYYY-mm-dd HH:MM:SS",
	ymdhmsq: "YYYY-mm-dd HH:MM:SS QQQ",
	ymdhmsw: "YYYY-mm-dd HH:MM:SS WWW",
	ymdhmsz: "YYYY-mm-dd HH:MM:SS ZZZ",
	ymdhmsqwz: "YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ",
};
/**
 * 时间日期转换
 * @param date 当前时间，new Date() 格式
 * @param format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @returns 返回拼接后的时间字符串
 */
export const formatDate = (date, format) => {
	const we = date.getDay(); // 星期
	const z = getWeek(date); // 周
	const qut = Math.floor((date.getMonth() + 3) / 3).toString(); // 季度
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString(), // 秒
		"q+": qut, // 季度
	};
	// 中文数字 (星期)
	const week = {
		0: "日",
		1: "一",
		2: "二",
		3: "三",
		4: "四",
		5: "五",
		6: "六",
	};
	// 中文数字（季度）
	const quarter = {
		1: "一",
		2: "二",
		3: "三",
		4: "四",
	};
	if (/(W+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? "星期" + week[we] : "周" + week[we]) : week[we]);
	if (/(Q+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length === 4 ? "第" + quarter[qut] + "季度" : quarter[qut]);
	if (/(Z+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length === 3 ? "第" + z + "周" : z + "");
	for (const k in opt) {
		const r = new RegExp("(" + k + ")").exec(format);
		// 若输入的长度不为1，则前面补零
		if (r) format = format.replace(r[1], RegExp.$1.length === 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, "0"));
	}
	return format;
};

/**
 * 获取当前日期是第几周
 * @param dateTime 当前传入的日期值
 * @returns number
 */
function getWeek(dateTime) {
	const temptTime = new Date(dateTime.getTime());
	// 周几
	const weekday = temptTime.getDay() || 7;
	// 周1+5天=周六
	temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
	let firstDay = new Date(temptTime.getFullYear(), 0, 1);
	const dayOfWeek = firstDay.getDay();
	let spendDay = 1;
	if (dayOfWeek !== 0) spendDay = 7 - dayOfWeek + 1;
	firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
	const d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000);
	return Math.ceil(d / 7);
}

/**
 * 将时间转换为 `几秒前`、`几分钟前`、`几小时前`、`几天前`
 * @param param 当前时间，new Date() 格式或者字符串时间格式
 * @param format 需要转换的时间格式字符串
 * @description param 10秒：  10 * 1000
 * @description param 1分：   60 * 1000
 * @description param 1小时： 60 * 60 * 1000
 * @description param 24小时：60 * 60 * 24 * 1000
 * @description param 3天：   60 * 60* 24 * 1000 * 3
 * @returns string
 */
export const formatPast = (param, format = "YYYY-mm-dd") => {
	// 传入格式处理、存储转换值
	let t, s;
	// 获取js 时间戳
	let time = new Date().getTime();
	// 是否是对象
	if (typeof param === "string") {
		t = new Date(param).getTime();
	} else {
		t = param;
	}
	// 当前时间戳 - 传入时间戳
	time = Number.parseInt(`${time - t}`);
	if (time < 10000) {
		// 10秒内
		return "刚刚";
	} else if (time < 60000 && time >= 10000) {
		// 超过10秒少于1分钟内
		s = Math.floor(time / 1000);
		return `${s}秒前`;
	} else if (time < 3600000 && time >= 60000) {
		// 超过1分钟少于1小时
		s = Math.floor(time / 60000);
		return `${s}分钟前`;
	} else if (time < 86400000 && time >= 3600000) {
		// 超过1小时少于24小时
		s = Math.floor(time / 3600000);
		return `${s}小时前`;
	} else if (time < 259200000 && time >= 86400000) {
		// 超过1天少于3天内
		s = Math.floor(time / 86400000);
		return `${s}天前`;
	} else {
		// 超过3天
		const date = typeof param === "string" ? new Date(param) : param;
		return formatDate(date, format);
	}
};

/**
 * 时间问候语
 * @param param 当前时间，new Date() 格式
 * @description param 调用 `formatAxis(new Date())` 输出 `上午好`
 * @returns string
 */
export const formatAxis = (param) => {
	const hour = new Date(param).getHours();
	if (hour < 6) return "凌晨好";
	else if (hour < 9) return "早上好";
	else if (hour < 12) return "上午好";
	else if (hour < 14) return "中午好";
	else if (hour < 17) return "下午好";
	else if (hour < 19) return "傍晚好";
	else if (hour < 22) return "晚上好";
	else return "夜里好";
};

export const replaceChar = (value) => {
	if (!value) return "******";
	// const reg = /[a-zA-Z0-9]{3}\w*[a-zA-Z0-9]{4}/;
	// return pwd.replace(reg, "$1****$2");
	return value.slice(0, 2) + "****" + value.slice(value.length - 2);
};

export const replaceNullLine = (value) => {
	if (!value) {
		return "-";
	}
	return value;
};

/**
 * 转数字
 */
export const parseNumber = (value) => {
	// 清理输入
	const cleaned = String(value).replace(/[^0-9+\-Ee.]/g, "");

	// 转换为数字
	const number = parseFloat(cleaned);

	// 验证有效性
	return isNaN(number) ? null : number;
};

/**
 * 数字格式化千分位，同时选择保留几位小数，数值、几位小数、千分位符号、小数点符号
 */
export const formatThousandPoint = (value, decimals = 0, thousands_sep = ",", dec_point = ".") => {
	if (!value) return 0;
	if (isNaN(Number(value))) return 0;
	if (!decimals && !isFinite(Number(decimals))) decimals = 0;
	if (!thousands_sep) thousands_sep = ",";
	if (!dec_point) dec_point = ".";
	value = parseNumber(value);
	const n = !isFinite(+value) ? 0 : +value,
		prec = !isFinite(+decimals) ? 0 : Math.abs(Number(decimals)),
		sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
		dec = typeof dec_point === "undefined" ? "." : dec_point;
	const toFixedFix = (n, prec) => {
		const k = Math.pow(10, prec);
		return "" + Math.ceil(n * k) / k;
	};
	let s: any = [];
	s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
	const re = /(-?\d+)(\d{3})/;
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, "$1" + sep + "$2");
	}
	if ((s[1] || "").length < prec) {
		s[1] = s[1] || "";
		s[1] += new Array(prec - s[1].length + 1).join("0");
	}
	return s.join(dec);
};

/**
 * 数字格式化千分位
 */
export const formatThousand = (value) => {
	if (!value) return 0;
	value = Number(value);
	return (+value || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
};
