/**
 * 进销存模块 - 工作台 (English)
 *
 * Mirrors dashboard.zh-cn.ts — keep both files structurally identical.
 *
 * Key path: message.inv.dashboard.<group>.<field>
 *
 * Note: todo.status holds the todo workflow's own state labels (they differ
 *      from the generic document statuses, e.g. "In progress" vs "Executing"),
 *      so they are defined here; todo.items holds the todo item copy, with
 *      order numbers and quantities supplied by the page via placeholders
 *      so both locales show the same raw values.
 *
 * charts.unit carries the money tick configuration per locale:
 * scale is the divisor and suffix the tick suffix (en uses "K" = 1000).
 */
export default {
  dashboard: {
    title: "Dashboard",
    desc: "Key metrics for sales, purchasing, inventory and finance",
    statCards: {
      totalSales: "Total Sales",
      totalPurchase: "Total Purchases",
      totalReceivable: "Accounts Receivable",
      totalPayable: "Accounts Payable",
      totalInventory: "Inventory Value",
      orderCount: "Orders This Month",
      // Supplementary note under a stat card, e.g. Monthly growth 15.6%
      monthlyGrowth: "Monthly growth {growth}%",
      // Unit suffix for the order count, e.g. 168 orders
      // The leading space is intentional: StatCard renders value and suffix
      // without a separator, and English needs one ("168 orders", not "168orders").
      orderUnit: " orders",
    },
    charts: {
      salesTrend: "Sales Trend",
      monthlySummary: "Monthly Summary",
      salesRank: "Top 5 by Sales",
      legend: {
        salesAmount: "Sales Amount",
        profit: "Profit",
      },
      axis: {
        amount: "Amount (CNY)",
      },
      unit: {
        scale: 1000,
        suffix: "K",
      },
    },
    todo: {
      title: "To-Do Items",
      status: {
        inProgress: "In Progress",
        pending: "Pending",
        pendingReview: "Pending Review",
        draft: "Draft",
      },
      items: {
        purchaseReceiving: {
          title: "Purchase order {orderNo} awaiting receipt",
          desc: "Shenzhen Electronics Manufacturing Co., Ltd. - partially received",
        },
        salesDelivery: {
          title: "Sales order {orderNo} awaiting delivery",
          desc: "Shenzhen Innovation Technology - {quantity} laptops",
        },
        inboundReview: {
          title: "Purchase receipt {orderNo} awaiting approval",
          desc: "Finance needs to confirm the inbound amount",
        },
        stockTaking: {
          title: "Stocktake {orderNo} awaiting entry",
          desc: "Headquarters warehouse - {count} items to be counted",
        },
      },
    },
    warning: {
      title: "Stock Warnings",
      count: "{count} alerts",
      columns: {
        productCode: "Product Code",
        productName: "Product Name",
        warehouseName: "Warehouse",
        availableQuantity: "Available Stock",
        status: "Status",
      },
      status: {
        critical: "Critically Low",
        low: "Low Stock",
      },
    },
  },
};
