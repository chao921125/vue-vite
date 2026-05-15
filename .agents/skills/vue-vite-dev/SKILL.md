# Vue-Vite 项目开发规范 Skills

## 项目概述

这是一个基于 Vue 3 + Vite + TypeScript 的企业级前端开发模板，支持多端适配（PC/移动端），集成了完整的工程化配置和最佳实践。

### 核心技术栈

- **框架**: Vue 3.5+ (Composition API + `<script setup>`)
- **构建工具**: Vite 8+
- **语言**: TypeScript 6+ (严格模式)
- **状态管理**: Pinia 3+
- **路由**: Vue Router 5+
- **UI组件库**: Element Plus 2.13+, Vant 4.9+
- **HTTP客户端**: Axios 1.15+
- **样式方案**: SCSS + PostCSS
- **代码规范**: Oxlint + Oxfmt + Stylelint
- **包管理器**: pnpm

---

## 一、代码风格规范

### 1.1 Vue 组件编写规范

#### 基本结构
```vue
<script setup lang="ts">
// 1. 导入语句（按类型分组）
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

// 2. Props 定义
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});

// 3. Emits 定义
const emits = defineEmits(["change", "submit"]);

// 4. 响应式数据
const count = ref(0);
const state = reactive({
  name: "",
  age: 0,
});

// 5. 计算属性
const doubleCount = computed(() => count.value * 2);

// 6. 方法定义
const handleClick = () => {
  count.value++;
  emits("change", count.value);
};

// 7. 生命周期钩子
onMounted(() => {
  console.log("mounted");
});

// 8. 暴露方法（如需要）
defineExpose({
  handleClick,
});
</script>

<template>
  <div class="component-name">
    <!-- 模板内容 -->
  </div>
</template>

<style scoped lang="scss">
.component-name {
  // 样式内容
}
</style>
```

#### 关键要点
- ✅ 必须使用 `<script setup lang="ts">` 语法
- ✅ Props 和 Emits 必须显式定义类型
- ✅ 使用 `ref` 处理基本类型，`reactive` 处理对象
- ✅ 样式必须添加 `scoped` 属性
- ✅ 统一使用 SCSS 预处理器
- ✅ 组件命名采用 PascalCase（大驼峰）
- ✅ 文件名与组件名保持一致

### 1.2 TypeScript 编码规范

#### 类型定义
```typescript
// 接口定义（用于对象类型）
interface UserInfo {
  id: number;
  name: string;
  age?: number; // 可选属性
}

// 类型别名（用于联合类型等）
type Status = "success" | "error" | "pending";

// 函数类型定义
const getUserInfo = (id: number): Promise<UserInfo> => {
  return api.getUser(id);
};

// 泛型使用
const createResponse = <T>(data: T): ApiResponse<T> => {
  return { code: 200, data };
};
```

#### 关键要点
- ✅ 优先使用 `interface` 定义对象类型
- ✅ 使用 `type` 定义联合类型、工具类型
- ✅ 避免使用 `any`，使用 `unknown` 替代
- ✅ 函数返回值必须明确标注类型
- ✅ 启用严格模式（`strict: true`）
- ✅ 未使用的变量和参数会报错（`noUnusedLocals`, `noUnusedParameters`）

### 1.3 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量/函数 | camelCase（小驼峰） | `userName`, `getUserInfo` |
| 常量 | UPPER_SNAKE_CASE | `MAX_COUNT`, `API_BASE_URL` |
| 组件/类/接口 | PascalCase（大驼峰） | `UserInfo`, `BaseComponent` |
| 文件（组件） | PascalCase | `UserProfile.vue` |
| 文件（工具） | camelCase | `formatDate.ts` |
| CSS类名 | kebab-case（短横线） | `.user-profile` |

---

## 二、项目架构规范

### 2.1 目录结构

```
src/
├── api/                    # API 接口层
│   ├── modules/           # 模块化 API
│   │   ├── user.ts        # 用户相关接口
│   │   ├── system.ts      # 系统相关接口
│   │   └── common.ts      # 公共接口
│   └── index.ts           # API 统一导出
├── assets/                # 静态资源
│   ├── fonts/             # 字体文件
│   ├── icon/              # 图标字体
│   ├── images/            # 图片资源
│   ├── styles/            # 全局样式
│   └── svgs/              # SVG 图标
├── components/            # 公共组件
│   ├── charts/            # 图表组件
│   ├── re/                # 复用组件
│   └── ...
├── config/                # 配置文件
│   ├── routerConfig.ts    # 路由配置
│   ├── themeConfig.ts     # 主题配置
│   └── httpConfig.ts      # HTTP 配置
├── pages/                 # 页面组件
│   ├── auth/              # 认证页面
│   ├── layout/            # 布局页面
│   ├── system/            # 系统页面
│   └── Home.vue           # 首页
├── plugins/               # 插件
│   ├── directive/         # 自定义指令
│   ├── http/              # HTTP 封装
│   ├── i18n/              # 国际化
│   └── hooks/             # 组合式函数
├── router/                # 路由配置
│   ├── index.ts           # 路由主文件
│   └── route.ts           # 路由定义
├── store/                 # 状态管理
│   ├── modules/           # 模块化 Store
│   │   ├── user.ts        # 用户状态
│   │   ├── theme.ts       # 主题状态
│   │   └── ...
│   └── index.ts           # Store 入口
├── utils/                 # 工具函数
│   ├── constant/          # 常量定义
│   ├── validate/          # 验证函数
│   ├── format.ts          # 格式化函数
│   └── index.ts           # 工具汇总
├── App.vue                # 根组件
└── main.ts                # 入口文件
```

### 2.2 API 层规范

#### API 模块划分
```typescript
// src/api/modules/user.ts
import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";

export default {
  // 登录
  login: (data = {}) => {
    return Axios({
      url: `${AxiosConfig.baseUrl}/auth/login`,
      method: "POST",
      data,
    });
  },
  
  // 注册
  register: (data = {}) => {
    return Axios({
      url: `${AxiosConfig.baseUrl}/auth/register`,
      method: "POST",
      data,
    });
  },
  
  // 获取用户信息
  getUserInfo: (params = {}) => {
    return Axios({
      url: `${AxiosConfig.baseUrl}/user/info`,
      method: "GET",
      params,
    });
  },
};
```

#### API 统一导出
```typescript
// src/api/index.ts
import common from "./modules/common";
import user from "./modules/user";
import system from "./modules/system";

const api = {
  commonApi: common,
  userApi: user,
  systemApi: system,
};

export default api;
```

#### 使用方式
```typescript
import Api from "@/api";

// 调用 API
const handleLogin = async () => {
  const { data } = await Api.userApi.login({
    username: "admin",
    password: "123456",
  });
  console.log(data);
};
```

### 2.3 Store 状态管理规范

#### Store 模块定义
```typescript
// src/store/modules/theme.ts
import { defineStore } from "pinia";

export const useThemeConfig = defineStore("themeConfig", {
  state: () => ({
    themeConfig: {
      globalI18n: "zh-cn",
      globalComponentSize: "default",
      globalTitle: import.meta.env.VITE_TITLE,
      primary: "#409eff",
      isDark: false,
      isGrey: false,
      // ... 更多配置
    },
  }),
  
  actions: {
    setThemeConfig(data: any) {
      Object.assign(this.themeConfig, data);
    },
  },
  
  // getters（如需要）
  getters: {
    getPrimaryColor: (state) => state.themeConfig.primary,
  },
});
```

#### Store 统一导出
```typescript
// src/store/index.ts
import { createPinia, storeToRefs } from "pinia";

const store = createPinia();

// 辅助函数：获取响应式 refs
export const getStoreRefs = (store: any): any => {
  return storeToRefs(store);
};

// 导入所有模块
import { useRouterList } from "./modules/routerMeta";
import { useRouterTags } from "./modules/routerTags";
import { useThemeConfig } from "./modules/theme";
import { useUserInfo } from "./modules/user";

// 统一导出
export const appStore = {
  useRouterList: useRouterList(store),
  useRouterTags: useRouterTags(store),
  useThemeConfig: useThemeConfig(store),
  useUserInfo: useUserInfo(store),
};

export default store;
```

#### 在组件中使用
```typescript
import { getStoreRefs, appStore } from "@/store";

// 获取响应式状态
const { themeConfig } = getStoreRefs(appStore.useThemeConfig);

// 调用 action
appStore.useThemeConfig.setThemeConfig({ isDark: true });

// 直接使用（非响应式）
const store = appStore.useThemeConfig;
console.log(store.themeConfig);
```

### 2.4 路由规范

#### 动态路由机制
项目采用**动态路由**方案，支持从后端获取菜单配置：

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import { baseRoutes, errorRoutes } from "./route";

// 创建路由实例
export const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes,
  scrollBehavior: () => ({ el: "body", left: 0, top: 0 }),
});

// 路由守卫
router.beforeEach(async (to, from) => {
  NProgress.start();
  
  const token = Storage.getLocalStorage(Constants.keys.token);
  
  // 未登录跳转登录页
  if (!token && !RouterConfig.whiteList.includes(to.path)) {
    return {
      name: RouterConfig.routeLogin,
      query: { redirect: to.path },
    };
  }
  
  // 动态加载路由
  if (token && routerList.value.length === 0) {
    await getDynamicRouter();
    return { ...to, replace: true };
  }
});

// 动态添加路由
export async function getDynamicRouter() {
  const { data } = await Api.systemApi.getMenuList({});
  await appStore.useRouterList.setMenuList(data.list || []);
  await setAddRoute(data.list || []);
}
```

#### 路由配置要点
- ✅ 使用 `createWebHistory()` 而非 Hash 模式
- ✅ 配置路由守卫进行权限控制
- ✅ 支持动态路由（后端返回或本地配置）
- ✅ 集成 NProgress 进度条
- ✅ 页面切换时滚动到顶部
- ✅ 白名单机制（登录页、注册页等无需权限）

---

## 三、工程化配置

### 3.1 Vite 配置要点

#### 核心插件
```javascript
// vite.config.js
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      
      // 自动导入（Vue API、VueUse、组件等）
      autoImport({
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        resolvers: [ElementPlusResolver(), IconsResolver()],
        dts: "./auto-imports.d.ts",
      }),
      
      // 组件自动注册
      components({
        dirs: ["src/components"],
        resolvers: [ElementPlusResolver()],
        dts: true,
      }),
      
      // PWA 支持
      isBuild && VitePWA({ /* 配置 */ }),
      
      // Gzip 压缩
      isBuild && compression(),
      
      // 打包分析
      isBuild && visualizer(),
    ],
    
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "#": path.resolve(__dirname, "./types"),
      },
    },
    
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/theme.scss" as *;`,
        },
      },
    },
    
    build: {
      outDir: "dist",
      sourcemap: true,
      minify: true,
      terserOptions: {
        compress: {
          drop_console: isBuild,
          drop_debugger: isBuild,
        },
      },
    },
  };
});
```

#### 关键特性
- ✅ **自动导入**: Vue API、VueUse、组件无需手动 import
- ✅ **按需加载**: Element Plus、Vant 组件按需引入
- ✅ **PWA 支持**: 离线访问、推送通知
- ✅ **Gzip 压缩**: 生产环境自动压缩
- ✅ **路径别名**: `@` 指向 `src`，`#` 指向 `types`
- ✅ **全局样式注入**: SCSS 变量/混入自动可用

### 3.2 代码质量工具

#### Lint 工具链
```json
{
  "scripts": {
    "lint": "oxlint . --fix",
    "lint:check": "oxlint . && oxfmt --check .",
    "lint:format": "oxlint . --fix && oxfmt --write .",
    "lint:stylelint": "stylelint --cache --fix \"src/**/*.{vue,css,less,scss,postcss}\"",
    "format": "oxfmt --write ."
  }
}
```

#### Git Hooks（Husky + lint-staged）
```javascript
// .lintstagedrc.js
{
  "**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}": "oxlint --no-error-on-unmatched-pattern",
  "*.css": "stylelint --fix"
}
```

#### Commit 规范（Commitlint）
```bash
# Commit 类型
feat: 新功能
fix: 修复 bug
docs: 文档变更
style: 代码格式（不影响代码运行）
refactor: 重构
perf: 性能优化
test: 测试相关
build: 构建系统或外部依赖
ci: CI 配置
chore: 其他修改
revert: 回退

# 示例
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复路由跳转异常问题"
```

---

## 四、开发最佳实践

### 4.1 组件开发规范

#### 复用组件设计
```vue
<!-- src/components/re/Pagination.vue -->
<script setup lang="ts">
const props = defineProps({
  current: {
    required: true,
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["changeSize", "changeCurrent", "pagination"]);

const pageChangeSize = (val: number) => {
  emits("changeSize", val);
  emits("pagination", { page: props.current, limit: val });
};

defineExpose({
  pageChangeSize,
});
</script>

<template>
  <el-pagination
    v-model:currentPage="props.current"
    :page-size="props.limit"
    :total="props.total"
    @size-change="pageChangeSize"
  />
</template>
```

#### 组件设计原则
- ✅ Props 必须定义默认值和类型
- ✅ 使用 `defineExpose` 暴露必要的方法
- ✅ 事件命名采用 `kebab-case`（短横线）
- ✅ 组件职责单一，避免过度复杂
- ✅ 提供清晰的 Props 和 Events 文档

### 4.2 工具函数规范

#### 工具函数组织
```typescript
// src/utils/format.ts
/**
 * 格式化日期
 * @param date 日期对象
 * @param format 格式化字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date, format: string): string => {
  // 实现逻辑
};

/**
 * 格式化数字（千分位）
 * @param num 数字
 * @returns 格式化后的字符串
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
```

#### 工具函数使用
```typescript
import { formatDate, formatNumber } from "@/utils/format";

const now = formatDate(new Date(), "YYYY-MM-DD HH:mm:ss");
const price = formatNumber(1234567.89); // "1,234,567.89"
```

### 4.3 HTTP 请求规范

#### 请求拦截器
```typescript
// src/plugins/http/index.ts
import axios from "axios";
import Storage from "@/utils/storage";
import Constants from "@/utils/constant/constants";

const Axios = axios.create({
  baseURL: AxiosConfig.baseUrl,
  timeout: AxiosConfig.timeout,
});

// 请求拦截
Axios.interceptors.request.use((config) => {
  const token = Storage.getLocalStorage(Constants.keys.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截
Axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 统一错误处理
    ElMessage.error(error.message || "请求失败");
    return Promise.reject(error);
  }
);

export default Axios;
```

#### 请求取消机制
```typescript
// src/plugins/http/cancel.ts
import axios from "axios";

class AxiosCancel {
  private static pendingMap = new Map();
  
  static addPending(config: any) {
    const key = [config.method, config.url].join("&");
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
      if (!this.pendingMap.has(key)) {
        this.pendingMap.set(key, cancel);
      }
    });
  }
  
  static removePending(key: string) {
    if (this.pendingMap.has(key)) {
      const cancel = this.pendingMap.get(key);
      cancel(key);
      this.pendingMap.delete(key);
    }
  }
  
  static removeAllCancel() {
    this.pendingMap.forEach((cancel) => cancel());
    this.pendingMap.clear();
  }
}

export default AxiosCancel;
```

### 4.4 样式规范

#### SCSS 组织
```scss
// src/assets/styles/index.scss
@import "./theme.scss";
@import "./theme-dark.scss";
@import "./common/reset.scss";
@import "./common/base.scss";

// 组件样式
.page-box {
  padding: 20px;
  
  &__header {
    margin-bottom: 16px;
    
    &-title {
      font-size: 18px;
      font-weight: bold;
    }
  }
  
  &__content {
    // ...
  }
}
```

#### Stylelint 规则
- ✅ 属性顺序规范化（order/order）
- ✅ 禁止未知属性和单位
- ✅ URL 必须加引号
- ✅ 十六进制颜色使用长格式（`#ffffff`）
- ✅ 规则前必须有空行
- ✅ 支持 Vue 深度选择器（`:deep()`, `:global()`）

### 4.5 国际化（i18n）

#### 配置
```typescript
// src/plugins/i18n/index.ts
import { createI18n } from "vue-i18n";
import zhCn from "./locales/zh-cn";
import en from "./locales/en";

const i18n = createI18n({
  legacy: false,
  locale: Storage.getLocalStorage(Constants.keys.i18nLocale) || "zh-cn",
  messages: {
    "zh-cn": zhCn,
    en: en,
  },
});

export default i18n;
```

#### 使用
```vue
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const switchLang = (lang: string) => {
  locale.value = lang;
  Storage.setLocalStorage(Constants.keys.i18nLocale, lang);
};
</script>

<template>
  <div>
    <h1>{{ t("home.title") }}</h1>
    <button @click="switchLang('en')">English</button>
    <button @click="switchLang('zh-cn')">中文</button>
  </div>
</template>
```

---

## 五、常用命令

### 开发命令
```bash
# 开发环境
pnpm dev

# 测试环境
pnpm test

# 生产环境
pnpm prod

# 构建（生产）
pnpm build

# 构建（测试）
pnpm build:test
```

### 代码质量
```bash
# 代码检查并修复
pnpm lint

# 代码格式化
pnpm format

# 样式检查
pnpm lint:stylelint

# 完整检查（不修复）
pnpm lint:check
```

### 清理命令
```bash
# 清理缓存和依赖
pnpm clean:cache

# 仅清理 node_modules
pnpm clean:lib
```

---

## 六、注意事项

### 6.1 常见陷阱

#### ❌ 避免的做法
```typescript
// 1. 避免使用 any
const data: any = {}; // ❌

// 2. 避免直接修改 props
props.title = "new title"; // ❌

// 3. 避免在模板中使用复杂表达式
<div>{{ user.name.split(' ')[0].toUpperCase() }}</div> // ❌

// 4. 避免忘记清理副作用
onMounted(() => {
  window.addEventListener('resize', handler); // ❌ 未移除
});
```

#### ✅ 推荐的做法
```typescript
// 1. 使用明确的类型
interface UserData {
  name: string;
  age: number;
}
const data: UserData = { name: "", age: 0 }; // ✅

// 2. 使用计算属性或 emit
const title = computed(() => props.title); // ✅
emits("update:title", "new title"); // ✅

// 3. 使用计算属性
const firstName = computed(() => user.name.split(' ')[0].toUpperCase()); // ✅

// 4. 清理事件监听
onMounted(() => {
  window.addEventListener('resize', handler);
});
onUnmounted(() => {
  window.removeEventListener('resize', handler); // ✅
});
```

### 6.2 性能优化

#### 组件懒加载
```typescript
// 路由懒加载
const UserProfile = () => import("@/pages/system/UserProfile.vue");

// 组件懒加载
const HeavyComponent = defineAsyncComponent(
  () => import("@/components/HeavyComponent.vue")
);
```

#### 列表渲染优化
```vue
<template>
  <!-- 使用唯一 key -->
  <div v-for="item in list" :key="item.id">
    {{ item.name }}
  </div>
  
  <!-- 虚拟滚动（大数据量） -->
  <RecycleScroller
    :items="largeList"
    :item-size="50"
    key-field="id"
  >
    <template #default="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </RecycleScroller>
</template>
```

#### 防抖节流
```typescript
import { useDebounceFn, useThrottleFn } from "@vueuse/core";

// 防抖（搜索输入）
const handleSearch = useDebounceFn((keyword: string) => {
  // 搜索逻辑
}, 300);

// 节流（滚动事件）
const handleScroll = useThrottleFn(() => {
  // 滚动逻辑
}, 200);
```

### 6.3 安全建议

- ✅ 不要在代码中硬编码敏感信息（使用环境变量）
- ✅ 对用户输入进行验证和转义
- ✅ 使用 HTTPS 传输敏感数据
- ✅ Token 存储在 HttpOnly Cookie 或 localStorage（注意 XSS）
- ✅ 定期更新依赖包（`pnpm update`）

---

## 七、扩展技能

### 7.1 图表集成（ECharts）
```vue
<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

const option = {
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed"] },
  yAxis: { type: "value" },
  series: [{ data: [120, 200, 150], type: "bar" }],
};
</script>

<template>
  <v-chart :option="option" style="height: 400px" />
</template>
```

### 7.2 PWA 配置
```javascript
// vite.config.js
VitePWA({
  injectRegister: "auto",
  registerType: "autoUpdate",
  manifest: {
    name: "My App",
    short_name: "App",
    icons: [
      { src: "/pwa-640.png", sizes: "640x640", type: "image/png" }
    ],
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg}"],
  },
});
```

### 7.3 微前端集成
项目预留了微前端集成能力，可通过配置启用：
```javascript
// vite.config.js
const isMicroApp = !!env.VITE_MICRO_APP;
```

---

## 八、总结

本项目是一个**企业级 Vue 3 开发模板**，具备以下特点：

✅ **现代化技术栈**: Vue 3 + Vite + TypeScript + Pinia  
✅ **完善的工程化**: 自动导入、按需加载、代码分割  
✅ **严格的代码规范**: Oxlint + Stylelint + Commitlint  
✅ **丰富的功能集成**: i18n、PWA、ECharts、主题切换  
✅ **灵活的架构设计**: 动态路由、模块化 Store、API 分层  
✅ **优秀的开发体验**: 热重载、类型提示、自动补全  

遵循本规范可以确保代码质量、提高开发效率、降低维护成本。
