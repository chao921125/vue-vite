/**
 * 表格列元信息提取
 *
 * 业务页面通过 <ProTable> 的默认插槽传入 <el-table-column> 子节点，
 * 本工具在不改动业务页面的前提下，从插槽 VNode 中推导列定义，
 * 供移动端卡片模式渲染使用。
 *
 * 推导内容：
 *   - prop / label / align / width / minWidth / type 等列属性
 *   - 自定义单元格渲染函数（业务列若提供了 #default 插槽）
 */
import { computed, useSlots, type VNode } from "vue";
import { useI18n } from "vue-i18n";

export interface TableColumnMeta {
  /** 字段名 */
  prop?: string;
  /** 列标题 */
  label?: string;
  /** 对齐方式 */
  align?: string;
  /** 列宽 */
  width?: number | string;
  /** 最小列宽 */
  minWidth?: number | string;
  /** 列类型：selection / index / expand / default */
  type?: string;
  /** 是否固定列 */
  fixed?: boolean | string;
  /** 自定义单元格渲染函数（无则按 prop 取值） */
  render?: (scope: any) => any;
}

/** 是否为 el-table-column 节点 */
const isTableColumn = (vnode: VNode): boolean => {
  const type = vnode.type as any;
  if (!type) return false;
  if (typeof type === "string") return type === "el-table-column";
  return type.name === "ElTableColumn" || type.__name === "ElTableColumn";
};

/**
 * 提取业务列定义
 * @returns 按业务页面声明顺序排列的列元信息
 */
export function useTableColumns() {
  const slots = useSlots();
  // 列 label 由业务侧 $t() 生成，显式订阅全局语言
  const { locale } = useI18n({ useScope: "global" });

  const columns = computed<TableColumnMeta[]>(() => {
    // 插槽 VNode 本身不是响应式对象，仅靠隐式依赖无法保证「运行时切换语言」时
    // 重新推导列元信息，这里读取 locale 建立明确依赖，确保移动端卡片列标题同步更新。
    void locale.value;

    const vnodes = slots.default?.() ?? [];
    const result: TableColumnMeta[] = [];

    for (const vnode of vnodes) {
      if (!vnode || typeof vnode !== "object") continue;
      if (!isTableColumn(vnode)) continue;

      const props = (vnode.props ?? {}) as Record<string, any>;
      // 具名插槽形式：{ default: fn }；文本子节点形式：数组
      const children = vnode.children as any;
      const render =
        children && !Array.isArray(children) && typeof children.default === "function"
          ? children.default
          : undefined;

      result.push({
        prop: props.prop ?? props.property,
        label: props.label,
        align: props.align,
        width: props.width,
        minWidth: props.minWidth,
        type: props.type,
        fixed: props.fixed,
        render,
      });
    }

    return result;
  });

  return { columns };
}

export default { useTableColumns };
