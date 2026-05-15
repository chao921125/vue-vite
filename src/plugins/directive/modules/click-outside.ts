type ClickOutsideElement = HTMLElement & {
  __clickOutsideHandler__?: (e: MouseEvent) => void;
};

export const clickOutside = {
  mounted(el: ClickOutsideElement, binding: any) {
    const handler = (e: MouseEvent) => {
      if (el.contains(e.target as Node)) {
        return false;
      }
      binding.value(e);
    };
    el.__clickOutsideHandler__ = handler;
    document.addEventListener("click", handler);
  },
  unmounted(el: ClickOutsideElement) {
    if (el.__clickOutsideHandler__) {
      document.removeEventListener("click", el.__clickOutsideHandler__);
    }
  },
};
