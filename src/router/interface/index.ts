export interface MenuState {
	path: string;
	component: string;
	name: string;
	title: string;
	icon: string;
	isLink: boolean | number;
	isIframe: boolean | number;
	address: string;
	isAffix: boolean | number;
	isKeepAlive: boolean | number;
	isDisable: boolean | number;
	isHide: boolean | number;
	isHideSubMenu: boolean | number;
	roles: string[];
	children: MenuState[];
}
