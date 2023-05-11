import { defineStore } from "pinia";
import { IAuthConfigStates, IAuthConfigState } from "@/interface/store";

export const useAuth = defineStore("auth", {
	state: (): IAuthConfigStates => {
		return {
			role: {
				roles: [],
			},
		};
	},
	actions: {
		setRoles(data: IAuthConfigState) {
			// this.role = data;
			Object.assign(this.role, data);
		},
	},
});
