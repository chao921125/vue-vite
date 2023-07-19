// 部门
export interface IDepartment {
	id?: number;
	parent?: string | number;
	name?: string;
	number?: string;
	userName?: string;
	phone?: string;
	status?: string;
	desc?: string;
}
// 岗位
export interface IJob {
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
export interface IMenu {
	id?: number;
	path?: string;
	component?: string;
	name?: string;
	title?: string;
	isLink?: number;
	isIframe?: number;
	address?: string;
	isHide?: number;
	isHideSubMenu?: number;
	isDisable?: number;
	isKeepAlive?: number;
	isAffix?: number;
	roles?: Array<string>;
	icon?: string;
	children?: Array<IMenu>;
	parent?: any;
	sort?: number;
}
// 角色
export interface IRole {
	id?: number;
	name?: string;
	number?: string;
	desc?: string;
}
// 用户
export interface IUser {
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
export interface IProduct {
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
export interface IFormWifi {
	ssid?: string;
	password?: string;
	encryptionMode?: string;
	eapMethod?: string;
	eapIdentity?: string;
	hidePassword?: number;
	hiddenSSID?: number;
	direction?: number;
}
