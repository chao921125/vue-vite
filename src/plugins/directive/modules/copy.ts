import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
import { $t } from "@/plugins/i18n";

interface ElType extends HTMLElement {
	copyData: string | number | undefined;
	__handleClick__: any;
}

function getTextByTag(node: HTMLElement) {
	if (node.children.length) {
		getTextByTag(<HTMLElement>node.children[0]);
	} else {
		return node.innerHTML;
	}
}

function copyData(val: any) {
	const copyText = document.createElement("textarea");
	copyText.innerHTML = val;
	copyText.readOnly = true;
	copyText.style.position = "fixed";
	copyText.style.zIndex = "-99999";
	document.body.appendChild(copyText);
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(copyText.value);
	document.body.removeChild(copyText);
	ElMessage({
		type: "success",
		message: $t("message.msg.copy"),
	});
}

export const copy: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		if (binding.value) {
			el.copyData = binding.value;
		} else {
			el.copyData = getTextByTag(el);
		}
		el.addEventListener("click", () => copyData(el.copyData));
	},
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el.__handleClick__);
	},
};
