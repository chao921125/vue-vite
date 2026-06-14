// ==================== 全局类型定义 ====================
// 这些类型会自动导入，无需手动 import

// ========== 通用函数类型 ==========
declare interface ICommon {
  setTitle?: () => Promise<void>;
  tagsName?: (value: any) => string;
  setCssCdn?: () => boolean | void;
  setJsCdn?: () => boolean | void;
  open?: (url: string) => void;
  urlToObj?: (url: string) => Record<string, string>;
  isMobile?: (opts?: any) => boolean;
  isWeixin?: () => boolean;
  preload?: (mediaUrls: string[]) => Promise<void>;
  [key: string]: any;
}

// ========== VITE 配置类型 ==========
declare type Recordable<T = never> = Record<string, T>;

declare interface ViteEnv {
  VITE_NODE_ENV: string;
  VITE_LOCALE: string;
  VITE_TITLE: string;
  VITE_API_URL_PREFIX: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_PROXY: [string, string][];
  VITE_MOCK: boolean;
  VITE_MOCK_PATH: string;
  VITE_DROP_CONSOLE: boolean;
  VITE_REPORT: boolean;
  VITE_BUILD_GZIP: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_BUILD_IMAGE: boolean;
  VITE_PWA: boolean;
}

// ========== 请求响应类型 ==========
// * 请求响应参数(不包含data)
declare interface IResult {
  code: string;
  msg: string;
}

// * 请求响应参数(包含data)
declare interface IResultData<T = never> extends IResult {
  data?: T;
}

// * 分页响应参数
declare interface IResPage<T> {
  datalist: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// * 分页请求参数
declare interface IReqPage {
  pageNum: number;
  pageSize: number;
}

// ========== 基础数据类型 ==========
declare interface IBase {
  id?: number | string;
  name?: string;
  version?: string;
}

declare interface ITree extends IBase {
  label: string;
  children?: ITree[];
}

declare interface IDeviceInfo extends IBase {
  ip?: string;
  country?: string;
  province?: string;
  region?: string;
  os?: IBase;
  browser?: IBase;
}

// 部门
declare interface IDepartment extends IBase {
  parent?: string | number;
  name?: string;
  number?: string;
  userName?: string;
  phone?: string;
  status?: string;
  desc?: string;
}

// 岗位
declare interface IJob extends IBase {
  id?: number;
  parent?: string | number;
  name?: string;
  number?: string;
  userName?: string;
  phone?: string;
  status?: string;
  desc?: string;
}

// 菜单
declare interface IMenu extends IBase {
  path?: string;
  component?: string;
  title?: string;
  isLink?: number | boolean;
  isIframe?: number | boolean;
  address?: string;
  isHide?: number | boolean;
  isDisable?: number | boolean;
  isKeepAlive?: number | boolean;
  isAffix?: number | boolean;
  isMobile?: number | boolean;
  type?: number | string;
  roles?: Array<string>;
  icon?: string;
  children?: Array<IMenu>;
  parent?: never;
  sort?: number;
}

// 角色
declare interface IRole {
  id?: number;
  name?: string;
  number?: string;
  desc?: string;
}

// 用户
declare interface IUser {
  id?: number;
  nickName?: string;
  avatar?: string;
  mail?: string;
  phone?: string;
  realName?: string;
  userName?: string;
  password?: string;
  department?: string;
  departmentName?: string;
  job?: string;
  jobName?: string;
  role?: string;
  roleName?: string;
  flag?: string;
  sort?: number;
  status?: number;
  desc?: string;
}

// 产品
declare interface IProduct {
  id?: number | string;
  name?: number | string;
  number?: number | string;
  type?: number | string;
  criterion?: number | string;
  material?: number | string;
  specification?: number | string;
  weight?: number | string;
  weightUnit?: number | string;
  price?: number | string;
  priceUnit?: number | string;
  volumeLength?: number | string;
  volumeWight?: number | string;
  volumeHeight?: number | string;
  volumeUnit?: number | string;
  unit?: number | string;
  total?: number | string;
  desc?: number | string;
  isStock?: number | string;
}

// WIFI
declare interface IFormWifi {
  ssid?: string;
  password?: string;
  encryptionMode?: string;
  eapMethod?: string;
  eapIdentity?: string;
  hidePassword?: number;
  hiddenSSID?: number;
  direction?: number;
}

// url?lqip
declare module "*?lqip" {
  const lqip: {
    lqip: string;
    width: number;
    height: number;
    src: string;
  };
  export default lqip;
}

// mitt 事件类型定义
declare interface MittEvents {
  getI18nConfig: (locale: string) => void;
  getSizeConfig: (size: "default" | "large" | "small") => void;
  [key: string]: any;
}

// mitt 类型定义
declare module "mitt" {
  export interface Emitter<Events = MittEvents> {
    on<Key extends keyof Events>(type: Key, handler: Events[Key]): void;
    off<Key extends keyof Events>(type: Key, handler: Events[Key]): void;
    emit<Key extends keyof Events>(type: Key, evt?: Events[Key]): void;
  }
  export default function mitt<Events = MittEvents>(): Emitter<Events>;
}

// Vue 全局属性类型扩展
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $mitt: ReturnType<typeof import("mitt").default<MittEvents>>;
    $message: (typeof import("element-plus"))["ElMessage"];
    $messageBox: (typeof import("element-plus"))["ElMessageBox"];
    $notification: (typeof import("element-plus"))["ElNotification"];
  }
}

// 模块声明
declare module "@/router" {
  import { Router } from "vue-router";
  const router: Router;
  export default router;
}

declare module "@/utils/log" {
  interface LogMethods {
    success: (msg: string) => void;
    primary: (msg: string) => void;
    danger: (msg: string) => void;
    warning: (msg: string) => void;
    info: (msg: string) => void;
    error: (msg: string) => void;
  }
  const Log: LogMethods;
  export default Log;
}

declare module "@/utils/storage" {
  interface StorageMethods {
    getLocalStorage: <T = any>(key: string) => T | null;
    setLocalStorage: <T = any>(key: string, value: T) => void;
    removeLocalStorage: (key: string) => void;
    clearLocalStorage: () => void;
    getSessionStorage: <T = any>(key: string) => T | null;
    setSessionStorage: <T = any>(key: string, value: T) => void;
    removeSessionStorage: (key: string) => void;
    clearSessionStorage: () => void;
    getCookie: (key: string) => string | null;
    setCookie: (key: string, value: string, expires?: number) => void;
    removeCookie: (key: string) => void;
    clearCookie: () => void;
  }
  const Storage: StorageMethods;
  export default Storage;
}

declare module "@/utils/constant/constants" {
  interface ConstantsType {
    keys: {
      token: string;
      i18nLocale: string;
      themeConfig: string;
      routerPrev: string;
      routerNext: string;
      [key: string]: string;
    };
    ipUrl: {
      real: {
        songzixian: string;
        [key: string]: string;
      };
      proxy: {
        ipapiCo: string;
        [key: string]: string;
      };
    };
    [key: string]: any;
  }
  const Constants: ConstantsType;
  export default Constants;
}

declare module "@/config/httpConfig" {
  interface AxiosConfigType {
    baseUrl: string;
    timeout: number;
    [key: string]: any;
  }
  const AxiosConfig: AxiosConfigType;
  export default AxiosConfig;
}

declare module "@/plugins/loading/progress" {
  interface NProgressType {
    start: () => void;
    done: () => void;
    set: (n: number) => void;
    inc: (n?: number) => void;
    configure: (options: any) => void;
  }
  const NProgress: NProgressType;
  export default NProgress;
}

declare module "@/config/routerConfig" {
  interface RouterConfigType {
    isAdminIframe: boolean;
    isRequestRoutes: boolean;
    routeLogin: string;
    routeRoot: string;
    routeHome: string;
    routeNoData: string;
    route403: string;
    route404: string;
    route500: string;
    routeEquipment: string;
    routeMobile: string;
    routeMHome: string;
    whiteList: string[];
    executeList: string[];
    routeEnum: {
      product: Record<string, any>;
      order: {
        proInputList: string;
        proInputAddEdit: string;
      };
      file: {
        xlsx: string;
        excelJS: string;
      };
    };
  }
  const RouterConfig: RouterConfigType;
  export default RouterConfig;
}
