/**
 * update router
 */
export interface IMenuState {
	path: string;
	component: string;
	name: string;
	title: string;
	icon?: string;
	auth: boolean | number;
	isLink?: boolean | number;
	isIframe?: boolean | number;
	address?: string;
	isHide?: boolean | number;
	isHideSubMenu?: boolean | number;
	isKeepAlive?: boolean | number;
	isAffix?: boolean | number;
	isDisable?: boolean | number;
	isMobile?: boolean | number;
	roles?: string[];
	permission?: string[];
	children?: IMenuState[];
}
