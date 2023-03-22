import Reg from "./reg";
export default {
	// @ts-ignore
	userName: (rule: any, value: any, callback: any) => {
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
	// @ts-ignore
	password: (rule: any, value: any, callback: any) => {
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
	// @ts-ignore
	rePassword: (rule: any, value: any, callback: any) => {
		console.log(rule, value);
		if (!value) {
			callback("字段不能为空");
		} else {
			if (rule.reForm[rule.reColumn] === value) {
				callback();
			} else {
				callback("确认值不一致");
			}
		}
	},
};
