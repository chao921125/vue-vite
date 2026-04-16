import { ElMessage } from "element-plus";
import { $t } from "@/plugins/i18n";

function getTextByTag(node) {
  if (node.children.length) {
    getTextByTag(node.children[0]);
  } else {
    return node.innerHTML;
  }
}

function copyData(val) {
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

export const copy = {
  mounted(el, binding) {
    if (binding.value) {
      el.copyData = binding.value;
    } else {
      el.copyData = getTextByTag(el);
    }
    el.addEventListener("click", () => copyData(el.copyData));
  },
  updated(el, binding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el) {
    el.removeEventListener("click", el.__handleClick__);
  },
};
