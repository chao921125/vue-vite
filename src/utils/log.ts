const log: ICommon = {};

function typeColor(type = "default") {
	let color = "";
	switch (type) {
		case "default":
			color = "#000000";
			break;
		case "primary":
			color = "#00EEEE";
			break;
		case "success":
			color = "#00CD00";
			break;
		case "warning":
			color = "#EEAD0E";
			break;
		case "danger":
			color = "#FF4040";
			break;
		default:
			break;
	}
	return color;
}

function colorful(textArr) {
	console.log(
		`%c${textArr
			.map((t) => {
				if (t.text && (typeof t.text === "string" || t.text.message)) {
					return t.text;
				} else if (t.text) {
					return Object.keys(t.text).map((key) => key);
				} else {
					return "";
				}
			})
			.join("%c")}`,
		...textArr.map((t) => `color: ${typeColor(t.type)};`),
	);
}

log.capsule = (title, info, type = "primary") => {
	console.log(
		`%c ${title} %c ${info} %c`,
		"background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
		`background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
		"background:transparent",
	);
};

log.default = (text = "default") => {
	colorful([{ text, type: "default" }]);
};

log.primary = (text = "primary") => {
	colorful([{ text, type: "primary" }]);
};

log.success = (text = "success") => {
	colorful([{ text, type: "success" }]);
};

log.warning = (text = "warning") => {
	colorful([{ text, type: "warning" }]);
};

log.danger = (text = "danger") => {
	colorful([{ text, type: "danger" }]);
};

export default log;
