import { ElMessage } from "element-plus";
import { $t } from "@/plugins/i18n";

function getTextByTag(node: HTMLElement): string {
  if (node.children.length) {
    return getTextByTag(node.children[0] as HTMLElement);
  } else {
    return node.innerHTML;
  }
}

function copyData(val: string) {
  const copyText = document.createElement("textarea");
  copyText.innerHTML = val;
  copyText.readOnly = true;
  copyText.style.position = "fixed";
  copyText.style.zIndex = "-99999";
  document.body.appendChild(copyText);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  document.body.removeChild(copyText);
  ElMessage({
    type: "success",
    message: $t("message.msg.copy"),
  });
}

type CopyElement = HTMLElement & {
  copyData?: string;
  __handleClick__?: () => void;
};

export const copy = {
  mounted(el: CopyElement, binding: any) {
    if (binding.value) {
      el.copyData = binding.value;
    } else {
      el.copyData = getTextByTag(el);
    }
    const handleClick = () => copyData(el.copyData || "");
    el.__handleClick__ = handleClick;
    el.addEventListener("click", handleClick);
  },
  updated(el: CopyElement, binding: any) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: CopyElement) {
    if (el.__handleClick__) {
      el.removeEventListener("click", el.__handleClick__);
    }
  },
};
