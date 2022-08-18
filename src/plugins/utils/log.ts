let log: any = {};

function typeColor(type: string = "default") {
	let color = "";
	switch (type) {
		case "default":
			color = "#000000";
			break;
		case "primary":
			color = "#3488ff";
			break;
		case "success":
			color = "#43B883";
			break;
		case "warning":
			color = "#e6a23c";
			break;
		case "danger":
			color = "#f56c6c";
			break;
		default:
			break;
	}
	return color;
}

function colorful(textArr: any) {
	console.log(`%c${textArr.map((t) => t.text || "").join("%c")}`, ...textArr.map((t) => `color: ${typeColor(t.type)};`));
}

log.capsule = function (title: string, info: string, type: string = "primary") {
	console.log(
		`%c ${title} %c ${info} %c`,
		"background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
		`background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
		"background:transparent",
	);
};

log.default = (text: string = "default") => {
	colorful([{ text, type: "default" }]);
};

log.primary = (text: string = "primary") => {
	colorful([{ text, type: "primary" }]);
};

log.success = (text: string = "success") => {
	colorful([{ text, type: "success" }]);
};

log.warning = (text: string = "warning") => {
	colorful([{ text, type: "warning" }]);
};

log.danger = (text: string = "danger") => {
	colorful([{ text, type: "danger" }]);
};

export default log;
