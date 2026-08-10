// ==================== 进销存管理系统 - 类型定义 ====================

// ==================== 通用类型 ====================

/** 单据状态 */
export type DocumentStatus = "draft" | "pending" | "approved" | "rejected" | "closed" | "completed" | "in_progress" | "cancelled";

/** 启用/停用状态 */
export type EnableStatus = "enabled" | "disabled";

// ==================== 基础资料类型 ====================

/** 商品资料 */
export interface Product {
  id: number;
  productCode: string;
  productName: string;
  barcode?: string;
  categoryId: number;
  categoryName?: string;
  brandId?: number;
  brandName?: string;
  spec?: string;
  model?: string;
  unitId: number;
  unitName?: string;
  purchasePrice: number;
  salePrice: number;
  retailPrice?: number;
  minStock?: number;
  maxStock?: number;
  taxRate: number;
  weight?: number;
  volume?: number;
  image?: string;
  remark?: string;
  status: EnableStatus;
  createdAt: string;
  updatedAt: string;
}

/** 商品分类 */
export interface ProductCategory {
  id: number;
  categoryCode: string;
  categoryName: string;
  parentId: number;
  sort: number;
  level: number;
  children?: ProductCategory[];
  status: EnableStatus;
}

/** 计量单位 */
export interface Unit {
  id: number;
  unitCode: string;
  unitName: string;
  status: EnableStatus;
}

/** 仓库 */
export interface Warehouse {
  id: number;
  warehouseCode: string;
  warehouseName: string;
  type: string;
  address?: string;
  manager?: string;
  phone?: string;
  remark?: string;
  status: EnableStatus;
  createdAt: string;
}

/** 客户 */
export interface Customer {
  id: number;
  customerCode: string;
  customerName: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  creditLimit: number;
  creditUsed: number;
  creditBalance: number;
  level: string;
  settlementMethod?: string;
  remark?: string;
  status: EnableStatus;
  createdAt: string;
}

/** 供应商 */
export interface Supplier {
  id: number;
  supplierCode: string;
  supplierName: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  bankName?: string;
  bankAccount?: string;
  paymentTerms?: string;
  remark?: string;
  status: EnableStatus;
  createdAt: string;
}

/** 品牌 */
export interface Brand {
  id: number;
  brandCode: string;
  brandName: string;
  remark?: string;
  status: EnableStatus;
}

// ==================== 采购业务类型 ====================

/** 采购订单 */
export interface PurchaseOrder {
  id: number;
  orderNo: string;
  supplierId: number;
  supplierName: string;
  warehouseId: number;
  warehouseName: string;
  orderDate: string;
  expectedDate?: string;
  totalAmount: number;
  totalTax: number;
  totalAmountWithTax: number;
  status: DocumentStatus;
  remark?: string;
  createdBy: string;
  createdAt: string;
  items: PurchaseOrderItem[];
}

/** 采购订单明细 */
export interface PurchaseOrderItem {
  id: number;
  orderId: number;
  productId: number;
  productCode: string;
  productName: string;
  spec?: string;
  unitName?: string;
  quantity: number;
  receivedQuantity: number;
  purchasePrice: number;
  taxRate: number;
  amount: number;
  taxAmount: number;
  amountWithTax: number;
  remark?: string;
}

/** 采购入库单 */
export interface PurchaseReceipt {
  id: number;
  receiptNo: string;
  orderId: number;
  orderNo: string;
  supplierId: number;
  supplierName: string;
  warehouseId: number;
  warehouseName: string;
  receiptDate: string;
  totalAmount: number;
  status: DocumentStatus;
  remark?: string;
  createdBy: string;
  createdAt: string;
  items: PurchaseReceiptItem[];
}

/** 采购入库明细 */
export interface PurchaseReceiptItem {
  id: number;
  receiptId: number;
  productId: number;
  productCode: string;
  productName: string;
  quantity: number;
  purchasePrice: number;
  amount: number;
  batchNo?: string;
}

// ==================== 销售业务类型 ====================

/** 销售订单 */
export interface SalesOrder {
  id: number;
  orderNo: string;
  customerId: number;
  customerName: string;
  warehouseId: number;
  warehouseName: string;
  orderDate: string;
  deliveryDate?: string;
  totalAmount: number;
  totalTax: number;
  totalAmountWithTax: number;
  status: DocumentStatus;
  remark?: string;
  createdBy: string;
  createdAt: string;
  items: SalesOrderItem[];
}

/** 销售订单明细 */
export interface SalesOrderItem {
  id: number;
  orderId: number;
  productId: number;
  productCode: string;
  productName: string;
  spec?: string;
  unitName?: string;
  quantity: number;
  deliveredQuantity: number;
  salePrice: number;
  taxRate: number;
  amount: number;
  taxAmount: number;
  amountWithTax: number;
  remark?: string;
}

/** 销售出库单 */
export interface SalesDelivery {
  id: number;
  deliveryNo: string;
  orderId: number;
  orderNo: string;
  customerId: number;
  customerName: string;
  warehouseId: number;
  warehouseName: string;
  deliveryDate: string;
  totalAmount: number;
  status: DocumentStatus;
  remark?: string;
  createdBy: string;
  createdAt: string;
  items: SalesDeliveryItem[];
}

/** 销售出库明细 */
export interface SalesDeliveryItem {
  id: number;
  deliveryId: number;
  productId: number;
  productCode: string;
  productName: string;
  quantity: number;
  salePrice: number;
  amount: number;
  batchNo?: string;
}

// ==================== 库存管理类型 ====================

/** 库存 */
export interface Inventory {
  id: number;
  productId: number;
  productCode: string;
  productName: string;
  spec?: string;
  warehouseId: number;
  warehouseName: string;
  quantity: number;
  lockedQuantity: number;
  availableQuantity: number;
  avgCost: number;
  totalValue: number;
  batchNo?: string;
  productionDate?: string;
  expiryDate?: string;
}

/** 库存流水 */
export interface InventoryTransaction {
  id: number;
  transactionNo: string;
  productId: number;
  productCode: string;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  type: "purchase_in" | "sale_out" | "transfer_in" | "transfer_out" | "stock_take_gain" | "stock_take_loss" | "return_in" | "return_out";
  typeName: string;
  quantity: number;
  balanceQuantity: number;
  unitCost: number;
  amount: number;
  sourceType: string;
  sourceNo: string;
  createdAt: string;
  createdBy: string;
}

/** 库存盘点单 */
export interface StockTake {
  id: number;
  takeNo: string;
  warehouseId: number;
  warehouseName: string;
  takeDate: string;
  status: DocumentStatus;
  totalItems: number;
  gainItems: number;
  lossItems: number;
  totalGainAmount: number;
  totalLossAmount: number;
  remark?: string;
  createdBy: string;
  createdAt: string;
  items: StockTakeItem[];
}

/** 盘点明细 */
export interface StockTakeItem {
  id: number;
  takeId: number;
  productId: number;
  productCode: string;
  productName: string;
  bookQuantity: number;
  actualQuantity: number;
  diffQuantity: number;
  unitCost: number;
  diffAmount: number;
  remark?: string;
}

/** 库存调拨单 */
export interface StockTransfer {
  id: number;
  transferNo: string;
  fromWarehouseId: number;
  fromWarehouseName: string;
  toWarehouseId: number;
  toWarehouseName: string;
  transferDate: string;
  status: DocumentStatus;
  totalAmount: number;
  remark?: string;
  createdBy: string;
  createdAt: string;
  items: StockTransferItem[];
}

/** 调拨明细 */
export interface StockTransferItem {
  id: number;
  transferId: number;
  productId: number;
  productCode: string;
  productName: string;
  quantity: number;
  unitCost: number;
  amount: number;
  remark?: string;
}

// ==================== 资金管理类型 ====================

/** 资金账户 */
export interface Account {
  id: number;
  accountCode: string;
  accountName: string;
  type: "bank" | "cash" | "alipay" | "wechat";
  typeName: string;
  balance: number;
  bankName?: string;
  bankAccount?: string;
  status: EnableStatus;
}

/** 收款单 */
export interface Receipt {
  id: number;
  receiptNo: string;
  customerId: number;
  customerName: string;
  accountId: number;
  accountName: string;
  receiptDate: string;
  amount: number;
  paymentMethod: string;
  status: DocumentStatus;
  remark?: string;
  createdBy: string;
  createdAt: string;
  details: ReceiptDetail[];
}

/** 收款核销明细 */
export interface ReceiptDetail {
  id: number;
  receiptId: number;
  receivableId: number;
  receivableNo: string;
  receivableAmount: number;
  settledAmount: number;
  thisSettleAmount: number;
  balance: number;
}

/** 付款单 */
export interface Payment {
  id: number;
  paymentNo: string;
  supplierId: number;
  supplierName: string;
  accountId: number;
  accountName: string;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  status: DocumentStatus;
  remark?: string;
  createdBy: string;
  createdAt: string;
  details: PaymentDetail[];
}

/** 付款核销明细 */
export interface PaymentDetail {
  id: number;
  paymentId: number;
  payableId: number;
  payableNo: string;
  payableAmount: number;
  settledAmount: number;
  thisSettleAmount: number;
  balance: number;
}

/** 应收账款 */
export interface Receivable {
  id: number;
  receivableNo: string;
  sourceType: string;
  sourceNo: string;
  customerId: number;
  customerName: string;
  receivableAmount: number;
  settledAmount: number;
  balance: number;
  billingDate: string;
  dueDate: string;
  status: "unsettled" | "partial" | "settled" | "overdue";
  overdueDays?: number;
}

/** 应付账款 */
export interface Payable {
  id: number;
  payableNo: string;
  sourceType: string;
  sourceNo: string;
  supplierId: number;
  supplierName: string;
  payableAmount: number;
  settledAmount: number;
  balance: number;
  billingDate: string;
  dueDate: string;
  status: "unsettled" | "partial" | "settled" | "overdue";
  overdueDays?: number;
}

// ==================== 报表类型 ====================

/** 进销存汇总 */
export interface InventorySummaryReport {
  productId: number;
  productCode: string;
  productName: string;
  spec?: string;
  unitName?: string;
  beginQuantity: number;
  beginAmount: number;
  purchaseQuantity: number;
  purchaseAmount: number;
  saleQuantity: number;
  saleAmount: number;
  endQuantity: number;
  endAmount: number;
}

/** 销售排行 */
export interface SalesRankingReport {
  rank: number;
  name: string;
  quantity: number;
  amount: number;
  profit: number;
  profitRate: number;
}

/** 销售趋势 */
export interface SalesTrendReport {
  date: string;
  orderCount: number;
  totalAmount: number;
  totalProfit: number;
}

// ==================== 查询参数类型 ====================

/** 基础查询参数 */
export interface BaseQueryParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
}
