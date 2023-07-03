// 引入项目中的全部全局组件
// import SvgIcon from "./svgIcon/index.vue"

// 组装成一个对象
const allGlobalComponents: any = {
  // SvgIcon
}

// 对外暴露插件对象，在main.ts中引入后，直接自动调用install方法
export default {
  install(app: any) {
    // 循环注册所有的全局组件
    Object.keys(allGlobalComponents).forEach((componentName) => {
      app.component(componentName, allGlobalComponents[componentName])
    })
  },
}
