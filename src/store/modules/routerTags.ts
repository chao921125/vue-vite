import { defineStore } from "pinia";
import { TagsViewRoutesState } from "../interface";
import Utils from "@/plugins/utils";

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
export const useTagsViewRoutes = defineStore("tagsViewRoutes", {
	state: (): TagsViewRoutesState => ({
		tagsViewRoutes: [],
		isTagsViewCurrenFull: false,
	}),
	actions: {
		async setTagsViewRoutes(data: Array<string>) {
			this.tagsViewRoutes = data;
		},
		setCurrenFullscreen(bool: Boolean) {
			Utils.Storages.setSessionStorage("isTagsViewCurrenFull", bool);
			Utils.Cookies.setCookie("isTagsViewCurrenFull", bool);
			this.isTagsViewCurrenFull = bool;
		},
	},
});
