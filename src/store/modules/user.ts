import { defineStore } from "pinia";
import Constants from "@/utils/constant/constants";
import { createPersistedState, createPersistedActions } from "@/plugins/global/storePersist";

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
export const useUserInfo = defineStore("userInfo", () => {
  // 使用持久化抽象层
  const persistConfig = {
    key: Constants.keys.userInfo,
    storage: "local" as const,
  };

  const initialState: { userInfo: UserInfo } = {
    userInfo: {
      id: "",
      userName: "",
      avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      time: 0,
      roles: [],
      permission: [],
    },
  };

  const state = createPersistedState(initialState, persistConfig);
  const { save, clear } = createPersistedActions(persistConfig);

  // 响应式状态
  const userInfo = ref<UserInfo>(state.userInfo);

  /**
   * 设置用户信息
   * @param data - 用户数据对象
   */
  function setUserInfo(data: { roles?: string[]; permission?: string[] }) {
    userInfo.value = {
      ...userInfo.value,
      roles: data.roles || [],
      permission: data.permission || [],
      time: new Date().getTime(),
    };

    // 使用抽象层保存
    save({ userInfo: userInfo.value });
  }

  /**
   * 清除用户信息
   */
  function clearUserInfo() {
    userInfo.value = initialState.userInfo;
    clear();
  }

  return {
    userInfo,
    setUserInfo,
    clearUserInfo,
  };
});
