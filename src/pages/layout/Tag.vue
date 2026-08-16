<script setup lang="ts">
import {
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
  type RouteLocationNormalizedLoaded,
} from "vue-router";
import Storage from "@/utils/browser/storage";
import Constants from "@/utils/constant/constants";
import RouterConfig from "@/config/routerConfig";
import { $t } from "@/plugins/i18n";
import type { TagViewItem } from "#/types";

const router = useRouter();
const route = useRoute();
let tabs = ref<TagViewItem[]>([]);
// 主页（工作台）路径：取自统一配置，避免与 routerConfig 脱节
const HOME_PATH = RouterConfig.routeHome;
const tabValue = ref<string>(HOME_PATH);

const addTab = (routeCurrent: RouteLocationNormalizedLoaded): TagViewItem[] | false => {
  if (routeCurrent.meta.isHide) {
    return false;
  }
  tabValue.value = routeCurrent.fullPath;
  // 主页（工作台）由下方固定标签呈现，无需重复入栈
  if (routeCurrent.fullPath === HOME_PATH) {
    return false;
  }
  let tags: TagViewItem[] = (Storage.getLocalStorage(Constants.keys.tags) as TagViewItem[]) || [];
  tags.push({
    label: String(routeCurrent.meta.title),
    name: routeCurrent.fullPath,
    closable: true,
  });
  tabs.value = Array.from(new Set(tags.map((value: TagViewItem) => JSON.stringify(value)))).map(
    (item) => JSON.parse(item as string) as TagViewItem,
  );
  return tabs.value;
};

const removeTab = (name: string) => {
  if (name === HOME_PATH) {
    return false;
  }
  let activeName = tabValue.value;
  if (tabs.value.length) {
    // const index = tabArray.map((item) => item.name).indexOf(name);
    const index = tabs.value.findIndex((item: TagViewItem) => item.name === name);
    tabs.value.splice(index, 1);
    if (name === activeName) {
      if (!tabs.value.length) {
        activeName = HOME_PATH;
      } else if (index === tabs.value.length) {
        activeName = tabs.value[index - 1].name;
      } else {
        activeName = tabs.value[index].name;
      }
    }
  } else {
    activeName = HOME_PATH;
  }
  tabValue.value = activeName;
  Storage.setLocalStorage(Constants.keys.tags, tabs.value);
  router.push({ path: tabValue.value });
};

const changeRouter = (tabName: string) => {
  router.push({ path: tabName });
};
// 点击更多
const clickChange = (command: string | number | object) => {
  let routeTemp = {},
    activeName = tabValue.value;
  if (command === "0" || command === 0) {
    routeTemp = {
      label: String(route.meta.title!),
      name: route.fullPath,
      closable: true,
    };
    activeName = route.fullPath;
    tabs.value = [];
    tabs.value.push(routeTemp);
  }
  if (command === "1" || command === 1) {
    activeName = HOME_PATH;
    tabs.value = [];
  }
  Storage.setLocalStorage(Constants.keys.tags, tabs.value);
  tabValue.value = activeName;
  router.push({ path: tabValue.value });
};
onMounted(() => {
  // if (!Storage.getLocalStorage(Constants.keys.tags)) {
  // 	Storage.setLocalStorage(Constants.keys.tags, [
  // 		{
  // 			label: $t("message.menu.home"),
  // 			name: "/home",
  // 			closable: false,
  // 		},
  // 	]);
  // }
  // 过滤掉旧版本残留的主页（工作台）标签，避免与下方固定标签重复
  const stored =
    (Storage.getLocalStorage(Constants.keys.tags) as TagViewItem[] | null)?.filter(
      (item) => item?.name !== HOME_PATH,
    ) || [];
  tabs.value = stored;
  Storage.setLocalStorage(Constants.keys.tags, stored);
  tabValue.value = route.path;
});
onBeforeRouteUpdate((to) => {
  Storage.setLocalStorage(Constants.keys.tags, addTab(to));
});
</script>

<template>
  <div class="re-flex-between tags-content">
    <el-scrollbar class="tags-list re-el-scrollbar-hidden">
      <div class="re-flex">
        <el-tag
          :disable-transitions="false"
          class="re-cp re-mr-10"
          @click="changeRouter(HOME_PATH)"
          :type="tabValue === HOME_PATH ? 'primary' : 'info'"
          :closable="false"
        >
          {{ $t("message.menu.home") }}
        </el-tag>
        <el-tag
          v-for="(item, index) in tabs"
          :key="index"
          :closable="true"
          :disable-transitions="false"
          :type="tabValue === item.name ? 'primary' : 'info'"
          @close="removeTab(item.name)"
          @click="changeRouter(item.name)"
          class="re-cp re-mr-10"
        >
          {{ $t(item.label) }}
        </el-tag>
      </div>
    </el-scrollbar>
    <el-dropdown @command="clickChange" class="tags-option">
      <el-button type="primary" size="small"> 更多 </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="0">关闭其他标签</el-dropdown-item>
          <el-dropdown-item command="1">关闭所有标签</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.tags-space {
  width: 100%;
  height: 25px;
}
.tags-content {
  background-color: var(--el-bg-color);
  box-sizing: border-box;
  padding: 5px 20px;
  .tags-list {
    width: calc(100% - 70px);
  }
  .tags-option {
    width: 50px;
  }
}

// 标签字体
:deep(.el-tag) {
  font-size: 0.14rem;
}

// 更多按钮字体
:deep(.el-button) {
  font-size: 0.14rem;
}
</style>
