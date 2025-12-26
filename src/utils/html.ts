export const txtToHtml = (id, html) => {
  if (!id) return "";
  if (!document.getElementById(id)) return "";
  document.getElementById(id)!.innerHTML = html;
};
