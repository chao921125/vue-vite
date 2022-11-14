import type { Directive, DirectiveBinding } from "vue";

export const auth: Directive = {
	// 在绑定元素的父组件
	// 及他自己的所有子节点都挂载完成后调用
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		console.log(el, binding);
	},
};
