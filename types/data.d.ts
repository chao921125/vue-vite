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
	parent?: any;
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
