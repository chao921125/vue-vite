// ==================== 通用工具 ====================

export {
  // 复制功能
  default as Copy,
} from "./copy";

export {
  // 类型判断
  is,
  isFunction,
  isDef,
  isUnDef,
  isObject,
  isDate,
  isNumber,
  isAsyncFunction,
  isPromise,
  isString,
  isBoolean,
  isArray,
  isClient,
  isWindow,
  isElement,
  isServer,
  isImageDom,
  isNull,
  isNullAndUnDef,
  isNullOrUnDef,
} from "./is";

export {
  // 日志工具
  default as Log,
} from "./log";

export {
  // 地图工具
  default as Map,
} from "./map";

export {
  // 其他工具
  getImg,
  getImgCat,
  getImgDog,
} from "./other";

export {
  // 主题工具
  hexToRgb,
  rgbToHex,
  getDarkColor,
  getLightColor,
} from "./theme";
