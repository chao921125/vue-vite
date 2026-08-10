# Vue-Vite Code Wiki

> 本文档为 `vue-vite` 仓库的结构化代码知识库，涵盖项目整体架构、主要模块职责、关键类与函数说明、依赖关系以及项目运行方式等关键信息。
>
> - 仓库地址: <https://github.com/chao921125/vue-vite>
> - 当前版本: v4.0.2
> - License: BSD-3-Clause

---

## 目录

1. [项目概览](#1-项目概览)
2. [技术栈与依赖](#2-技术栈与依赖)
3. [项目整体架构](#3-项目整体架构)
4. [目录结构](#4-目录结构)
5. [核心模块职责](#5-核心模块职责)
   - 5.1 [入口与根组件](#51-入口与根组件)
   - 5.2 [路由系统 (router)](#52-路由系统-router)
   - 5.3 [状态管理 (store)](#53-状态管理-store)
   - 5.4 [HTTP 请求层 (plugins/http)](#54-http-请求层-pluginshttp)
   - 5.5 [API 服务层 (api)](#55-api-服务层-api)
   - 5.6 [国际化 (plugins/i18n)](#56-国际化-pluginsi18n)
   - 5.7 [自定义指令 (plugins/directive)](#57-自定义指令-pluginsdirective)
   - 5.8 [工具库 (utils)](#58-工具库-utils)
   - 5.9 [配置中心 (config)](#59-配置中心-config)
   - 5.10 [业务组件 (components)](#510-业务组件-components)
   - 5.11 [页面 (pages)](#511-页面-pages)
   - 5.12 [类型定义 (types)](#512-类型定义-types)
6. [关键流程剖析](#6-关键流程剖析)
7. [构建与部署](#7-构建与部署)
8. [工程化规范](#8-工程化规范)
9. [项目运行方式](#9-项目运行方式)

---

## 1. 项目概览

`vue-vite` 是一个基于 **Vue 3 + Vite + TypeScript + Element Plus + Pinia** 的中后台管理模板，定位为通用业务管理系统脚手架。当前仓库内置了一个 **进销存 (Inventory) 管理系统** 示例，覆盖商品、仓库、客户、供应商、采购、销售、库存、资金、报表与系统管理等业务模块。

核心特性:

- Vue 3 Composition API + `<script setup>` 语法
- Vite 8 + vite-plus 构建链，支持 PWA、Gzip/Brotli 压缩、自动导入
- 动态路由 + 动态菜单（本地或后端接口驱动）
- Pinia 状态管理 + 自研持久化抽象层（localStorage/sessionStorage/cookie）
- Axios 封装：请求取消、统一错误处理、Token 加密存储、CSRF
- vue-i18n 国际化（中/英），与 Element Plus 语言包联动
- 自定义指令：权限、复制、动画、无缝滚动、外部点击
- 自适应方案：`flexible.js` + `postcss-px-convert`（rem，PC + 移动端）
- 完整工程化：oxlint + stylelint + commitlint + husky + lint-staged
- Mock 数据内置（进销存模块），零后端可运行

---

## 2. 技术栈与依赖

### 2.1 运行时核心依赖

| 分类 | 依赖 | 说明 |
|------|------|------|
| 框架 | `vue@^3.5.39` | Vue 3 核心 |
| 路由 | `vue-router@^5.2.0` | 动态路由 |
| 状态 | `pinia@^3.0.4` | 状态管理 |
| HTTP | `axios@^1.18.1` / `axios-mock-adapter` | 请求与 Mock |
| UI (PC) | `element-plus@^2.14.3` / `@element-plus/icons-vue` | PC 端组件库 |
| UI (Mobile) | `vant@^4.10.0` | 移动端组件库 |
| 国际化 | `vue-i18n@^11.4.6` | 多语言 |
| 图表 | `echarts@^6.1.0` / `echarts-gl` / `echarts-wordcloud` | 数据可视化 |
| 工具 | `@vueuse/core@^14.3.0`, `date-fns`, `qs`, `js-cookie`, `mitt`, `nprogress`, `ua-parser-js` | 函数式工具集 |
| 加密 | `js-use-core` + 自研 XOR/Base64 | Token 安全存储 |
| 滚动 | `scroll-seamless` | 无缝滚动 |
| 图片 | `heic2any` | HEIC 格式转换 |

### 2.2 开发期依赖（关键）

| 用途 | 依赖 |
|------|------|
| 构建 | `vite@^8.1.4`, `vite-plus@^0.1.24`, `@vitejs/plugin-vue@^6.0.8` |
| 自动导入 | `unplugin-auto-import`, `unplugin-vue-components`, `unplugin-vue-define-options`, `unplugin-icons` |
| PWA | `vite-plugin-pwa` |
| 压缩 | `vite-plugin-compression2` |
| EJS 模板 | `vite-plugin-ejs` |
| 热重载 | `vite-plugin-full-reload` |
| LQIP | `vite-plugin-lqip` |
| 打包分析 | `rollup-plugin-visualizer` |
| Lint | `oxlint`, `oxfmt`, `oxlint-tsgolint`, `stylelint` 系列 |
| Git | `husky`, `commitlint`, `lint-staged` |
| TypeScript | `typescript@5.8.3` |

### 2.3 Node 引擎要求

```
node: 22.x
npm : >=10.8.2
yarn: >=3.8.7
pnpm: >=9.0.0
```

---

## 3. 项目整体架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                         index.html (入口)                           │
│   - flexible.js (rem 自适应)  - inject.js  - 初始 loading 动画       │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
              ┌────────────────┴────────────────┐
              │           src/main.ts            │  ← 应用启动入口
              │  createApp → 装配 Router/Store/  │
              │  I18n/指令/ElementPlus/Vant/    │
              │  全局错误处理 → Router.isReady   │
              └────────────────┬────────────────┘
                               │
                       ┌───────┴───────┐
                       │   src/App.vue  │  ← 根组件
                       │  el-config-    │   主题/语言/缓存
                       │  provider +    │   KeepAlive
                       │  RouterView    │
                       └───────┬───────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
   ┌────┴────┐           ┌────┴────┐           ┌────┴────┐
   │ router  │           │ store   │           │ plugins │
   │ 动态路由 │           │ Pinia  │           │ http/i18n│
   │ 守卫    │           │ 持久化  │           │ directive│
   └────┬────┘           └────┬────┘           └────┬────┘
        │                     │                     │
        └──────────┬──────────┴──────────┬──────────┘
                   │                     │
              ┌────┴────┐          ┌────┴────┐
              │  pages  │          │   api   │
              │ 业务页面 │          │ 接口服务 │
              └────┬────┘          └────┬────┘
                   │                     │
              ┌────┴────┐          ┌────┴────┐
              │components│         │  utils  │
              │ 业务组件 │          │ 工具集   │
              └─────────┘          └─────────┘
```

**分层职责**:

- **入口层**: `index.html` → `main.ts` → `App.vue`，负责装配、全局配置与启动
- **核心层**: `router` / `store` / `plugins`，提供路由、状态、HTTP、i18n、指令等基础设施
- **业务层**: `pages` (路由组件) + `components` (可复用业务组件)
- **服务层**: `api` (接口封装) + `utils` (工具函数) + `config` (配置中心)
- **类型层**: `types/` 统一管理全局与局部类型定义

---

## 4. 目录结构

```
vue-vite/
├── build/                  # 构建辅助脚本
│   ├── index.ts            # getEnvConfig / createProxy
│   ├── plugins.ts          # 自定义 vite 插件 (imgToBase)
│   └── moveHtml.ts
├── deploy/                 # 部署配置
│   ├── nginx.conf          # Nginx 部署 (History 模式)
│   ├── nginx-local.conf
│   └── server-express.js   # Express 静态服务器
├── docs/                   # 项目文档 (各模块专题)
├── public/                 # 静态资源 (不参与构建)
│   ├── flexible.js         # rem 自适应脚本
│   ├── inject.js
│   ├── manifest.json
│   └── pwa-640.png
├── src/
│   ├── api/                # API 接口服务
│   │   ├── index.ts        # 统一导出
│   │   └── modules/
│   │       ├── common.ts   # 通用接口 (文件/IP)
│   │       ├── user.ts     # 认证 (登录/注册)
│   │       ├── system.ts   # 系统接口 (菜单)
│   │       └── inventory/  # 进销存业务接口 + Mock
│   ├── assets/             # 静态资源 (参与构建)
│   │   ├── fonts/          # NotoSans 字体
│   │   ├── icon/           # iconfont
│   │   ├── images/
│   │   ├── svgs/
│   │   └── styles/         # SCSS 三层样式体系
│   ├── components/         # 可复用业务组件
│   │   ├── charts/         # ECharts 图表
│   │   ├── icon/           # Svg 图标
│   │   ├── img/            # 图片
│   │   ├── inv/            # 进销存业务组件 (ProTable/StatCard 等)
│   │   ├── media/          # 视频
│   │   ├── page/           # 页面容器
│   │   ├── re/             # 通用复用 (分页/上传/返回/日期)
│   │   └── seamless/       # 无缝滚动
│   ├── config/             # 配置中心
│   │   ├── colorConfig.ts
│   │   ├── httpConfig.ts   # Axios 配置
│   │   ├── iconfontData.ts
│   │   ├── routerConfig.ts # 路由常量
│   │   ├── routerData.ts   # 本地静态路由数据
│   │   └── themeConfig.ts  # 主题默认值
│   ├── pages/              # 路由页面
│   │   ├── auth/           # 登录/注册
│   │   ├── common/         # 401/404/500/Iframe/Link
│   │   ├── demo/           # 演示页
│   │   ├── inv/            # 进销存业务页面
│   │   │   ├── basic/      # 基础资料
│   │   │   ├── finance/    # 资金管理
│   │   │   ├── inventory/  # 库存管理
│   │   │   ├── purchase/   # 采购管理
│   │   │   ├── reports/    # 报表
│   │   │   ├── sales/      # 销售管理
│   │   │   ├── system/     # 系统管理
│   │   │   └── Dashboard.vue
│   │   ├── layout/         # 布局 (Header/Menu/Footer/Tag)
│   │   ├── system/
│   │   ├── Home.vue
│   │   └── Template.vue
│   ├── plugins/            # 插件层
│   │   ├── directive/      # 自定义指令
│   │   ├── echarts/        # Echarts 初始化
│   │   ├── global/         # 全局组件 + storePersist
│   │   ├── hooks/          # useClipboard/useCountTime/useWebSocket
│   │   ├── http/           # Axios 封装
│   │   ├── i18n/           # 国际化
│   │   └── loading/        # NProgress
│   ├── router/             # 路由
│   │   ├── index.ts        # 路由实例 + 守卫 + 动态路由
│   │   └── route.ts        # 基础路由 + 错误路由
│   ├── store/              # Pinia 状态
│   │   ├── index.ts        # 装配 + appStore
│   │   └── modules/
│   │       ├── routerMeta.ts
│   │       ├── routerTags.ts
│   │       ├── theme.ts
│   │       ├── user.ts
│   │       └── demo.ts
│   ├── utils/              # 工具库
│   │   ├── browser/        # storage/crypto/ip/ua/scroll
│   │   ├── common/         # copy/is/log/map/theme/other
│   │   ├── constant/       # constants/enums/assets
│   │   ├── format/         # 日期/数字/HTML/对象
│   │   ├── media/          # 图片/视频
│   │   ├── validate/       # 正则/表单校验
│   │   └── index.ts        # 统一导出
│   ├── App.vue
│   └── main.ts
├── types/                  # 全局类型定义
│   ├── index.d.ts          # 统一导出
│   ├── global.d.ts         # 全局声明 (ICommon/ViteEnv/mitt 等)
│   ├── router.d.ts
│   ├── store.d.ts
│   ├── api.d.ts
│   ├── data.d.ts / data-base.d.ts
│   ├── inventory.d.ts      # 进销存实体类型
│   ├── plugins.d.ts
│   └── window.d.ts / vite-env.d.ts
├── .env / .env.development / .env.preview / .env.production
├── vite.config.js
├── tsconfig.json
├── package.json
└── pnpm-workspace.yaml
```

---

## 5. 核心模块职责

### 5.1 入口与根组件

#### `src/main.ts` — 应用启动入口

职责: 创建 Vue 应用并装配所有核心插件。

关键流程:

1. `createApp(App)` 创建实例
2. 注册 `Router`、`Store` (Pinia)、`I18n`
3. 挂载 `mitt` 事件总线到 `app.config.globalProperties.$mitt`
4. 注册 Element Plus 消息组件 (`$message` / `$messageBox` / `$notification`)
5. 全量注册 `@element-plus/icons-vue` 图标组件
6. 注册全局自定义指令 (`@/plugins/directive`)
7. 引入 Vant 样式、字体、iconfont、animate.css、自定义 SCSS
8. 配置全局错误/警告处理器（带次数上限防止死循环）
9. `Router.isReady().then(() => app.mount('#app'))`，等待动态路由就绪后再挂载

关键代码片段 (参见 [main.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/main.ts)):

```ts
app.config.errorHandler = (err, instance, info) => {
  if (import.meta.env.VITE_NODE_ENV === "development" && !isShowError) {
    if (++isErrorNum > isErrorNumMax) isShowError = true;
    Log.danger(">>>>>> 错误信息 >>>>>>");
    Log.primary(String(err || ""));
  }
};
Router.isReady().then(() => app.mount("#app"));
```

#### `src/App.vue` — 根组件

职责:

- 使用 `el-config-provider` 提供全局语言、组件尺寸、按钮配置
- 通过 `KeepAlive :include="cachedRoutes"` 实现路由级缓存（根据 `meta.isKeepAlive`）
- `onBeforeMount` 注入 CSS/JS CDN，初始化主题与语言到 Storage
- `onMounted` 异步检测字体（`FontManager`，`requestIdleCallback` 非阻塞）
- 监听 `route.path` 变化自动更新 `document.title`
- 通过 mitt 总线响应语言/尺寸切换

#### `index.html` — HTML 入口

- CSP 安全头、移动端 meta、PWA 相关 meta
- 引入 `flexible.js`（rem 自适应，必须在 CSS 之前）
- 内置 CSS loading 动画（金色/青绿色双环旋转）
- 引入 `src/main.ts` (ESM) 与 `inject.js`

---

### 5.2 路由系统 (router)

文件: [src/router/index.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/router/index.ts) · [src/router/route.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/router/route.ts)

#### 路由实例

```ts
export const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes,
  scrollBehavior: () => ({ el: "body", left: 0, top: 0 }),
});
```

#### 路由分类 (`route.ts`)

- **`baseRoutes`**: 根路由 `/` (Layout 组件，children 动态填充) + `/login` + `/register`
- **`errorRoutes`**: `/401` `/404` `/500` 及通配符重定向

#### 动态路由加载流程

`router.beforeEach` 守卫核心逻辑:

1. 启动 NProgress，记录上一页/下一页到 Storage
2. `AxiosCancel.removeAllCancel()` 取消所有进行中请求
3. 读取 Token（优先 `secureStorage` 加密存储，降级 Cookie）
4. **白名单放行**: `RouterConfig.whiteList` 中的路径直接通过；若已登录访问登录页则重定向首页
5. **无 Token**: 重定向到 `/login`，携带 `redirect` 与 `params`
6. **有 Token 但路由未加载**: 调用 `loadRoutesIfNeeded()`
   - 若 `RouterConfig.isRequestRoutes === true`，从 `Api.systemApi.getMenuList()` 获取菜单
   - 否则使用本地 `RouteData` (`src/config/routerData.ts`)
   - `addDynamicRoutes()` → `buildRoutes()` → `processRouteData()` 递归构建 → `mapRoutesToComponent()` 通过 `import.meta.glob('../pages/**/*.{vue,tsx}')` 懒加载组件
7. 标记 `isRoutesLoaded = true`，`nextTick` 后预加载常用页面
8. 重试当前导航 `{ ...to, replace: true }`

#### 关键函数

| 函数 | 位置 | 职责 |
|------|------|------|
| `loadRoutesIfNeeded()` | router/index.ts | 懒加载动态路由（带缓存标记） |
| `addDynamicRoutes(data)` | router/index.ts | 添加路由并同步到 Store |
| `buildRoutes(data)` | router/index.ts | 将菜单数据转为 RouteRecordRaw |
| `processRouteData(list, data, parentPath)` | router/index.ts | 递归处理菜单，生成路径与 meta |
| `mapRoutesToComponent(routes)` | router/index.ts | 路径 → 组件懒加载函数 |
| `loadComponent(path)` | router/index.ts | 通过 `import.meta.glob` 匹配组件 |
| `setTags(data)` | router/index.ts | 同步 TagsView 数据 |

#### 路由 Meta 字段

定义于 [types/router.d.ts](file:///Users/huangchao/Work/GitHub/vue-vite/types/router.d.ts):

```ts
interface RouteMeta {
  title?; icon?; auth?; sort?; isLink?; isIframe?; address?;
  isHide?; isKeepAlive?; isAffix?; isDisable?; isMobile?;
  roles?: string[]; permission?: string[];
}
```

---

### 5.3 状态管理 (store)

文件: [src/store/index.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/store/index.ts)

#### 装配方式

```ts
const store = createPinia();
export const getStoreRefs = <T>(store: T) => storeToRefs(store);
export const appStore = {
  useRouterList: useRouterList(store),
  useRouterTags: useRouterTags(store),
  useThemeConfig: useThemeConfig(store),
  useUserInfo: useUserInfo(store),
};
```

使用方式: `const { themeConfig } = getStoreRefs(appStore.useThemeConfig);`

#### Store 模块

| Store | 文件 | 关键状态 | 关键方法 |
|-------|------|----------|----------|
| `useRouterList` | [routerMeta.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/store/modules/routerMeta.ts) | `routerList`, `menuList`, `isColumnsMenuHover`, `isColumnsNavHover` | `setRouterList`, `setMenuList` |
| `useRouterTags` | [routerTags.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/store/modules/routerTags.ts) | `tagsViewRoutes`, `isTagsViewCurrenFull` | `setTagsViewRoutes`, `setCurrenFullscreen` (session 持久化) |
| `useThemeConfig` | [theme.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/store/modules/theme.ts) | `themeConfig` (语言/主题/布局/水印等 20+ 字段) | `setThemeConfig` |
| `useUserInfo` | [user.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/store/modules/user.ts) | `userInfo` (id/userName/avatar/roles/permission) | `setUserInfo`, `clearUserInfo` (local 持久化) |

#### 持久化抽象层

文件: [src/plugins/global/storePersist.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/global/storePersist.ts)

提供三个工厂函数，统一封装 localStorage/sessionStorage/cookie 的读写与序列化:

- `createPersistedState(initialState, config)`: 读取持久化数据并合并初始状态
- `createPersistedActions(config)`: 返回 `{ save, clear }`
- `usePersistedState(initialState, config)`: 上述两者的组合便捷方法

`PersistConfig` 支持: `key` / `storage` / `paths` / `serializer` / `migrate` / `version`，支持版本迁移。

---

### 5.4 HTTP 请求层 (plugins/http)

文件: [src/plugins/http/index.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/http/index.ts)

#### Axios 实例配置

```ts
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL_PREFIX || "",
  timeout: AxiosConfig.timeout,    // 6000ms
  withCredentials: true,
  headers: { Accept, "Content-Type": "application/json;charset=utf-8", "X-Requested-With": "XMLHttpRequest" },
});
```

#### 请求拦截器

- 启动 NProgress
- 注入 `apifoxToken`（开发示例，可移除）
- Token 注入: 优先 `secureStorage.getToken()`（XOR+Base64 加密），降级 `Storage.getCookie`；写入 `token` 与 `Authorization` 头
- CSRF: POST/PUT/DELETE 请求注入 `X-CSRF-Token`
- GET 请求: 自动将 `data` 合并到 `params`，清除 `body`
- `AxiosCancel.addCancel(config)`: 注册到取消 Map
- 错误重试: 基于 `config.retry` 的指数退避

#### 响应拦截器

- NProgress 完成，移除取消标记
- 特殊 URL（IP 查询）直接返回
- Blob/ArrayBuffer 直接返回
- 4xx: 清除登录信息 → `ErrorHandler.http(status, ..., { autoRedirect: true })`
- 3xx: `Router.replace(routeRoot)`
- 5xx: `ErrorHandler.http(status, ..., { autoRedirect: true })`
- 业务码: `isBizError(code)` 判断（0/200 为成功），失败调用 `ErrorHandler.biz`

#### 辅助模块

| 模块 | 文件 | 职责 |
|------|------|------|
| `AxiosCancel` | [cancel.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/http/cancel.ts) | 基于 `AbortController` 的请求取消管理（addCancel/removeCancel/removeAllCancel） |
| `ErrorHandler` | [errorHandler.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/http/errorHandler.ts) | HTTP 状态码与业务码映射、错误对象创建、统一提示与跳转 |
| `Fetch` | [fetch.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/http/fetch.ts) | 原生 `fetch` 封装（备用方案） |

#### `ErrorHandler` 关键 API

- `HTTP_STATUS_MAP`: 100~505 状态码中文映射
- `BIZ_CODE_MAP`: 0/200/4xx/5xx/1000~1010 业务码映射
- `isHttpError(status)` / `isBizError(code)`
- `createHttpError(status, message?)` / `createBizError(code, message?)`
- `showError(error, config?)`: 日志 + ElMessage + 自动跳转 + 自定义处理
- 静态类 `ErrorHandler.http` / `.biz` / `.show` / `.create`

---

### 5.5 API 服务层 (api)

文件: [src/api/index.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/api/index.ts)

```ts
const api = {
  commonApi: common,    // 文件上传/预览、IP 查询、本地图片
  userApi: user,        // login / register
  systemApi: system,    // getMenuList
  inventoryApi: inventory, // 进销存全部业务接口
};
```

#### 模块说明

| 模块 | 文件 | 接口 |
|------|------|------|
| `commonApi` | [common.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/api/modules/common.ts) | `getImgLocale`, `previewFile`, `previewFileById`, `uploadFile`, `queryAddressByIp`, `queryIp` |
| `userApi` | [user.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/api/modules/user.ts) | `login`, `register` |
| `systemApi` | [system.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/api/modules/system.ts) | `getMenuList` |
| `inventoryApi` | [inventory/index.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/api/modules/inventory/index.ts) | 进销存全模块（见下） |

#### 进销存 API 子模块（内置 Mock）

| API 对象 | 覆盖业务 |
|----------|----------|
| `productApi` | 商品 CRUD + 状态切换 + 分类树 |
| `warehouseApi` | 仓库 CRUD + 全量列表 |
| `customerApi` | 客户 CRUD（含信用额度） |
| `supplierApi` | 供应商 CRUD |
| `unitApi` / `brandApi` | 计量单位 / 品牌 |
| `purchaseOrderApi` | 采购订单 CRUD + 审批/驳回/关闭 |
| `purchaseReceiptApi` | 采购入库单查询 + 审批 |
| `salesOrderApi` | 销售订单 CRUD + 审批 |
| `salesDeliveryApi` | 销售发货单查询 + 审批 |
| `inventoryApi` | 库存查询 + 流水 + 预警 |
| `stockTakeApi` | 盘点单查询 + 审批 |
| `stockTransferApi` | 调拨单查询 + 审批 |
| `accountApi` | 账户列表 |
| `receivableApi` / `payableApi` | 应收 / 应付 |
| `receiptApi` / `paymentApi` | 收款 / 付款 |
| `reportApi` | 仪表盘 + 销售趋势 + 库存汇总 + 销售排行 |
| `userApi` / `roleApi` / `logApi` | 系统用户 / 角色 / 日志 |

所有进销存 API 使用 `delay()` + `paginate()` + `success()` 模拟网络请求与分页，数据来自 [mockData.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/api/modules/inventory/mockData.ts)。

#### 接口命名规范（来自 README）

| 操作 | 前端 | 后端 |
|------|------|------|
| 读取 | search / get | read / select |
| 写入 | save / add | create |
| 编辑 | edit / update | update |
| 删除 | remove / delete | delete |
| 上传 / 下载 | upload / download | upload / export |

---

### 5.6 国际化 (plugins/i18n)

文件: [src/plugins/i18n/index.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/i18n/index.ts)

```ts
export const i18n = createI18n({
  silentTranslationWarn: true,
  legacy: false,                // Composition API 模式
  globalInjection: true,
  locale: themeConfig.value.globalI18n || import.meta.env.VITE_LOCAL,
  fallbackLocale: zhCN.name,
  messages: { "zh-cn": {...}, en: {...} },  // 合并自定义 + Element Plus 语言包
});
```

- `elI18n`: Element Plus 中英文语言包映射
- `readLocale(prefix)`: 通过 `import.meta.glob` 动态读取语言模块
- `$t(args)`: 在 JS 中使用的翻译函数
- `useI18nMessage(args)`: 在 setup 中使用的翻译函数
- 语言文件: [zh-cn.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/i18n/modules/zh-cn.ts) / [en-us.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/i18n/modules/en-us.ts)

---

### 5.7 自定义指令 (plugins/directive)

文件: [src/plugins/directive/index.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/directive/index.ts)

```ts
export * from "./modules/copy";
export * from "./modules/auth";
export * from "./modules/role";
export * from "./modules/animate";
export * from "./modules/seamless";
```

| 指令 | 文件 | 用途 |
|------|------|------|
| `v-copy` | [copy.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/directive/modules/copy.ts) | 点击复制文本（`navigator.clipboard`），支持绑定值或元素内容 |
| `v-auth` | [auth.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/plugins/directive/modules/auth.ts) | 按钮级权限控制，基于 `userInfo.permission` 数组判断，隐藏未授权元素 |
| `v-role` | role.ts | 角色级权限控制 |
| `v-animate` / `v-animates` | animate.ts / animates.ts | 动画指令 |
| `v-seamless` | seamless.ts | 无缝滚动指令 |

---

### 5.8 工具库 (utils)

文件: [src/utils/index.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/utils/index.ts)

#### 主工具对象 `Utils` (默认导出)

| 方法 | 说明 |
|------|------|
| `setTitle()` | 根据 `themeConfig.globalTitle` 与当前路由 meta 设置 `document.title` |
| `tagsName(value)` | 获取 tagsView 显示名（支持 i18n） |
| `setCssCdn()` / `setJsCdn()` | 动态批量注入 CSS/JS CDN |
| `open(url)` | 新窗口打开链接 |
| `urlToObj(url)` | URL 查询字符串转对象 |
| `isMobile(opts?)` | 移动端检测（UA + 触摸检测） |
| `isWeixin()` | 微信内置浏览器检测 |
| `preload(urls)` | 预加载图片/音频/视频 |

#### 子模块导出

| 模块 | 导出内容 |
|------|----------|
| `format/` | `FORMAT_ENUM`, `formatDate`, `formatPast`, `formatAxis`, `replaceChar`, `parseNumber`, `formatThousandPoint`, `formatThousand`, `setObjDeep`, `resolve`, `txtToHtml` |
| `media/` | 图片/视频处理 |
| `browser/` | `Storage`, `Ua`, IP 系列 (`getLocalIpList`/`getIp`/`getIpInfoByIp`/`getIpInfoReal`/`getIpInfoProxy` 等), `Scroll` |
| `common/` | `Copy`, `is*` 系列 (`isFunction`/`isObject`/`isNumber`/`isArray`...), `Log`, `Map`, `getImg`/`getImgCat`/`getImgDog`, 主题工具 (`hexToRgb`/`rgbToHex`/`getDarkColor`/`getLightColor`) |
| `validate/` | `ValidateForm` (userName/password/rePassword/email 校验), `Reg` 正则 |
| `constant/` | `Constants` (存储 keys + IP API 列表), `enums`, `assets` |

#### 关键工具: `Storage`

文件: [src/utils/browser/storage.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/utils/browser/storage.ts)

封装 localStorage / sessionStorage / cookie 的完整 CRUD，支持:

- `setStorage` / `getStorage` / `removeStorage` / `clearStorage` (双写)
- `setLocalStorage` / `getLocalStorage` / `removeLocalStorage` / `clearLocalStorage`
- `setSessionStorage` / `getSessionStorage` / ...
- `setCookie` / `getCookie` / `getCookieAll` / `removeCookie` / `clearCookie`（支持 `expires`/`path`/`domain`/`secure`/`sameSite`）
- `getLocalMaxSpace` / `getLocalUsedSpace` / `getSessionMaxSpace` / `getSessionUsedSpace` 容量探测

#### 关键工具: `secureStorage`

文件: [src/utils/browser/crypto.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/utils/browser/crypto.ts)

基于 XOR + Base64 的轻量加密，用于 Token 安全存储:

- `encrypt(text)` / `decrypt(encryptedText)`
- `secureStorage.setToken(token)` / `getToken()` / `removeToken()` / `hasToken()`
- 密钥来自 `import.meta.env.VITE_ENCRYPTION_KEY`，默认 `vue-vite-default-key-2026`
- 注释明确说明这是过渡方案，最终应使用 HttpOnly Cookie

#### 关键工具: `Log`

文件: `src/utils/common/log.ts`，提供 `success/primary/danger/warning/info/error` 彩色日志方法。

---

### 5.9 配置中心 (config)

| 文件 | 配置内容 |
|------|----------|
| [httpConfig.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/config/httpConfig.ts) | `timeout: 6000`, `baseUrl: /api-admin`, `uploadUrl: /upload`, `ipUrl: /ip`, HTTP 状态码枚举 |
| [routerConfig.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/config/routerConfig.ts) | `isAdminIframe`, `isRequestRoutes: false`, 路由常量 (`routeLogin`/`routeHome`/`route404` 等), `whiteList`, `executeList`, `routeEnum` |
| [routerData.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/config/routerData.ts) | 本地静态菜单数据（进销存完整菜单树） |
| [themeConfig.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/config/themeConfig.ts) | 屏幕断点 (`screenMobile: 991`), `i18nDef`, `i18nKey` 正则, `i18nKeys`/`sizeKeys` 选项 |
| [colorConfig.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/config/colorConfig.ts) | 菜单/头部背景色与文字色 |
| [iconfontData.ts](file:///Users/huangchao/Work/GitHub/vue-vite/src/config/iconfontData.ts) | iconfont 图标数据 |

#### `routerData.ts` 菜单字段规范

```
path          必填 请求路径
component     必填 组件路径 (相对 pages/)
auth          必填 是否需要登录
isKeepAlive   是否缓存
icon          菜单图标
title         菜单标题 (支持 i18n)
type          1菜单 2目录
sort          排序
isHide/isDisable/isLink/isIframe/address
isAffix       是否固定在 tagsView
isMobile      是否移动端
roles         角色数组
permission    操作权限 [C,R,U,D]
children      子菜单
```

---

### 5.10 业务组件 (components)

| 目录 | 组件 | 说明 |
|------|------|------|
| `charts/` | `BarBasic`, `LineBasic`, `LineStacked`, `PieBasic` | ECharts 图表封装 |
| `icon/` | `Svg` | SVG 图标组件 |
| `img/` | `Index` | 图片组件 |
| `inv/` | `ProTable` | 高级表格（查询表单 + 工具栏 + 表格 + 分页 + 排序），通过 `fetchFn` 注入数据获取逻辑 |
| `inv/` | `StatCard` | 统计卡片（图标 + 数值 + 趋势 + 格式化数字） |
| `inv/` | `DrawerForm` | 抽屉表单（编辑/查看） |
| `inv/` | `PageContainer` | 页面容器（标题 + 描述 + 内容插槽） |
| `inv/` | `AmountDisplay` | 金额展示 |
| `inv/` | `StatusTag` | 状态标签 |
| `media/` | `Video` | 视频组件 |
| `page/` | `Index` | 分页页面 |
| `re/` | `Back`, `DateQuick`, `FileUpload`, `Pagination` | 通用复用组件 |
| `seamless/` | `SeamlessScroll` | 无缝滚动 |

#### `ProTable` 关键 Props

```ts
{
  fetchFn: (params) => Promise<any>;   // 数据获取函数
  searchFields?: SearchField[];         // 查询字段配置
  showSearch / showAdd / showAction / showIndex / showPagination;
  selection / border / stripe / rowKey;
  actionWidth / pageSizes / immediate;
}
```

事件: `add` / `selectionChange` / `sortChange` / `dataLoaded`

---

### 5.11 页面 (pages)

#### 布局

- [layout/Index.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/layout/Index.vue): 主布局
  - PC: `el-aside` (Menu) + `el-container` (Header + Tags + Main + Footer)
  - 移动端: 抽屉式菜单 + 遮罩
  - 响应式断点 768px，`checkDevice` 检测设备类型
  - `el-backtop` 回到顶部
- [layout/Header.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/layout/Header.vue): 顶部栏
  - 折叠菜单 / 面包屑 / 暗黑模式切换 (`useDark` + `useToggle`) / 全屏 (`FullscreenManager`)
- [layout/Menu.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/layout/Menu.vue): 侧边菜单
- [layout/MenuSub.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/layout/MenuSub.vue): 递归子菜单
- [layout/Footer.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/layout/Footer.vue): 底部
- [layout/Tag.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/layout/Tag.vue): TagsView

#### 认证页

- [auth/Login.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/auth/Login.vue): 登录页
  - 表单校验 (`ValidateForm.userName` / `password`)
  - 登录成功: `secureStorage.setToken` + `Storage.setCookie` + 跳转 `redirect` 或 `/`
- [auth/Register.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/auth/Register.vue): 注册页

#### 错误页

- `common/NoPower.vue` (401)
- `common/NotFound.vue` (404)
- `common/ServerError.vue` (500)
- `common/Iframe.vue` / `common/Link.vue`: 内嵌/外链
- `common/ReloadPrompt.vue`: PWA 更新提示

#### 进销存业务页 (`pages/inv/`)

| 子模块 | 页面 |
|--------|------|
| `Dashboard.vue` | 工作台（统计卡片 + 销售趋势图 + 销售排行 + 待办 + 预警） |
| `basic/` | `Products`, `Warehouses`, `Customers`, `Suppliers` |
| `purchase/` | `Orders`, `Receipts` |
| `sales/` | `Orders`, `Deliveries` |
| `inventory/` | `StockQuery`, `StockTakes`, `StockTransfers` |
| `finance/` | `Receivables`, `Receipts`, `Payables`, `Payments` |
| `reports/` | `InventoryReport`, `SalesReport` |
| `system/` | `Users`, `Roles`, `Logs` |

#### 其他

- [Home.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/Home.vue): 首页（欢迎语 + UA + IP 信息）
- [Template.vue](file:///Users/huangchao/Work/GitHub/vue-vite/src/pages/Template.vue): 页面模板
- `demo/FontTest.vue` / `demo/ScrollSeamless.vue`: 演示页
- `system/User.vue`: 系统用户管理

---

### 5.12 类型定义 (types)

文件: [types/index.d.ts](file:///Users/huangchao/Work/GitHub/vue-vite/types/index.d.ts) 统一导出。

| 文件 | 内容 | 导入方式 |
|------|------|----------|
| `global.d.ts` | `ICommon`, `ViteEnv`, `IResult`, `IResultData`, `IResPage`, `IReqPage`, `IBase`, `ITree`, `IDeviceInfo`, `IDepartment`, `IJob`, `IMenu`, `IRole`, `IUser`, `IProduct`, `IFormWifi`, `MittEvents`, Vue 全局属性扩展, 模块声明 | **全局自动可用** (declare) |
| `router.d.ts` | `RouteMeta`, `RouteConfig`, `DynamicRouteData`, `RouterListItem`, `TagViewItem` | `import type { RouteMeta } from "#/types"` |
| `store.d.ts` | `ThemeConfigState`, `RouterListState`, `RouterTagsState`, `UserInfoState` | 同上 |
| `api.d.ts` | `ApiResponse<T>`, `ApiRequestConfig`, `LoginParams`, `RegisterParams`, `UserInfo`, `LoginResponse`, `MenuListResponse`, `MenuItem`, `UploadFileParams`, `PreviewFileParams`, `FileInfo`, `QueryIpParams`, `IpInfo`, `IpInfoResponse`, `PaginationParams`, `PaginationResponse<T>`, `HttpError`, `BizErrorCode` | 同上 |
| `data.d.ts` / `data-base.d.ts` | 业务数据类型 | 同上 |
| `inventory.d.ts` | `DocumentStatus`, `EnableStatus`, `Product`, `ProductCategory`, `Unit`, `Warehouse`, `Customer`, `Supplier` 等进销存实体 | 同上 |
| `plugins.d.ts` | 插件相关类型 | 同上 |
| `window.d.ts` / `vite-env.d.ts` | Window 扩展与 Vite 环境变量声明 | 全局 |

---

## 6. 关键流程剖析

### 6.1 启动流程

```
index.html
  ├─ 加载 flexible.js (设置 root font-size)
  ├─ 显示 CSS loading 动画
  └─ 加载 src/main.ts (ESM)
       ├─ createApp(App)
       ├─ app.use(Router) / app.use(Store) / app.use(I18n)
       ├─ 注册指令 / ElementPlus Icons / 全局属性
       ├─ 配置 errorHandler / warnHandler
       └─ Router.isReady().then(() => app.mount('#app'))
            ├─ router.beforeEach 触发
            │    ├─ Token 检查
            │    ├─ 白名单放行
            │    ├─ loadRoutesIfNeeded() 加载动态路由
            │    └─ 重试导航
            └─ App.vue 挂载
                 ├─ el-config-provider 提供全局配置
                 ├─ KeepAlive 缓存
                 └─ RouterView 渲染 layout/Index.vue
```

### 6.2 登录流程

```
Login.vue
  ├─ 表单校验 (ValidateForm)
  ├─ secureStorage.setToken(token)   ← XOR+Base64 加密
  ├─ Storage.setCookie(token)
  ├─ Storage.setLocalStorage(userInfo)
  └─ router.push(redirect || '/')
       └─ router.beforeEach
            ├─ 检测到 Token
            ├─ isRoutesLoaded === false
            ├─ loadRoutesIfNeeded()
            │    ├─ 读取 RouteData (本地) 或 Api.systemApi.getMenuList()
            │    ├─ addDynamicRoutes() → buildRoutes() → mapRoutesToComponent()
            │    └─ isRoutesLoaded = true
            └─ return { ...to, replace: true }
```

### 6.3 请求流程

```
api/modules/*.ts
  └─ Axios({ url, method, data })
       └─ http.interceptors.request
            ├─ NProgress.start()
            ├─ 注入 token / Authorization
            ├─ CSRF Token (非 GET)
            ├─ GET: data → params
            └─ AxiosCancel.addCancel(config)
       └─ http.interceptors.response
            ├─ NProgress.done()
            ├─ AxiosCancel.removeCancel
            ├─ 4xx/5xx → ErrorHandler.http → 跳转
            ├─ 3xx → Router.replace('/')
            ├─ isBizError(code) → ErrorHandler.biz
            └─ 成功 → return resp
```

### 6.4 主题切换流程

```
Header.vue 切换暗黑
  ├─ useDark() (vueuse)
  ├─ themeConfig.isDark = !isDark
  └─ appStore.useThemeConfig.setThemeConfig({ isDark })
       └─ Storage.setLocalStorage('theme-config', ...)
```

---

## 7. 构建与部署

### 7.1 Vite 配置 (`vite.config.js`)

核心基于 `vite-plus`，关键配置:

- **路径别名**: `@` → `./src`, `#` → `./types`, `vue-i18n` → CJS 版本
- **SCSS**: 全局注入 `@use "@/assets/styles/theme.scss" as *;`
- **插件**:
  - `vue()` + `fullReload` (config/src/types 变更触发完整重载)
  - `ViteEjsPlugin` (HTML 中使用 EJS 变量，注入 `title`)
  - `VitePWA` (仅 build 时启用，`autoUpdate` + 多种 runtimeCaching 策略)
  - `compression` (Gzip，仅 `VITE_BUILD_GZIP` 开启)
  - `autoImport` (Vue/VueRouter/Pinia/VueUse/vue-i18n/axios + hooks + components 目录)
  - `components` (`src/components` 自动注册，ElementPlus/Vant/Icons Resolver)
  - `icons` (vue3 编译器，自动安装)
  - `svgLoader` (SVG 作为组件导入)
  - `lqip` (低质量图片占位)
  - `visualizer` (打包分析，`VITE_REPORT` 开启)
- **Server**:
  - `host: true`, `allowedHosts: true`
  - `port: VITE_PORT` (默认 3333)
  - `proxy: createProxy(VITE_PROXY)` (基于 `build/index.ts`)
  - 完整 CSP + 安全头
- **Build**:
  - `outDir: dist`, `assetsDir: assets`
  - `assetsInlineLimit: 5120` (5KB)
  - `sourcemap: true`
  - 代码分割: `vue-vendor` / `element-plus` / `echarts` / `vant` / `vueuse` / `vue-i18n` / `axios` / `utils` / `nprogress` / `animate` / `scroll-seamless` / `heic2any`
  - `minify: terser`，生产环境 `drop_console` + `drop_debugger`
  - `chunkSizeWarningLimit: 1024`
- **部署检测**: 自动识别 Vercel (`VERCEL`) 与 Cloudflare (`CF_PAGES`)，调整 `base` 与 chunk 命名

### 7.2 PostCSS 配置 (`.postcssrc.js`)

- `postcss-preset-env` (autoprefixer + grid)
- `postcss-px-convert`: px → rem，`rootValue: 100`，配合 `flexible.js`
  - PC (≥768px): root font-size 按视口比例缩放 (80~120px)
  - 移动端 (<768px): `clientWidth / 3.75` (375px 设计稿)

### 7.3 部署方案

#### Nginx (`deploy/nginx.conf`)

核心: `try_files $uri $uri/ /index.html;` 支持 History 模式

- 静态资源缓存（图片 30d，CSS/JS 7d）
- Gzip 压缩
- 安全头
- 提供 HTTPS 与 Docker 配置模板

#### Express (`deploy/server-express.js`)

```js
app.use(express.static(distPath));
app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
```

#### 云平台

- **Vercel**: `pnpm build:prod && vercel --prod`，配置 `vercel.json`
- **Cloudflare Pages**: `pnpm build:prod && wrangler pages deploy dist`
- 已在线部署:
  - <https://vue-vite.pages.dev/>
  - <https://vue-vite-pages.vercel.app/>

### 7.4 PWA

`VitePWA` 配置:

- `injectRegister: "auto"`, `registerType: "autoUpdate"`
- 缓存策略:
  - API: `NetworkFirst` (production) / `NetworkFirst` (test)
  - 图片: `CacheFirst` (最多 30 个)
  - JS/CSS/HTML: `StaleWhileRevalidate` (30 天)
- `maximumFileSizeToCacheInBytes: 15MB`

---

## 8. 工程化规范

### 8.1 代码规范

| 工具 | 配置文件 | 说明 |
|------|----------|------|
| oxlint | `oxlint.json` | 主 Lint (取代 eslint) |
| oxfmt | `oxfmt.json` | 代码格式化 |
| stylelint | `.stylelintrc.js` | SCSS/CSS Lint，集成 `stylelint-scss` + `stylelint-order` |
| TypeScript | `tsconfig.json` | `strict: true`, `target: ESNext`, `moduleResolution: bundler`, 路径别名 `@/*` `#/*` |

### 8.2 Git 提交规范

- `husky` + `.husky/pre-commit` + `.husky/commit-msg`
- `commitlint` (`.commitlintrc.js`): 遵循 `@commitlint/config-conventional`
  - type 枚举: `feat` / `fix` / `doc` / `style` / `refactor` / `perf` / `test` / `build` / `ci` / `chore` / `revert`
  - `header-max-length: 108`
  - `body-leading-blank: always`
- `lint-staged` (`.lintstagedrc.js`):
  - `**/*.{js,ts,vue,...}` → `oxlint --no-error-on-unmatched-pattern`
  - `*.css` → `stylelint --fix`

### 8.3 命名规范（来自 README）

1. 驼峰命名: `demoUser`
2. 配置文件: `xxConfig`，数据配置: `xxOption/xxData`
3. 封装函数: `export const FN = () => {}`，内部函数: `function FN() {}`
4. Store 对外函数: `useXx`
5. interface 抽取到最小粒度

### 8.4 样式规范

`src/assets/styles/index.scss` 采用三层架构:

1. **基础层**: `common/reset.scss` + `declare/` (变量+mixin) + `public/` (原子类 `re-` 前缀)
2. **组件层**: `page/` (语义化组件类: title/btn/card/input/text)
3. **业务定制层**: `common/` (layout/ui/animate/n-progress/bpmn/print)

原子类命名: `re-flex`, `re-mt-4`, `re-text-center`, `re-rounded-lg`, `re-cursor-pointer` 等。

---

## 9. 项目运行方式

### 9.1 环境准备

```bash
# Node 22.x
node -v  # v22.x.x

# 推荐使用 pnpm
npm install -g pnpm
```

### 9.2 安装依赖

```bash
pnpm install
```

### 9.3 环境变量

| 文件 | 环境 | 关键配置 |
|------|------|----------|
| `.env` | 公共 | `VITE_TITLE`, `VITE_LOCALE`, `VITE_BUILD_GZIP` |
| `.env.development` | 开发 | `VITE_PORT=3333`, `VITE_PROXY` (本地 8080), `VITE_MOCK=true`, `VITE_REPORT=true` |
| `.env.preview` | 预览 | `VITE_PROXY` (apifox mock), `VITE_MOCK=false`, `VITE_REPORT=true` |
| `.env.production` | 生产 | `VITE_PROXY` (yapi mock), `VITE_MOCK=false`, `VITE_DROP_CONSOLE=true` |

### 9.4 常用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 开发模式启动 (mode=development, --host --open) |
| `pnpm test` | 预览模式启动 (mode=preview) |
| `pnpm prod` | 生产模式启动 (mode=production) |
| `pnpm build` | 生产构建 (`build:prod`) |
| `pnpm build:test` | 预览构建 (mode=preview) |
| `pnpm build:no-cache` | 清理缓存后构建 |
| `pnpm lint` | oxlint --fix |
| `pnpm lint:check` | lint 检查 + fmt 检查 |
| `pnpm lint:format` | lint + fmt 修复 |
| `pnpm lint:stylelint` | stylelint 修复 |
| `pnpm format` | oxfmt 格式化 |
| `pnpm review` | build 后再 dev (构建验证) |
| `pnpm test:br` | http-server 启动 dist (Brotli) |
| `pnpm test:gzip` | http-server 启动 dist (Gzip) |
| `pnpm deploy:vercel` | 部署到 Vercel |
| `pnpm deploy:cf` | 部署到 Cloudflare Pages |
| `pnpm clean:cache` | 清理 lock 文件 + node_modules 并重装 |
| `pnpm clean:lib` | 仅清理 node_modules |
| `pnpm commitlint` | 提交信息校验 |

### 9.5 本地开发

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev
# → 自动打开 http://localhost:3333

# 3. 登录
# 任意用户名密码即可（本地 Mock，Token 为时间戳）
```

### 9.6 生产构建与部署

```bash
# 构建
pnpm build
# → 输出到 dist/

# 本地预览构建产物 (Express)
node deploy/server-express.js
# → http://localhost:3000

# 或使用 http-server
pnpm test:gzip   # Gzip
pnpm test:br     # Brotli

# 部署到云平台
pnpm deploy:vercel
pnpm deploy:cf
```

### 9.7 Nginx 部署

```bash
# 1. 复制 dist/ 内容到 nginx html 目录
cp -r dist/* /usr/share/nginx/html/

# 2. 使用 deploy/nginx.conf 配置
cp deploy/nginx.conf /etc/nginx/conf.d/vue-vite.conf

# 3. 重载
nginx -s reload
```

### 9.8 Mock 数据

- 开发环境 (`VITE_MOCK=true`): 进销存模块使用内置 Mock（`src/api/modules/inventory/mockData.ts`）
- 预览环境: 通过 `VITE_PROXY` 指向 apifox mock
- 生产环境: 通过 `VITE_PROXY` 指向 yapi mock 或真实后端

### 9.9 自动导入说明

项目使用 `unplugin-auto-import` + `unplugin-vue-components`，以下无需手动 import:

- Vue API: `ref`, `reactive`, `computed`, `watch`, `onMounted`, `nextTick`...
- Vue Router: `useRoute`, `useRouter`...
- Pinia: `defineStore`, `storeToRefs`...
- VueUse: `useDark`, `useToggle`...
- vue-i18n: `useI18n`...
- axios: 默认导入
- `src/components/**` 下的 Vue 组件
- `src/hooks/**` 下的 hooks

类型声明自动生成: `auto-imports.d.ts` / `components.d.ts` / `.eslintrc-auto-import.json`

---

> 本文档基于仓库当前状态生成，如代码发生变更请同步更新。详细模块文档参见 `docs/` 目录。
