export const txtToHtml = (id: string, html: string) => {
  if (!id) return "";
  if (!document.getElementById(id)) return "";
  document.getElementById(id)!.innerHTML = html;
};
