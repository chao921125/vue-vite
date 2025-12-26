import * as echarts from "echarts/core";

export default function Echarts(dom, options = {}) {
  const htmlDom = (dom && document.querySelector(`#${dom}`)) || document.querySelector("#echarts");
  const myEcharts = echarts.init(htmlDom);
  myEcharts.clear();
  myEcharts.setOption(options);
  myEcharts.resize();
}
