/**
 * 进销存模块 - 库存与资金管理 (English)
 *
 * Mirrors stock.zh-cn.ts — keep both files structurally identical.
 *
 * Key path: message.inv.stock.<page>.<group>.<field>
 *
 * Note: option `value` fields are the raw identifiers persisted by the API
 * (e.g. "银行转账"), so they stay identical across locales; only `label` is translated.
 */
export default {
  stock: {
    stockQuery: {
      title: "Stock Query",
      desc: "Monitor real-time stock levels across all warehouses",
      search: {
        keyword: { label: "Keyword", placeholder: "Product code or name" },
        warehouse: { label: "Warehouse" },
        lowStock: { label: "Low Stock" },
      },
      columns: {
        productCode: "Product Code",
        productName: "Product Name",
        spec: "Specification",
        warehouseName: "Warehouse",
        batchNo: "Batch No.",
        quantity: "On Hand",
        lockedQuantity: "Locked",
        availableQuantity: "Available",
        avgCost: "Avg. Cost",
        totalValue: "Stock Value",
        // Stock transaction drawer
        transNo: "Transaction No.",
        transType: "Type",
        transQuantity: "Quantity",
        transBalance: "Balance",
        transSourceNo: "Source No.",
        transOperator: "Operator",
        transTime: "Time",
      },
      form: {},
      actions: {
        transactions: "Transactions",
        transactionsTitle: "Stock Transactions",
      },
      messages: {},
      options: {
        lowStock: {
          yes: { value: "true", label: "Yes" },
          no: { value: "false", label: "No" },
        },
        // Matched against the API `type` code; falls back to the API `typeName` when unmatched
        transactionType: {
          purchaseIn: { value: "purchase_in", label: "Purchase Inbound" },
          saleOut: { value: "sale_out", label: "Sales Outbound" },
        },
      },
    },

    stockTakes: {
      title: "Stock Take",
      desc: "Manage stock take sheets and post gains and losses",
      search: {
        keyword: { label: "Keyword", placeholder: "Stock take no. or warehouse" },
        status: { label: "Status" },
      },
      columns: {
        takeNo: "Stock Take No.",
        warehouseName: "Warehouse",
        takeDate: "Take Date",
        totalItems: "Items Counted",
        gainItems: "Gains",
        lossItems: "Losses",
        totalGainAmount: "Gain Amount",
        totalLossAmount: "Loss Amount",
        status: "Status",
        // Stock take detail table
        productCode: "Product Code",
        productName: "Product Name",
        bookQuantity: "Book Qty",
        actualQuantity: "Counted Qty",
        diffQuantity: "Variance",
        unitCost: "Unit Cost",
        diffAmount: "Variance Amount",
      },
      form: {
        takeNo: { label: "Stock Take No." },
        warehouseName: { label: "Warehouse" },
        takeDate: { label: "Take Date" },
        totalItems: { label: "Items Counted" },
        gainItems: { label: "Gain Items" },
        lossItems: { label: "Loss Items" },
        status: { label: "Status" },
        createdBy: { label: "Operator" },
        remark: { label: "Remarks" },
      },
      actions: {
        detailTitle: "Stock Take Details",
        itemsTitle: "Counted Items",
      },
      messages: {
        approveConfirm: "Approving this stock take will adjust inventory automatically. Continue?",
        confirmTitle: "Notice",
        approveSuccess: "Approved successfully",
      },
      options: {},
    },

    stockTransfers: {
      title: "Stock Transfer",
      desc: "Manage stock transfers between warehouses",
      search: {
        keyword: { label: "Keyword", placeholder: "Transfer no." },
        status: { label: "Status" },
      },
      columns: {
        transferNo: "Transfer No.",
        fromWarehouseName: "From Warehouse",
        toWarehouseName: "To Warehouse",
        transferDate: "Transfer Date",
        totalAmount: "Transfer Amount",
        status: "Status",
        createdBy: "Operator",
        createdAt: "Created At",
        // Transfer detail table
        productCode: "Product Code",
        productName: "Product Name",
        quantity: "Quantity",
        unitCost: "Unit Cost",
        amount: "Amount",
      },
      form: {
        transferNo: { label: "Transfer No." },
        status: { label: "Status" },
        fromWarehouseName: { label: "From Warehouse" },
        toWarehouseName: { label: "To Warehouse" },
        transferDate: { label: "Transfer Date" },
        totalAmount: { label: "Transfer Amount" },
        createdBy: { label: "Operator" },
        remark: { label: "Remarks" },
      },
      actions: {
        detailTitle: "Transfer Details",
        itemsTitle: "Transferred Items",
      },
      messages: {
        approveConfirm: "Approving this transfer will update inventory. Continue?",
        confirmTitle: "Notice",
        approveSuccess: "Approved successfully",
      },
      options: {
        // Pending keeps the API value "approved" but reads differently here
        status: {
          pending: { value: "approved", label: "Pending Approval" },
        },
      },
    },

    receivables: {
      title: "Accounts Receivable",
      desc: "Manage customer receivables with aging analysis",
      search: {
        keyword: { label: "Keyword", placeholder: "Receivable no. or customer" },
        status: { label: "Status" },
      },
      columns: {
        receivableNo: "Receivable No.",
        sourceNo: "Source No.",
        customerName: "Customer",
        receivableAmount: "Receivable Amount",
        settledAmount: "Settled",
        balance: "Balance",
        billingDate: "Billing Date",
        dueDate: "Due Date",
        status: "Status",
      },
      form: {},
      actions: {
        totalReceivable: "Total Receivable",
        totalOverdue: "Total Overdue",
      },
      messages: {},
      options: {},
    },

    payables: {
      title: "Accounts Payable",
      desc: "Manage supplier payables with aging analysis",
      search: {
        keyword: { label: "Keyword", placeholder: "Payable no. or supplier" },
        status: { label: "Status" },
      },
      columns: {
        payableNo: "Payable No.",
        sourceNo: "Source No.",
        supplierName: "Supplier",
        payableAmount: "Payable Amount",
        settledAmount: "Settled",
        balance: "Balance",
        billingDate: "Billing Date",
        dueDate: "Due Date",
        status: "Status",
      },
      form: {},
      actions: {
        totalPayable: "Total Payable",
        totalOverdue: "Total Overdue",
      },
      messages: {},
      options: {},
    },

    receipts: {
      title: "Receipt Management",
      desc: "Manage customer receipts and apply them to accounts receivable",
      search: {
        keyword: { label: "Keyword", placeholder: "Receipt no. or customer" },
        status: { label: "Status" },
      },
      columns: {
        receiptNo: "Receipt No.",
        customerName: "Customer",
        accountName: "Receipt Account",
        receiptDate: "Receipt Date",
        amount: "Amount",
        paymentMethod: "Payment Method",
        status: "Status",
        createdBy: "Operator",
        // Settlement detail table
        receivableNo: "Receivable No.",
        receivableAmount: "Receivable Amount",
        settledAmount: "Settled",
        thisSettleAmount: "Settled This Time",
        balance: "Balance",
      },
      form: {
        receiptNo: { label: "Receipt No." },
        status: { label: "Status" },
        customerName: { label: "Customer" },
        accountName: { label: "Receipt Account" },
        receiptDate: { label: "Receipt Date" },
        amount: { label: "Amount" },
        paymentMethod: { label: "Payment Method" },
        createdBy: { label: "Operator" },
        remark: { label: "Remarks" },
      },
      actions: {
        detailTitle: "Receipt Details",
        itemsTitle: "Settlement Details",
      },
      messages: {},
      options: {
        // The payment method is a Chinese value persisted by the API; only the label is translated
        paymentMethod: {
          bankTransfer: { value: "银行转账", label: "Bank Transfer" },
          cash: { value: "现金", label: "Cash" },
        },
      },
    },

    payments: {
      title: "Payment Management",
      desc: "Manage supplier payments and apply them to accounts payable",
      search: {
        keyword: { label: "Keyword", placeholder: "Payment no. or supplier" },
        status: { label: "Status" },
      },
      columns: {
        paymentNo: "Payment No.",
        supplierName: "Supplier",
        accountName: "Payment Account",
        paymentDate: "Payment Date",
        amount: "Amount",
        paymentMethod: "Payment Method",
        status: "Status",
        createdBy: "Operator",
        // Settlement detail table
        payableNo: "Payable No.",
        payableAmount: "Payable Amount",
        settledAmount: "Settled",
        thisSettleAmount: "Settled This Time",
        balance: "Balance",
      },
      form: {
        paymentNo: { label: "Payment No." },
        status: { label: "Status" },
        supplierName: { label: "Supplier" },
        accountName: { label: "Payment Account" },
        paymentDate: { label: "Payment Date" },
        amount: { label: "Amount" },
        paymentMethod: { label: "Payment Method" },
        createdBy: { label: "Operator" },
        remark: { label: "Remarks" },
      },
      actions: {
        detailTitle: "Payment Details",
        itemsTitle: "Settlement Details",
      },
      messages: {},
      options: {
        // The payment method is a Chinese value persisted by the API; only the label is translated
        paymentMethod: {
          bankTransfer: { value: "银行转账", label: "Bank Transfer" },
          cash: { value: "现金", label: "Cash" },
        },
      },
    },
  },
};
