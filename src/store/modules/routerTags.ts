import { defineStore } from "pinia";
import { ITagsViewRoutesState } from "@/interface/store";
import Storage from "@/plugins/utils/storage";
import Cookie from "@/plugins/utils/cookie";

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
export const useRouterTags = defineStore("tagsViewRoutes", {
	state: (): ITagsViewRoutesState => ({
		tagsViewRoutes: [],
		isTagsViewCurrenFull: false,
	}),
	actions: {
		async setTagsViewRoutes(data: Array<string>) {
			// this.tagsViewRoutes = data;
			Object.assign(this.tagsViewRoutes, data);
		},
		setCurrenFullscreen(bool: boolean) {
			Storage.setSessionStorage("isTagsViewCurrenFull", bool);
			Cookie.setCookie("isTagsViewCurrenFull", bool);
			this.isTagsViewCurrenFull = bool;
		},
	},
});
