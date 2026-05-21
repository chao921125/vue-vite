import { defineStore } from "pinia";
import Storage from "@/utils/storage";
import Constants from "@/utils/constant/constants";

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: string;
  userName: string;
  avatar: string;
  time: number;
  roles: string[];
  permission: string[];
}

/**
 * 用户信息 Store
 * @methods setUserInfo 设置用户信息
 */
export const useUserInfo = defineStore("userInfo", {
  state: () => ({
    userInfo: {
      id: "",
      userName: "",
      avatar: "",
      time: 0,
      roles: [] as string[],
      permission: [] as string[],
    } as UserInfo,
  }),
  actions: {
    /**
     * 设置用户信息
     * @param data - 用户数据对象
     */
    setUserInfo(data: { roles?: string[]; permission?: string[] }) {
      // 从缓存中获取用户信息
      const info =
        Storage.getLocalStorage(Constants.keys.userInfo) ||
        Storage.getSessionStorage(Constants.keys.userInfo);

      this.userInfo.id = info?.id || "";
      this.userInfo.userName = info?.userName || "";
      this.userInfo.avatar =
        info?.avatar || "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
      this.userInfo.time = new Date().getTime();
      this.userInfo.roles = data.roles || [];
      this.userInfo.permission = data.permission || [];
    },
  },
});
