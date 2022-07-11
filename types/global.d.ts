declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
  NODE_ENV: string,
  ENV: string,
  VITE_APP_LOCAL: string,
  VITE_APP_TITLE: string,
  VITE_APP_MOCK: boolean,
  VITE_APP_DROP_CONSOLE: boolean,
  VITE_CONFIG_PUBLIC_PATH: string,
  VITE_CONFIG_PORT: number,
  VITE_CONFIG_PROXY: [],
  VITE_APP_API_URL: string,
  VITE_APP_UPLOAD_URL: string,
  VITE_APP_API_URL_PREFIX: string,
  VITE_APP_BUILD_COMPRESS: string,
  VITE_APP_IMAGEMIN: boolean,
  VITE_APP_PWA: boolean,
}
