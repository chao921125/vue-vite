import type { Directive, DirectiveBinding } from "vue";

export const auth: Directive = {
	// 在绑定元素的父组件
	// 及他自己的所有子节点都挂载完成后调用
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;
		const route = useRoute();
		console.log(route.meta.roles);
		if (value && value instanceof Array && Array.isArray(value) && value.length) {
			el.hidden = false;
		} else {
			el.hidden = true;
		}
	},
};
