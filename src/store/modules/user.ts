import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { IUserInfoStates } from "@/interface/store";
import Storage from "@/plugins/utils/storage";
import Cookie from "@/plugins/utils/cookie";
import Constants from "@/plugins/constants";

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore("userInfo", {
	state: (): IUserInfoStates => ({
		userInfo: {
			id: "",
			userName: "",
			avatar: "",
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfo() {
			// 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
			const userName = Cookies.get("userName");
			// 模拟数据
			let defaultRoles: Array<string> = [];
			let defaultAuthBtnList: Array<string> = [];
			// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let adminRoles: Array<string> = ["admin"];
			// admin 按钮权限标识
			let adminAuthBtnList: Array<string> = ["btn.add", "btn.del", "btn.edit", "btn.link"];
			// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let testRoles: Array<string> = ["common"];
			// test 按钮权限标识
			let testAuthBtnList: Array<string> = ["btn.add", "btn.link"];
			// 不同用户模拟不同的用户权限
			if (userName === "admin") {
				defaultRoles = adminRoles;
				defaultAuthBtnList = adminAuthBtnList;
			} else {
				defaultRoles = testRoles;
				defaultAuthBtnList = testAuthBtnList;
			}
			// 用户信息模拟数据
			const userInfo = {
				id: "",
				userName: userName,
				avatar:
					userName === "admin"
						? "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg"
						: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg",
				time: new Date().getTime(),
				roles: defaultRoles,
				authBtnList: defaultAuthBtnList,
			};
			// 存储用户信息到浏览器缓存
			Storage.setSessionStorage(Constants.storageKey.userInfo, userInfo);
			Storage.setLocalStorage(Constants.storageKey.userInfo, userInfo);
			Cookie.setCookie(Constants.storageKey.userInfo, userInfo);

			if (Storage.getSessionStorage(Constants.storageKey.userInfo) || Cookie.getCookie(Constants.storageKey.userInfo)) {
				this.userInfo = Storage.getSessionStorage(Constants.storageKey.userInfo) || Cookie.getCookie(Constants.storageKey.userInfo);
			} else {
				this.userInfo = userInfo;
			}
		},
	},
});
