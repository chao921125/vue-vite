// Menu 菜单
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}

// VITE 配置
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	NODE_ENV: string;
	VITE_APP_LOCAL: string;
	VITE_APP_TITLE: string;
	VITE_APP_API_URL: string;
	VITE_APP_UPLOAD_URL: string;
	VITE_APP_API_URL_PREFIX: string;
	VITE_APP_PORT: number;
	VITE_APP_OPEN: boolean;
	VITE_APP_PROXY: [string, string][];
	VITE_CONFIG_MOCK: boolean;
	VITE_CONFIG_DROP_CONSOLE: boolean;
	VITE_CONFIG_REPORT: boolean;
	VITE_CONFIG_BUILD_GZIP: boolean;
	VITE_CONFIG_PUBLIC_PATH: string;
	VITE_CONFIG_BUILD_COMPRESS: string;
	VITE_CONFIG_IMAGEMIN: boolean;
	VITE_CONFIG_PWA: boolean;
}
