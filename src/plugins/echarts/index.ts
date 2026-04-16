import * as echarts from "echarts/core";

export default function Echarts(dom: any, options: any = {}) {
  const htmlDom = (dom && document.querySelector(`#${dom}`)) || document.querySelector("#echarts");
  const myEcharts = echarts.init(htmlDom);
  myEcharts.clear();
  myEcharts.setOption(options);
  myEcharts.resize();
}
