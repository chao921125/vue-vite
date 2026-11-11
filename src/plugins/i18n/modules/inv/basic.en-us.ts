/**
 * 进销存模块 - 基础资料 (English)
 *
 * Mirrors basic.zh-cn.ts — keep both files structurally identical.
 *
 * Key path: message.inv.basic.<page>.<group>.<field>
 *
 * Note: option `value` fields are the raw identifiers persisted by the API
 * (e.g. "月结30天"), so they stay identical across locales; only `label` is translated.
 */
export default {
  basic: {
    products: {
      title: "Product Management",
      desc: "Manage product master data, specifications and pricing information",
      search: {
        keyword: { label: "Keyword", placeholder: "Product code or name" },
        status: { label: "Status" },
      },
      columns: {
        productCode: "Product Code",
        productName: "Product Name",
        category: "Category",
        brand: "Brand",
        spec: "Specification",
        unit: "Unit",
        purchasePrice: "Purchase Price",
        salePrice: "Sale Price",
        taxRate: "Tax Rate",
        status: "Status",
      },
      form: {
        productCode: { label: "Product Code", placeholder: "Enter the product code" },
        productName: { label: "Product Name", placeholder: "Enter the product name" },
        barcode: { label: "Barcode", placeholder: "Enter the barcode" },
        category: { label: "Category", placeholder: "Select a category" },
        brand: { label: "Brand", placeholder: "Enter the brand" },
        unit: { label: "Unit", placeholder: "Select a unit" },
        spec: { label: "Specification", placeholder: "Enter the specification" },
        model: { label: "Model", placeholder: "Enter the model" },
        purchasePrice: { label: "Purchase Price" },
        salePrice: { label: "Sale Price" },
        retailPrice: { label: "Retail Price" },
        taxRate: { label: "Tax Rate" },
        minStock: { label: "Minimum Stock" },
        maxStock: { label: "Maximum Stock" },
        remark: { label: "Remarks", placeholder: "Enter any remarks" },
      },
      actions: {
        add: "Add Product",
        editTitle: "Edit Product",
      },
      messages: {
        deleteConfirm: "Are you sure you want to delete this product?",
      },
    },

    customers: {
      title: "Customer Management",
      desc: "Manage customer master data and credit limits",
      search: {
        keyword: { label: "Keyword", placeholder: "Code or name" },
        level: { label: "Level" },
        status: { label: "Status" },
      },
      columns: {
        customerCode: "Customer Code",
        customerName: "Customer Name",
        contactPerson: "Contact Person",
        phone: "Phone",
        level: "Level",
        creditLimit: "Credit Limit",
        creditUsed: "Credit Used",
        settlementMethod: "Settlement Method",
        status: "Status",
      },
      form: {
        customerCode: { label: "Customer Code", placeholder: "Enter the customer code" },
        customerName: { label: "Customer Name", placeholder: "Enter the customer name" },
        contactPerson: { label: "Contact Person", placeholder: "Enter the contact person" },
        phone: { label: "Phone", placeholder: "Enter the phone number" },
        email: { label: "Email", placeholder: "Enter the email address" },
        level: { label: "Customer Level" },
        creditLimit: { label: "Credit Limit" },
        settlementMethod: { label: "Settlement Method" },
        address: { label: "Address", placeholder: "Enter the address" },
        remark: { label: "Remarks" },
      },
      actions: {
        add: "Add Customer",
        editTitle: "Edit Customer",
      },
      messages: {
        deleteConfirm: "Are you sure you want to delete this customer?",
      },
      options: {
        level: {
          VIP: { value: "VIP", label: "VIP" },
          A: { value: "A", label: "A" },
          B: { value: "B", label: "B" },
          C: { value: "C", label: "C" },
        },
        settlement: {
          prepay: { value: "款到发货", label: "Prepayment before delivery" },
          net15: { value: "月结15天", label: "Net 15 days" },
          net30: { value: "月结30天", label: "Net 30 days" },
          net60: { value: "月结60天", label: "Net 60 days" },
        },
      },
    },

    suppliers: {
      title: "Supplier Management",
      desc: "Manage supplier master data and payment terms",
      search: {
        keyword: { label: "Keyword", placeholder: "Code or name" },
        status: { label: "Status" },
      },
      columns: {
        supplierCode: "Supplier Code",
        supplierName: "Supplier Name",
        contactPerson: "Contact Person",
        phone: "Phone",
        bankName: "Bank Name",
        bankAccount: "Bank Account",
        paymentTerms: "Payment Terms",
        status: "Status",
      },
      form: {
        supplierCode: { label: "Supplier Code", placeholder: "Enter the supplier code" },
        supplierName: { label: "Supplier Name", placeholder: "Enter the supplier name" },
        contactPerson: { label: "Contact Person", placeholder: "Enter the contact person" },
        phone: { label: "Phone", placeholder: "Enter the phone number" },
        email: { label: "Email", placeholder: "Enter the email address" },
        paymentTerms: { label: "Payment Terms" },
        bankName: { label: "Bank Name", placeholder: "Enter the bank name" },
        bankAccount: { label: "Bank Account", placeholder: "Enter the bank account number" },
        address: { label: "Address", placeholder: "Enter the address" },
        remark: { label: "Remarks" },
      },
      actions: {
        add: "Add Supplier",
        editTitle: "Edit Supplier",
      },
      messages: {
        deleteConfirm: "Are you sure you want to delete this supplier?",
      },
      options: {
        paymentTerms: {
          prepay: { value: "款到发货", label: "Prepayment before delivery" },
          cod: { value: "货到付款", label: "Cash on delivery" },
          net15: { value: "月结15天", label: "Net 15 days" },
          net30: { value: "月结30天", label: "Net 30 days" },
          net45: { value: "月结45天", label: "Net 45 days" },
          net60: { value: "月结60天", label: "Net 60 days" },
        },
      },
    },

    warehouses: {
      title: "Warehouse Management",
      desc: "Manage warehouse master information",
      search: {
        keyword: { label: "Keyword", placeholder: "Code or name" },
        status: { label: "Status" },
      },
      columns: {
        warehouseCode: "Warehouse Code",
        warehouseName: "Warehouse Name",
        type: "Type",
        address: "Address",
        manager: "Manager",
        phone: "Phone",
        status: "Status",
      },
      form: {
        warehouseCode: { label: "Warehouse Code", placeholder: "Enter the warehouse code" },
        warehouseName: { label: "Warehouse Name", placeholder: "Enter the warehouse name" },
        type: { label: "Warehouse Type" },
        address: { label: "Address", placeholder: "Enter the warehouse address" },
        manager: { label: "Manager", placeholder: "Enter the manager's name" },
        phone: { label: "Phone", placeholder: "Enter the contact phone number" },
        remark: { label: "Remarks" },
      },
      actions: {
        add: "Add Warehouse",
        editTitle: "Edit Warehouse",
      },
      messages: {
        deleteConfirm: "Are you sure you want to delete this warehouse?",
      },
      options: {
        type: {
          main: { value: "main", label: "Main Warehouse" },
          branch: { value: "branch", label: "Branch Warehouse" },
          return: { value: "return", label: "Returns Warehouse" },
          defective: { value: "defective", label: "Defective Goods Warehouse" },
        },
      },
    },
  },
};
