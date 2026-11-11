/**
 * 进销存模块 - 公共文案（简体中文）
 *
 * 归类说明：
 *   common - 各业务页面共用的操作/表单文案
 *   status - 业务单据状态文案（StatusTag 组件使用）
 *
 * 页面级文案按业务模块拆分，见同目录下的其他语言包文件。
 */
export default {
  common: {
    search: "查询",
    reset: "重置",
    add: "新增",
    edit: "编辑",
    delete: "删除",
    detail: "详情",
    refresh: "刷新",
    index: "序号",
    action: "操作",
    confirm: "确定",
    cancel: "取消",
    save: "保存",
    close: "关闭",
    approve: "审核",
    inputPlaceholder: "请输入{label}",
    selectPlaceholder: "请选择{label}",
    dateStart: "开始日期",
    dateEnd: "结束日期",
    dateSeparator: "至",
    success: {
      create: "新增成功",
      update: "修改成功",
      delete: "删除成功",
      operate: "操作成功",
    },
    error: {
      load: "数据加载失败，请稍后重试",
    },
  },
  status: {
    draft: "草稿",
    pending: "待审核",
    approved: "已审核",
    in_progress: "执行中",
    rejected: "已驳回",
    closed: "已关闭",
    completed: "已完成",
    cancelled: "已取消",
    enabled: "启用",
    disabled: "停用",
    unsettled: "未核销",
    partial: "部分核销",
    settled: "已核销",
    overdue: "已逾期",
  },
};
