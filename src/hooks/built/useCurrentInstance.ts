import { getCurrentInstance, ComponentInternalInstance } from "vue";

export function useCurrentInstance() {
	const { proxy } = getCurrentInstance() as ComponentInternalInstance;
	return { proxy };
	// return appContext.config.globalProperties;
}
