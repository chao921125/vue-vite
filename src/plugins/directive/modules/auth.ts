import type { Directive, DirectiveBinding } from "vue";
import { getStoreRefs, appStore } from "@/store";

/**
 * 按钮级别权限控制，由后端返回菜单（路由）数据
 * 这里我做一个演示：定义好的权限有：C/R/U/D，当然也可以动态读取后端配置
 */
export const auth: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;
		const { userInfo } = getStoreRefs(appStore.useUserInfo);
		let classValue = el.getAttribute("class") || "";
		if (value && value.length && userInfo.value.permission.includes(value)) {
			el.hidden = false;
			classValue = classValue.replace("re-hidden", "");
		} else {
			el.hidden = true;
			classValue += " re-hidden";
		}
		el.setAttribute("class", classValue);
	},
};
