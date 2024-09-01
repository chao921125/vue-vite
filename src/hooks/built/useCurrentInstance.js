import { getCurrentInstance } from "vue";

export function useCurrentInstance() {
	const { proxy } = getCurrentInstance();
	return { proxy };
	// return appContext.config.globalProperties;
}
export default { useCurrentInstance };
