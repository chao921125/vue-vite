import Reg from "./reg";
export default {
	// @ts-ignore
	userName: (rule, value, callback) => {
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
	password: (rule, value, callback) => {
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
	rePassword: (rule, value, callback) => {
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
