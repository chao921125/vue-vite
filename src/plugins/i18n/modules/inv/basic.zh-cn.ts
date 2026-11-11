/**
 * 进销存模块 - 基础资料（简体中文）
 *
 * 页面分组：products / customers / suppliers / warehouses
 * 键路径：message.inv.basic.<页面key>.<分组>.<字段>
 *
 * 分组说明：
 *   title / desc - 页面标题与描述
 *   search       - 查询区字段（label / placeholder）
 *   columns      - 表格列标题
 *   form         - 表单字段（label / placeholder，placeholder 可选）
 *   actions      - 页面级操作文案
 *   messages     - 页面级提示文案
 *   options      - 下拉选项（按业务编码分键，value 为接口存储值，label 为展示文案）
 *
 * 公共文案（查询/新增/编辑/删除/启用/停用等）复用 message.inv.common.* 与
 * message.inv.status.*，此处不再重复定义。
 *
 * 注意：options 中的 value 与接口存储值保持一致（不随语言变化），
 *      仅 label 做翻译。
 */
export default {
  basic: {
    products: {
      title: "商品管理",
      desc: "管理商品基础资料、规格、价格信息",
      search: {
        keyword: { label: "关键词", placeholder: "商品编码/名称" },
        status: { label: "状态" },
      },
      columns: {
        productCode: "商品编码",
        productName: "商品名称",
        category: "分类",
        brand: "品牌",
        spec: "规格",
        unit: "单位",
        purchasePrice: "采购价",
        salePrice: "销售价",
        taxRate: "税率",
        status: "状态",
      },
      form: {
        productCode: { label: "商品编码", placeholder: "请输入商品编码" },
        productName: { label: "商品名称", placeholder: "请输入商品名称" },
        barcode: { label: "条形码", placeholder: "请输入条形码" },
        category: { label: "分类", placeholder: "请选择分类" },
        brand: { label: "品牌", placeholder: "请输入品牌" },
        unit: { label: "单位", placeholder: "请选择单位" },
        spec: { label: "规格", placeholder: "请输入规格" },
        model: { label: "型号", placeholder: "请输入型号" },
        purchasePrice: { label: "采购价" },
        salePrice: { label: "销售价" },
        retailPrice: { label: "零售价" },
        taxRate: { label: "税率" },
        minStock: { label: "最低库存" },
        maxStock: { label: "最高库存" },
        remark: { label: "备注", placeholder: "请输入备注" },
      },
      actions: {
        add: "新增商品",
        editTitle: "编辑商品",
      },
      messages: {
        deleteConfirm: "确定删除该商品吗？",
      },
    },

    customers: {
      title: "客户管理",
      desc: "管理客户基础资料、信用额度",
      search: {
        keyword: { label: "关键词", placeholder: "编码/名称" },
        level: { label: "等级" },
        status: { label: "状态" },
      },
      columns: {
        customerCode: "客户编码",
        customerName: "客户名称",
        contactPerson: "联系人",
        phone: "电话",
        level: "等级",
        creditLimit: "信用额度",
        creditUsed: "已用额度",
        settlementMethod: "结算方式",
        status: "状态",
      },
      form: {
        customerCode: { label: "客户编码", placeholder: "请输入客户编码" },
        customerName: { label: "客户名称", placeholder: "请输入客户名称" },
        contactPerson: { label: "联系人", placeholder: "请输入联系人" },
        phone: { label: "电话", placeholder: "请输入电话" },
        email: { label: "邮箱", placeholder: "请输入邮箱" },
        level: { label: "客户等级" },
        creditLimit: { label: "信用额度" },
        settlementMethod: { label: "结算方式" },
        address: { label: "地址", placeholder: "请输入地址" },
        remark: { label: "备注" },
      },
      actions: {
        add: "新增客户",
        editTitle: "编辑客户",
      },
      messages: {
        deleteConfirm: "确定删除该客户吗？",
      },
      options: {
        level: {
          VIP: { value: "VIP", label: "VIP" },
          A: { value: "A", label: "A" },
          B: { value: "B", label: "B" },
          C: { value: "C", label: "C" },
        },
        settlement: {
          prepay: { value: "款到发货", label: "款到发货" },
          net15: { value: "月结15天", label: "月结15天" },
          net30: { value: "月结30天", label: "月结30天" },
          net60: { value: "月结60天", label: "月结60天" },
        },
      },
    },

    suppliers: {
      title: "供应商管理",
      desc: "管理供应商基础资料、付款条件",
      search: {
        keyword: { label: "关键词", placeholder: "编码/名称" },
        status: { label: "状态" },
      },
      columns: {
        supplierCode: "供应商编码",
        supplierName: "供应商名称",
        contactPerson: "联系人",
        phone: "电话",
        bankName: "开户银行",
        bankAccount: "银行账号",
        paymentTerms: "付款条件",
        status: "状态",
      },
      form: {
        supplierCode: { label: "供应商编码", placeholder: "请输入编码" },
        supplierName: { label: "供应商名称", placeholder: "请输入名称" },
        contactPerson: { label: "联系人", placeholder: "请输入联系人" },
        phone: { label: "电话", placeholder: "请输入电话" },
        email: { label: "邮箱", placeholder: "请输入邮箱" },
        paymentTerms: { label: "付款条件" },
        bankName: { label: "开户银行", placeholder: "请输入开户银行" },
        bankAccount: { label: "银行账号", placeholder: "请输入银行账号" },
        address: { label: "地址", placeholder: "请输入地址" },
        remark: { label: "备注" },
      },
      actions: {
        add: "新增供应商",
        editTitle: "编辑供应商",
      },
      messages: {
        deleteConfirm: "确定删除该供应商吗？",
      },
      options: {
        paymentTerms: {
          prepay: { value: "款到发货", label: "款到发货" },
          cod: { value: "货到付款", label: "货到付款" },
          net15: { value: "月结15天", label: "月结15天" },
          net30: { value: "月结30天", label: "月结30天" },
          net45: { value: "月结45天", label: "月结45天" },
          net60: { value: "月结60天", label: "月结60天" },
        },
      },
    },

    warehouses: {
      title: "仓库管理",
      desc: "管理仓库基础信息",
      search: {
        keyword: { label: "关键词", placeholder: "编码/名称" },
        status: { label: "状态" },
      },
      columns: {
        warehouseCode: "仓库编码",
        warehouseName: "仓库名称",
        type: "类型",
        address: "地址",
        manager: "负责人",
        phone: "电话",
        status: "状态",
      },
      form: {
        warehouseCode: { label: "仓库编码", placeholder: "请输入仓库编码" },
        warehouseName: { label: "仓库名称", placeholder: "请输入仓库名称" },
        type: { label: "仓库类型" },
        address: { label: "地址", placeholder: "请输入仓库地址" },
        manager: { label: "负责人", placeholder: "请输入负责人" },
        phone: { label: "电话", placeholder: "请输入联系电话" },
        remark: { label: "备注" },
      },
      actions: {
        add: "新增仓库",
        editTitle: "编辑仓库",
      },
      messages: {
        deleteConfirm: "确定删除该仓库吗？",
      },
      options: {
        type: {
          main: { value: "main", label: "主仓库" },
          branch: { value: "branch", label: "分仓" },
          return: { value: "return", label: "退货仓" },
          defective: { value: "defective", label: "次品仓" },
        },
      },
    },
  },
};
