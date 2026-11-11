<script lang="ts">
/**
 * 表格单元格渲染器
 *
 * 移动端卡片模式下，复用业务页面 <el-table-column> 中声明的自定义单元格渲染逻辑，
 * 保证移动端与 PC 端展示完全一致（如金额格式化、状态标签、进度条等）。
 *
 * 渲染方式与 Element Plus 表格内部一致：调用列的默认插槽函数并渲染其返回的 VNode。
 */
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "TableCell",
  props: {
    /** 列的默认插槽渲染函数 */
    render: {
      type: Function,
      required: true,
    },
    /** 插槽作用域，与 el-table-column 保持一致 */
    scope: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const vnodes = props.render(props.scope) as any;
      return h("span", { class: "inv-table-cell" }, Array.isArray(vnodes) ? vnodes : [vnodes]);
    };
  },
});
</script>
