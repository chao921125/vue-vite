import type { FormItemRule } from "element-plus";
import Reg from "./reg";
export default {
  userName: (rule: FormItemRule, value: any, callback: (error?: string) => void) => {
    console.log(rule);
    if (!value) {
      callback("字段不能为空");
    } else {
      if (Reg.userName.test(value)) {
        callback();
      } else {
        callback("格式错误");
      }
    }
  },

  password: (rule: FormItemRule, value: any, callback: (error?: string) => void) => {
    console.log(rule);
    if (!value) {
      callback("字段不能为空");
    } else {
      if (Reg.password.test(value)) {
        callback();
      } else {
        callback("格式错误");
      }
    }
  },

  rePassword: (
    rule: FormItemRule & { reForm?: any; reColumn?: string },
    value: any,
    callback: (error?: string) => void,
  ) => {
    console.log(rule);
    if (!value) {
      callback("字段不能为空");
    } else {
      if (rule.reForm && rule.reColumn && rule.reForm[rule.reColumn] === value) {
        callback();
      } else {
        callback("确认值不一致");
      }
    }
  },
};
