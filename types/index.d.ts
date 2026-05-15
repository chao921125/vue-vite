// ==================== 类型统一导出文件 ====================
// 使用方式：import type { xxx } from "#/types";
//
// 类型分类说明：
// 1. 全局类型（无需导入）：在 global.d.ts 中使用 declare interface/type 声明
//    - ICommon, IResult, IBase, ITree, IDepartment, IJob, IMenu, IRole, IUser, IProduct 等
//    - 这些类型在整个项目中自动可用
//
// 2. 局部类型（需要导入）：使用 export interface/type 导出的类型
//    - router.d.ts: RouteMeta, RouteConfig, DynamicRouteData, TagViewItem 等
//    - store.d.ts: ThemeConfigState, RouterListState, UserInfoState 等
//    - api.d.ts: UploadFileParams, PreviewFileParams, QueryIpParams 等
//    - 这些类型需要通过 import 语句手动导入

export * from "./router";
export * from "./store";
export * from "./api";
export * from "./data";
export * from "./data-base";
export * from "./demo";
