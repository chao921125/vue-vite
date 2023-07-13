import { defineStore } from "pinia";
import { IUserInfoStates } from "@/interface/store";
import Storage from "@/plugins/utils/storage";
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
			permission: [],
		},
	}),
	actions: {
		setUserInfo(data: any) {
			// 缓存中获取用户信息
			const info = Storage.getLocalStorage(Constants.storageKey.userInfo) || Storage.getSessionStorage(Constants.storageKey.userInfo);
			this.userInfo.id = info.id || "";
			this.userInfo.userName = info.userName || "";
			this.userInfo.avatar = info.avatar || "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
			this.userInfo.time = new Date().getTime();
			this.userInfo.roles = data.roles || [];
			this.userInfo.permission = data.permission || [];
		},
	},
});
