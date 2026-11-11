/**
 * 进销存模块 - 报表分析与系统管理 (English)
 *
 * Mirrors report.zh-cn.ts — keep both files structurally identical.
 *
 * Key path: message.inv.report.<page>.<group>.<field>
 *
 * Note: option `value` fields are the raw identifiers persisted by the API
 * (e.g. "IT部"), so they stay identical across locales; only `label` is translated.
 *
 * charts.unit carries the money tick configuration per locale:
 * scale is the divisor and suffix the tick suffix (en uses "K" = 1000).
 */
export default {
  report: {
    salesReport: {
      title: "Sales Analysis",
      desc: "Sales trends, rankings and gross margin analysis",
      search: {},
      columns: {
        rank: "Rank",
        productName: "Product Name",
        quantity: "Quantity Sold",
        amount: "Sales Amount",
        profit: "Gross Profit",
        profitRate: "Gross Margin",
      },
      form: {},
      actions: {},
      messages: {},
      options: {
        // Sales categories: value is the category name stored by the API
        // products are the raw product names belonging to the category (untranslated)
        category: {
          electronics: {
            value: "电子产品",
            label: "Electronics",
            products: [
              "笔记本电脑 Pro 15",
              "27寸4K显示器",
              "USB-C 扩展坞",
              "机械键盘 K870",
              "无线鼠标 M200",
            ],
          },
          officeSupply: {
            value: "办公耗材",
            label: "Office Supplies",
            products: ["中性笔 0.5mm 黑色", "A4打印纸 80g"],
          },
          officeFurniture: {
            value: "办公家具",
            label: "Office Furniture",
            products: ["办公椅 人体工学"],
          },
        },
      },
      charts: {
        trendTitle: "Sales Trend Analysis",
        pieTitle: "Sales by Category",
        rankingTitle: "Product Sales Ranking",
        legend: {
          salesAmount: "Sales Amount",
          profit: "Profit",
          orderCount: "Order Count",
        },
        axis: {
          amount: "Amount (CNY)",
          orderCount: "Order Count",
        },
        unit: {
          scale: 1000,
          suffix: "K",
        },
      },
    },

    inventoryReport: {
      title: "Inventory Report",
      desc: "Summary analysis of purchases, sales and inventory",
      search: {},
      columns: {
        productCode: "Product Code",
        productName: "Product Name",
        spec: "Specification",
        unitName: "Unit",
        // Group headers (Opening / Purchases / Sales / Closing)
        groupBegin: "Opening",
        groupPurchase: "Purchases",
        groupSale: "Sales",
        groupEnd: "Closing",
        // Child columns under each group
        quantity: "Quantity",
        amount: "Amount",
      },
      form: {},
      actions: {
        export: "Export",
        summaryTitle: "Inventory Summary",
        totalPurchase: "Total Purchases",
        totalSale: "Total Sales",
        totalInventory: "Inventory Value",
        totalProfit: "Gross Profit",
      },
      messages: {
        total: "Total",
        exportTip: "Export is under development",
        countUnit: "{count} orders",
        profitRate: "Margin {rate}%",
      },
      options: {},
      charts: {},
    },

    users: {
      title: "User Management",
      desc: "Manage system users and role assignments",
      search: {
        keyword: { label: "Keyword", placeholder: "Username or nickname" },
        status: { label: "Status" },
      },
      columns: {
        username: "Username",
        nickname: "Display Name",
        department: "Department",
        roles: "Roles",
        phone: "Phone",
        email: "Email",
        lastLogin: "Last Login",
        status: "Status",
      },
      form: {
        username: { label: "Username", placeholder: "Enter the username" },
        nickname: { label: "Display Name", placeholder: "Enter the display name" },
        department: { label: "Department" },
        roles: { label: "Roles" },
        phone: { label: "Phone", placeholder: "Enter the phone number" },
        email: { label: "Email", placeholder: "Enter the email address" },
      },
      actions: {
        add: "Add User",
        editTitle: "Edit User",
        resetPassword: "Reset Password",
      },
      messages: {
        deleteConfirm: "Are you sure you want to delete this user?",
        resetPasswordSuccess:
          "The password for user {username} has been reset to the default password",
      },
      options: {
        // Departments: value is the Chinese department name stored by the API
        department: {
          it: { value: "IT部", label: "IT Dept" },
          purchasing: { value: "采购部", label: "Purchasing Dept" },
          sales: { value: "销售部", label: "Sales Dept" },
          warehousing: { value: "仓储部", label: "Warehousing Dept" },
          finance: { value: "财务部", label: "Finance Dept" },
          operation: { value: "运营部", label: "Operations Dept" },
        },
        // Roles: value is the role code stored by the API
        role: {
          admin: { value: "admin", label: "Administrator" },
          purchaser: { value: "purchaser", label: "Purchaser" },
          salesperson: { value: "salesperson", label: "Salesperson" },
          warehouse: { value: "warehouse", label: "Warehouse Manager" },
          finance: { value: "finance", label: "Finance Staff" },
          viewer: { value: "viewer", label: "Viewer" },
        },
      },
    },

    roles: {
      title: "Role Management",
      desc: "Manage system roles and their permissions",
      search: {
        keyword: { label: "Keyword", placeholder: "Role name or code" },
      },
      columns: {
        roleCode: "Role Code",
        roleName: "Role Name",
        description: "Description",
        userCount: "User Count",
        status: "Status",
        createdAt: "Created At",
      },
      form: {},
      actions: {},
      messages: {},
      options: {
        // Role names: value is the role code stored by the API
        role: {
          admin: { value: "admin", label: "Administrator" },
          purchaser: { value: "purchaser", label: "Purchaser" },
          salesperson: { value: "salesperson", label: "Salesperson" },
          warehouse: { value: "warehouse", label: "Warehouse Manager" },
          finance: { value: "finance", label: "Finance Staff" },
          viewer: { value: "viewer", label: "Viewer" },
        },
        // Role descriptions: value is the role code stored by the API
        roleDescription: {
          admin: { value: "admin", label: "Full access to all system features" },
          purchaser: { value: "purchaser", label: "Permissions related to purchasing" },
          salesperson: { value: "salesperson", label: "Permissions related to sales" },
          warehouse: { value: "warehouse", label: "Permissions related to inventory" },
          finance: { value: "finance", label: "Permissions related to treasury" },
          viewer: { value: "viewer", label: "Read-only access" },
        },
      },
    },

    logs: {
      title: "Operation Logs",
      desc: "Query system operation records",
      search: {
        keyword: { label: "Keyword", placeholder: "Operator or operation" },
        module: { label: "Module" },
        dateRange: { label: "Date" },
      },
      columns: {
        username: "Operator",
        module: "Module",
        action: "Action",
        description: "Description",
        ip: "IP Address",
        createdAt: "Operation Time",
      },
      form: {},
      actions: {},
      messages: {},
      options: {
        // Log modules: value is the Chinese module name stored by the API
        module: {
          purchase: { value: "采购管理", label: "Purchasing" },
          sale: { value: "销售管理", label: "Sales" },
          inventory: { value: "库存管理", label: "Inventory" },
          basic: { value: "基础资料", label: "Master Data" },
          fund: { value: "资金管理", label: "Treasury" },
          system: { value: "系统管理", label: "System" },
        },
      },
    },
  },
};
