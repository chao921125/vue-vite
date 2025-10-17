// 适用函数等未知类型
declare interface ICommon {
	[key: string]: any;
}

// VITE 配置
declare type Recordable<T = never> = Record<string, T>;

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

// url?lqip
declare module "*?lqip" {
	const lqip: {
		lqip: string;
		width: number;
		height: number;
		src: string;
	};
	export default lqip;
}

// mitt 类型定义
declare module "mitt" {
	export interface Emitter<Events> {
		on<Key extends keyof Events>(type: Key, handler: Events[Key]): void;
		off<Key extends keyof Events>(type: Key, handler: Events[Key]): void;
		emit<Key extends keyof Events>(type: Key, evt?: Events[Key]): void;
	}
	export default function mitt<Events>(): Emitter<Events>;
}

// Vue 全局属性类型扩展
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$mitt: ReturnType<typeof import("mitt")>;
	}
}

// 模块声明
declare module "@/router" {
	import { Router } from "vue-router";
	const router: Router;
	export default router;
}

declare module "@/utils/log" {
	const Log: any;
	export default Log;
}

declare module "@/utils/storage" {
	const Storage: any;
	export default Storage;
}

declare module "@/utils/constant/constants" {
	const Constants: any;
	export default Constants;
}

declare module "@/config/httpConfig" {
	const AxiosConfig: any;
	export default AxiosConfig;
}

declare module "@/plugins/loading/progress" {
	const NProgress: any;
	export default NProgress;
}

declare module "@/config/routerConfig" {
	const RouterConfig: any;
	export default RouterConfig;
}
