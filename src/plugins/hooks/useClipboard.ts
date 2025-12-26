export function useClipboard() {
  const isCopied = ref(false);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return { isCopied, copy };
}

export default { useClipboard };
