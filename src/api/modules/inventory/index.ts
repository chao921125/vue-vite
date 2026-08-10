// ==================== 进销存系统 API 服务 ====================
// 基于文档中的 RESTful API 规范，开发阶段使用 Mock 数据

import * as mock from "./mockData";

// ========== Mock 请求工具 ==========

/** 模拟网络延迟 */
function delay(ms = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 模拟分页查询 */
function paginate<T>(
  list: T[],
  page = 1,
  pageSize = 20,
): { list: T[]; total: number; page: number; pageSize: number } {
  const start = (page - 1) * pageSize;
  return { list: list.slice(start, start + pageSize), total: list.length, page, pageSize };
}

/** 模拟成功响应 */
function success<T>(data: T): Promise<{ code: number; message: string; data: T }> {
  return delay().then(() => ({ code: 0, message: "操作成功", data }));
}

// ========== 基础资料 API ==========

export const productApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockProducts];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.productName.toLowerCase().includes(kw) || i.productCode.toLowerCase().includes(kw),
      );
    }
    if (params.categoryId) list = list.filter((i) => i.categoryId === Number(params.categoryId));
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockProducts.find((i) => i.id === id)),
  create: (data: any) => {
    const newItem = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mock.mockProducts.unshift(newItem);
    return success(newItem);
  },
  update: (id: number, data: any) => {
    const idx = mock.mockProducts.findIndex((i) => i.id === id);
    if (idx >= 0)
      mock.mockProducts[idx] = {
        ...mock.mockProducts[idx],
        ...data,
        updatedAt: new Date().toISOString(),
      };
    return success(mock.mockProducts[idx]);
  },
  remove: (id: number) => {
    const idx = mock.mockProducts.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockProducts.splice(idx, 1);
    return success({ id });
  },
  toggleStatus: (id: number) => {
    const item = mock.mockProducts.find((i) => i.id === id);
    if (item) item.status = item.status === "enabled" ? "disabled" : "enabled";
    return success(item);
  },
  categoryTree: () => {
    const buildTree = (items: any[], parentId = 0): any[] =>
      items
        .filter((i) => i.parentId === parentId)
        .map((i) => ({ ...i, children: buildTree(items, i.id) }));
    return success(buildTree(mock.mockCategories));
  },
};

export const warehouseApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockWarehouses];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) =>
          i.warehouseName.toLowerCase().includes(kw) || i.warehouseCode.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockWarehouses.find((i) => i.id === id)),
  create: (data: any) => {
    const newItem = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
    mock.mockWarehouses.unshift(newItem);
    return success(newItem);
  },
  update: (id: number, data: any) => {
    const idx = mock.mockWarehouses.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockWarehouses[idx] = { ...mock.mockWarehouses[idx], ...data };
    return success(mock.mockWarehouses[idx]);
  },
  remove: (id: number) => {
    const idx = mock.mockWarehouses.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockWarehouses.splice(idx, 1);
    return success({ id });
  },
  all: () => success(mock.mockWarehouses),
};

export const customerApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockCustomers];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) =>
          i.customerName.toLowerCase().includes(kw) || i.customerCode.toLowerCase().includes(kw),
      );
    }
    if (params.level) list = list.filter((i) => i.level === params.level);
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockCustomers.find((i) => i.id === id)),
  create: (data: any) => {
    const newItem = {
      ...data,
      id: Date.now(),
      creditBalance: data.creditLimit || 0,
      creditUsed: 0,
      createdAt: new Date().toISOString(),
    };
    mock.mockCustomers.unshift(newItem);
    return success(newItem);
  },
  update: (id: number, data: any) => {
    const idx = mock.mockCustomers.findIndex((i) => i.id === id);
    if (idx >= 0) {
      const item = mock.mockCustomers[idx];
      mock.mockCustomers[idx] = {
        ...item,
        ...data,
        creditBalance: (data.creditLimit || item.creditLimit) - item.creditUsed,
      };
    }
    return success(mock.mockCustomers[idx]);
  },
  remove: (id: number) => {
    const idx = mock.mockCustomers.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockCustomers.splice(idx, 1);
    return success({ id });
  },
  all: () => success(mock.mockCustomers.filter((i) => i.status === "enabled")),
};

export const supplierApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockSuppliers];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) =>
          i.supplierName.toLowerCase().includes(kw) || i.supplierCode.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockSuppliers.find((i) => i.id === id)),
  create: (data: any) => {
    const newItem = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
    mock.mockSuppliers.unshift(newItem);
    return success(newItem);
  },
  update: (id: number, data: any) => {
    const idx = mock.mockSuppliers.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockSuppliers[idx] = { ...mock.mockSuppliers[idx], ...data };
    return success(mock.mockSuppliers[idx]);
  },
  remove: (id: number) => {
    const idx = mock.mockSuppliers.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockSuppliers.splice(idx, 1);
    return success({ id });
  },
  all: () => success(mock.mockSuppliers.filter((i) => i.status === "enabled")),
};

export const unitApi = {
  list: () => success(mock.mockUnits),
};

export const brandApi = {
  list: () => success(mock.mockBrands),
};

// ========== 采购管理 API ==========

export const purchaseOrderApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockPurchaseOrders];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.orderNo.toLowerCase().includes(kw) || i.supplierName.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    if (params.supplierId) list = list.filter((i) => i.supplierId === Number(params.supplierId));
    if (params.startDate) list = list.filter((i) => i.orderDate >= params.startDate);
    if (params.endDate) list = list.filter((i) => i.orderDate <= params.endDate);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockPurchaseOrders.find((i) => i.id === id)),
  create: (data: any) => {
    const orderNo = `PO${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(mock.mockPurchaseOrders.length + 1).padStart(4, "0")}`;
    const newItem = {
      ...data,
      id: Date.now(),
      orderNo,
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    mock.mockPurchaseOrders.unshift(newItem);
    return success(newItem);
  },
  update: (id: number, data: any) => {
    const idx = mock.mockPurchaseOrders.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockPurchaseOrders[idx] = { ...mock.mockPurchaseOrders[idx], ...data };
    return success(mock.mockPurchaseOrders[idx]);
  },
  remove: (id: number) => {
    const idx = mock.mockPurchaseOrders.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockPurchaseOrders.splice(idx, 1);
    return success({ id });
  },
  approve: (id: number) => {
    const item = mock.mockPurchaseOrders.find((i) => i.id === id);
    if (item) item.status = "approved";
    return success(item);
  },
  reject: (id: number) => {
    const item = mock.mockPurchaseOrders.find((i) => i.id === id);
    if (item) item.status = "draft";
    return success(item);
  },
  close: (id: number) => {
    const item = mock.mockPurchaseOrders.find((i) => i.id === id);
    if (item) item.status = "closed";
    return success(item);
  },
};

export const purchaseReceiptApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockPurchaseReceipts];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.receiptNo.toLowerCase().includes(kw) || i.supplierName.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockPurchaseReceipts.find((i) => i.id === id)),
  approve: (id: number) => {
    const item = mock.mockPurchaseReceipts.find((i) => i.id === id);
    if (item) item.status = "completed";
    return success(item);
  },
};

// ========== 销售管理 API ==========

export const salesOrderApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockSalesOrders];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.orderNo.toLowerCase().includes(kw) || i.customerName.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    if (params.customerId) list = list.filter((i) => i.customerId === Number(params.customerId));
    if (params.startDate) list = list.filter((i) => i.orderDate >= params.startDate);
    if (params.endDate) list = list.filter((i) => i.orderDate <= params.endDate);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockSalesOrders.find((i) => i.id === id)),
  create: (data: any) => {
    const orderNo = `SO${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(mock.mockSalesOrders.length + 1).padStart(4, "0")}`;
    const newItem = {
      ...data,
      id: Date.now(),
      orderNo,
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    mock.mockSalesOrders.unshift(newItem);
    return success(newItem);
  },
  update: (id: number, data: any) => {
    const idx = mock.mockSalesOrders.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockSalesOrders[idx] = { ...mock.mockSalesOrders[idx], ...data };
    return success(mock.mockSalesOrders[idx]);
  },
  remove: (id: number) => {
    const idx = mock.mockSalesOrders.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockSalesOrders.splice(idx, 1);
    return success({ id });
  },
  approve: (id: number) => {
    const item = mock.mockSalesOrders.find((i) => i.id === id);
    if (item) item.status = "approved";
    return success(item);
  },
};

export const salesDeliveryApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockSalesDeliveries];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.deliveryNo.toLowerCase().includes(kw) || i.customerName.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockSalesDeliveries.find((i) => i.id === id)),
  approve: (id: number) => {
    const item = mock.mockSalesDeliveries.find((i) => i.id === id);
    if (item) item.status = "completed";
    return success(item);
  },
};

// ========== 库存管理 API ==========

export const inventoryApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockInventory];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.productName.toLowerCase().includes(kw) || i.productCode.toLowerCase().includes(kw),
      );
    }
    if (params.warehouseId) list = list.filter((i) => i.warehouseId === Number(params.warehouseId));
    if (params.lowStock === true || params.lowStock === "true") {
      list = list.filter((i) => i.availableQuantity < 20);
    }
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  transactions: (params: any = {}) => {
    let list = [...mock.mockInventoryTransactions];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.productName.toLowerCase().includes(kw) || i.productCode.toLowerCase().includes(kw),
      );
    }
    if (params.warehouseId) list = list.filter((i) => i.warehouseId === Number(params.warehouseId));
    if (params.type) list = list.filter((i) => i.type === params.type);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  warnings: () => {
    const list = mock.mockInventory
      .filter((i) => i.availableQuantity < 20)
      .map((i) => ({
        ...i,
        minStock: 20,
        warningLevel: i.availableQuantity < 10 ? "critical" : "warning",
      }));
    return success(list);
  },
};

export const stockTakeApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockStockTakes];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.takeNo.toLowerCase().includes(kw) || i.warehouseName.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockStockTakes.find((i) => i.id === id)),
  approve: (id: number) => {
    const item = mock.mockStockTakes.find((i) => i.id === id);
    if (item) item.status = "completed";
    return success(item);
  },
};

export const stockTransferApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockStockTransfers];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter((i) => i.transferNo.toLowerCase().includes(kw));
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockStockTransfers.find((i) => i.id === id)),
  approve: (id: number) => {
    const item = mock.mockStockTransfers.find((i) => i.id === id);
    if (item) item.status = "completed";
    return success(item);
  },
};

// ========== 资金管理 API ==========

export const accountApi = {
  list: () => success(mock.mockAccounts),
};

export const receivableApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockReceivables];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) =>
          i.customerName.toLowerCase().includes(kw) || i.receivableNo.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    if (params.customerId) list = list.filter((i) => i.customerId === Number(params.customerId));
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
};

export const payableApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockPayables];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.supplierName.toLowerCase().includes(kw) || i.payableNo.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    if (params.supplierId) list = list.filter((i) => i.supplierId === Number(params.supplierId));
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
};

export const receiptApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockReceipts];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.customerName.toLowerCase().includes(kw) || i.receiptNo.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockReceipts.find((i) => i.id === id)),
};

export const paymentApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockPayments];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.supplierName.toLowerCase().includes(kw) || i.paymentNo.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  detail: (id: number) => success(mock.mockPayments.find((i) => i.id === id)),
};

// ========== 报表 API ==========

export const reportApi = {
  dashboard: () => success(mock.mockDashboardStats),
  salesTrend: () => success(mock.mockSalesTrend),
  inventorySummary: () => success(mock.mockInventorySummary),
  salesRanking: () => success(mock.mockSalesRanking),
};

// ========== 系统管理 API ==========

export const userApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockUsers];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.username.toLowerCase().includes(kw) || i.nickname.toLowerCase().includes(kw),
      );
    }
    if (params.status) list = list.filter((i) => i.status === params.status);
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
  create: (data: any) => {
    const newItem = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
    mock.mockUsers.unshift(newItem);
    return success(newItem);
  },
  update: (id: number, data: any) => {
    const idx = mock.mockUsers.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockUsers[idx] = { ...mock.mockUsers[idx], ...data };
    return success(mock.mockUsers[idx]);
  },
  remove: (id: number) => {
    const idx = mock.mockUsers.findIndex((i) => i.id === id);
    if (idx >= 0) mock.mockUsers.splice(idx, 1);
    return success({ id });
  },
};

export const roleApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockRoles];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) => i.roleName.toLowerCase().includes(kw) || i.roleCode.toLowerCase().includes(kw),
      );
    }
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
};

export const logApi = {
  list: (params: any = {}) => {
    let list = [...mock.mockOperationLogs];
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      list = list.filter(
        (i) =>
          i.username.toLowerCase().includes(kw) ||
          i.action.toLowerCase().includes(kw) ||
          i.module.toLowerCase().includes(kw),
      );
    }
    if (params.module) list = list.filter((i) => i.module === params.module);
    if (params.startDate) list = list.filter((i) => i.createdAt >= params.startDate);
    if (params.endDate) list = list.filter((i) => i.createdAt <= params.endDate + " 23:59:59");
    return success(paginate(list, params.page || 1, params.pageSize || 20));
  },
};

// ========== 统一导出 ==========

export default {
  productApi,
  warehouseApi,
  customerApi,
  supplierApi,
  unitApi,
  brandApi,
  purchaseOrderApi,
  purchaseReceiptApi,
  salesOrderApi,
  salesDeliveryApi,
  inventoryApi,
  stockTakeApi,
  stockTransferApi,
  accountApi,
  receivableApi,
  payableApi,
  receiptApi,
  paymentApi,
  reportApi,
  userApi,
  roleApi,
  logApi,
};
