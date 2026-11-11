<template>
  <div class="pro-table">
    <!-- 查询表单 -->
    <el-card v-if="showSearch" shadow="never" class="search-card">
      <el-form
        :model="searchModel"
        :inline="!isMobile"
        :label-position="isMobile ? 'top' : 'right'"
        @submit.prevent
      >
        <el-form-item v-for="field in searchFields" :key="field.prop" :label="field.label">
          <el-input
            v-if="field.type === 'input'"
            v-model="searchModel[field.prop]"
            :placeholder="
              field.placeholder || $t('message.inv.common.inputPlaceholder', { label: field.label })
            "
            clearable
            class="pro-table__field"
            :style="{ width: isMobile ? '100%' : '200px' }"
            @keyup.enter="handleSearch"
          />
          <el-select
            v-else-if="field.type === 'select'"
            v-model="searchModel[field.prop]"
            :placeholder="
              field.placeholder ||
              $t('message.inv.common.selectPlaceholder', { label: field.label })
            "
            clearable
            class="pro-table__field"
            :style="{ width: isMobile ? '100%' : '180px' }"
          >
            <el-option
              v-for="opt in field.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <el-date-picker
            v-else-if="field.type === 'daterange'"
            v-model="searchModel[field.prop]"
            type="daterange"
            :range-separator="$t('message.inv.common.dateSeparator')"
            :start-placeholder="$t('message.inv.common.dateStart')"
            :end-placeholder="$t('message.inv.common.dateEnd')"
            value-format="YYYY-MM-DD"
            class="pro-table__field"
            :style="{ width: isMobile ? '100%' : '260px' }"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">{{
            $t("message.inv.common.search")
          }}</el-button>
          <el-button :icon="RefreshLeft" @click="handleReset">{{
            $t("message.inv.common.reset")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never" class="table-card">
      <div class="table-toolbar">
        <div class="toolbar-left">
          <slot name="toolbar-left" />
        </div>
        <div class="toolbar-right">
          <el-button v-if="showAdd" type="primary" :icon="Plus" @click="$emit('add')">{{
            $t("message.inv.common.add")
          }}</el-button>
          <slot name="toolbar-right" />
          <el-tooltip :content="$t('message.inv.common.refresh')" placement="top">
            <el-button :icon="Refresh" circle @click="loadData" />
          </el-tooltip>
        </div>
      </div>

      <!-- PC 端：标准表格 -->
      <el-table
        v-if="!isMobile"
        v-loading="loading"
        :data="tableData"
        :border="border"
        :stripe="stripe"
        style="width: 100%"
        :row-key="rowKey"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <el-table-column v-if="selection" type="selection" width="50" />
        <el-table-column
          v-if="showIndex"
          type="index"
          :label="$t('message.inv.common.index')"
          width="60"
          align="center"
        />
        <slot />
        <el-table-column
          v-if="showAction"
          :label="$t('message.inv.common.action')"
          :width="actionWidth"
          fixed="right"
          align="center"
        >
          <template #default="{ row }">
            <slot name="action" :row="row" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 移动端：卡片列表（字段由业务侧 el-table-column 声明自动推导） -->
      <div v-else v-loading="loading" class="pro-table__cards">
        <el-card
          v-for="(row, rowIndex) in tableData"
          :key="rowKey && row[rowKey] !== undefined ? row[rowKey] : rowIndex"
          shadow="never"
          class="pro-table__card"
        >
          <!-- 卡片头：勾选 + 首个业务列作为标题 -->
          <div class="pro-table__card-head">
            <el-checkbox
              v-if="selection"
              :model-value="isSelected(row)"
              @change="(checked: any) => toggleSelect(row, checked)"
            />
            <span v-if="showIndex" class="pro-table__card-index">{{ rowIndex + 1 }}</span>
            <template v-if="cardTitle">
              <span class="pro-table__card-title">
                <TableCell
                  v-if="cardTitle.render"
                  :render="cardTitle.render"
                  :scope="cellScope(row, rowIndex)"
                />
                <template v-else>{{ row[cardTitle.prop] }}</template>
              </span>
            </template>
          </div>

          <!-- 卡片字段 -->
          <div v-if="cardFields.length" class="pro-table__card-body">
            <div
              v-for="(col, colIndex) in cardFields"
              :key="col.prop || col.label || colIndex"
              class="pro-table__card-field"
            >
              <span class="pro-table__card-label">{{ col.label }}</span>
              <span class="pro-table__card-value">
                <TableCell
                  v-if="col.render"
                  :render="col.render"
                  :scope="cellScope(row, rowIndex)"
                />
                <template v-else>{{ row[col.prop] }}</template>
              </span>
            </div>
          </div>

          <!-- 卡片操作区 -->
          <div v-if="showAction" class="pro-table__card-actions">
            <slot name="action" :row="row" />
          </div>
        </el-card>
      </div>

      <div v-if="showPagination" class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="pageSizes"
          :layout="paginationLayout"
          :pager-count="isMobile ? 5 : 7"
          background
          @size-change="loadData"
          @current-change="loadData"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { Search, RefreshLeft, Plus, Refresh } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useResponsive } from "@/plugins/hooks/useResponsive";
import { useTableColumns } from "@/components/inv/useTableColumns";
import TableCell from "@/components/inv/TableCell.vue";
// 注意：不能用 $t 命名，否则会遮蔽模板全局 $t（后者支持插值参数）
import { $t as translate } from "@/plugins/i18n";

interface SearchField {
  prop: string;
  label: string;
  type: "input" | "select" | "daterange";
  placeholder?: string;
  options?: { label: string; value: any }[];
}

const props = withDefaults(
  defineProps<{
    fetchFn: (params: any) => Promise<any>;
    searchFields?: SearchField[];
    showSearch?: boolean;
    showAdd?: boolean;
    showAction?: boolean;
    showIndex?: boolean;
    showPagination?: boolean;
    selection?: boolean;
    border?: boolean;
    stripe?: boolean;
    rowKey?: string;
    actionWidth?: number | string;
    pageSizes?: number[];
    immediate?: boolean;
  }>(),
  {
    searchFields: () => [],
    showSearch: true,
    showAdd: false,
    showAction: false,
    showIndex: false,
    showPagination: true,
    selection: false,
    border: true,
    stripe: true,
    rowKey: "id",
    actionWidth: 200,
    pageSizes: () => [10, 20, 50, 100],
    immediate: true,
  },
);

const emit = defineEmits<{
  add: [];
  selectionChange: [rows: any[]];
  sortChange: [sort: any];
  dataLoaded: [data: any[]];
}>();

const { isMobile } = useResponsive();
const { columns } = useTableColumns();

const loading = ref(false);
const tableData = ref<any[]>([]);
const searchModel = reactive<Record<string, any>>({});
const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0,
});
const sortModel = reactive<{ prop?: string; order?: string }>({});
/** 移动端选中行（PC 端由 el-table 自身维护） */
const selectedRows = ref<any[]>([]);

// 移动端卡片：首个业务列作为标题，其余作为字段
const cardTitle = computed(() => columns.value[0]);
const cardFields = computed(() => columns.value.slice(1));

// 分页布局：移动端精简，避免超出屏幕
const paginationLayout = computed(() =>
  isMobile.value ? "prev, pager, next" : "total, sizes, prev, pager, next, jumper",
);

// 单元格渲染作用域（与 el-table-column 默认插槽保持一致）
const cellScope = (row: any, $index: number) => ({ row, $index, column: {} });

const isSelected = (row: any) => selectedRows.value.includes(row);

function toggleSelect(row: any, checked: any) {
  if (checked) {
    selectedRows.value = [...selectedRows.value, row];
  } else {
    selectedRows.value = selectedRows.value.filter((item) => item !== row);
  }
  emit("selectionChange", selectedRows.value);
}

/** 请求序号：快速翻页 / 连续查询时，丢弃过期响应，避免旧数据覆盖新结果 */
let requestSeq = 0;

async function loadData() {
  const seq = ++requestSeq;
  loading.value = true;
  try {
    // 构建查询参数
    const params: any = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchModel,
    };

    // 处理日期范围
    for (const field of props.searchFields) {
      if (field.type === "daterange" && searchModel[field.prop]) {
        const [start, end] = searchModel[field.prop] || [];
        if (start) params.startDate = start;
        if (end) params.endDate = end;
        delete params[field.prop];
      }
    }

    // 处理排序
    if (sortModel.prop && sortModel.order) {
      params.sortBy = sortModel.prop;
      params.sortOrder = sortModel.order === "ascending" ? "asc" : "desc";
    }

    const res = await props.fetchFn(params);
    // 已有更新的请求发出，本次结果作废
    if (seq !== requestSeq) return;

    const data = res.data || res;
    if (Array.isArray(data)) {
      tableData.value = data;
      pagination.total = data.length;
    } else if (data.list) {
      tableData.value = data.list;
      pagination.total = data.total || 0;
      pagination.page = data.page || pagination.page;
      pagination.pageSize = data.pageSize || pagination.pageSize;
    }
    emit("dataLoaded", tableData.value);
  } catch (err) {
    if (seq !== requestSeq) return;
    console.error("[ProTable] load failed:", err);
    ElMessage.error(translate("message.inv.common.error.load"));
    tableData.value = [];
    pagination.total = 0;
  } finally {
    // 仅由最新请求关闭 loading，避免新请求仍在进行时提前结束遮罩
    if (seq === requestSeq) loading.value = false;
  }
}

function handleSearch() {
  pagination.page = 1;
  loadData();
}

function handleReset() {
  Object.keys(searchModel).forEach((key) => {
    searchModel[key] = undefined;
  });
  pagination.page = 1;
  loadData();
}

function handleSelectionChange(rows: any[]) {
  selectedRows.value = rows;
  emit("selectionChange", rows);
}

function handleSortChange(sort: any) {
  sortModel.prop = sort.prop;
  sortModel.order = sort.order;
  emit("sortChange", sort);
}

function refresh() {
  loadData();
}

defineExpose({ refresh, loadData });

onMounted(() => {
  if (props.immediate) loadData();
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

.pro-table {
  .search-card {
    margin-bottom: 12px;
    :deep(.el-card__body) {
      padding-bottom: 2px;
    }
    :deep(.el-form-item) {
      margin-bottom: 12px;
    }
  }

  .table-card {
    .table-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;

      .toolbar-right {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    .pagination-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
  }

  // 移动端卡片列表
  .pro-table__cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pro-table__card {
    :deep(.el-card__body) {
      padding: 12px;
    }

    .pro-table__card-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 8px;
      margin-bottom: 8px;
      border-bottom: 1px solid var(--el-border-color-lighter);

      .pro-table__card-index {
        flex-shrink: 0;
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }

      .pro-table__card-title {
        flex: 1;
        min-width: 0;
        font-size: 15px;
        font-weight: 600;
        color: var(--el-text-color-primary);
        word-break: break-all;
      }
    }

    .pro-table__card-field {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 4px 0;
      font-size: 13px;

      .pro-table__card-label {
        // 中文短标签保持 84px 对齐；英文长标签（如 Available Stock）自适应伸展，
        // 但不超过半行宽度，避免挤压字段值
        flex: 0 0 auto;
        min-width: 84px;
        max-width: 45%;
        color: var(--el-text-color-secondary);
        overflow-wrap: anywhere;
      }

      .pro-table__card-value {
        flex: 1;
        min-width: 0;
        color: var(--el-text-color-primary);
        word-break: break-all;
      }
    }

    .pro-table__card-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid var(--el-border-color-lighter);
    }
  }

  // 移动端：查询条件控件占满整行
  @include d.mobile {
    .search-card {
      :deep(.el-form-item) {
        margin-right: 0;
      }
    }
  }
}
</style>
