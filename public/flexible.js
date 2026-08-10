/**
 * flexible.js — rem 自适应方案
 *
 * 配合 postcss-px-convert (rootValue: 100) 使用
 * 动态设置 html 根元素的 font-size，使 rem 单位按视口宽度自适应缩放
 *
 * PC端 (>=768px):
 *   设计稿宽度 1920px，root font-size 基准 100px (1rem = 100px)
 *   按视口比例缩放，限制范围 80px ~ 120px，避免超大/超小屏极端变形
 *
 * 移动端 (<768px):
 *   设计稿宽度 375px，root font-size = clientWidth / 3.75
 *   375px 屏 → 100px，414px 屏 → 110.4px，320px 屏 → 85.3px
 */
(function () {
  var docEl = document.documentElement;
  var isMobile = false;

  function setRemUnit() {
    var clientWidth = docEl.clientWidth;
    var rootFontSize;

    if (clientWidth >= 768) {
      // PC 端: 按视口比例缩放，基准 1920px → 100px
      // 限制在 80px ~ 120px 范围内
      rootFontSize = Math.min(Math.max(clientWidth / 19.2, 80), 120);
      isMobile = false;
    } else {
      // 移动端: 375px 设计稿，root font-size = clientWidth / 3.75
      rootFontSize = clientWidth / 3.75;
      isMobile = true;
    }

    docEl.style.fontSize = rootFontSize + "px";
    docEl.setAttribute("data-platform", isMobile ? "mobile" : "pc");
  }

  setRemUnit();

  // resize 重新计算
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setRemUnit, 150);
  });

  // 页面从 bfcache 恢复时重新计算
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) setRemUnit();
  });
})();
