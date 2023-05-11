import { defineStore } from "pinia";
import { IDemoState, IDemoStates } from "@/interface/demo";

export const useDemo = defineStore("demo", {
	state: (): IDemoStates => {
		return {
			demo: {
				id: 0,
				name: "",
			},
		};
	},
	getters: {
		getDemoById: (state) => state.demo.id + 1,
		getDemo(): IDemoState {
			return this.demo;
		},
	},
	actions: {
		setDemo(data: IDemoState) {
			this.demo = data;
		},
	},
});
