<template>
	<!--创建容器-->
	<div class="containers">
		<div class="canvas" id="canvas" ref="canvasRef"></div>
		<!--属性面板将通过该元素呈现到其中-->
		<div class="panel" id="js-properties-panel"></div>
	</div>
</template>

<script lang="ts" setup name="">
	import { ElMessage } from "element-plus";
	import "bpmn-js/dist/assets/bpmn-js.css";
	import "bpmn-js/dist/assets/diagram-js.css";
	import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
	import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
	import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
	import Modeler from "bpmn-js/lib/Modeler";
	import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from "bpmn-js-properties-panel/dist";
	import CamundaBpmnModdle from "camunda-bpmn-moddle/resources/camunda.json";
	import xmlStr from "../config/defaultBpmnXml";
	import translate from "../i18n/index";

	const canvasRef = ref();
	const state = reactive<any>({
		bpmnModeler: null,
		bpmnXmlStr: xmlStr, // xml数据
	});
	// 注意：必须先加载一个bpmn文件，新建就是加载一个空的bpmn文件，否则不能拖拽节点
	const createNewDiagram = async (bpmn: any) => {
		// 将字符串转换成图显示出来
		try {
			const result = await state.bpmnModeler.importXML(bpmn);
			// state.bpmnModeler.get('canvas').zoom('fit-viewport');
			const { warnings } = result;
			console.log(warnings);
		} catch (e) {
			ElMessage.error("打开模型出错，数据格式有误！");
			console.log("error--->", e);
		}
	};

	const initBpmn = () => {
		// 将汉化包装成一个模块
		const customTranslate = {
			translate: ["value", translate],
		};
		// 生成实例
		state.bpmnModeler = new Modeler({
			container: canvasRef.value, // 获取到属性ref为“canvasRef”的dom节点
			propertiesPanel: {
				parent: "#js-properties-panel",
			},
			keyboard: {
				bindTo: window,
			},
			additionalModules: [
				// 汉化模块
				customTranslate,
				BpmnPropertiesPanelModule,
				BpmnPropertiesProviderModule,
			],
			moddleExtensions: {
				camunda: CamundaBpmnModdle,
			},
		});
		createNewDiagram(state.bpmnXmlStr); // 新增流程定义
	};

	onMounted(() => {
		initBpmn();
	});
</script>

<style scoped lang="scss">
	.containers {
		width: 100%;
		height: 100%;
		.canvas {
			height: calc(100vh - 200px);
			border: 1px solid #0a0a0a;
		}
		.panel {
			width: 400px;
			height: 100%;
			overflow: auto;
			position: absolute;
			top: 1px;
			right: 1px;
		}
	}
</style>
