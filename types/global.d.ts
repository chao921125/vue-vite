// VITE 配置
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_NODE_ENV: string;
	VITE_LOCALE: string;
	VITE_TITLE: string;
	VITE_API_URL_PREFIX: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_PROXY: [string, string][];
	VITE_MOCK: boolean;
	VITE_MOCK_PATH: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_REPORT: boolean;
	VITE_BUILD_GZIP: boolean;
	VITE_PUBLIC_PATH: string;
	VITE_BUILD_IMAGE: boolean;
	VITE_PWA: boolean;
}
