/**
 * 进销存模块 - 采购/销售单据（简体中文）
 *
 * 页面分组：purchaseOrders / purchaseReceipts / salesOrders / salesDeliveries
 * 键路径：message.inv.trade.<页面key>.<分组>.<字段>
 *
 * 分组说明：
 *   title / desc - 页面标题与描述
 *   search       - 查询区字段（label / placeholder）
 *   columns      - 表格列标题（列表表格 + 详情抽屉内的明细表格）
 *   form         - 详情抽屉字段标签（label）
 *   actions      - 页面级操作文案（按钮、抽屉标题、明细标题）
 *   messages     - 页面级提示文案（确认框、结果提示、汇总行文案）
 *   options      - 下拉选项（按业务编码分键，value 为接口存储值，label 为展示文案）
 *
 * 公共文案（查询/新增/编辑/删除/详情/审核等）复用 message.inv.common.*，
 * 单据状态文案复用 message.inv.status.*，此处不再重复定义。
 *
 * 注意：options 中的 value 与接口存储值保持一致（不随语言变化），
 *      仅 label 做翻译。
 */
export default {
  trade: {
    purchaseOrders: {
      title: "采购订单",
      desc: "管理采购订单全生命周期",
      search: {
        keyword: { label: "关键词", placeholder: "订单号/供应商" },
        status: { label: "状态" },
        dateRange: { label: "日期" },
      },
      columns: {
        orderNo: "订单编号",
        supplierName: "供应商",
        warehouseName: "入库仓库",
        orderDate: "订单日期",
        expectedDate: "预计到货",
        totalAmountWithTax: "含税总额",
        receivedProgress: "收货进度",
        status: "状态",
        createdBy: "创建人",
        productCode: "商品编码",
        productName: "商品名称",
        spec: "规格",
        unitName: "单位",
        quantity: "数量",
        receivedQuantity: "已收",
        purchasePrice: "单价",
        taxRate: "税率",
        amount: "金额",
        amountWithTax: "含税金额",
      },
      form: {
        orderNo: { label: "订单编号" },
        supplierName: { label: "供应商" },
        warehouseName: { label: "入库仓库" },
        orderDate: { label: "订单日期" },
        expectedDate: { label: "预计到货" },
        status: { label: "状态" },
        totalAmount: { label: "不含税金额" },
        totalTax: { label: "税额" },
        totalAmountWithTax: { label: "含税总额" },
        createdBy: { label: "创建人" },
        createdAt: { label: "创建时间" },
        remark: { label: "备注" },
      },
      actions: {
        create: "新建采购订单",
        receipt: "入库",
        detailTitle: "采购订单详情",
        itemsTitle: "订单明细",
      },
      messages: {
        approveConfirm: "确定审核采购订单 {orderNo} 吗？",
        confirmTitle: "提示",
        approveSuccess: "审核成功",
        receiptTip: "入库功能 - 订单号: {orderNo}",
        total: "合计",
      },
      options: {},
    },

    purchaseReceipts: {
      title: "采购入库",
      desc: "管理采购入库单据",
      search: {
        keyword: { label: "关键词", placeholder: "入库单号/供应商" },
        status: { label: "状态" },
      },
      columns: {
        receiptNo: "入库单号",
        orderNo: "采购订单号",
        supplierName: "供应商",
        warehouseName: "入库仓库",
        receiptDate: "入库日期",
        totalAmount: "入库金额",
        status: "状态",
        operator: "操作人",
        productCode: "商品编码",
        productName: "商品名称",
        batchNo: "批次号",
        quantity: "数量",
        purchasePrice: "单价",
        amount: "金额",
      },
      form: {
        receiptNo: { label: "入库单号" },
        orderNo: { label: "采购订单" },
        supplierName: { label: "供应商" },
        warehouseName: { label: "入库仓库" },
        receiptDate: { label: "入库日期" },
        status: { label: "状态" },
        totalAmount: { label: "入库金额" },
        operator: { label: "操作人" },
        remark: { label: "备注" },
      },
      actions: {
        approveReceipt: "审核入库",
        detailTitle: "入库单详情",
        itemsTitle: "入库明细",
      },
      messages: {
        approveConfirm: "审核入库后将更新库存并生成应付账款，确定吗？",
        confirmTitle: "提示",
        approveSuccess: "审核入库成功",
        total: "合计",
      },
      options: {
        // 待审核沿用接口存储值 approved，展示文案与通用状态不同，故单独定义
        status: {
          pending: { value: "approved", label: "待审核" },
        },
      },
    },

    salesOrders: {
      title: "销售订单",
      desc: "管理销售订单全生命周期",
      search: {
        keyword: { label: "关键词", placeholder: "订单号/客户" },
        status: { label: "状态" },
        dateRange: { label: "日期" },
      },
      columns: {
        orderNo: "订单编号",
        customerName: "客户",
        warehouseName: "发货仓库",
        orderDate: "订单日期",
        deliveryDate: "交货日期",
        totalAmountWithTax: "含税总额",
        deliveredProgress: "发货进度",
        status: "状态",
        productCode: "商品编码",
        productName: "商品名称",
        spec: "规格",
        unitName: "单位",
        quantity: "数量",
        deliveredQuantity: "已发",
        salePrice: "单价",
        taxRate: "税率",
        amount: "金额",
        amountWithTax: "含税金额",
      },
      form: {
        orderNo: { label: "订单编号" },
        customerName: { label: "客户" },
        warehouseName: { label: "发货仓库" },
        orderDate: { label: "订单日期" },
        deliveryDate: { label: "交货日期" },
        status: { label: "状态" },
        totalAmount: { label: "不含税金额" },
        totalTax: { label: "税额" },
        totalAmountWithTax: { label: "含税总额" },
        createdBy: { label: "创建人" },
        createdAt: { label: "创建时间" },
        remark: { label: "备注" },
      },
      actions: {
        create: "新建销售订单",
        delivery: "出库",
        detailTitle: "销售订单详情",
        itemsTitle: "订单明细",
      },
      messages: {
        approveConfirm: "确定审核销售订单 {orderNo} 吗？审核后将锁定库存",
        confirmTitle: "提示",
        approveSuccess: "审核成功",
        deliveryTip: "出库功能 - 订单号: {orderNo}",
        total: "合计",
      },
      options: {},
    },

    salesDeliveries: {
      title: "销售出库",
      desc: "管理销售出库单据",
      search: {
        keyword: { label: "关键词", placeholder: "出库单号/客户" },
        status: { label: "状态" },
      },
      columns: {
        deliveryNo: "出库单号",
        orderNo: "销售订单号",
        customerName: "客户",
        warehouseName: "发货仓库",
        deliveryDate: "出库日期",
        totalAmount: "出库金额",
        status: "状态",
        operator: "操作人",
        productCode: "商品编码",
        productName: "商品名称",
        batchNo: "批次号",
        quantity: "数量",
        salePrice: "单价",
        amount: "金额",
      },
      form: {
        deliveryNo: { label: "出库单号" },
        orderNo: { label: "销售订单" },
        customerName: { label: "客户" },
        warehouseName: { label: "发货仓库" },
        deliveryDate: { label: "出库日期" },
        status: { label: "状态" },
        totalAmount: { label: "出库金额" },
        operator: { label: "操作人" },
        remark: { label: "备注" },
      },
      actions: {
        approveDelivery: "审核出库",
        detailTitle: "出库单详情",
        itemsTitle: "出库明细",
      },
      messages: {
        approveConfirm: "审核出库后将扣减库存并生成应收账款，确定吗？",
        confirmTitle: "提示",
        approveSuccess: "审核出库成功",
      },
      options: {
        // 待审核沿用接口存储值 approved，展示文案与通用状态不同，故单独定义
        status: {
          pending: { value: "approved", label: "待审核" },
        },
      },
    },
  },
};
