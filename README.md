# [访问地址](https://vue-vite.pages.dev/) - [访问地址 国外](https://vue-vite-ts.vercel.app/) - [项目截图](./docs/Project.md)
# TS、JS 分支为精简分支，主分支更新频率较慢，学习请参考那两个分支
# 命名规范及解释
1. 命名遵循驼峰规则：demoUser
2. 配置文件均按照xxConfig，数据配置均按照xxOption/xxData：
3. 封装的函数均按照export const FN = () => {}，内部调用函数用普通的function FN() {}
4. Store中对外函数命名均为useXx
5. interface尽量抽取出来，且抽取到最小粒度
##### API前端使用及后端接口命名规则对应：列举，可以对此进行变更

| 接口  | 前端              | 后端            | 前端API示例              | 后端API示例               |
|-----|-----------------|---------------|----------------------|-----------------------|
| 读取  | search / get    | read / select | searchDemo / getDemo | readDemo / selectDemo |
| 写入  | save / add      | create        | saveDemo / addDemo   | createDemo            |
| 编辑  | edit / update   | update        | editDemo             | updateDemo            |
| 删除  | remove / delete | delete        | removeDemo           | deleteDemo            |
| 上传  | upload          | import        | uploadDemo           | importDemo            |
| 下载  | download        | export        | downloadDemo         | exportDemo            |
| 实体  | get / set       |               | getDemo / setDemo    |                       |

# 插件，UI 及推荐项目等
| 插件网站                                                       |
|------------------------------------------------------------|
| [Vite 官方推荐插件](https://github.com/vitejs/awesome-vite)      |
| [vue3js](https://vue3js.cn/)                               |
| [vue3-resource](https://hu-snail.github.io/vue3-resource/) |

| JS 引擎                         |
|-------------------------------|
| [bun 下一代](https://bun.sh/)    |
| [nodejs](https://nodejs.org/) |
| [deno](https://deno.com/)     |

| 构建工具                                 |
|--------------------------------------|
| [👍 vite 官网](https://cn.vitejs.dev/) |
| [👍 svelte 官网](https://svelte.dev/)  |
| [turbo](https://turbo.build/)        |

| 语法糖                                 |
|-------------------------------------|
| [vue3 官网](https://vuejs.org/)       |
| [react 官网](https://react.dev/)      |
| [vue2 官网](https://v2.cn.vuejs.org/) |

| TS                                                         |
|------------------------------------------------------------|
| [typescript 官网](https://www.tslang.cn/)                    |

| 路由管理                                                            |
|-----------------------------------------------------------------|
| [👍 vue-router 官网](https://router.vuejs.org/)                   |
| [👍 react-router 官网](https://reactrouter.com/en/main)           |
| [根据文件自动生成路由](https://github.com/hannoeru/vite-plugin-pages)     |

| 状态管理                                               |
|----------------------------------------------------|
| [👍 Pinia 官网](https://pinia.web3doc.top/)          |
| [mitt 官网](https://github.com/developit/mitt)       |
| [vuex 官网](https://next.vuex.vuejs.org/)            |

| JavaScript标准库                                  |
|------------------------------------------------|
| [core-js](https://github.com/zloirock/core-js) |

| 网络请求                                                                                      |
|-------------------------------------------------------------------------------------------|
| [axios 官网](http://axios-js.com/)                                                          |
| [ws 官网 ts 需安装 @types/ws](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API) |
| [socket.io socket.io-client](https://socket.io/zh-CN/)                                    |
| [qs 序列化参数，并非网络请求](https://github.com/ljharb/qs)                                           |

| 样式组件 -D  注意重写组件样式的引用                                                           |
|--------------------------------------------------------------------------------|
| [sass](https://sass-lang.com/)                                                 |
| [sass-loader](https://webpack.docschina.org/)                                  |
| [node-sass](https://www.npmjs.com/package/node-sass)                           |
| [less](https://less.bootcss.com/)                                              |
| [less-loader](https://www.npmjs.com/package/less-loader)                       |
| [style-resources-loader](https://www.npmjs.com/package/style-resources-loader) |
| [text-loader](https://www.npmjs.com/package/text-loader)                       |
| [vue-style-loader](https://www.npmjs.com/package/vue-style-loader)             |
| [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler)   |
| **postcss必装，自动添加浏览器适配前缀**                                                      |
| [postcss](https://github.com/postcss/postcss)                                  |
| [autoprefixer](https://github.com/postcss/autoprefixer)                        |
| [postcss-loader](https://github.com/webpack-contrib/postcss-loader)            |
| **快速样式CSS 并不推荐，建议大家自行封装**                                                      |
| [unocss](https://unocss.dev/)                                                  |
| [tailwindcss](https://tailwindcss.com/) [doc](https://www.tailwindcss.cn/docs) |
| [windicss](https://windicss.org/)                                              |

| 语法检查 -D                                                                        |
|--------------------------------------------------------------------------------|
| [eslint](https://www.npmjs.com/package/eslint)                                 |
| [👍 prettier](https://www.npmjs.com/package/prettier)                          |
| [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) |

| 代码提交信息校验 -D                                                                          |
|--------------------------------------------------------------------------------------|
| [husky](https://www.npmjs.com/package/husky)                                         |
| [commitlint](https://commitlint.js.org/)                                    			      |
| [commitizen](https://www.npmjs.com/package/commitizen)                               |
| [cz-conventional-changelog](https://www.npmjs.com/package/cz-conventional-changelog) |
| [cz-customizable](https://www.npmjs.com/package/cz-customizable)                     |

| 节点和浏览器的BDD / TDD断言库                                  |                                  
|------------------------------------------------------|
| [chai](https://www.npmjs.com/package/chai)           |
| [cross-env](https://www.npmjs.com/package/cross-env) |

| 环境配置获取                                          |
|-------------------------------------------------|
| [dotenv](https://www.npmjs.com/package/dotenv)  |

| 日志                                                                         |
|----------------------------------------------------------------------------|
| [eruda](https://www.npmjs.com/package/eruda)                               |
| [vconsole](https://github.com/Tencent/vConsole)                            |
| [vue-vconsole-devtools](https://github.com/Zippowxk/vue-vconsole-devtools) |

| mock API -D                                                                    |
|--------------------------------------------------------------------------------|
| [better-mock](https://github.com/lavyun/better-mock)                           |
| [axios-mock-adapter 只拦截 axios](https://github.com/ctimmerm/axios-mock-adapter) |
| [node-mocks-http](https://github.com/eugef/node-mocks-http)                    |
| [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock)                 |
| [mockjs 安全 bug 未解决请勿使用](https://github.com/nuysoft/Mock)                       |

| 文档                                       |
|------------------------------------------|
| [doczjs](https://github.com/doczjs/docz) |

# UI
| 无头单组件                                                                                  |
|----------------------------------------------------------------------------------------|
| [👍 Vue shadcn](https://www.shadcn-vue.com/) [👍 React shadcn](https://ui.shadcn.com/) |

| VUE UI                                                                         |
|--------------------------------------------------------------------------------|
| [bootstrap-vue-next](https://bootstrap-vue-next.github.io/bootstrap-vue-next/) |
| [👍 vuetifyjs 超级古老框架 商业版收费 不适合管理端](https://vuetifyjs.com/)                     |
| [👍 ant-design-vue 社区维护](https://antdv.com/index)                              |
| [👍 element-plus 官网](https://element-plus.org/)                                |
| [quasarchs 官网](https://quasar.dev/)                                            |
| [arco 字节 官网](https://arco.design/)                                             |
| [tdesign 腾讯多端UI 包含 Web 和手机端](https://tdesign.tencent.com/)                     |
| [opentiny 华为云 官网](https://opentiny.design/)                                    |
| [headlessui 组件简单](https://headlessui.com/)                                     |
| [heyui 官网](https://v2.heyui.top/)                                              |
| [naiveui](https://www.naiveui.com/zh-CN/os-theme)                              |
| [BalmUI 官网](https://material.balmjs.com/)                                      |
| [iDux 官网](https://idux.site/)                                                  |
| [relaxplus 官网](https://bsie.gitee.io/relaxplus/#/)                             |
| [quasar 官网](https://quasar.dev/)                                               |
| [primefaces 官网](https://primevue.org/)                                         |
| [Vuestic UI 官网](https://vuestic.dev/)                                          |
| [lobehub 官网](https://ui.lobehub.com/)                                          |

| React UI                                           |
|----------------------------------------------------|
| [bootstrap 官网](https://react-bootstrap.github.io/) |
| [mui 官网](https://mui.com/zh/)                      |
| [ant-design 官网](https://ant.design/)               |
| [chakra-ui 官网](https://chakra-ui.com/)             |
| [semi 官网](https://semi.design/zh-CN/)              |
| [rsuitejs 官网](https://rsuitejs.com/zh/)            |
| [chakra 官网](https://chakra-ui.com/)                |

| UI 移动端                                                        |
|---------------------------------------------------------------|
| [👍vant](https://vant-ui.github.io/vant/#/zh-CN)              |
| [👍ionic-framework 官网 VRA](https://ionicframework.com/docs/)  |
| [👍nutui @nutui/nutui@next 官网](https://nutui.jd.com/)         |
| [Tencent](https://github.com/Tencent/weui/)                   |
| [vux](https://vux.li/)                                        |
| [varlet 官网](https://varlet-varletjs.vercel.app/#/en-US/index) |
| [onsen 官网](https://onsen.io/)                                 |
| [uvui 官网](https://www.uvui.cn/)                               |
| [wave 官网](https://antoniandre.github.io/wave-ui/)             |

| UI 小程序                                                       |
|--------------------------------------------------------------|
| [👍vant](https://github.com/vant-ui/vant-weapp)              |
| [👍weui](https://weui.io/)                                   |
| [👍taro](https://taro-ui.jd.com/#/)                          |
| [Tencent](https://github.com/Tencent/weui-wxss)              |
| [Cube UI](https://didi.github.io/cube-ui/#/zh-CN)            |
| [wux](https://wux-weapp.github.io/wux-weapp-docs/#/)         |
| [firstui 含付费UI](https://www.firstui.cn/)                     |
| [awesome](https://github.com/justjavac/awesome-wechat-weapp) |

| UI 单一组件                                                                |
|------------------------------------------------------------------------|
| [表格 vxe-table 官网](https://vxetable.cn/#/table/start/install)           |
| [表格 tanstack 官网](https://tanstack.com/)                                |
| [布局 vue-grid-layout](https://jbaysolutions.github.io/vue-grid-layout/) |
| [树 vue-treeselect](https://www.npmjs.com/package/ue-treeselect)        |

| UI 进度条-滑动条                                                                 |
|----------------------------------------------------------------------------|
| [vuejs-progress-bar](https://www.npmjs.com/package/vuejs-progress-bar)     |
| [vue-slider-component](https://www.npmjs.com/package/vue-slider-component) |
| [vue-radial-progress](https://www.npmjs.com/package/vue-radial-progress)   |

| UI JS                                                                |
|----------------------------------------------------------------------|
| [👍 Bootstrap](https://getbootstrap.com/)                            |
| [👍 layui 官方！！！](https://layui.dev/)                                 |
| [H5 zeptojs](https://www.zeptojs.com.cn/)                            |
| [PC javascript](https://www.javascript.com/)                         |
| [Framework7](https://framework7.io/)                                 |
| [Foundation](https://get.foundation/index.html)                      |
| [Onsen UI](https://onsen.io/)                                        |
| [heyui](https://v2.heyui.top/)                                       |
| [varletjs varletjs](https://varlet-varletjs.vercel.app/#/en-US/home) |

| VUE2 UI                                         |
|-------------------------------------------------|
| [elementUI 官网](https://element.eleme.io/)       |
| [mint-ui 官网](http://mint-ui.github.io/#!/zh-cn) |
| [buefy 官网](https://buefy.org/)                  |

# 功能组件
| 图表                                                               |
|------------------------------------------------------------------|
| [👍Apache ECharts 官网](https://echarts.apache.org/zh/index.html)  |
| [👍antv antd全家桶 官网](https://antv.vision/zh)                      |
| [👍FusionCharts 官网](https://www.fusioncharts.com/)               |
| [👍C3.js 官网](https://c3js.org/)                                  |
| [👍D3.js 官网](https://d3js.org/)                                  |
| [Recharts](https://recharts.org/zh-CN)                           |
| [Chart.js vue官网](https://vue-chartjs.org/)                       |
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
| [storybook 官网](https://storybook.js.org/)                        |
| [vue-chart-3 官网](https://vue-chart-3.netlify.app/)               |
| [vue3charts 官网](https://vue3charts.org/)                         |
| [vue-echarts 官网](https://ecomfe.github.io/vue-echarts/)          |

| 轮播图                                                                       |
|---------------------------------------------------------------------------|
| [swiper 支持PC、H5](https://swiperjs.com/)                                   |
| [@splidejs/vue-splide](https://github.com/Splidejs/vue-splide)            |
| [vue3 seamless 无缝滚动](https://github.com/xfy520/vue3-seamless-scroll)      |
| [vue2 seamless 无缝滚动](https://github.com/chenxuan0000/vue-seamless-scroll) |
| [vue3 infinite 无限滚动](https://github.com/tnfe/vue3-infinite-list)          |

| 滚动                                                            |
|---------------------------------------------------------------|
| [better-scroll](https://github.com/ustbhuangyi/better-scroll) |

| 日历                                                                               |
|----------------------------------------------------------------------------------|
| [vue-functional-calendar](https://www.npmjs.com/package/vue-functional-calendar) |
| [vuejs-heatmap](https://www.npmjs.com/package/vuejs-heatmap)                     |
| [mpvue-calendar](https://github.com/Hzy0913/mpvue-calendar)                      |

| 图标                                                                                           |
|----------------------------------------------------------------------------------------------|
| [iconfont 官网](https://www.iconfont.cn/)                                                      |
| [iconify 官网](https://icon-sets.iconify.design/)                                              |
| [iconpark 官网](https://iconpark.oceanengine.com/home)                                         |
| [iconbox 官网](https://arco.design/iconbox/libs)                                               |
| 安装包                                                                                          |
| [unplugin-icons 官网](https://github.com/unplugin/unplugin-icons) [官网](https://icones.js.org/) |
| [xicons 官网](https://github.com/07akioni/xicons) [官网](https://www.xicons.org/#/)              |
| [boxicons 官网](https://github.com/atisawd/boxicons) [官网](https://boxicons.com/)               |
| 无字体库                                                                                         |
| [flaticon 官网](https://www.flaticon.com/)                                                     |
| [icons8 官网](https://icons8.com/icons)                                                        |
| [iconfinder 官网](https://www.iconfinder.com/search)                                           |

| svg                                                                  |
|----------------------------------------------------------------------|
| [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)     |
| [svg-sprite-loader](https://www.npmjs.com/package/svg-sprite-loader) |

| 加载 loading                                                             |
|------------------------------------------------------------------------|
| [nprogress](https://github.com/rstacruz/nprogress)                     |
| [vue-simple-spinner](https://github.com/dzwillia/vue-simple-spinner)   |
| [vue-loading-overlay](https://github.com/ankurk91/vue-loading-overlay) |
| [vue-progressbar](https://github.com/hilongjw/vue-progressbar)         |
| [vue-spinner](https://github.com/greyby/vue-spinner)                   |
| [vue-blockui](https://github.com/realdah/vue-blockui)                  |

| 营销组件                               |
|------------------------------------|
| [抽奖转盘/九宫格/老虎机](https://100px.net/) |

| 拖拽                                                                            |
|-------------------------------------------------------------------------------|
| [Sortable](https://github.com/SortableJS/Sortable)                            |
| [vue3-dnd](https://haochenguang.gitee.io/vue3-dnd/)                           |
| [vue3 vue.draggable.next](https://github.com/SortableJS/vue.draggable.next)   |
| [vue-draggable-plus](https://github.com/Alfred-Skyblue/vue-draggable-plus)    |
| [revue-draggable](https://github.com/bcakmakoglu/revue-draggable)             |
| [vue3 draggable-resizable](https://github.com/a7650/vue3-draggable-resizable) |
| [vue-drag-resize](https://github.com/kirillmurashov/vue-drag-resize)          |
| [vue2 Vue.Draggable](https://github.com/itmier/Vue.Draggable)                 |
| [vue2 vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout)         |

| 二维码                                                    |
|--------------------------------------------------------|
| [qrcode](https://www.npmjs.com/package/qrcode)         |
| [vue-qr](https://www.npmjs.com/package/vue-qr)         |
| [qrcode.vue](https://www.npmjs.com/package/qrcode.vue) |
| [qrcodejs2](https://www.npmjs.com/package/qrcodejs2)   |

| 全屏                                                         |
|------------------------------------------------------------|
| [screenfull](https://github.com/sindresorhus/screenfull)   |
| [vue-fullscreen](https://github.com/mirari/vue-fullscreen) |

| html2canvas，页面截图                                         |
|----------------------------------------------------------|
| [html2canvas](https://www.npmjs.com/package/html2canvas) |

| 裁剪图片                                                    |
|---------------------------------------------------------|
| [vue-cropper](https://github.com/xyxiao001/vue-cropper) |
| [viewerjs](https://github.com/fengyuanchen/viewerjs)    |
| [v-viewer](https://github.com/mirari/v-viewer)          |

| 富文本编辑器                                                                 |                                                              
|------------------------------------------------------------------------|
| [editor.js 官网](https://github.com/codex-team/editor.js)                |
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
| [bytemd](https://bytemd.js.org/)                                       |

| Markdown编辑器                                                                       |
|-----------------------------------------------------------------------------------|
| [Vditor 官网](https://b3log.org/vditor/)                                            |
| [Vue-markdown-editor 官网](https://code-farmer-i.github.io/vue-markdown-editor/zh/) |
| [Md-editor-v3 官网](https://imzbf.github.io/md-editor-v3/index)                     |

| 流程图                                                                 |
|---------------------------------------------------------------------|
| [bpmn](https://bpmn.io/)                                            |
| [logic-flow](https://site.logic-flow.cn/docs/#/zh/)                 |
| [vue3-bpmn](https://github.com/moon-studio/vite-vue-bpmn-process)   |
| [vue3-tsx-bpmn](https://github.com/Yiuman/bpmn-vue-activiti)        |
| [vue2-bpmn](https://github.com/miyuesc/bpmn-process-designer)       |
| [vue2-bpmn](https://github.com/GoldSubmarine/workflow-bpmn-modeler) |
| [bpmn 中文文档](https://github.com/LinDaiDai/bpmn-chinese-document)     |
| [mermaid](https://github.com/mermaid-js/mermaid)                    |
| [xyflow 没有vue版](https://github.com/xyflow/xyflow)                   |
| [gojs](https://gojs.net/latest/index.html)                          |

| 工作流 框架                                      |
|---------------------------------------------|
| [NodeJS n8n](https://github.com/n8n-io/n8n) |

| 地图                                                              |
|-----------------------------------------------------------------|
| [vue-amap 高德](https://www.npmjs.com/package/vue-amap)           |
| [vue-baidu-map 百度](https://www.npmjs.com/package/vue-baidu-map) |

| 数据屏                                          |
|----------------------------------------------|
| [DataV](https://github.com/DataV-Team/Datav) |

# 工具类库
| 工具合集                                          |
|-----------------------------------------------|
| [vuepress](https://github.com/vuejs/vuepress) |
| [工具集合](https://vueuse.org/)                   |

| cookie管理                                             |
|------------------------------------------------------|
| [js-cookie](https://www.npmjs.com/package/js-cookie) |

| 日期格式化                                                     |
|-----------------------------------------------------------|
| [dayjs](https://www.npmjs.com/package/dayjs)              |
| [date-fns](https://www.npmjs.com/package/date-fns)        |
| [luxon](https://github.com/moment/luxon)                  |
| [~~~moment~~~ 不再推荐](https://www.npmjs.com/package/moment) |

| 剪切板                                                            |
|----------------------------------------------------------------|
| [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2) |
| [clipboard.js](https://github.com/zenorocha/clipboard.js)      |

| 打印                                                                     |
|------------------------------------------------------------------------|
| [vue3-print-nb](https://www.npmjs.com/package/vue3-print-nb)           |
| [print-js](https://www.npmjs.com/package/print-js)                     |
| [vue-plugin-hiprint](https://www.npmjs.com/package/vue-plugin-hiprint) |

| 加密解密                                                 |
|------------------------------------------------------|
| [crypto-js](https://www.npmjs.com/package/crypto-js) |
| [md5](https://www.npmjs.com/package/md5)             |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs)   |
| [jsencrypt](https://www.npmjs.com/package/jsencrypt) |
| [jsrsasign](https://www.npmjs.com/package/jsrsasign) |
| [base64-js](https://www.npmjs.com/package/base64-js) |
| [js-base64](https://www.npmjs.com/package/js-base64) |

| ua                                                                   |
|----------------------------------------------------------------------|
| [ua-parser-js](https://github.com/faisalman/ua-parser-js)            |
| [isbot](https://github.com/omrilotan/isbot)                          |
| [ua-regexes-lite](https://github.com/TrigenSoftware/ua-regexes-lite) |
| [bowser](https://github.com/bowser-js/bowser)                        |

| 本地数据存储                                         |
|------------------------------------------------|
| [lodash](https://www.npmjs.com/package/lodash) |
| [lowdb](https://www.npmjs.com/package/lowdb)   |

| 国际化                                                                                          |
|----------------------------------------------------------------------------------------------|
| [i18n-next 不限制环境](https://github.com/i18next) [官网](https://www.i18next.com/)                 |
| [vue-i18n](https://github.com/kazupon/vue-i18n) [官网](https://kazupon.github.io/vue-i18n/zh/) |
| [vue-i18n + @intlify/unplugin-vue-i18n](https://github.com/intlify/bundle-tools)             |

| 三方授权登录集成库                                                                    |
|------------------------------------------------------------------------------|
| [next-auth](https://www.npmjs.com/package/next-auth)                         |
| [@okta/okta-auth-js](https://www.npmjs.com/package/@okta/okta-auth-js)       |
| [hellojs](https://www.npmjs.com/package/hellojs)                             |
| [telegram vue3-telegram-login](https://github.com/cinob/vue3-telegram-login) |
| [telegram vue-tg](https://github.com/deptyped/vue-telegram)                  |

| 分享插件                                                                         |
|------------------------------------------------------------------------------|
| [vue-social-sharing](https://www.npmjs.com/package/vue-social-sharing)       |
| [vue-socialmedia-share](https://www.npmjs.com/package/vue-socialmedia-share) |
| [@vue/shared](https://www.npmjs.com/package/@vue/shared)                     |
| [@vue/cli-shared-utils](https://www.npmjs.com/package/@vue/cli-shared-utils) |
| [nativeshare 唤起浏览器自身分享组件](https://www.npmjs.com/package/nativeshare)         |

| 文件上传、解析、保存，office 预览、上传、导出、导入 包含：xls，xlsx，doc，docx，pdf，csv                              |
|-----------------------------------------------------------------------------------------|
| [图片上传](https://github.com/Molunerfinn/PicGo)                                            |
| [exceljs](https://github.com/exceljs/exceljs)                                           |
| [sheetjs](https://docs.sheetjs.com/)                                                    |
| [csv](https://www.npmjs.com/package/csv)                                                |
| [papaparse](https://www.npmjs.com/package/papaparse)                                    |
| [xlsx 不建议使用有高危漏洞](https://www.npmjs.com/package/xlsx)                                   |
| [文件类型判断 file-type](https://www.npmjs.com/package/file-type)                             |
| [Office Excel handsontable](https://github.com/handsontable/handsontable)               |
| [Office Word mammoth](https://github.com/mwilliamson/mammoth.js)                        |
| [PDF pdfjs-dist](https://github.com/mozilla/pdf.js)                                     |
| [PDF vue-pdf vue2](https://www.npmjs.com/package/vue-pdf)                               |
| [@vue-office docx excel pdf v2需要安装依赖 vue-demi](https://github.com/501351981/vue-office) |
| [文件保存 file-saver](https://www.npmjs.com/package/file-saver)                             |
| [Uppy 官网](https://uppy.io/docs/vue/)                                                    |
| [Vue-filepond 官网](https://github.com/pqina/vue-filepond#readme)                         |


| 支付                                                                                                              |
|-----------------------------------------------------------------------------------------------------------------|
| [stripejs](https://www.npmjs.com/package/stripe) [官网](https://stripe.com/docs)                                  |
| [vue-stripe-elements-plus](https://www.npmjs.com/package/vue-stripe-elements-plus) [官网](https://vuestripe.com/) |
| [vue-stripe](https://www.npmjs.com/package/@vue-stripe/vue-stripe) [官网](https://vuestripe.com/)                 |

| 视频播放                                                                         |
|------------------------------------------------------------------------------|
| [dplayer 支持弹幕](https://dplayer.diygod.dev/zh/)                               |
| [vue-video-player](https://www.npmjs.com/package/vue-video-player)           |
| [vue-core-video-player](https://www.npmjs.com/package/vue-core-video-player) |

| 绘图 3D                                           |
|-------------------------------------------------|
| [three.js](https://www.npmjs.com/package/three) |

| 3D                                                                                                                                 |
|------------------------------------------------------------------------------------------------------------------------------------|
| [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)                                                                |
| [threejs](https://www.npmjs.com/package/three) [官网](https://threejs.org/) [GitHub](https://github.com/mrdoob/three.js/tree/master) |
| [babylonjs](https://www.npmjs.com/package/babylonjs) [官网](https://www.babylonjs.com/)                                              |
| [AR model-viewer](https://github.com/google/model-viewer)                                                                          |

| 浏览器相关的插件                                                                        |
|---------------------------------------------------------------------------------|
| [devtools-detector 判断浏览器是否打开了控制台](https://github.com/AepKill/devtools-detector) |

# 特效
| 动画                                                             |
|----------------------------------------------------------------|
| [auto-animate](https://auto-animate.formkit.com/)              |
| [tsparticles 粒子动画](https://github.com/tsparticles/tsparticles) |
| [lottiefiles 表情动画](https://lottiefiles.com/)                   |
| [angrytools 生成 css](https://angrytools.com/)                   |
| [cssanimation](https://github.com/yesiamrocks/cssanimation.io) |

| 动画                                                                                                     |
|--------------------------------------------------------------------------------------------------------|
| [animate css库 官网](https://animate.style/)                                                              |
| [Animatopy](https://sarthology.github.io/Animatopy/)                                                   |
| [animxyz](https://animxyz.com/)                                                                        |
| [animista](https://animista.net/)                                                                      |
| [wickedCSS](https://github.com/kristofferandreasen/wickedCSS)                                          |
| [Magic.css css库 停更](https://github.com/miniMAC/magic) [官网](https://www.minimamente.com/project/magic/) |
| [animation css库 停更](https://limichange.github.io/my-animation-list/)                                   |
| [WOW js库 官网 停更](https://www.delac.io/WOW/) [wow.js vue3 官网 停更](https://wowjs.uk/)                      |
| [vue-animate js库 官网](https://github.com/asika32764/vue-animate)                                        |
| [vue-kinesis js库 官网](https://github.com/Aminerman/vue-kinesis)                                         |
| [move js库 官网 停更](https://github.com/visionmedia/move.js)                                               |
| [animejs js库](https://animejs.com/)                                                                    |
| [velocityjs js库 停更](http://velocityjs.org/)                                                            |
| [Waves js库 停更](https://github.com/fians/Waves)                                                         |
| [anijs js库 停更](https://github.com/anijs/anijs)                                                         |
| [gsap库 含收费](https://www.npmjs.com/package/gsap/) [官网](https://greensock.com/gsap/)                     |
| [motion js库](https://github.com/framer/motion)                                                         |
| [saos js库](https://github.com/shiryel/saos)                                                            |
| [popmotion js库 停更](https://github.com/popmotion/popmotion)                                             |
| [kute js库 停更](https://github.com/thednp/kute.js)                                                       |
| [simpleParallax js库 停更](https://github.com/geosigno/simpleParallax.js)                                 |
| [barbajs js库 切换](https://github.com/barbajs/barba)                                                     |
| [案例 特效 1](https://codepen.io/)                                                                         |
| [案例 css技巧 1](https://csscoco.com/inspiration/#/)                                                       |
| [案例 css技巧 2](https://chokcoco.github.io/CSS-Inspiration/#/)                                            |
| [React motion](https://motion.ant.design/index-cn)                                                     |

| 动画 滚动视觉差                                                     |
|--------------------------------------------------------------|
| [scrollrevealjs](https://scrollrevealjs.org/)                |
| [lax.js](https://github.com/alexfoxy/lax.js)                 |
| [rellax.js](https://github.com/dixonandmoe/rellax)           |
| [vue-prlx 滚动视觉差](https://www.npmjs.com/package/vue-prlx)     |
| [scrolly 滚动视觉差](https://github.com/yesiamrocks/scrolly.js)   |
| [fullPage.js 付费](https://github.com/alvarotrigo/fullPage.js) |

| 动画 鼠标                                                                 |
|-----------------------------------------------------------------------|
| [Hover css库 官网](https://ianlunn.github.io/Hover/)                     |
| [v-wave 指令库 官网](https://justintaddei.github.io/v-wave/)               |
| [elrumordelaluz 鼠标放上效果](https://elrumordelaluz.github.io/reshake/)    |
| [csshake 抖动效果](https://elrumordelaluz.github.io/csshake/)             |

| 动画 Loading                                                                   |
|------------------------------------------------------------------------------|
| [three-dots 等待效果](https://nzbin.github.io/three-dots/)                       |
| http://k21vin.gitee.io/front-end-data-visualization/#/native/pureCSS/loading |
| https://juejin.cn/post/7037036742985121800                                   |

| 动画 文字                                                  |
|--------------------------------------------------------|
| [typed 打字机效果](https://github.com/mattboldt/typed.js)   |
| [vue-textra](https://www.npmjs.com/package/vue-textra) |

| 动画                                           |
|----------------------------------------------|
| [vivus](https://github.com/maxwellito/vivus) |
| [mojs](https://github.com/mojs/mojs)         |

| 动画 渐变                                                           |
|-----------------------------------------------------------------|
| [granim](https://github.com/sarcadass/granim.js)                |
| [particles 背景图](https://github.com/VincentGarreau/particles.js) |

# 测试
| 本项目并没有测试用例，如果大家需要的话请自行添加，以下是测试集成依赖                                      |
|-------------------------------------------------------------------------|
| [eruda 调试](https://github.com/liriliri/eruda)                           |
| [@vue/test-utils 推荐 这个可以作为核心 配合jest使用更好](https://test-utils.vuejs.org/) |
| [jestjs](https://jestjs.io/)                                            |
| [mochajs webpack](https://mochajs.org/)                                 |

# APP 小程序 跨端适配方案
| 适配移动端 -D                                                                                                 |
|----------------------------------------------------------------------------------------------------------|
| **vw方案 需要依赖style-loader 且需要删除@vue/cli-plugin-eslint**                                                    |
| [postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport)                           |
| [postcss-px-to-viewport-8-plugin TS 请用这个](https://www.npmjs.com/package/postcss-px-to-viewport-8-plugin) |
| **rem方案**                                                                                                |
| [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)                                               |
| [amfe-flexible](https://github.com/amfe/lib-flexible)                                                    |

| 跨端框架推荐：包含小程序啥的                                                   |
|------------------------------------------------------------------|
| [uni-app 官网](https://uniapp.dcloud.net.cn/) 全平台跨端含APP等等          |
| [taro 官网](https://taro.jd.com/) 3.x已支持vue                        |
| [hippy 官网](https://hippyjs.org/#/) 3.x已支持vue                     |
| [~~mpvue 官网~~](https://mpvue.com/) 美团                            |
| [~~wepyjs 官网~~](https://wepyjs.github.io/wepy-docs/) 腾讯 需要学习wepy |

| APP开发                                                                                         |
|-----------------------------------------------------------------------------------------------|
| [flutter 官网](https://flutter.cn/)                                                             |
| [ionic 官网](https://ionicframework.com/) [ionic](https://ionic.io/)                            |
| [cordova 官网](http://cordova.axuer.com/)                                                       |
| [Native Script 官网](https://nativescript.org/)                                                 |
| [React Native 官网](https://reactnative.cn/)                                                    |
| [react-native-elements 官网](https://github.com/react-native-elements/react-native-elements)    |

# 在线编码可视化
| api                                                      |
|----------------------------------------------------------|
| [apifox](https://apifox.com/)                            |
| [yapi](https://yapi.pro/)                                |
| [hoppscotch](https://github.com/hoppscotch/hoppscotch)   |

| code                               |
|------------------------------------|
| [codepen](https://codepen.io/)     |
| [css 在线](https://cssreference.io/) |

# SSR
| 框架                                                                                     |
|----------------------------------------------------------------------------------------|
| [NuxtJS vue](https://nuxt.com/)                                                        |
| [NuxtJS ui](https://ui.nuxt.com/)                                                      |
| [Next.js react](https://github.com/vercel/next.js)                                     |
| [astro](https://astro.build/)                                                          |
| [quasar 官网 组件一体](https://quasar.dev/)                                                  |
| [vite ssr-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue) |
| [vite-plugin-ssr](https://vite-plugin-ssr.com/)                                        |
| [Next.js](https://github.com/vercel/next.js)                                           |
| [Hugo](https://github.com/gohugoio/hugo)                                               |
| [Docusaurus](https://github.com/facebook/docusaurus)                                   |
| [Jekyll](https://github.com/jekyll/jekyll)                                             |
| [Gatsby](https://github.com/gatsbyjs/gatsby)                                           |

# 服务
| 框架                                                     |
|--------------------------------------------------------|
| [expressjs](https://github.com/expressjs/express)      |
| [nest](https://github.com/nestjs/nest)                 |
| [socket.io](https://github.com/socketio/socket.io)     |
| [meteor](https://github.com/meteor/meteor)             |
| [koajs](https://github.com/koajs/koa)                  |
| [fastify](https://github.com/fastify/fastify)          |
| [sails](https://github.com/balderdashy/sails)          |
| [egg](https://github.com/eggjs/egg)                    |
| [midwayjs](https://www.midwayjs.org/)                  |

# CDN
| 节省资源，请使用这个                                                            |
|-----------------------------------------------------------------------|
| [字体 CDN](https://www.cdnfonts.com/)                                   |
| [cdnjs](https://cdnjs.com/)                                           |
| [字体下载]()                                                              |
| [google](https://fonts.google.com/)                                   |
| [fonts2u](https://fonts2u.com/)                                       |
| [font download](https://font.download/)                               |
| [maisfontes](https://en.maisfontes.com/fonts-scripts?utm_source=home) |

# CMS
| CMS                                        |
|--------------------------------------------|
| [strapi](https://github.com/strapi/strapi) |
| [hexo 博客](https://github.com/hexojs/hexo)  |

# 游戏
| 游戏                                                                                                                                    |
|---------------------------------------------------------------------------------------------------------------------------------------|
| [Eva.js](https://www.npmjs.com/package/@eva/eva.js)                                                                                   |
| [Eva-plugin-renderer](https://www.npmjs.com/package/@eva/plugin-renderer)                                                             |
| [Eva-plugin-renderer-img](https://www.npmjs.com/package/@eva/plugin-renderer-img) [官网](https://eva-engine.gitee.io/#/tutorials/intro) |

| 游戏开发框架                                                           |
|------------------------------------------------------------------|
| [Unity 3D(C/JS) 3D大佬！](https://www.unrealengine.com/zh-CN/)      |
| [Cocos(C/TS) 2D、2.5大佬！](https://www.unrealengine.com/zh-CN/)     |
| [Unreal(C++) 这是一个追求画质的游戏引擎](https://www.unrealengine.com/zh-CN/) |
| [小游戏 createjs](https://www.createjs.com/)                        |

# 优秀项目推荐
| AI                                                     |
|--------------------------------------------------------|
| [open-webui](https://github.com/open-webui/open-webui) |

| 低代码                                                             |
|-----------------------------------------------------------------|
| [penpot](https://github.com/penpot/penpot)                      |
| [formily 官网 阿里巴巴](https://github.com/alibaba/formily)           |
| [form-generator 官网](https://github.com/JakHuang/form-generator) |
| [mitosis](https://github.com/BuilderIO/mitosis)                 |

| 项目及插件示例                                         |
|-------------------------------------------------|
| [小插件合集](https://madewith.cn/)                   |

| 项目示例                                                            |
|-----------------------------------------------------------------|
| [slidev 演示文稿工具](https://cn.sli.dev/)                            |
| [uiverse 开源组件合集](https://uiverse.io/)                           |
| [nodejs 开源插件合集](https://github.com/sindresorhus/awesome-nodejs) |
| [组件](https://madewith.cn/)                                      |
| [vue3 优秀组件收集](https://hu-snail.github.io/vue3-resource/)        |

| 项目示例                                                     |
|----------------------------------------------------------|
| [聊天室](https://github.com/gmingchen/vue3-element-plus-im) |
| [聊天悬浮](https://github.com/mattmezza/vue-beautiful-chat)  |
| [项目模板](https://github.com/antfu/vitesse)                 |
| [项目模板](https://github.com/vuejs/vitepress)               |

| Admin server & Web                                         |
|------------------------------------------------------------|
| https://github.com/jeecgboot                               |
| https://gitee.com/likeadmin                                |
| https://github.com/yangzongzhuan                           |
| [ant-simple-pro](https://github.com/lgf196/ant-simple-pro) |

| Admin vite                                                           |
|----------------------------------------------------------------------|
| https://github.com/pure-admin/pure-admin-thin                        |
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
| https://github.com/hu-snail/vue3-admin-element-template              |

| mobile & project                                      |
|-------------------------------------------------------|
| https://github.com/LZHD/vue-vite-h5                   |
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
| https://github.com/buqiyuan/vite-vue3-h5              |
| https://github.com/ynzy/vite-vue3-h5-template         |
| https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5     |
| https://github.com/xsf0105/vue3-h5-template           |

```text
言外

本项目的 TS 单纯的用来学习，内部大部分文件使用的是 any js 写法

TS 的优缺点不在这里一一赘述，给大家的建议是：个人或者小型项目直接用 js，大型项目根据人员选，超大型或者基础库使用 ts。
```
