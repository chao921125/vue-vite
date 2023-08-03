import type { Directive, DirectiveBinding } from "vue";

/**
 * 前端控制路由展示指令，这一块大家自行扩展
 * 1、登录之前，加载白名单路由，比如登录/注册/首页
 * 2、登录之后，获取用户role然后和已经配置好的路由（菜单）进行匹配
 * 3、路由根据role进行动态加载；菜单根据指令是否展示或者组装
 * 4、按钮级别的展示一样如此
 */
export const role: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		console.log(el, binding);
	},
};
