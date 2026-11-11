/**
 * 进销存模块 - 采购/销售单据 (English)
 *
 * Mirrors trade.zh-cn.ts — keep both files structurally identical.
 *
 * Key path: message.inv.trade.<page>.<group>.<field>
 *
 * Note: option `value` fields are the raw identifiers persisted by the API
 * (e.g. "approved"), so they stay identical across locales; only `label` is translated.
 */
export default {
  trade: {
    purchaseOrders: {
      title: "Purchase Orders",
      desc: "Manage the full lifecycle of purchase orders",
      search: {
        keyword: { label: "Keyword", placeholder: "Order No. or supplier" },
        status: { label: "Status" },
        dateRange: { label: "Date" },
      },
      columns: {
        orderNo: "Order No.",
        supplierName: "Supplier",
        warehouseName: "Inbound Warehouse",
        orderDate: "Order Date",
        expectedDate: "Expected Arrival",
        totalAmountWithTax: "Total Incl. Tax",
        receivedProgress: "Received Progress",
        status: "Status",
        createdBy: "Created By",
        productCode: "Product Code",
        productName: "Product Name",
        spec: "Specification",
        unitName: "Unit",
        quantity: "Qty",
        receivedQuantity: "Received",
        purchasePrice: "Unit Price",
        taxRate: "Tax Rate",
        amount: "Amount",
        amountWithTax: "Amount Incl. Tax",
      },
      form: {
        orderNo: { label: "Order No." },
        supplierName: { label: "Supplier" },
        warehouseName: { label: "Inbound Warehouse" },
        orderDate: { label: "Order Date" },
        expectedDate: { label: "Expected Arrival" },
        status: { label: "Status" },
        totalAmount: { label: "Amount Excl. Tax" },
        totalTax: { label: "Tax Amount" },
        totalAmountWithTax: { label: "Total Incl. Tax" },
        createdBy: { label: "Created By" },
        createdAt: { label: "Created At" },
        remark: { label: "Remarks" },
      },
      actions: {
        create: "New Purchase Order",
        receipt: "Receive",
        detailTitle: "Purchase Order Details",
        itemsTitle: "Order Items",
      },
      messages: {
        approveConfirm: "Are you sure you want to approve purchase order {orderNo}?",
        confirmTitle: "Notice",
        approveSuccess: "Approved successfully",
        receiptTip: "Receiving - Order No.: {orderNo}",
        total: "Total",
      },
      options: {},
    },

    purchaseReceipts: {
      title: "Purchase Receipts",
      desc: "Manage purchase receipt documents",
      search: {
        keyword: { label: "Keyword", placeholder: "Receipt No. or supplier" },
        status: { label: "Status" },
      },
      columns: {
        receiptNo: "Receipt No.",
        orderNo: "Purchase Order No.",
        supplierName: "Supplier",
        warehouseName: "Inbound Warehouse",
        receiptDate: "Receipt Date",
        totalAmount: "Receipt Amount",
        status: "Status",
        operator: "Operator",
        productCode: "Product Code",
        productName: "Product Name",
        batchNo: "Batch No.",
        quantity: "Qty",
        purchasePrice: "Unit Price",
        amount: "Amount",
      },
      form: {
        receiptNo: { label: "Receipt No." },
        orderNo: { label: "Purchase Order" },
        supplierName: { label: "Supplier" },
        warehouseName: { label: "Inbound Warehouse" },
        receiptDate: { label: "Receipt Date" },
        status: { label: "Status" },
        totalAmount: { label: "Receipt Amount" },
        operator: { label: "Operator" },
        remark: { label: "Remarks" },
      },
      actions: {
        approveReceipt: "Approve Receipt",
        detailTitle: "Receipt Details",
        itemsTitle: "Receipt Items",
      },
      messages: {
        approveConfirm:
          "Approving this receipt will update inventory and create a payable. Continue?",
        confirmTitle: "Notice",
        approveSuccess: "Receipt approved successfully",
        total: "Total",
      },
      options: {
        // 待审核沿用接口存储值 approved，展示文案与通用状态不同，故单独定义
        status: {
          pending: { value: "approved", label: "Pending Approval" },
        },
      },
    },

    salesOrders: {
      title: "Sales Orders",
      desc: "Manage the full lifecycle of sales orders",
      search: {
        keyword: { label: "Keyword", placeholder: "Order No. or customer" },
        status: { label: "Status" },
        dateRange: { label: "Date" },
      },
      columns: {
        orderNo: "Order No.",
        customerName: "Customer",
        warehouseName: "Outbound Warehouse",
        orderDate: "Order Date",
        deliveryDate: "Delivery Date",
        totalAmountWithTax: "Total Incl. Tax",
        deliveredProgress: "Delivered Progress",
        status: "Status",
        productCode: "Product Code",
        productName: "Product Name",
        spec: "Specification",
        unitName: "Unit",
        quantity: "Qty",
        deliveredQuantity: "Delivered",
        salePrice: "Unit Price",
        taxRate: "Tax Rate",
        amount: "Amount",
        amountWithTax: "Amount Incl. Tax",
      },
      form: {
        orderNo: { label: "Order No." },
        customerName: { label: "Customer" },
        warehouseName: { label: "Outbound Warehouse" },
        orderDate: { label: "Order Date" },
        deliveryDate: { label: "Delivery Date" },
        status: { label: "Status" },
        totalAmount: { label: "Amount Excl. Tax" },
        totalTax: { label: "Tax Amount" },
        totalAmountWithTax: { label: "Total Incl. Tax" },
        createdBy: { label: "Created By" },
        createdAt: { label: "Created At" },
        remark: { label: "Remarks" },
      },
      actions: {
        create: "New Sales Order",
        delivery: "Ship",
        detailTitle: "Sales Order Details",
        itemsTitle: "Order Items",
      },
      messages: {
        approveConfirm:
          "Are you sure you want to approve sales order {orderNo}? Stock will be locked once approved.",
        confirmTitle: "Notice",
        approveSuccess: "Approved successfully",
        deliveryTip: "Shipping - Order No.: {orderNo}",
        total: "Total",
      },
      options: {},
    },

    salesDeliveries: {
      title: "Sales Deliveries",
      desc: "Manage sales delivery documents",
      search: {
        keyword: { label: "Keyword", placeholder: "Delivery No. or customer" },
        status: { label: "Status" },
      },
      columns: {
        deliveryNo: "Delivery No.",
        orderNo: "Sales Order No.",
        customerName: "Customer",
        warehouseName: "Outbound Warehouse",
        deliveryDate: "Delivery Date",
        totalAmount: "Delivery Amount",
        status: "Status",
        operator: "Operator",
        productCode: "Product Code",
        productName: "Product Name",
        batchNo: "Batch No.",
        quantity: "Qty",
        salePrice: "Unit Price",
        amount: "Amount",
      },
      form: {
        deliveryNo: { label: "Delivery No." },
        orderNo: { label: "Sales Order" },
        customerName: { label: "Customer" },
        warehouseName: { label: "Outbound Warehouse" },
        deliveryDate: { label: "Delivery Date" },
        status: { label: "Status" },
        totalAmount: { label: "Delivery Amount" },
        operator: { label: "Operator" },
        remark: { label: "Remarks" },
      },
      actions: {
        approveDelivery: "Approve Delivery",
        detailTitle: "Delivery Details",
        itemsTitle: "Delivery Items",
      },
      messages: {
        approveConfirm:
          "Approving this delivery will deduct inventory and create a receivable. Continue?",
        confirmTitle: "Notice",
        approveSuccess: "Delivery approved successfully",
      },
      options: {
        // 待审核沿用接口存储值 approved，展示文案与通用状态不同，故单独定义
        status: {
          pending: { value: "approved", label: "Pending Approval" },
        },
      },
    },
  },
};
