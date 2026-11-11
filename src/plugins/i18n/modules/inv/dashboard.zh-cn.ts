/**
 * 进销存模块 - 工作台（简体中文）
 *
 * 页面分组：dashboard
 * 键路径：message.inv.dashboard.<分组>.<字段>
 *
 * 分组说明：
 *   title / desc - 页面标题与描述
 *   statCards    - 顶部统计卡片（label / extra 说明文案 / 数量单位）
 *   charts       - 图表卡片（卡片标题、图例、坐标轴名称、金额刻度）
 *   todo         - 待办事项（卡片标题、事项状态标签、事项文案）
 *   warning      - 库存预警（卡片标题、数量文案、表格列标题、预警状态标签）
 *
 * 公共文案（查询/新增/编辑/删除等）复用 message.inv.common.*，
 * 单据状态文案复用 message.inv.status.*，此处不再重复定义。
 *
 * 注意：todo.status 为待办流程自身的状态标签，与通用单据状态措辞不同
 *      （「进行中」对应通用状态的「执行中」），故在本模块内单独定义。
 *      todo.items 的单号、件数等原始值由页面按占位符传入，两种语言一致。
 *
 * charts.unit 为金额刻度配置：scale 为换算基数，suffix 为刻度后缀，
 * 由各语言按习惯给出（中文「万」= 10000，英文「K」= 1000）。
 */
export default {
  dashboard: {
    title: "工作台",
    desc: "总览销售、采购、库存与资金等核心经营指标",
    statCards: {
      totalSales: "销售总额",
      totalPurchase: "采购总额",
      totalReceivable: "应收账款",
      totalPayable: "应付账款",
      totalInventory: "库存总值",
      orderCount: "本月订单",
      // 统计卡片下方的补充说明，如：本月增长 15.6%
      monthlyGrowth: "本月增长 {growth}%",
      // 订单数量的单位后缀，如：168 笔
      orderUnit: "笔",
    },
    charts: {
      salesTrend: "销售趋势",
      monthlySummary: "月度汇总",
      salesRank: "销售排行 TOP5",
      legend: {
        salesAmount: "销售额",
        profit: "利润",
      },
      axis: {
        amount: "金额(元)",
      },
      unit: {
        scale: 10000,
        suffix: "万",
      },
    },
    todo: {
      title: "待办事项",
      status: {
        inProgress: "进行中",
        pending: "待处理",
        pendingReview: "待审核",
        draft: "草稿",
      },
      items: {
        purchaseReceiving: {
          title: "采购订单 {orderNo} 待收货",
          desc: "深圳电子制造有限公司 - 部分收货中",
        },
        salesDelivery: {
          title: "销售订单 {orderNo} 待发货",
          desc: "深圳创新科技 - {quantity}台笔记本电脑",
        },
        inboundReview: {
          title: "采购入库单 {orderNo} 待审核",
          desc: "需财务确认入库金额",
        },
        stockTaking: {
          title: "库存盘点单 {orderNo} 待录入",
          desc: "总部仓库 - {count}项商品待盘点",
        },
      },
    },
    warning: {
      title: "库存预警",
      count: "{count} 项",
      columns: {
        productCode: "商品编码",
        productName: "商品名称",
        warehouseName: "仓库",
        availableQuantity: "可用库存",
        status: "状态",
      },
      status: {
        critical: "严重不足",
        low: "库存不足",
      },
    },
  },
};
