/**
 * 进销存模块 - 报表分析与系统管理（简体中文）
 *
 * 页面分组：salesReport / inventoryReport / users / roles / logs
 * 键路径：message.inv.report.<页面key>.<分组>.<字段>
 *
 * 分组说明：
 *   title / desc - 页面标题与描述
 *   search       - 查询区字段（label / placeholder）
 *   columns      - 表格列标题
 *   form         - 表单字段（label / placeholder，placeholder 可选）
 *   actions      - 页面级操作文案（按钮、页头统计标签）
 *   messages     - 页面级提示文案（确认框、结果提示、动态文案）
 *   options      - 下拉选项（按业务编码分键，value 为接口存储值，label 为展示文案）
 *   charts       - 报表图表文案（图表标题、图例、坐标轴与金额刻度）
 *
 * 公共文案（查询/新增/编辑/删除/详情等）复用 message.inv.common.*，
 * 单据状态文案复用 message.inv.status.*，此处不再重复定义。
 *
 * 注意：options 中的 value 与接口存储值保持一致（不随语言变化），
 *      仅 label 做翻译。
 *
 * charts.unit 为金额刻度配置：scale 为换算基数，suffix 为刻度后缀，
 * 由各语言按习惯给出（中文「万」= 10000，英文「K」= 1000）。
 */
export default {
  report: {
    salesReport: {
      title: "销售分析",
      desc: "销售趋势、排行、毛利分析",
      search: {},
      columns: {
        rank: "排名",
        productName: "商品名称",
        quantity: "销售数量",
        amount: "销售金额",
        profit: "毛利",
        profitRate: "毛利率",
      },
      form: {},
      actions: {},
      messages: {},
      options: {
        // 销售类别：value 为商品分类名称（接口存储值），label 为图表展示文案
        // products 为归入该类别的商品名称（接口返回的原值，不随语言变化）
        category: {
          electronics: {
            value: "电子产品",
            label: "电子产品",
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
            label: "办公耗材",
            products: ["中性笔 0.5mm 黑色", "A4打印纸 80g"],
          },
          officeFurniture: {
            value: "办公家具",
            label: "办公家具",
            products: ["办公椅 人体工学"],
          },
        },
      },
      charts: {
        trendTitle: "销售趋势分析",
        pieTitle: "销售类别占比",
        rankingTitle: "商品销售排行",
        legend: {
          salesAmount: "销售额",
          profit: "利润",
          orderCount: "订单数",
        },
        axis: {
          amount: "金额",
          orderCount: "订单数",
        },
        unit: {
          scale: 10000,
          suffix: "万",
        },
      },
    },

    inventoryReport: {
      title: "进销存报表",
      desc: "商品采购、销售、库存汇总分析",
      search: {},
      columns: {
        productCode: "商品编码",
        productName: "商品名称",
        spec: "规格",
        unitName: "单位",
        // 分组表头（期初 / 采购 / 销售 / 期末）
        groupBegin: "期初",
        groupPurchase: "采购",
        groupSale: "销售",
        groupEnd: "期末",
        // 分组下的子列
        quantity: "数量",
        amount: "金额",
      },
      form: {},
      actions: {
        export: "导出",
        summaryTitle: "进销存汇总表",
        totalPurchase: "采购总额",
        totalSale: "销售总额",
        totalInventory: "库存总值",
        totalProfit: "销售毛利",
      },
      messages: {
        total: "合计",
        exportTip: "导出功能开发中",
        countUnit: "{count}笔",
        profitRate: "毛利率{rate}%",
      },
      options: {},
      charts: {},
    },

    users: {
      title: "用户管理",
      desc: "管理系统用户、角色分配",
      search: {
        keyword: { label: "关键词", placeholder: "用户名/昵称" },
        status: { label: "状态" },
      },
      columns: {
        username: "用户名",
        nickname: "昵称",
        department: "部门",
        roles: "角色",
        phone: "电话",
        email: "邮箱",
        lastLogin: "最后登录",
        status: "状态",
      },
      form: {
        username: { label: "用户名", placeholder: "请输入用户名" },
        nickname: { label: "昵称", placeholder: "请输入昵称" },
        department: { label: "部门" },
        roles: { label: "角色" },
        phone: { label: "电话", placeholder: "请输入电话" },
        email: { label: "邮箱", placeholder: "请输入邮箱" },
      },
      actions: {
        add: "新增用户",
        editTitle: "编辑用户",
        resetPassword: "重置密码",
      },
      messages: {
        deleteConfirm: "确定删除该用户吗？",
        resetPasswordSuccess: "已重置用户 {username} 的密码为默认密码",
      },
      options: {
        // 部门：value 为接口存储的中文部门名称，label 为展示文案
        department: {
          it: { value: "IT部", label: "IT部" },
          purchasing: { value: "采购部", label: "采购部" },
          sales: { value: "销售部", label: "销售部" },
          warehousing: { value: "仓储部", label: "仓储部" },
          finance: { value: "财务部", label: "财务部" },
          operation: { value: "运营部", label: "运营部" },
        },
        // 角色：value 为接口存储的角色编码，label 为展示文案
        role: {
          admin: { value: "admin", label: "系统管理员" },
          purchaser: { value: "purchaser", label: "采购员" },
          salesperson: { value: "salesperson", label: "销售员" },
          warehouse: { value: "warehouse", label: "仓库管理员" },
          finance: { value: "finance", label: "财务员" },
          viewer: { value: "viewer", label: "查看者" },
        },
      },
    },

    roles: {
      title: "角色管理",
      desc: "管理系统角色及权限分配",
      search: {
        keyword: { label: "关键词", placeholder: "角色名称/编码" },
      },
      columns: {
        roleCode: "角色编码",
        roleName: "角色名称",
        description: "描述",
        userCount: "用户数",
        status: "状态",
        createdAt: "创建时间",
      },
      form: {},
      actions: {},
      messages: {},
      options: {
        // 角色名称：value 为接口存储的角色编码，label 为展示文案
        role: {
          admin: { value: "admin", label: "系统管理员" },
          purchaser: { value: "purchaser", label: "采购员" },
          salesperson: { value: "salesperson", label: "销售员" },
          warehouse: { value: "warehouse", label: "仓库管理员" },
          finance: { value: "finance", label: "财务员" },
          viewer: { value: "viewer", label: "查看者" },
        },
        // 角色描述：value 为接口存储的角色编码，label 为展示文案
        roleDescription: {
          admin: { value: "admin", label: "拥有系统全部权限" },
          purchaser: { value: "purchaser", label: "采购管理相关权限" },
          salesperson: { value: "salesperson", label: "销售管理相关权限" },
          warehouse: { value: "warehouse", label: "库存管理相关权限" },
          finance: { value: "finance", label: "资金管理相关权限" },
          viewer: { value: "viewer", label: "仅查看权限" },
        },
      },
    },

    logs: {
      title: "操作日志",
      desc: "查询系统操作记录",
      search: {
        keyword: { label: "关键词", placeholder: "操作人/操作内容" },
        module: { label: "模块" },
        dateRange: { label: "日期" },
      },
      columns: {
        username: "操作人",
        module: "模块",
        action: "操作",
        description: "描述",
        ip: "IP地址",
        createdAt: "操作时间",
      },
      form: {},
      actions: {},
      messages: {},
      options: {
        // 日志模块：value 为接口存储的中文模块名称，label 为展示文案
        module: {
          purchase: { value: "采购管理", label: "采购管理" },
          sale: { value: "销售管理", label: "销售管理" },
          inventory: { value: "库存管理", label: "库存管理" },
          basic: { value: "基础资料", label: "基础资料" },
          fund: { value: "资金管理", label: "资金管理" },
          system: { value: "系统管理", label: "系统管理" },
        },
      },
    },
  },
};
