# Types 类型使用规范

## 📋 目录结构

```
types/
├── global.d.ts          # 全局类型（自动导入，无需 import）
├── router.d.ts          # 路由相关类型（需要手动导入）
├── store.d.ts           # Store 相关类型（需要手动导入）
├── api.d.ts             # API 相关类型（需要手动导入）
├── data.d.ts            # 数据相关类型（已合并到 global.d.ts）
├── data-base.d.ts       # 基础数据类型（已合并到 global.d.ts）
├── demo.d.ts            # 示例类型（需要手动导入）
└── index.d.ts           # 类型统一导出文件
```

## 🎯 类型分类

### 1. 全局类型（Global Types）

**位置**: `types/global.d.ts`

**特点**: 
- 使用 `declare interface` 或 `declare type` 声明
- 由 `unplugin-auto-import` 自动导入
- 在整个项目中可直接使用，无需 `import` 语句

**包含的类型**:
```typescript
// 通用函数类型
ICommon

// VITE 配置类型
Recordable, ViteEnv

// 请求响应类型
IResult, IResultData, IResPage, IReqPage

// 基础数据类型
IBase, ITree, IDeviceInfo

// 业务数据类型
IDepartment, IJob, IMenu, IRole, IUser, IProduct, IFormWifi
```

**使用示例**:
```typescript
// ✅ 正确 - 直接使用，无需导入
const userInfo: IUser = {
  id: 1,
  userName: 'admin',
  nickName: '管理员'
};

const menuList: IMenu[] = [];
```

---

### 2. 局部类型（Local Types）

**位置**: `types/router.d.ts`, `types/store.d.ts`, `types/api.d.ts` 等

**特点**:
- 使用 `export interface` 或 `export type` 导出
- 需要通过 `import` 语句手动导入
- 通常用于特定模块或业务场景

**包含的类型**:

#### router.d.ts
```typescript
RouteMeta, RouteConfig, DynamicRouteData, RouterListItem, TagViewItem
```

#### store.d.ts
```typescript
ThemeConfigState, RouterListState, RouterTagsState, UserInfoState
```

#### api.d.ts
```typescript
UploadFileParams, PreviewFileParams, QueryIpParams, 
IpInfoResponse, MenuListResponse, LoginParams, RegisterParams, ApiResponse
```

**使用示例**:
```typescript
// ✅ 正确 - 需要手动导入
import type { RouteMeta, DynamicRouteData } from "#/types";
import type { UploadFileParams, ApiResponse } from "#/types";

const routeMeta: RouteMeta = {
  title: '首页',
  icon: 'home'
};

const uploadParams: UploadFileParams = {
  file: fileObject
};
```

---

## 🔧 自动导入配置

### 全局类型自动可用

全局类型（在 `global.d.ts` 中使用 `declare interface/type` 声明）会被 TypeScript 自动识别，无需任何配置。

TypeScript 会自动加载 `types/**/*.d.ts` 文件中的全局声明。

### 局部类型需要手动导入

局部类型（使用 `export interface/type` 导出的类型）必须通过 `import` 语句手动导入：

```typescript
import type { RouteMeta, UploadFileParams } from "#/types";
```

**重要说明**:
- `.d.ts` 文件中的 `declare` 声明是全局的，自动可用
- `.d.ts` 文件中的 `export` 导出是局部的，需要手动导入
- `unplugin-auto-import` 不扫描 `.d.ts` 文件，只扫描 `.ts` 和 `.vue` 文件

---

## 📝 最佳实践

### 1. 何时使用全局类型？

✅ **适合全局类型的场景**:
- 通用的数据结构（如用户、菜单、部门等）
- 项目中频繁使用的基础类型
- 跨多个模块共享的类型

❌ **不适合全局类型的场景**:
- 特定于某个模块的类型
- 可能产生命名冲突的类型
- 只在少数地方使用的类型

### 2. 何时使用局部类型？

✅ **适合局部类型的场景**:
- 特定业务模块的专属类型
- API 接口的请求/响应类型
- Store 的状态类型
- 路由配置相关类型

### 3. 添加新类型的规范

#### 添加全局类型
```typescript
// 在 types/global.d.ts 中添加
declare interface INewType {
  id: number;
  name: string;
}
```

#### 添加局部类型
```typescript
// 在对应的文件中添加（如 types/api.d.ts）
export interface INewApiParams {
  param1: string;
  param2: number;
}
```

---

## ⚠️ 注意事项

1. **避免命名冲突**: 全局类型和局部类型不要使用相同的名称
2. **类型注释**: 为新添加的类型文件添加清晰的注释说明
3. **导入路径**: 使用 `#/types` 别名导入局部类型
4. **TypeScript 支持**: 确保 IDE 正确识别 `auto-imports.d.ts` 文件

---

## 🔄 迁移指南

如果你之前使用了手动导入的全局类型，可以移除 import 语句：

```typescript
// ❌ 旧写法（不再需要）
import type { IUser, IMenu } from "#/types";

// ✅ 新写法（直接使用）
const user: IUser = { /* ... */ };
const menu: IMenu = { /* ... */ };
```

对于局部类型，保持原有的导入方式：

```typescript
// ✅ 继续保持
import type { RouteMeta, UploadFileParams } from "#/types";
```

---

## 📚 相关文件

- [vite.config.js](../vite.config.js) - 自动导入配置
- [auto-imports.d.ts](../auto-imports.d.ts) - 自动生成的类型声明
- [tsconfig.json](../tsconfig.json) - TypeScript 配置
