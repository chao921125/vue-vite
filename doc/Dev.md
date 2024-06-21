# 开发技巧
```javascript
// 查看滚动条在哪个元素
function findScroll(el) {
		if (!el) return false;
		el.onscroll = function (){
				console.log(el);
		}
		Array.from(el.children).forEach(findScroll)
}
findScroll(document.body);
```
