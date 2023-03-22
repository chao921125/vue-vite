import { defineStore } from "pinia";
import { DemoState, DemoStates } from "@/store/interface";

export const useDemo = defineStore("demo", {
	state: (): DemoStates => {
		return {
			demo: {
				id: 0,
				name: "",
			},
		};
	},
	getters: {
		getDemoById: (state) => state.demo.id + 1,
		getDemo(): DemoState {
			return this.demo;
		},
	},
	actions: {
		setDemo(data: DemoState) {
			this.demo = data;
		},
	},
});
