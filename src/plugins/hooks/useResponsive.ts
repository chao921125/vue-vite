/**
 * 响应式断点检测
 *
 * 与 declare/variables.scss 中的 $breakpoint-* 保持一致：
 *   sm: 640px  md: 768px  lg: 1024px  xl: 1280px
 *
 * 与 pages/layout/Index.vue、public/flexible.js 的移动端判定统一为 < 768px，
 * 保证布局层、组件层、样式层的断点口径完全相同。
 *
 * 用法：
 *   const { isMobile, isTablet, isDesktop } = useResponsive();
 *
 * 性能说明：断点状态全局共享，所有组件复用同一组 matchMedia 监听，
 * 避免每个组件实例（ProTable / DrawerForm / PageContainer / 布局层…）都注册 3 个监听器。
 */
import { effectScope } from "vue";
import { useMediaQuery } from "@vueuse/core";

/** 断点值（px），与 SCSS 变量一一对应 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/** 断点状态工厂：三个 media query 只注册一次 */
const createState = () => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  );
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);

  return { isMobile, isTablet, isDesktop };
};

/**
 * 在 detached scope 中创建全局唯一状态。
 * 必须脱离组件作用域，否则 media query 监听会随「首个调用组件」卸载而被清理。
 */
const globalState = effectScope(true).run(createState)!;

/**
 * 响应式状态
 * @returns isMobile  手机端（< 768px）
 * @returns isTablet  平板端（768px ~ 1023px）
 * @returns isDesktop 桌面端（>= 1024px）
 */
export function useResponsive() {
  return globalState;
}

export default { useResponsive, BREAKPOINTS };
