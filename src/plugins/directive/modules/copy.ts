import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
import { $t } from "@/plugins/language";

interface ElType extends HTMLElement {
	copyData: string | number;
	__handleClick__: any;
}

export const copy: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
		console.log(binding.value);
		el.addEventListener("click", handClick);
	},
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el.__handleClick__);
	},
};

function handClick(this: any) {
	const input = document.createElement("input");
	input.value = this.copyData.toLocaleString();
	document.body.appendChild(input);
	input.select();
	document.body.removeChild(input);
	ElMessage({
		type: "success",
		message: $t("i18n.msg.copy"),
	});
}
