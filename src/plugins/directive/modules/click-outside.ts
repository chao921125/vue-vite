export const clickOutside = {
  mounted(el, binding) {
    const handler = (e) => {
      if (el.contains(e.target)) {
        return false;
      }
      binding.value(e);
    };
    document.addEventListener("click", handler);
  },
  unmounted(el) {
    document.removeEventListener("click", el);
  },
};
