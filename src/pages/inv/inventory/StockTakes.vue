<template>
  <PageContainer
    :title="$t('message.inv.stock.stockTakes.title')"
    :description="$t('message.inv.stock.stockTakes.desc')"
  >
    <ProTable
      ref="proTableRef"
      :fetch-fn="stockTakeApi.list"
      :search-fields="searchFields"
      show-action
      :action-width="200"
    >
      <el-table-column
        prop="takeNo"
        :label="$t('message.inv.stock.stockTakes.columns.takeNo')"
        width="170"
      />
      <el-table-column
        prop="warehouseName"
        :label="$t('message.inv.stock.stockTakes.columns.warehouseName')"
        width="120"
      />
      <el-table-column
        prop="takeDate"
        :label="$t('message.inv.stock.stockTakes.columns.takeDate')"
        width="120"
      />
      <el-table-column
        prop="totalItems"
        :label="$t('message.inv.stock.stockTakes.columns.totalItems')"
        width="80"
        align="right"
      />
      <el-table-column
        :label="$t('message.inv.stock.stockTakes.columns.gainItems')"
        width="80"
        align="right"
      >
        <template #default="{ row }">
          <span v-if="row.gainItems > 0" style="color: #67c23a">+{{ row.gainItems }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.inv.stock.stockTakes.columns.lossItems')"
        width="80"
        align="right"
      >
        <template #default="{ row }">
          <span v-if="row.lossItems > 0" style="color: #f56c6c">-{{ row.lossItems }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalGainAmount"
        :label="$t('message.inv.stock.stockTakes.columns.totalGainAmount')"
        width="110"
        align="right"
      >
        <template #default="{ row }"
          ><span v-if="row.totalGainAmount > 0" style="color: #67c23a"
            ><AmountDisplay :value="row.totalGainAmount" /></span
          ><span v-else>-</span></template
        >
      </el-table-column>
      <el-table-column
        prop="totalLossAmount"
        :label="$t('message.inv.stock.stockTakes.columns.totalLossAmount')"
        width="110"
        align="right"
      >
        <template #default="{ row }"
          ><span v-if="row.totalLossAmount > 0" style="color: #f56c6c"
            ><AmountDisplay :value="row.totalLossAmount" /></span
          ><span v-else>-</span></template
        >
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('message.inv.stock.stockTakes.columns.status')"
        width="90"
        align="center"
      >
        <template #default="{ row }"><StatusTag :status="row.status" /></template>
      </el-table-column>
      <template #action="{ row }">
        <el-button text type="primary" size="small" @click="handleDetail(row)">
          {{ $t("message.inv.common.detail") }}
        </el-button>
        <el-button
          v-if="row.status === 'draft'"
          text
          type="success"
          size="small"
          @click="handleApprove(row)"
          >{{ $t("message.inv.common.approve") }}</el-button
        >
      </template>
    </ProTable>

    <el-drawer
      v-model="detailVisible"
      :title="$t('message.inv.stock.stockTakes.actions.detailTitle')"
      :size="isMobile ? '100%' : '70%'"
      destroy-on-close
    >
      <template v-if="detailData">
        <el-descriptions :column="isMobile ? 1 : 3" border>
          <el-descriptions-item :label="$t('message.inv.stock.stockTakes.form.takeNo.label')">
            {{ detailData.takeNo }}
          </el-descriptions-item>
          <el-descriptions-item
            :label="$t('message.inv.stock.stockTakes.form.warehouseName.label')"
          >
            {{ detailData.warehouseName }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.stockTakes.form.takeDate.label')">
            {{ detailData.takeDate }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.stockTakes.form.totalItems.label')">
            {{ detailData.totalItems }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.stockTakes.form.gainItems.label')"
            ><span style="color: #67c23a">{{ detailData.gainItems }}</span></el-descriptions-item
          >
          <el-descriptions-item :label="$t('message.inv.stock.stockTakes.form.lossItems.label')"
            ><span style="color: #f56c6c">{{ detailData.lossItems }}</span></el-descriptions-item
          >
          <el-descriptions-item :label="$t('message.inv.stock.stockTakes.form.status.label')"
            ><StatusTag :status="detailData.status"
          /></el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.stockTakes.form.createdBy.label')">
            {{ detailData.createdBy }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('message.inv.stock.stockTakes.form.remark.label')">
            {{ detailData.remark || "-" }}
          </el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">
          {{ $t("message.inv.stock.stockTakes.actions.itemsTitle") }}
        </el-divider>
        <div class="detail-table-scroll">
          <el-table :data="detailData.items" border size="small" class="detail-table-wrap">
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column
              prop="productCode"
              :label="$t('message.inv.stock.stockTakes.columns.productCode')"
              width="100"
            />
            <el-table-column
              prop="productName"
              :label="$t('message.inv.stock.stockTakes.columns.productName')"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="bookQuantity"
              :label="$t('message.inv.stock.stockTakes.columns.bookQuantity')"
              width="100"
              align="right"
            />
            <el-table-column
              prop="actualQuantity"
              :label="$t('message.inv.stock.stockTakes.columns.actualQuantity')"
              width="100"
              align="right"
            />
            <el-table-column
              :label="$t('message.inv.stock.stockTakes.columns.diffQuantity')"
              width="100"
              align="right"
            >
              <template #default="{ row }">
                <span
                  :style="{
                    color: row.diffQuantity > 0 ? '#67c23a' : row.diffQuantity < 0 ? '#f56c6c' : '',
                    fontWeight: 600,
                  }"
                >
                  {{ row.diffQuantity > 0 ? "+" : "" }}{{ row.diffQuantity }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="unitCost"
              :label="$t('message.inv.stock.stockTakes.columns.unitCost')"
              width="100"
              align="right"
            >
              <template #default="{ row }"><AmountDisplay :value="row.unitCost" /></template>
            </el-table-column>
            <el-table-column
              :label="$t('message.inv.stock.stockTakes.columns.diffAmount')"
              width="120"
              align="right"
            >
              <template #default="{ row }">
                <span
                  :style="{
                    color: row.diffAmount > 0 ? '#67c23a' : row.diffAmount < 0 ? '#f56c6c' : '',
                  }"
                >
                  {{ row.diffAmount > 0 ? "+" : ""
                  }}<AmountDisplay :value="row.diffAmount" :show-sign="false" />
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-drawer>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage, ElMessageBox } from "element-plus";
import PageContainer from "@/components/inv/PageContainer.vue";
import ProTable from "@/components/inv/ProTable.vue";
import StatusTag from "@/components/inv/StatusTag.vue";
import AmountDisplay from "@/components/inv/AmountDisplay.vue";
import { stockTakeApi } from "@/api/modules/inventory";
import { useResponsive } from "@/plugins/hooks/useResponsive";

const { t } = useI18n();
const { isMobile } = useResponsive();

const proTableRef = ref();
const detailVisible = ref(false);
const detailData = ref<any>(null);

// 查询字段：computed 保证切换语言时 label/placeholder 同步刷新
const searchFields = computed(() => [
  {
    prop: "keyword",
    label: t("message.inv.stock.stockTakes.search.keyword.label"),
    type: "input" as const,
    placeholder: t("message.inv.stock.stockTakes.search.keyword.placeholder"),
  },
  {
    prop: "status",
    label: t("message.inv.stock.stockTakes.search.status.label"),
    type: "select" as const,
    options: [
      { label: t("message.inv.status.draft"), value: "draft" },
      { label: t("message.inv.status.completed"), value: "completed" },
    ],
  },
]);

async function handleDetail(row: any) {
  const res = await stockTakeApi.detail(row.id);
  detailData.value = res.data;
  detailVisible.value = true;
}
async function handleApprove(row: any) {
  await ElMessageBox.confirm(
    t("message.inv.stock.stockTakes.messages.approveConfirm"),
    t("message.inv.stock.stockTakes.messages.confirmTitle"),
    { type: "warning" },
  );
  await stockTakeApi.approve(row.id);
  ElMessage.success(t("message.inv.stock.stockTakes.messages.approveSuccess"));
  proTableRef.value?.refresh();
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/declare" as d;

// 明细表横向滚动容器：窄屏下表格保持列宽，由容器横向滚动
.detail-table-scroll {
  overflow-x: auto;
}

.detail-table-wrap {
  overflow-x: auto;

  // 窄屏下保留固定列宽，避免列被压缩
  @include d.mobile {
    min-width: 850px;
  }
}
</style>
