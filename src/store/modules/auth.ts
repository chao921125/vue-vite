import { defineStore } from "pinia";
import { AuthConfigStates, AuthConfigState } from "@/store/interface";

export const useAuth = defineStore("auth", {
	state: (): AuthConfigStates => {
		return {
			role: {
				roles: [],
			},
		};
	},
	actions: {
		setRoles(data: AuthConfigState) {
			this.role = data;
		},
	},
});
