export declare enum EnumStatusUse {
	// eslint-disable-next-line no-unused-vars
	open = "1",
	// eslint-disable-next-line no-unused-vars
	closed = "0",
}

export const StatusUse = {
	0: "停用",
	1: "启用",
};

export default {
	storageKey: {
		token: "auth-token",
		themeConfig: "theme-config",
		i18nLocale: "i18n-locale",
		userInfo: "user-info",
		tags: "tags",
		routerPrev: "router-prev",
		routerNext: "router-next",
	},
	cookieKey: {
		token: "auth-token",
	},
	mittBusKey: {},
};
