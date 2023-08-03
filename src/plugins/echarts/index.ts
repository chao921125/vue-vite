import * as echarts from "echarts/core";

export default function Echarts(dom: string, options: any = {}) {
	const htmlDom: HTMLElement = (dom && document.querySelector(`#${dom}`)!) || document.querySelector("#echarts")!;
	let myEcharts = echarts.init(htmlDom);
	myEcharts.clear();
	myEcharts.setOption(options);
	myEcharts.resize();
}
