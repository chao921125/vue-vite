# 解决 element 的一些样式
#### 下拉框内容回显
```ts
this.$refs.select.$el.children[0].children[0].setAttribute('style',"background:url("+ icon +") no-repeat 10px;background-size: 30px 30px;color:#333;padding-left: 50px;");
```
