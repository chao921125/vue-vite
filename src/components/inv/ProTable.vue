<template>
  <div class="pro-table">
    <!-- 查询表单 -->
    <el-card v-if="showSearch" shadow="never" class="search-card">
      <el-form :model="searchModel" inline @submit.prevent>
        <el-form-item v-for="field in searchFields" :key="field.prop" :label="field.label">
          <el-input
            v-if="field.type === 'input'"
            v-model="searchModel[field.prop]"
            :placeholder="field.placeholder || `请输入${field.label}`"
            clearable
            style="width: 200px"
            @keyup.enter="handleSearch"
          />
          <el-select
            v-else-if="field.type === 'select'"
            v-model="searchModel[field.prop]"
            :placeholder="field.placeholder || `请选择${field.label}`"
            clearable
            style="width: 180px"
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
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 260px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="RefreshLeft" @click="handleReset">重置</el-button>
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
          <el-button v-if="showAdd" type="primary" :icon="Plus" @click="$emit('add')"
            >新增</el-button
          >
          <slot name="toolbar-right" />
          <el-tooltip content="刷新" placement="top">
            <el-button :icon="Refresh" circle @click="loadData" />
          </el-tooltip>
        </div>
      </div>

      <el-table
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
        <el-table-column v-if="showIndex" type="index" label="序号" width="60" align="center" />
        <slot />
        <el-table-column
          v-if="showAction"
          label="操作"
          :width="actionWidth"
          fixed="right"
          align="center"
        >
          <template #default="{ row }">
            <slot name="action" :row="row" />
          </template>
        </el-table-column>
      </el-table>

      <div v-if="showPagination" class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="pageSizes"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="loadData"
          @current-change="loadData"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { Search, RefreshLeft, Plus, Refresh } from "@element-plus/icons-vue";

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

const loading = ref(false);
const tableData = ref<any[]>([]);
const searchModel = reactive<Record<string, any>>({});
const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0,
});
const sortModel = reactive<{ prop?: string; order?: string }>({});

async function loadData() {
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
    console.error("加载失败:", err);
    tableData.value = [];
  } finally {
    loading.value = false;
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
}
</style>
