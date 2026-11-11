/**
 * 进销存模块 - 库存与资金管理（简体中文）
 *
 * 页面分组：stockQuery / stockTakes / stockTransfers / receivables / payables / receipts / payments
 * 键路径：message.inv.stock.<页面key>.<分组>.<字段>
 *
 * 分组说明：
 *   title / desc - 页面标题与描述
 *   search       - 查询区字段（label / placeholder）
 *   columns      - 表格列标题（主表 + 详情抽屉内的明细表）
 *   form         - 详情抽屉内的字段标题（el-descriptions-item 的 label，placeholder 可选）
 *   actions      - 页面级操作文案（按钮、抽屉标题、明细区标题、页头汇总标签）
 *   messages     - 页面级提示文案（ElMessage / ElMessageBox）
 *   options      - 下拉选项（按业务编码分键，value 为接口存储值，label 为展示文案）
 *
 * 公共文案（查询/新增/编辑/删除/详情/审核等）复用 message.inv.common.*，
 * 单据状态文案复用 message.inv.status.*，此处不再重复定义。
 *
 * 注意：options 中的 value 与接口存储值保持一致（不随语言变化），
 *      仅 label 做翻译。
 */
export default {
  stock: {
    stockQuery: {
      title: "库存查询",
      desc: "实时查询各仓库库存状况",
      search: {
        keyword: { label: "关键词", placeholder: "商品编码/名称" },
        warehouse: { label: "仓库" },
        lowStock: { label: "低库存" },
      },
      columns: {
        productCode: "商品编码",
        productName: "商品名称",
        spec: "规格",
        warehouseName: "仓库",
        batchNo: "批次号",
        quantity: "库存数量",
        lockedQuantity: "锁定数量",
        availableQuantity: "可用数量",
        avgCost: "平均成本",
        totalValue: "库存金额",
        // 库存流水抽屉
        transNo: "流水号",
        transType: "类型",
        transQuantity: "数量",
        transBalance: "结存",
        transSourceNo: "来源单号",
        transOperator: "操作人",
        transTime: "时间",
      },
      form: {},
      actions: {
        transactions: "流水",
        transactionsTitle: "库存流水",
      },
      messages: {},
      options: {
        lowStock: {
          yes: { value: "true", label: "是" },
          no: { value: "false", label: "否" },
        },
        // 流水类型按接口的 type 编码匹配，未命中时回退展示接口返回的 typeName
        transactionType: {
          purchaseIn: { value: "purchase_in", label: "采购入库" },
          saleOut: { value: "sale_out", label: "销售出库" },
        },
      },
    },

    stockTakes: {
      title: "库存盘点",
      desc: "管理库存盘点单据，处理盘盈盘亏",
      search: {
        keyword: { label: "关键词", placeholder: "盘点单号/仓库" },
        status: { label: "状态" },
      },
      columns: {
        takeNo: "盘点单号",
        warehouseName: "盘点仓库",
        takeDate: "盘点日期",
        totalItems: "盘点项",
        gainItems: "盘盈",
        lossItems: "盘亏",
        totalGainAmount: "盘盈金额",
        totalLossAmount: "盘亏金额",
        status: "状态",
        // 盘点明细表
        productCode: "商品编码",
        productName: "商品名称",
        bookQuantity: "账面数量",
        actualQuantity: "实际数量",
        diffQuantity: "差异数量",
        unitCost: "单位成本",
        diffAmount: "差异金额",
      },
      form: {
        takeNo: { label: "盘点单号" },
        warehouseName: { label: "盘点仓库" },
        takeDate: { label: "盘点日期" },
        totalItems: { label: "盘点项数" },
        gainItems: { label: "盘盈项数" },
        lossItems: { label: "盘亏项数" },
        status: { label: "状态" },
        createdBy: { label: "操作人" },
        remark: { label: "备注" },
      },
      actions: {
        detailTitle: "盘点单详情",
        itemsTitle: "盘点明细",
      },
      messages: {
        approveConfirm: "审核盘点单后将自动调整库存，确定吗？",
        confirmTitle: "提示",
        approveSuccess: "审核成功",
      },
      options: {},
    },

    stockTransfers: {
      title: "库存调拨",
      desc: "管理仓库间库存调拨",
      search: {
        keyword: { label: "关键词", placeholder: "调拨单号" },
        status: { label: "状态" },
      },
      columns: {
        transferNo: "调拨单号",
        fromWarehouseName: "调出仓库",
        toWarehouseName: "调入仓库",
        transferDate: "调拨日期",
        totalAmount: "调拨金额",
        status: "状态",
        createdBy: "操作人",
        createdAt: "创建时间",
        // 调拨明细表
        productCode: "商品编码",
        productName: "商品名称",
        quantity: "数量",
        unitCost: "单位成本",
        amount: "金额",
      },
      form: {
        transferNo: { label: "调拨单号" },
        status: { label: "状态" },
        fromWarehouseName: { label: "调出仓库" },
        toWarehouseName: { label: "调入仓库" },
        transferDate: { label: "调拨日期" },
        totalAmount: { label: "调拨金额" },
        createdBy: { label: "操作人" },
        remark: { label: "备注" },
      },
      actions: {
        detailTitle: "调拨单详情",
        itemsTitle: "调拨明细",
      },
      messages: {
        approveConfirm: "审核调拨单后将更新库存，确定吗？",
        confirmTitle: "提示",
        approveSuccess: "审核成功",
      },
      options: {
        // 待审核沿用接口存储值 approved，展示文案与通用状态不同，故单独定义
        status: {
          pending: { value: "approved", label: "待审核" },
        },
      },
    },

    receivables: {
      title: "应收账款",
      desc: "管理客户应收账款，支持账龄分析",
      search: {
        keyword: { label: "关键词", placeholder: "应收单号/客户" },
        status: { label: "状态" },
      },
      columns: {
        receivableNo: "应收单号",
        sourceNo: "来源单号",
        customerName: "客户",
        receivableAmount: "应收金额",
        settledAmount: "已核销",
        balance: "余额",
        billingDate: "账单日期",
        dueDate: "到期日期",
        status: "状态",
      },
      form: {},
      actions: {
        totalReceivable: "应收总额",
        totalOverdue: "逾期总额",
      },
      messages: {},
      options: {},
    },

    payables: {
      title: "应付账款",
      desc: "管理供应商应付账款，支持账龄分析",
      search: {
        keyword: { label: "关键词", placeholder: "应付单号/供应商" },
        status: { label: "状态" },
      },
      columns: {
        payableNo: "应付单号",
        sourceNo: "来源单号",
        supplierName: "供应商",
        payableAmount: "应付金额",
        settledAmount: "已核销",
        balance: "余额",
        billingDate: "账单日期",
        dueDate: "到期日期",
        status: "状态",
      },
      form: {},
      actions: {
        totalPayable: "应付总额",
        totalOverdue: "逾期总额",
      },
      messages: {},
      options: {},
    },

    receipts: {
      title: "收款管理",
      desc: "管理客户收款单据，核销应收账款",
      search: {
        keyword: { label: "关键词", placeholder: "收款单号/客户" },
        status: { label: "状态" },
      },
      columns: {
        receiptNo: "收款单号",
        customerName: "客户",
        accountName: "收款账户",
        receiptDate: "收款日期",
        amount: "收款金额",
        paymentMethod: "收款方式",
        status: "状态",
        createdBy: "操作人",
        // 核销明细表
        receivableNo: "应收单号",
        receivableAmount: "应收金额",
        settledAmount: "已核销",
        thisSettleAmount: "本次核销",
        balance: "余额",
      },
      form: {
        receiptNo: { label: "收款单号" },
        status: { label: "状态" },
        customerName: { label: "客户" },
        accountName: { label: "收款账户" },
        receiptDate: { label: "收款日期" },
        amount: { label: "收款金额" },
        paymentMethod: { label: "收款方式" },
        createdBy: { label: "操作人" },
        remark: { label: "备注" },
      },
      actions: {
        detailTitle: "收款单详情",
        itemsTitle: "核销明细",
      },
      messages: {},
      options: {
        // 收款方式为接口存储的中文值，此处仅翻译展示文案
        paymentMethod: {
          bankTransfer: { value: "银行转账", label: "银行转账" },
          cash: { value: "现金", label: "现金" },
        },
      },
    },

    payments: {
      title: "付款管理",
      desc: "管理供应商付款单据，核销应付账款",
      search: {
        keyword: { label: "关键词", placeholder: "付款单号/供应商" },
        status: { label: "状态" },
      },
      columns: {
        paymentNo: "付款单号",
        supplierName: "供应商",
        accountName: "付款账户",
        paymentDate: "付款日期",
        amount: "付款金额",
        paymentMethod: "付款方式",
        status: "状态",
        createdBy: "操作人",
        // 核销明细表
        payableNo: "应付单号",
        payableAmount: "应付金额",
        settledAmount: "已核销",
        thisSettleAmount: "本次核销",
        balance: "余额",
      },
      form: {
        paymentNo: { label: "付款单号" },
        status: { label: "状态" },
        supplierName: { label: "供应商" },
        accountName: { label: "付款账户" },
        paymentDate: { label: "付款日期" },
        amount: { label: "付款金额" },
        paymentMethod: { label: "付款方式" },
        createdBy: { label: "操作人" },
        remark: { label: "备注" },
      },
      actions: {
        detailTitle: "付款单详情",
        itemsTitle: "核销明细",
      },
      messages: {},
      options: {
        // 付款方式为接口存储的中文值，此处仅翻译展示文案
        paymentMethod: {
          bankTransfer: { value: "银行转账", label: "银行转账" },
          cash: { value: "现金", label: "现金" },
        },
      },
    },
  },
};
