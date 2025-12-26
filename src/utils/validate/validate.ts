import Reg from "./reg";

export const verifyNumber = (val) => {
  if (!val) return false;
  val = val.trim();
  return Reg.number.test(val);
};
/**
 * 验证百分比（不可以小数）
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export const verifyNumberPercentage = (val) => {
  if (!val) return "";
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 只能是数字和小数点，不能是其他输入
  v = v.replace(/[^\d]/g, "");
  // 不能以0开始
  v = v.replace(/^0/g, "");
  // 数字超过100，赋值成最大值100
  v = v.replace(/^[1-9]\d\d{1,3}$/, "100");
  // 返回结果
  return v;
};

/**
 * 验证百分比（可以小数）
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export const verifyNumberPercentageFloat = (val) => {
  if (!val) return "";
  let v = verifyNumberIntegerAndFloat(val);
  // 数字超过100，赋值成最大值100
  v = v.replace(/^[1-9]\d\d{1,3}$/, "100");
  // 超过100之后不给再输入值
  v = v.replace(/^100\.$/, "100");
  // 返回结果
  return v;
};

/**
 * 小数或整数(不可以负数)
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export const verifyNumberIntegerAndFloat = (val) => {
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 只能是数字和小数点，不能是其他输入
  v = v.replace(/[^\d.]/g, "");
  // 以0开始只能输入一个
  v = v.replace(/^0{2}$/g, "0");
  // 保证第一位只能是数字，不能是点
  v = v.replace(/^\./g, "");
  // 小数只能出现1位
  v = v.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 小数点后面保留2位
  v = v.replace(/^(\\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
  // 返回结果
  return v;
};

/**
 * 正整数验证
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export const verifyNumberInteger = (val) => {
  if (!val) return false;
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 去掉 '.' , 防止贴贴的时候出现问题 如 0.1.12.12
  v = v.replace(/[\\.]*/g, "");
  // 去掉以 0 开始后面的数, 防止贴贴的时候出现问题 如 00121323
  v = v.replace(/(^0[\d]*)$/g, "0");
  // 首位是0,只能出现一次
  v = v.replace(/^0\d$/g, "0");
  // 只匹配数字
  v = v.replace(/[^\d]/g, "");
  // 返回结果
  return v;
};

/**
 * 去掉中文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export const verifyCnAndSpace = (val) => {
  if (!val) return false;
  // 匹配中文与空格
  let v = val.replace(/[\u4e00-\u9fa5\s]+/g, "");
  // 匹配空格
  v = v.replace(/(^\s*)|(\s*$)/g, "");
  // 返回结果
  return v;
};

/**
 * 去掉英文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export const verifyEnAndSpace = (val) => {
  if (!val) return false;
  // 匹配英文与空格
  let v = val.replace(/[a-zA-Z]+/g, "");
  // 匹配空格
  v = v.replace(/(^\s*)|(\s*$)/g, "");
  // 返回结果
  return v;
};

/**
 * 禁止输入空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export const verifyAndSpace = (val) => {
  if (!val) return false;
  // 匹配空格
  return val.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 金额用 `,` 区分开
 * @param val 当前值字符串
 * @returns string
 */
export const verifyNumberComma = (val) => {
  if (!val) return "";
  // 调用小数或整数(不可以负数)方法
  let v = verifyNumberIntegerAndFloat(val);
  // 字符串转成数组
  v = v.toString().split(".");
  // \B 匹配非单词边界，两边都是单词字符或者两边都是非单词字符
  v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 数组转字符串
  v = v.join(".");
  // 返回结果
  return v;
};

/**
 * 匹配文字变色（搜索时）
 * @param val 当前值字符串
 * @param text 要处理的字符串值
 * @param color 搜索到时字体高亮颜色
 * @returns string
 */
export const verifyTextColor = (val, text = "", color = "red") => {
  if (!val) return "";
  // 返回内容，添加颜色
  // 返回结果
  return text.replace(new RegExp(val, "gi"), `<span style='color: ${color}'>${val}</span>`);
};

/**
 * 数字转中文大写
 * @param val 当前值字符串
 * @param unit 默认：仟佰拾亿仟佰拾万仟佰拾元角分
 * @param v
 * @returns 返回处理后的字符串
 */
export const verifyNumberCnUppercase = (val, unit = "仟佰拾亿仟佰拾万仟佰拾元角分", v = "") => {
  if (!val) return false;
  // 当前内容字符串添加 2个0，为什么??
  val += "00";
  // 返回某个指定的字符串值在字符串中首次出现的位置，没有出现，则该方法返回 -1
  const lookup = val.indexOf(".");
  // substring：不包含结束下标内容，substr：包含结束下标内容
  if (lookup >= 0) val = val.substring(0, lookup) + val.substr(lookup + 1, 2);
  // 根据内容 val 的长度，截取返回对应大写
  unit = unit.substr(unit.length - val.length);
  // 循环截取拼接大写
  for (let i = 0; i < val.length; i++) {
    v += "零壹贰叁肆伍陆柒捌玖".substr(val.substr(i, 1), 1) + unit.substr(i, 1);
  }
  // 正则处理
  v = v
    .replace(/零角零分$/, "整")
    .replace(/零[仟佰拾]/g, "零")
    .replace(/零{2,}/g, "零")
    .replace(/零([亿|万])/g, "$1")
    .replace(/零+元/, "元")
    .replace(/亿零{0,3}万/, "亿")
    .replace(/^元/, "零元");
  // 返回结果
  return v;
};

/**
 * 手机号码
 * @param val 当前值字符串
 * @returns 返回 true: 手机号码正确
 */
export const verifyPhone = (val) => {
  if (!val) return false;
  // false: 手机号码不正确
  return /^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|1,5-9]))\d{8}$/.test(val);
};

/**
 * 国内电话号码
 * @param val 当前值字符串
 * @returns 返回 true: 国内电话号码正确
 */
export const verifyTelPhone = (val) => {
  if (!val) return false;
  // false: 国内电话号码不正确
  return /\d{3}-\d{8}|\d{4}-\d{7}/.test(val);
};

/**
 * 登录账号 (字母开头，允许5-16字节，允许字母数字下划线)
 * @param val 当前值字符串
 * @returns 返回 true: 登录账号正确
 */
export const verifyAccount = (val) => {
  if (!val) return false;
  // false: 登录账号不正确
  return /^[A-Z][A-Z0-9_]{4,15}$/i.test(val);
};

/**
 * 密码 (以字母开头，长度在6~16之间，只能包含字母、数字和下划线)
 * @param val 当前值字符串
 * @returns 返回 true: 密码正确
 */
export const verifyPassword = (val) => {
  if (!val) return false;
  // false: 密码不正确
  return /^[A-Z]\w{5,15}$/i.test(val);
};

/**
 * 强密码 (字母+数字+特殊字符，长度在6-16之间)
 * @param val 当前值字符串
 * @returns 返回 true: 强密码正确
 */
export const verifyPasswordPowerful = (val) => {
  if (!val) return false;
  // false: 强密码不正确
  return /^(?![A-Z]+$)(?!\d+$)(?![!@#$%^&\\.*]+$)(?![A-Z\d]+$)(?![A-Z!@#$%^&\\.*]+$)(?![\d!@#$%^&\\.*]+$)[A-Z\d!@#$%^&\\.*]{6,16}$/i.test(
    val,
  );
};

/**
 * 密码强度
 * @param val 当前值字符串
 * @description 弱：纯数字，纯字母，纯特殊字符
 * @description 中：字母+数字，字母+特殊字符，数字+特殊字符
 * @description 强：字母+数字+特殊字符
 * @returns 返回处理后的字符串：弱、中、强
 */
export const verifyPasswordStrength = (val) => {
  if (!val) return false;
  let v = "";
  // 弱：纯数字，纯字母，纯特殊字符
  if (/^(?:\d+|[A-Z]+|[!@#$%^&\\.*]+){6,16}$/i.test(val)) v = "弱";
  // 中：字母+数字，字母+特殊字符，数字+特殊字符
  if (/^(?![A-Z]+$)(?!\d+$)(?![!@#$%^&\\.*]+$)[A-Z\d!@#$%^&\\.*]{6,16}$/i.test(val)) v = "中";
  // 强：字母+数字+特殊字符
  if (
    /^(?![A-Z]+$)(?!\d+$)(?![!@#$%^&\\.*]+$)(?![A-Z\d]+$)(?![A-Z!@#$%^&\\.*]+$)(?![\d!@#$%^&\\.*]+$)[A-Z\d!@#$%^&\\.*]{6,16}$/i.test(
      val,
    )
  )
    v = "强";
  // 返回结果
  return v;
};

/**
 * IP地址
 * @param val 当前值字符串
 * @returns 返回 true: IP地址正确
 */
export const verifyIPAddress = (val) => {
  if (!val) return false;
  // false: IP地址不正确
  return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
    val,
  );
};

/**
 * 邮箱
 * @param val 当前值字符串
 * @returns 返回 true: 邮箱正确
 */
export const verifyEmail = (val) => {
  if (!val) return false;
  // false: 邮箱不正确
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/i.test(val);
};

/**
 * 身份证
 * @param val 当前值字符串
 * @returns 返回 true: 身份证正确
 */
export const verifyIdCard = (val) => {
  if (!val) return false;
  // false: 身份证不正确
  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    val,
  );
};

/**
 * 姓名
 * @param val 当前值字符串
 * @returns 返回 true: 姓名正确
 */
export const verifyFullName = (val) => {
  if (!val) return false;
  // false: 姓名不正确
  return /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/.test(val);
};

/**
 * 邮政编码
 * @param val 当前值字符串
 * @returns 返回 true: 邮政编码正确
 */
export const verifyPostalCode = (val) => {
  if (!val) return false;
  // false: 邮政编码不正确
  return /^[1-9][0-9]{5}$/.test(val);
};

/**
 * url 处理
 * @param val 当前值字符串
 * @returns 返回 true: url 正确
 */
export const verifyUrl = (val) => {
  // false: url不正确
  if (!val) return false;
  // if (!/^((https|http|ftp|ws|wss)?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/i.test(val)) return false;
  return /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?$/i.test(
    val,
  );
};

/**
 * 车牌号
 * @param val 当前值字符串
 * @returns 返回 true：车牌号正确
 */
export const verifyCarNum = (val) => {
  if (!val) return false;
  // false: 车牌号不正确
  return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(
    val,
  );
};
