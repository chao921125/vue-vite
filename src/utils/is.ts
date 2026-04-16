const toString = Object.prototype.toString;

/**
 * @description: 判断值是否未某个类型
 */
export const is = (val: any, type: string) => {
  return toString.call(val) === `[object ${type}]`;
};

/**
 * @description:  是否为函数
 */
export const isFunction = (val: any) => {
  return is(val, "Function");
};

/**
 * @description: 是否已定义
 */
export const isDef = (val: any) => {
  return typeof val !== "undefined";
};

export const isUnDef = (val: any) => {
  return !isDef(val);
};
/**
 * @description: 是否为对象
 */
export const isObject = (val: any) => {
  return val !== null && is(val, "Object");
};

/**
 * @description:  是否为时间
 */
export const isDate = (val: any) => {
  return is(val, "Date");
};

/**
 * @description:  是否为数值
 */
export const isNumber = (val: any) => {
  return is(val, "Number");
};

/**
 * @description:  是否为AsyncFunction
 */
export const isAsyncFunction = (val: any) => {
  return is(val, "AsyncFunction");
};

/**
 * @description:  是否为promise
 */
export const isPromise = (val: any) => {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

/**
 * @description:  是否为字符串
 */
export const isString = (val: any) => {
  return is(val, "String");
};

/**
 * @description:  是否为boolean类型
 */
export const isBoolean = (val: any) => {
  return is(val, "Boolean");
};

/**
 * @description:  是否为数组
 */
export const isArray = (val: any) => {
  return val && Array.isArray(val);
};

/**
 * @description: 是否客户端
 */
export const isClient = () => {
  return typeof window !== "undefined";
};

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any) => {
  return typeof window !== "undefined" && is(val, "Window");
};

export const isElement = (val: any) => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === "undefined";

// 是否为图片节点
export const isImageDom = (o: any) => {
  return o && ["IMAGE", "IMG"].includes(o.tagName);
};

export const isNull = (val: any) => {
  return val === null;
};

export const isNullAndUnDef = (val: any) => {
  return isUnDef(val) && isNull(val);
};

export const isNullOrUnDef = (val: any) => {
  return isUnDef(val) || isNull(val);
};
