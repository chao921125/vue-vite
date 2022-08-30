import type { Plugin } from "vite";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

function viteLog(): Plugin {
	let config: { command: string };
	let startTime: string = "";
	let endTime: string = "";
	return {
		name: "vite-log",
		buildStart() {
			startTime = dayjs(new Date()).format("YYYY-MM-DD HH:MM:SS");
			console.log("👏");
		},
		closeBundle() {},
	};
}

export default viteLog;
