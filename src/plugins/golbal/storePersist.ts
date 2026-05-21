/**
 * Store 持久化工具
 * 提供统一的状态持久化抽象层
 *
 * @example
 * // 在 Store 中使用
 * const { state, actions } = defineStore('myStore', {
 *   state: () => createPersistedState({
 *     tags: [],
 *     settings: {}
 *   }, {
 *     key: 'myStore',
 *     storage: 'local' // 'local' | 'session' | 'cookie'
 *   })
 * })
 */

import Storage from "@/utils/storage";

/**
 * 存储类型
 */
export type StorageType = "local" | "session" | "cookie";

/**
 * 持久化配置
 */
export interface PersistConfig {
  /** 存储键名 */
  key: string;
  /** 存储类型 */
  storage?: StorageType;
  /** 需要持久化的字段（不填则持久化全部） */
  paths?: string[];
  /** 数据序列化函数 */
  serializer?: {
    serialize: (value: any) => string;
    deserialize: (value: string) => any;
  };
  /** 数据迁移函数（版本升级时使用） */
  migrate?: (persistedValue: any) => any;
  /** 存储版本号（用于数据结构变更时的迁移） */
  version?: number;
}

/**
 * 创建持久化状态
 * @param initialState 初始状态
 * @param config 持久化配置
 * @returns 合并了持久化数据的状态
 */
export function createPersistedState<T extends Record<string, any>>(
  initialState: T,
  config: PersistConfig,
): T {
  const { key, storage = "local", serializer, migrate, version = 1 } = config;

  try {
    // 读取持久化数据
    let persistedData: any = null;

    switch (storage) {
      case "local":
        persistedData = Storage.getLocalStorage(key);
        break;
      case "session":
        persistedData = Storage.getSessionStorage(key);
        break;
      case "cookie":
        persistedData = Storage.getCookie(key);
        break;
    }

    // 如果没有持久化数据，返回初始状态
    if (!persistedData) {
      return initialState;
    }

    // 反序列化
    if (serializer?.deserialize) {
      persistedData = serializer.deserialize(persistedData);
    }

    // 数据迁移
    if (migrate && persistedData._version !== version) {
      persistedData = migrate(persistedData);
      persistedData._version = version;
    }

    // 合并状态
    return {
      ...initialState,
      ...persistedData,
    };
  } catch (error) {
    console.error(`[Store Persist] 读取 ${key} 失败:`, error);
    return initialState;
  }
}

/**
 * 创建持久化 Action
 * @param config 持久化配置
 * @returns 包含 save 和 clear 方法的对象
 */
export function createPersistedActions(config: PersistConfig) {
  const { key, storage = "local", serializer, version = 1 } = config;

  /**
   * 保存状态到持久化存储
   * @param state 当前状态
   * @param paths 需要保存的字段（不填则保存全部）
   */
  const save = (state: Record<string, any>, paths?: string[]) => {
    try {
      let dataToSave: any = state;

      // 如果指定了 paths，只保存这些字段
      if (paths && paths.length > 0) {
        dataToSave = {};
        paths.forEach((path) => {
          if (path in state) {
            dataToSave[path] = state[path];
          }
        });
      }

      // 添加版本号
      dataToSave = {
        ...dataToSave,
        _version: version,
        _savedAt: Date.now(),
      };

      // 序列化
      let finalData: any = dataToSave;
      if (serializer?.serialize) {
        finalData = serializer.serialize(dataToSave);
      }

      // 保存到存储
      switch (storage) {
        case "local":
          Storage.setLocalStorage(key, finalData);
          break;
        case "session":
          Storage.setSessionStorage(key, finalData);
          break;
        case "cookie":
          Storage.setCookie(
            key,
            typeof finalData === "string" ? finalData : JSON.stringify(finalData),
          );
          break;
      }
    } catch (error) {
      console.error(`[Store Persist] 保存 ${key} 失败:`, error);
    }
  };

  /**
   * 清除持久化数据
   */
  const clear = () => {
    try {
      switch (storage) {
        case "local":
          Storage.removeLocalStorage(key);
          break;
        case "session":
          Storage.removeSessionStorage(key);
          break;
        case "cookie":
          Storage.removeCookie(key);
          break;
      }
    } catch (error) {
      console.error(`[Store Persist] 清除 ${key} 失败:`, error);
    }
  };

  return { save, clear };
}

/**
 * 便捷方法：创建带自动保存的 Store
 *
 * @example
 * const useMyStore = defineStore('myStore', () => {
 *   const { state, save } = usePersistedState({
 *     count: 0,
 *     name: ''
 *   }, {
 *     key: 'myStore',
 *     storage: 'local'
 *   })
 *
 *   function increment() {
 *     state.value.count++
 *     save()
 *   }
 *
 *   return { state, increment }
 * })
 */
export function usePersistedState<T extends Record<string, any>>(
  initialState: T,
  config: PersistConfig,
) {
  const state = ref(createPersistedState(initialState, config));
  const { save, clear } = createPersistedActions(config);

  // 自动保存（保存指定字段）
  const autoSave = (paths?: string[]) => {
    save(state.value, paths || config.paths);
  };

  return {
    state,
    save: autoSave,
    clear,
  };
}
