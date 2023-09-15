# [访问地址](https://vue-vite.pages.dev/) - [项目截图](./doc/Project.md)
[//]: # (pnpx husky install)
```text
1. 如果build失败或者运行异常请执行 pnpx mrm@2 lint-staged
```
# 避坑指南 及 注意事项
[**已在公司作为模板商用**]
- 三方包引入尽可能小写，自定义尽可能大写。
- package.json添加"type": "module",需要修改*.js为*.cjs
- 推荐使用pnpm(curl -fsSL https://get.pnpm.io/install.sh | sh -)安装依赖，其次yarn或者npm
- 注意所有配置菜单的数据，均由前端提供
- 项目本身配置99%都在vite.config.ts里面，参数设置都在根目录下，而非src下
- src下的config目录是系统默认参数，及部分数据配置
- 使用 reactive 请使用 let，使用 ref 请使用const
- ！！！注意VUE3中的reactive使用，如果需要更新视图需要抽出interface。！！！
- 开发问题 Typescript 和 TSX TS的泛型<T> 在结合 tsx 的时候使用as形式(兼容jsx)
- 如果你觉得你的package.json乱糟糟，那么使用 npx sort-package-json 来解决吧

# 关于手机端适配（脱离业务场景谈解决方案都是耍流氓）
1. 最古老的解决方案：使用媒体查询，但建议企业官网等页面较少的网站，且对网站设计者和开发者水平有一定的要求。
2. 切换URL改变页面呈现方式：通过监听获取当前是否是移动端，然后改变对应的URL。需要设计两套UI，开发者需要写两套页面及样式。优点是灵活，缺点是需要较长的时间。
3. rem 计算：目前最多的，通过对根字体的设置，自动换算
4. vw 计算：当下及以后的趋势，本项目就是采用的此计算方式，不打算采用和rem混用的方式了

# 命名规范及解释
1. 命名遵循驼峰规则：demoUser
2. 配置文件均按照xxConfig，数据配置均按照xxOption/xxData：
3. 封装的函数均按照export const FN = () => {}，内部调用函数用普通的function FN() {}
4. Store中对外函数命名均为useXx
5. interface尽量抽取出来，且抽取到最小粒度
##### API前端使用及后端接口命名规则对应：列举，可以对此进行变更

| 接口  | 前端           | 后端     |
|-----|--------------|--------|
| 读取  | query / read | select |
| 写入  | save / add   | create |
| 编辑  | edit         | update |
| 删除  | remove       | delete |
| 上传  | upload       | import |
| 下载  | download     | export |
| 实体  | get / set    |        |

# 基础核心
###### 无特殊说明均对应最新版
| 核心依赖                                                      |
|-----------------------------------------------------------|
| [👍vite 官网](https://cn.vitejs.dev/)                       |
| [~~~vue-cli~~~](https://www.npmjs.com/package/@vue/cli)   |
| vue                                                       |
| [vue3 官网](https://vuejs.org/)                             |
| [vue2 官网](https://v2.cn.vuejs.org/)                       |
| 路由管理                                                      |
| [vue-router 官网](https://www.npmjs.com/package/vue-router) |
| 状态管理                                                      |
| [👍Pinia 官网](https://pinia.web3doc.top/)                  |
| [vuex 官网](https://next.vuex.vuejs.org/)                   |

| JavaScript标准库                                  |
|------------------------------------------------|
| [core-js](https://github.com/zloirock/core-js) |

| 网络请求                                                                                      |
|-------------------------------------------------------------------------------------------|
| [axios 官网](http://axios-js.com/)                                                          |
| [ws 官网 ts 需安装 @types/ws](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API) |
| [socket.io socket.io-client](https://socket.io/zh-CN/)                                    |
| [qs 序列化网络请求参数](https://github.com/ljharb/qs)                                              |

# 跨端框架
| APP( IOS Android )                                                 | 小程序 & H5                                                            |
|--------------------------------------------------------------------|---------------------------------------------------------------------|
| [flutter](https://flutter.dev/) [flutter](https://flutter.cn/)     | [UNI-APP](https://uniapp.dcloud.net.cn/) 全平台跨端含APP等等                |
| [Ark](https://developer.harmonyos.com/cn/develop/)                 | [TARO](https://taro.jd.com/) 3.x已支持vue，但不推荐使用vue开发，实践不佳             |
| [UNI-UTS](https://uniapp.dcloud.net.cn/)                           | [微信官方](https://developers.weixin.qq.com/miniprogram/dev/framework/) |
| [React Native](https://reactnative.dev/)                           |                                                                     |
| [Ionic](https://ionicframework.com/) [ionic UI](https://ionic.io/) | [~~mpvue 官网~~](https://mpvue.com/) 美团                               |
| [hippyjs](https://hippyjs.org/#/) 3.x已支持vue                        | [~~wepyjs 官网~~](https://wepyjs.github.io/wepy-docs/) 腾讯 需要学习wepy    |
| [cordova 官网](http://cordova.axuer.com/)                            |                                                                     |
| [Native Script 官网](https://nativescript.org/)                      |                                                                     |

# 语法解析
| TS                                                         |
|------------------------------------------------------------|
| [typescript 官网](https://www.tslang.cn/)                    |
| [ts-node 官网 ts-node **.ts](https://typestrong.org/ts-node) |

| 样式组件 -D  注意重写组件样式的引用                                                           |
|--------------------------------------------------------------------------------|
| [sass](https://sass-lang.com/)                                                 |
| [sass-loader](https://webpack.docschina.org/)                                  |
| [node-sass](https://www.npmjs.com/package/node-sass)                           |
| [less](https://less.bootcss.com/)                                              |
| [less-loader](https://www.npmjs.com/package/less-loader)                       |
| [style-resources-loader](https://www.npmjs.com/package/style-resources-loader) |
| [svg-sprite-loader](https://www.npmjs.com/package/svg-sprite-loader)           |
| [text-loader](https://www.npmjs.com/package/text-loader)                       |
| [vue-style-loader](https://www.npmjs.com/package/vue-style-loader)             |
| [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler)   |
| [浏览器样式补全 autoprefixer](https://www.npmjs.com/package/autoprefixer)             |
| 快速样式CSS                                                                        |
| [unocss](https://unocss.dev/)                                                  |
| [tailwindcss](https://tailwindcss.com/) [doc](https://www.tailwindcss.cn/docs) |
| [windicss](https://windicss.org/)                                              |

| postcss插件库                                                                       |
|----------------------------------------------------------------------------------|
| [postcss](https://www.npmjs.com/package/postcss)                                 |
| [cssnano](https://www.npmjs.com/package/cssnano)                                 |
| [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env)           |
| [postcss-import](https://www.npmjs.com/package/postcss-import)                   |
| [postcss-url](https://www.npmjs.com/package/postcss-url)                         |
| [postcss-viewport-units](https://www.npmjs.com/package/postcss-viewport-units)   |
| [postcss-write-svg](https://www.npmjs.com/package/postcss-write-svg)             |
| [cssnano-preset-advanced](https://www.npmjs.com/package/cssnano-preset-advanced) |

| 语法检查 -D                                                                        |
|--------------------------------------------------------------------------------|
| [eslint](https://www.npmjs.com/package/eslint)                                 |
| [prettier](https://www.npmjs.com/package/prettier) 个人推荐这个                      |
| [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) |

# UI相关
| UI 多端 官方                                         |
|--------------------------------------------------|
| [tdesign 腾讯多端UI](https://tdesign.tencent.com/)   |

| UI PC 官方                                                                  |
|---------------------------------------------------------------------------|
| [👍vuetifyjs 官网](https://vuetifyjs.com/)                                  |
| [👍element-plus 官网](https://element-plus.org/)                            |
| [headlessui](https://headlessui.com/)                                     |
| [naiveui](https://www.naiveui.com/zh-CN/os-theme)                         |
| [arco 字节 官网](https://arco.design/)                                        |
| [bootstrap 兼容版 直接install](https://getbootstrap.com/)                      |
| [ant-design-vue 官网 社区维护 请自行斟酌](https://www.antdv.com/components/overview) |
| [bootstrap4 vue 官网](https://dev.bootstrap-vue.org/)                       |
| [quasar 官网](https://quasar.dev/)                                          |
| [heyui 官网](https://v2.heyui.top/)                                         |
| [BalmUI 官网](https://next-material.balmjs.com/#/)                          |
| [antoniandre 官网](https://antoniandre.github.io/wave-ui/)                  |
| [naive ui 官网](https://www.naiveui.com/zh-CN/os-theme)                     |
| [primefaces 官网](https://primefaces.org/primevue/showcase/#/setup)         |
| [Vuestic UI 官网](https://vuestic.dev/)                                     |
| [iDux 官网](https://idux.site/)                                             |
| [relaxplus 官网](https://bsie.gitee.io/relaxplus/#/)                        |

| UI Mobile 官方                                                    |
|-----------------------------------------------------------------|
| [👍ionicframework 官网 VRA](https://ionicframework.com/docs/)     |
| [👍vant](https://github.com/CharleeWa/vue3-vant-mobile)         |
| [👍vant@next 官网](https://vant-contrib.gitee.io/vant/v3/)        |
| [👍nutui @nutui/nutui@next 官网](https://nutui.jd.com/)           |
| [varlet 官网](https://varlet-varletjs.vercel.app/#/en-US/index)   |
| [mui uni-app 官网](https://dev.dcloud.net.cn/mui/)                |
| [mui 官网](https://mui.com/)                                      |
| [mint-ui 官网](http://mint-ui.github.io/)                         |
| [VARLET 官网](https://varlet.gitee.io/varlet-ui/#/zh-CN/home)     |
| [Wave UI 官网](https://antoniandre.github.io/wave-ui/)            |
| [Tencent](https://github.com/Tencent/weui/)                     |
| [vite](https://github.com/LZHD/vue-vite-h5)                     |
| [vux](https://vux.li/)                                          |

| UI 小程序端                                                     |
|-------------------------------------------------------------|
| [👍vant](https://github.com/vant-ui/vant-weapp)             |
| [👍taro](https://taro-ui.jd.com/#/)                         |
| [Tencent](https://github.com/Tencent/weui-wxss)             |
| [mini](https://doc.mini.talelin.com/)                       |
| [wux](https://wux-weapp.github.io/wux-weapp-docs/#/)        |
| [cube](https://didi.github.io/cube-ui/#/zh-CN)              |
| [ColorUI 更新频率慢](https://github.com/weilanwl/ColorUI)        |
| [touchwx 不推荐，停更了](https://github.com/uileader/touchwx)      |
| [iview 不推荐，停更了](https://github.com/TalkingData/iview-weapp) |

| VUE2 UI PC 官方                                     |
|---------------------------------------------------|
| [elementUI 官网](https://element.eleme.io/)         |
| [vuetifyjs 官网](https://v2.vuetifyjs.com/zh-Hans/) |
| [mint-ui 官网](http://mint-ui.github.io/#!/zh-cn)   |
| [buefy 官网](https://buefy.org/)                    |
| [onsen 官网](https://onsen.io/)                     |

| 低代码                                                             |
|-----------------------------------------------------------------|
| [formily 官网 阿里巴巴](https://github.com/alibaba/formily)           |
| [form-generator 官网](https://github.com/JakHuang/form-generator) |

| 项目及插件示例                                         |
|-------------------------------------------------|
| [reactiveapps 官网](https://www.reactiveapps.io/) |
| [小插件合集](https://madewith.cn/)                   |

| 单一UI组件                                                                 |
|------------------------------------------------------------------------|
| [表格 vxe-table 官网](https://vxetable.cn/#/table/start/install)           |
| [表格 tanstack 官网](https://tanstack.com/)                                |
| [布局 vue-grid-layout](https://jbaysolutions.github.io/vue-grid-layout/) |
| [树 vue-treeselect](https://www.npmjs.com/package/ue-treeselect)        |

| 静态UI JS PC H5                                                        |
|----------------------------------------------------------------------|
| [👍 Bootstrap](https://getbootstrap.com/)                            |
| [👍 layui 官方！！！](https://layui.dev/)                                 |
| [semantic](https://semantic-ui.com/)                                 |
| [H5 zeptojs](https://www.zeptojs.com.cn/)                            |
| [PC javascript](https://www.javascript.com/)                         |
| [Framework7](https://framework7.io/)                                 |
| [Foundation](https://get.foundation/index.html)                      |
| [Onsen UI](https://onsen.io/)                                        |
| [heyui](https://v2.heyui.top/)                                       |
| [varletjs varletjs](https://varlet-varletjs.vercel.app/#/en-US/home) |

| 图表                                                               |
|------------------------------------------------------------------|
| [👍Apache ECharts 官网](https://echarts.apache.org/zh/index.html)  |
| [👍antv antd全家桶 官网](https://antv.vision/zh)                      |
| [👍FusionCharts 官网](https://www.fusioncharts.com/)               |
| [👍C3.js 官网](https://c3js.org/)                                  |
| [👍D3.js 官网](https://d3js.org/)                                  |
| [Chart.js 官网](https://chartjs.bootcss.com/)                      |
| [plotly 官网](https://plotly.com/)                                 |
| [nvd3 官网](https://nvd3.org/)                                     |
| [dygraphs 官网](https://dygraphs.com/)                             |
| [cytoscape 官网](https://js.cytoscape.org/)                        |
| [sigmajs 官网](https://www.sigmajs.org/)                           |
| [ember-charts 官网](https://emberobserver.com/addons/ember-charts) |
| [flotcharts 官网](https://www.flotcharts.org/)                     |
| [plottablejs 官网](http://plottablejs.org/)                        |
| [Highcharts 官网 付费](https://www.highcharts.com/)                  |
| [amcharts 官网 付费](https://www.amcharts.com/)                      |

| 图标                                                   |
|------------------------------------------------------|
| [iconfont 官网](https://www.iconfont.cn/)              |
| [iconify 官网](https://icon-sets.iconify.design/)      |
| [iconpark 官网](https://iconpark.oceanengine.com/home) |

| 加载 loading                                                               |
|--------------------------------------------------------------------------|
| [nprogress](https://www.npmjs.com/package/nprogress)                     |
| [vue-simple-spinner](https://www.npmjs.com/package/vue-simple-spinner)   |
| [vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay) |
| [vue-progressbar](https://www.npmjs.com/package/vue-progressbar)         |
| [vue-spinner](https://www.npmjs.com/package/vue-spinner)                 |
| [vue-blockui](https://www.npmjs.com/package/vue-blockui)                 |

| 进度条-滑动条                                                                    |
|----------------------------------------------------------------------------|
| [vuejs-progress-bar](https://www.npmjs.com/package/vuejs-progress-bar)     |
| [vue-slider-component](https://www.npmjs.com/package/vue-slider-component) |
| [vue-radial-progress](https://www.npmjs.com/package/vue-radial-progress)   |

| 轮播图                                                                                                 |
|-----------------------------------------------------------------------------------------------------|
| [swiper 支持PC、H5](https://www.swiper.com.cn/) 结合 [vue-awesome-swiper](https://www.swiper.com.cn/) 使用 |
| [vue-concise-slider](https://www.npmjs.com/package/vue-concise-slider)                              |
| [@splidejs/vue-splide](https://www.npmjs.com/package/@splidejs/vue-splide)                          |
| [vue2 seamless 无缝滚动](https://www.npmjs.com/package/vue-seamless-scroll)                             |
| [vue3 seamless 无缝滚动](https://www.npmjs.com/package/vue3-seamless-scroll)                            |
| [vue3 infinite 无限滚动](https://www.npmjs.com/package/vue3-infinite-list)                              |

| 拖拽                                                                          |
|-----------------------------------------------------------------------------|
| [vue3-dnd](https://haochenguang.gitee.io/vue3-dnd/)                         |
| [vue3 vue.draggable.next](https://github.com/SortableJS/vue.draggable.next) |
| [vue2 Vue.Draggable](https://github.com/itmier/Vue.Draggable)               |
| [vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout)            |
| [vue-drag-resize](https://github.com/kirillmurashov/vue-drag-resize)        |

| 全屏                                                     |
|--------------------------------------------------------|
| [screenfull](https://www.npmjs.com/package/screenfull) |

| 数据表格                                       |
|--------------------------------------------|
| [xlsx](https://www.npmjs.com/package/xlsx) |

| html2canvas，页面截图                                         |
|----------------------------------------------------------|
| [html2canvas](https://www.npmjs.com/package/html2canvas) |

| 二维码                                                    |
|--------------------------------------------------------|
| [qrcode](https://www.npmjs.com/package/qrcode)         |
| [vue-qr](https://www.npmjs.com/package/vue-qr)         |
| [qrcode.vue](https://www.npmjs.com/package/qrcode.vue) |
| [qrcodejs2](https://www.npmjs.com/package/qrcodejs2)   |

| 日历                                                                               |
|----------------------------------------------------------------------------------|
| [vue-functional-calendar](https://www.npmjs.com/package/vue-functional-calendar) |
| [vuejs-heatmap](https://www.npmjs.com/package/vuejs-heatmap)                     |

| 富文本编辑器                                                                 |                                                              
|------------------------------------------------------------------------|
| [tiptap 官网](https://tiptap.dev/)                                       |
| [vue3 wangeditor 官网](https://www.wangeditor.com/)                      |
| [vue2 wangeditor 官网](https://www.wangeditor.com/)                      |
| [react wangeditor 官网](https://www.wangeditor.com/)                     |
| [js wangeditor 官网](https://www.wangeditor.com/)                        |
| [Quill](https://quilljs.com/)                                          |
| [vue-quill-editor](https://www.npmjs.com/package/vue-quill-editor)     |
| [ckeditor5-vue](https://www.npmjs.com/package/@ckeditor/ckeditor5-vue) |
| [TinyMCE 6 官网](https://www.tiny.cloud/docs/tinymce/6/)                 |
| [TinyMCE 官网](https://www.tiny.cloud/)                                  |
| [Froala](https://froala.com/wysiwyg-editor/)                           |
| [Trumbowyg](https://alex-d.github.io/Trumbowyg/)                       |
| [slate](https://github.com/ianstormtaylor/slate)                       |
| [squire](https://github.com/neilj/Squire)                              |
| [summernote](https://summernote.org/)                                  |

| Markdown编辑器                                                                       |
|-----------------------------------------------------------------------------------|
| [Vditor 官网](https://b3log.org/vditor/)                                            |
| [Vue-markdown-editor 官网](https://code-farmer-i.github.io/vue-markdown-editor/zh/) |
| [Md-editor-v3 官网](https://imzbf.github.io/md-editor-v3/index)                     |

| 剪切板                                                            |
|----------------------------------------------------------------|
| [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2) |

| 文件上传及保存                                                         |
|-----------------------------------------------------------------|
| [file-saver](https://www.npmjs.com/package/file-saver)          |
| [Uppy 官网](https://uppy.io/docs/vue/)                            |
| [Vue-filepond 官网](https://github.com/pqina/vue-filepond#readme) |

| 打印                                                                     |
|------------------------------------------------------------------------|
| [vue3-print-nb](https://www.npmjs.com/package/vue3-print-nb)           |
| [print-js](https://www.npmjs.com/package/print-js)                     |
| [vue-plugin-hiprint](https://www.npmjs.com/package/vue-plugin-hiprint) |

# 数据操作
| 节点和浏览器的BDD / TDD断言库                                  |                                  
|------------------------------------------------------|
| [chai](https://www.npmjs.com/package/chai)           |
| [cross-env](https://www.npmjs.com/package/cross-env) |

| cookie管理                                             |
|------------------------------------------------------|
| [js-cookie](https://www.npmjs.com/package/js-cookie) |

| 日期格式化                                                     |
|-----------------------------------------------------------|
| [date-fns](https://www.npmjs.com/package/date-fns)        |
| [dayjs](https://www.npmjs.com/package/dayjs)              |
| [~~~moment~~~ 不再推荐](https://www.npmjs.com/package/moment) |

| 加密解密                                                 |
|------------------------------------------------------|
| [crypto-js](https://www.npmjs.com/package/crypto-js) |
| [md5](https://www.npmjs.com/package/md5)             |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs)   |
| [jsencrypt](https://www.npmjs.com/package/jsencrypt) |
| [jsrsasign](https://www.npmjs.com/package/jsrsasign) |
| [base64-js](https://www.npmjs.com/package/base64-js) |
| [js-base64](https://www.npmjs.com/package/js-base64) |

| ua签名                                                       |
|------------------------------------------------------------|
| [ua-parser-js](https://www.npmjs.com/package/ua-parser-js) |

| 本地数据存储                                         |
|------------------------------------------------|
| [lodash](https://www.npmjs.com/package/lodash) |
| [lowdb](https://www.npmjs.com/package/lowdb)   |

| 国际化                                                              |
|------------------------------------------------------------------|
| [i18n-next 支持VUE/React/Server......](https://github.com/i18next) |
| [vue-i18n](https://www.npmjs.com/package/vue-i18n)               |

| 复制粘贴                                                 |
|------------------------------------------------------|
| [clipboard](https://www.npmjs.com/package/clipboard) |

| 三方授权登录集成库                                                              |
|------------------------------------------------------------------------|
| [next-auth](https://www.npmjs.com/package/next-auth)                   |
| [@okta/okta-auth-js](https://www.npmjs.com/package/@okta/okta-auth-js) |
| [hellojs](https://www.npmjs.com/package/hellojs)                       |

| 图片裁剪                                                        |
|-------------------------------------------------------------|
| [JS库 cropperjs](https://github.com/fengyuanchen/cropperjs)  |
| [组件库 vue-cropper](https://github.com/xyxiao001/vue-cropper) |

| 分享插件                                                                         |
|------------------------------------------------------------------------------|
| [vue-social-sharing](https://www.npmjs.com/package/vue-social-sharing)       |
| [vue-socialmedia-share](https://www.npmjs.com/package/vue-socialmedia-share) |
| [@vue/shared](https://www.npmjs.com/package/@vue/shared)                     |
| [@vue/cli-shared-utils](https://www.npmjs.com/package/@vue/cli-shared-utils) |
| [nativeshare 唤起浏览器自身分享组件](https://www.npmjs.com/package/nativeshare)         |

| 地图                                                              |
|-----------------------------------------------------------------|
| [vue-amap 高德](https://www.npmjs.com/package/vue-amap)           |
| [vue-baidu-map 百度](https://www.npmjs.com/package/vue-baidu-map) |

| 绘图 3D                                           |
|-------------------------------------------------|
| [three.js](https://www.npmjs.com/package/three) |

| office 预览、上传、导出、导入 包含：xls，xlsx，doc，docx，pdf，csv                                         |
|-----------------------------------------------------------------------------------------|
| [文件类型判断 file-type](https://www.npmjs.com/package/file-type)                             |
| [Office Excel handsontable](https://github.com/handsontable/handsontable)               |
| [Office Word mammoth](https://github.com/mwilliamson/mammoth.js)                        |
| [PDF pdfjs-dist](https://github.com/mozilla/pdf.js)                                     |
| [PDF vue-pdf vue2](https://www.npmjs.com/package/vue-pdf)                               |
| [@vue-office docx excel pdf v2需要安装依赖 vue-demi](https://github.com/501351981/vue-office) |

| 支付                                                                                                              |
|-----------------------------------------------------------------------------------------------------------------|
| [stripejs](https://www.npmjs.com/package/stripe) [官网](https://stripe.com/docs)                                  |
| [vue-stripe-elements-plus](https://www.npmjs.com/package/vue-stripe-elements-plus) [官网](https://vuestripe.com/) |
| [vue-stripe](https://www.npmjs.com/package/@vue-stripe/vue-stripe) [官网](https://vuestripe.com/)                 |

| 视频播放                                                                         |
|------------------------------------------------------------------------------|
| [vue-video-player](https://www.npmjs.com/package/vue-video-player)           |
| [vue-core-video-player](https://www.npmjs.com/package/vue-core-video-player) |

| 3D                                                                                                                                 |
|------------------------------------------------------------------------------------------------------------------------------------|
| [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)                                                                |
| [threejs](https://www.npmjs.com/package/three) [官网](https://threejs.org/) [GitHub](https://github.com/mrdoob/three.js/tree/master) |
| [babylonjs](https://www.npmjs.com/package/babylonjs) [官网](https://www.babylonjs.com/)                                              |
| [AR model-viewer](https://github.com/google/model-viewer)                                                                          |

| 游戏                                                                                                                                    |
|---------------------------------------------------------------------------------------------------------------------------------------|
| [Eva.js](https://www.npmjs.com/package/@eva/eva.js)                                                                                   |
| [Eva-plugin-renderer](https://www.npmjs.com/package/@eva/plugin-renderer)                                                             |
| [Eva-plugin-renderer-img](https://www.npmjs.com/package/@eva/plugin-renderer-img) [官网](https://eva-engine.gitee.io/#/tutorials/intro) |

# 特效
| Loading动画                                                                    |
|------------------------------------------------------------------------------|
| [three-dots 等待效果](https://nzbin.github.io/three-dots/)                       |
| http://k21vin.gitee.io/front-end-data-visualization/#/native/pureCSS/loading |
| https://juejin.cn/post/7037036742985121800                                   |

| 动画整理                                                                           |
|--------------------------------------------------------------------------------|
| [animate css库 官网](https://animate.style/)                                      |
| [gsap库](https://www.npmjs.com/package/gsap/) [官网](https://greensock.com/gsap/) |
| [angrytools](https://angrytools.com/)                                          | 
| [angrytools](https://angrytools.com/css/animation/)                            |
| [animejs](https://animejs.com/)                                                |
| [csshake 抖动效果](https://elrumordelaluz.github.io/csshake/)                      |
| [animista](https://animista.net/)                                              |
| [minimamente](https://www.minimamente.com/project/magic/)                      |
| [vue-kinesis](https://www.npmjs.com/package/vue-kinesis)                       |
| [tsparticles 粒子动画](https://www.npmjs.com/package/tsparticles)                  |
| [vue-prlx 滚动视觉差](https://www.npmjs.com/package/vue-prlx)                       |
| [vue-page-transition 过渡](https://www.npmjs.com/package/vue-page-transition)    |
| [Animatopy](https://sarthology.github.io/Animatopy/)                           |
| [wickedCSS](https://github.com/kristofferandreasen/wickedCSS)                  |
| [cssanimation](https://github.com/yesiamrocks/cssanimation.io)                 |
| [鼠标效果 ianlunn 官网](http://ianlunn.github.io/Hover/)                             |
| [animxyz](https://animxyz.com/)                                                |
| [elrumordelaluz 鼠标放上效果](https://elrumordelaluz.github.io/reshake/)             |
| [基本形状](https://csslayout.io/)                                                  |
| [案例 特效 1](https://codepen.io/)                                                 |
| [案例 css技巧 1](https://csscoco.com/inspiration/#/)                               |
| [案例 css技巧 2](https://chokcoco.github.io/CSS-Inspiration/#/)                    |

| 文字                                                     |
|--------------------------------------------------------|
| [vue-textra](https://www.npmjs.com/package/vue-textra) |

# 构建
| 环境配置获取                                          |
|-------------------------------------------------|
| [dotenv](https://www.npmjs.com/package/dotenv)  |

| 代码提交信息校验 -D                                                                          |
|--------------------------------------------------------------------------------------|
| [husky](https://www.npmjs.com/package/husky)                                         |
| [commitizen](https://www.npmjs.com/package/commitizen)                               |
| [cz-conventional-changelog](https://www.npmjs.com/package/cz-conventional-changelog) |
| [cz-customizable](https://www.npmjs.com/package/cz-customizable)                     |

# 测试
| 本项目并没有测试用例，如果大家需要的话请自行添加，以下是测试集成依赖                                      |
|-------------------------------------------------------------------------|
| [@vue/test-utils 推荐 这个可以作为核心 配合jest使用更好](https://test-utils.vuejs.org/) |
| [jestjs](https://jestjs.io/)                                            |
| [mochajs webpack](https://mochajs.org/)                                 |

# 移动端
| 适配移动端 -D                                                                               |
|----------------------------------------------------------------------------------------|
| **rem方案过时啦，用vw方案解决吧**                                                                  |
| [postcss-loader 将px转rem](https://www.npmjs.com/package/postcss-loader)                 |
| **vw方案 需要依赖style-loader 且需要删除@vue/cli-plugin-eslint**                                  |
| [postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport)         |
| **rem方案**                                                                              |
| [postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem)                       |
| [amfe-flexible](https://www.npmjs.com/package/amfe-flexible)                           |
| [~~lib-flexible~~](https://www.npmjs.com/package/lib-flexible)                         |
| [~~postcss-plugin-px2rem~~](https://www.npmjs.com/package/postcss-plugin-px2rem)       |
| [~~postcss-px2rem~~](https://www.npmjs.com/package/postcss-px2rem)                     |

| 移动端日志                                              |
|----------------------------------------------------|
| [eruda](https://www.npmjs.com/package/eruda)       |
| [vconsole](https://www.npmjs.com/package/vconsole) |

# SSR
| 框架                                                                                                          |
|-------------------------------------------------------------------------------------------------------------|
| [astro 多语言支持](https://astro.build/)                                                                         |
| [NuxtJS vue](https://nuxt.com/)                                                                             |
| [NextJS react](https://www.nextjs.cn/)                                                                      |
| [quasar 官网 组件一体](https://quasar.dev/)                                                                       |
| [vite ssr-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue)                      |
| [vite-plugin-ssr](https://vite-plugin-ssr.com/)                                                             |
| Gatsby Next.js NuxtJS Docusaurus Eleventy GitBook Gridsome Hugo Jekyll Pelican SvelteKit VuePress WordPress |

# 在线工具
| api                           |
|-------------------------------|
| [apifox](https://apifox.com/) |
| [yapi](https://yapi.pro/)     |

| code                               |
|------------------------------------|
| [codepen](https://codepen.io/)     |
| [css 在线](https://cssreference.io/) |

# 优秀项目推荐

| 插件网站                                                       |
|------------------------------------------------------------|
| [Vite 官方推荐插件](https://github.com/vitejs/awesome-vite)      |
| [vue3-resource](https://hu-snail.github.io/vue3-resource/) |
| [vue3js](https://vue3js.cn/)                               |

| 项目示例                                                            |
|-----------------------------------------------------------------|
| [水墨文档 vue2 停更](https://github.com/huangwei9527/Ink-wash-docs)   |
| [聊天室](https://github.com/gmingchen/vue3-element-plus-im)        |
| [聊天悬浮](https://www.npmjs.com/package/vue-beautiful-chat)        |

| vite doc                           |
|------------------------------------|
| https://github.com/sl1673495/blogs |
| https://github.com/antfu/vitesse   |
| https://github.com/vuejs/vitepress |

| 各种插件                                       |
|--------------------------------------------|
| [组件](https://madewith.cn/)                 |
| https://github.com/vitejs/awesome-vite     |
| https://github.com/nekobc1998923/vitecamp  |
| https://hu-snail.github.io/vue3-resource/  |

| Admin server & Web                                         |
|------------------------------------------------------------|
| https://github.com/jeecgboot                               |
| https://gitee.com/likeadmin                                |
| https://github.com/yangzongzhuan                           |
| [ant-simple-pro](https://github.com/lgf196/ant-simple-pro) |

| Admin vite                                                           |
|----------------------------------------------------------------------|
| https://github.com/XPoet/vite-vue3-starter                           |
| https://github.com/cuixiaorui/mini-vue                               |
| https://github.com/YunaiV/ruoyi-vue-pro                              |
| https://github.com/flipped-aurora                                    |
| https://github.com/vbenjs/vue-vben-admin                             |
| https://github.com/vbenjs/vben-admin-thin-next                       |
| https://github.com/pure-admin/vue-pure-admin                         |
| https://github.com/jekip/naive-ui-admin                              |
| https://github.com/HalseySpicy/Geeker-Admin                          |
| https://github.com/newbee-ltd/vue3-admin                             |
| https://github.com/buqiyuan/vite-vue3-admin                          |
| https://github.com/llyyayx/vue3-antd-admin                           |
| https://github.com/buqiyuan/vite-vue3-lowcode                        |
| https://github.com/RainManGO/vue3-composition-admin/tree/vite        |
| https://github.com/cmdparkour/vue-admin-box                          |
| https://github.com/GeekQiaQia/vue3.0-template-admin                  |
| https://github.com/lyt-Top/vue-next-admin                            |
| https://github.com/jzfai/vue3-admin-plus                             |
| https://github.com/tobe-fe-dalao/fast-vue3                           |
| https://github.com/gmingchen/vue3-element-plus-admin/tree/vite-pinia |
| https://github.com/lin-xin/vue-manage-system                         |
| https://github.com/iamhmx/vue-next-admin                             |
| https://github.com/un-pany/v3-admin-vite                             |
| https://github.com/flipped-aurora/gin-vue-admin                      |
| https://github.com/xushanpei/vite_vue3_ts                            |
| https://github.com/moon-studio/vite-vue-bpmn-process                 |
| https://github.com/flipped-aurora/gin-vue-admin                      |
| https://github.com/ywanzhou/vue3-template                            |
| https://github.com/cool-team-official/cool-admin-vue                 |
| https://github.com/Yiuman/bpmn-vue-activiti                          |
| https://github.com/peng-xiao-shuai/vite-vue-admin                    |
| https://github.com/wuufeii/vue3-admin-vite                           |
| https://github.com/talktao/Vue3-Vite-Vant-TS-H5                      |
| https://github.com/GeekQiaQia/vue3.0-template-admin                  |
| https://github.com/zeorcpt/vue3-vant-mobile                          |
| https://github.com/lyt-Top/vue-next-admin                            |
| https://github.com/ZANJIAHAO1008/Admin-Frame-Vue3                    |
| https://github.com/cmdparkour/vue-admin-box                          |
| https://github.com/honghuangdc/soybean-admin                         |
| https://github.com/liyupi/sql-generator                              |
| https://github.com/vite-pwa/vite-plugin-pwa                          |
| https://github.com/electron-vite/electron-vite-vue                   |
| https://github.com/Codennnn/vue-color-avatar                         |
| https://github.com/newbee-ltd/vue3-admin                             |
| https://github.com/GeekQiaQia/vue3.0-template-admin                  |
| https://github.com/zclzone/vue-naive-admin                           |

| mobile & project                                      |
|-------------------------------------------------------|
| https://github.com/xxxsf/vue3-h5-template             |
| https://github.com/geekskai/vue3-jd-h5                |
| https://github.com/biubiubiu01/vue3-bigData           |
| https://github.com/jeecgboot/jeecg-boot               |
| https://github.com/biaochenxuying/blog-vue-typescript |
| https://github.com/Yin-Hongwei/music-website          |
| https://github.com/pipipi-pikachu/PPTist              |
| https://github.com/Codennnn/vue-color-avatar          |
| https://github.com/youlaitech/youlai-mall             |
| https://github.com/buqiyuan/vite-vue3-lowcode         |
| https://github.com/buqiyuan/vue3-antd-admin           |
| https://github.com/ynzy/vite-vue3-h5-template         |
| https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5     |
| https://github.com/buqiyuan/vite-vue3-h5              |
| https://github.com/xsf0105/vue3-h5-template           |

# 游戏
| 游戏开发框架                                                           |
|------------------------------------------------------------------|
| [Unity 3D(C/JS)](https://www.unrealengine.com/zh-CN/)            |
| [Cocos(C/TS)](https://www.unrealengine.com/zh-CN/)               |
| [Unreal(C++) 这是一个追求画质的游戏引擎](https://www.unrealengine.com/zh-CN/) |
| [小游戏 createjs](https://www.createjs.com/)                        |
