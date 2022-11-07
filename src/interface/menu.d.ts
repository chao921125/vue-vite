export interface Menu {
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
	children?: Array<Menu>;
	parent?: any;
	sort?: number;
}
