[//]: # (后续需要删除的包)
#### TODO delete pkg
```javascript
is-stream
npm-run-path
```

###### [**花里胡哨的不要，保证可用**]
###### 推荐使用pnpm安装依赖，其次yarn或者npm
###### [Vite 插件](https://github.com/vitejs/awesome-vite)
https://vuejs.org/

# 避坑指南 及 注意事项
## 开发问题 Typescript 和 TSX
TS的泛型<T> 在结合 tsx 的时候使用as形式 \
我建议的组合，大家仅当参考 \
VUE + JS \
VUE + TS \
VUE + JSX \
VUE + TSX \
组件调用问题，父子调用最好以这种方式存在，否则在调用函数的时候会有问题
```javascript
// Parent
<script lang="ts" setup></script>
// Child
<script lang="ts"></script>
```
## 安装及打包
避免使用vue-tsc，目前和typescript、jsx出现各种冲突 \
使用pnpm安装包的时候需要修改package.json的文件，删除掉resolutions里面的// \
npm安装依赖包出现错误或安装失败，选择yarn安装 \
注意所有配置菜单的数据，均由前端提供 \
！！！注意VUE3中的reactive使用，如果需要更新视图需要抽出interface。！！！

# 对应包使用解释
项目本身配置99%都在vite.config.ts里面，参数设置都在根目录下，而非src下 \
src下的config目录是系统默认参数，及部分数据配置

# 命名规范及解释
1、命名遵循驼峰规则：demoUser \
2、配置文件均按照xxConfig，参数设置均按照xxSetting，数据配置均按照xxOption： \
3、封装的函数均按照function格式导出，业务函数均按照() => {}格式书写：export function FN() {} \
4、Store中对外函数命名均为useXx： \
5、API前端使用及后端接口命名规则对应： \
列举，可以对此进行变更

| 接口  | 前端     | 后端         |
|-----|--------|------------|
| 读取  | search | read/get   |
| 写入  | add    | create/set |
| 编辑  | edit   | update     |
| 删除  | remove | delete     |

6、interface尽量抽取出来，且抽取到最小粒度
# 配置解释
大家根据使用的包来自行搜索下吧，大部分配置都是兼容、打包等
1、不建议在本项目中使用自带的Link和Iframe，因为存在多个Link的时候出现问题，且点击Link后再切换Iframe有一个bug： \

# 已完成
- [x] 基础插件配置，语法校验
- [x] 多环境切换
- [x] axios请求，取消请求
- [x] 动态路由（同时支持静态路由配置，一切简化）
- [x] 国际化目前用的vue-i18n
- [x] 三个图标库Element Icon、Iconify、IconFont使用
- [x] 换肤
- [x] 全屏

# 下一步
- [ ] Mock
- [ ] 标签TAG
- [ ] 按钮级别权限控制（此项并不在我的计划之内）

# 优秀项目推荐
## 示例集合
### https://github.com/vitejs/awesome-vite

## Vue 3 cli
## Vue 3 vite
##### [vue3-antd-admin](http://www.lelebk.com/docs/)
##### []()
## Vue 2
##### [Vue Antd Admin](https://iczer.gitee.io/vue-antd-admin-docs/)
# 基础核心依赖 https://vue3js.cn/
## 推荐一个插件比较全的网站
https://hu-snail.github.io/vue3-resource/
### 无特殊说明均对应最新版
## 脚手架
[vite](https://www.npmjs.com/package/vite) || [官网](https://cn.vitejs.dev/) \
[vue-cli](https://www.npmjs.com/package/@vue/cli) \
## vue
[vue3](https://www.npmjs.com/package/vue) || [官网](https://v3.cn.vuejs.org/) \
## 路由管理
[vue-router](https://www.npmjs.com/package/vue-router) || [官网](https://vue3js.cn/) \
## 状态管理
[Pinia](https://www.npmjs.com/package/pinia) || [官网](https://pinia.web3doc.top/) \
[vuex](https://www.npmjs.com/package/vuex) || [官网](https://next.vuex.vuejs.org/) \
## js核心
[core-js](https://www.npmjs.com/package/core-js)

## http请求
[axios](https://www.npmjs.com/package/axios) || [官网](http://axios-js.com/) \
[qs](https://www.npmjs.com/package/qs)

# 解析相关
## TS
[typescript](https://www.npmjs.com/package/typescript) || [官网](https://www.tslang.cn/)

## 样式组件 -D || 注意重写组件样式的引用
[sass<=>坑逼一个，小心慎用](https://www.npmjs.com/package/sass) \
[sass-loader](https://www.npmjs.com/package/sass-loader) \
[node-sass](https://www.npmjs.com/package/node-sass) \
[less](https://www.npmjs.com/package/less) \
[less-loader](https://www.npmjs.com/package/less-loader) \
[style-resources-loader](https://www.npmjs.com/package/style-resources-loader) \
[svg-sprite-loader](https://www.npmjs.com/package/svg-sprite-loader) \
[text-loader](https://www.npmjs.com/package/text-loader) \
[vue-style-loader](https://www.npmjs.com/package/vue-style-loader) \
[vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler)

## 语法检查 -D
[eslint](https://www.npmjs.com/package/eslint) \
[prettier](https://www.npmjs.com/package/prettier) || 个人推荐这个 \
[eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)

## 节点和浏览器的BDD / TDD断言库
[chai](https://www.npmjs.com/package/chai) \
[cross-env](https://www.npmjs.com/package/cross-env)

## 环境配置获取
[dotenv](https://www.npmjs.com/package/dotenv)

# UI相关
[小插件合集](https://madewith.cn/)
## UI 官方
[element-plus](https://www.npmjs.com/package/element-plus) || PC [官网](https://element-plus.org/) \
[arco 字节](https://www.npmjs.com/package/vuetify) || PC [官网](https://arco.design/) \
[tdesign 腾讯多端UI](https://tdesign.tencent.com/) \
[elementUI](https://www.npmjs.com/package/element-ui) || vue2 PC [官网](https://element.eleme.io/) \
[ant-design-vue](https://www.npmjs.com/package/ant-design-vue) || PC 社区维护 请自行斟酌 [官网](https://2x.antdv.com/components/overview/) \
[vuetifyjs](https://www.npmjs.com/package/vuetify) || PC [官网](https://vuetifyjs.com/) \
[vuetifyjs](https://www.npmjs.com/package/vuetify) || PC [官网](https://next.vuetifyjs.com/en/) \

[bootstrap-vue](https://www.npmjs.com/package/bootstrap-vue) || vue2 PC [官网](https://dev.bootstrap-vue.org/docs/) \

[vant@next](https://www.npmjs.com/package/vant) || M [官网](https://vant-contrib.gitee.io/vant/v3/) \
[mui uni-app](https://www.npmjs.com/package/mui) || M [官网](https://dev.dcloud.net.cn/mui/) \
[mui](https://www.npmjs.com/package/mui) || M [官网](https://mui.com/) \
[mint-ui](https://www.npmjs.com/package/mint-ui) || M [官网](http://mint-ui.github.io/) \
[nutui @nutui/nutui@next](https://www.npmjs.com/package/@nutui/nutui) || M [官网](https://nutui.jd.com/) \
[VARLET](https://www.npmjs.com/package/@varlet/ui) || M [官网](https://varlet.gitee.io/varlet-ui/#/zh-CN/home) \
[Wave UI](https://www.npmjs.com/package/wave-ui) || M [官网](https://antoniandre.github.io/wave-ui/) \
[ionicframework](https://www.npmjs.com/package/ionicframework) || M [官网](https://ionicframework.com/docs/) \

[quasar](https://www.npmjs.com/package/quasar) || [官网](https://quasar.dev/) \
[heyui](https://www.npmjs.com/package/heyui@next) || [官网](https://v2.heyui.top/) \
[BalmUI](https://www.npmjs.com/package/balm-core) || [官网](https://next-material.balmjs.com/#/) \
[antoniandre](https://www.npmjs.com/package/antoniandre) || [官网](https://antoniandre.github.io/wave-ui/) \
[naive ui](https://www.npmjs.com/package/naiveui) || [官网](https://www.naiveui.com/zh-CN/os-theme) \
[primefaces](https://www.npmjs.com/package/primefaces) || [官网](https://primefaces.org/primevue/showcase/#/setup) \
[Vuestic UI](https://www.npmjs.com/package/vuestic-ui) || [官网](https://vuestic.dev/) \
[iDux](https://www.npmjs.com/package/@idux/cdk) || [官网](https://idux.site/) \
[relaxplus](https://www.npmjs.com/package/relaxplus) || [官网](https://bsie.gitee.io/relaxplus/#/) \

## 静态UI PC H5
[H5 zeptojs](https://www.zeptojs.com.cn/) \
[PC javascript](https://www.javascript.com/) \
[Framework7](https://framework7.io/) \
[Foundation](https://get.foundation/index.html) \
[Onsen UI](https://onsen.io/) \
[Ionic](https://ionicframework.com/) \
[Bootstrap](https://getbootstrap.com/)

## 图标
[iconpark 官网](https://iconpark.oceanengine.com/home)

## 其他三方库
[vxe-table](https://www.npmjs.com/package/vxe-table) || [官网(包含支持v3)](https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/install) \
[vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout)

## 加载 loading
[nprogress](https://www.npmjs.com/package/nprogress) \
[vue-simple-spinner](https://www.npmjs.com/package/vue-simple-spinner) \
[vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay) \
[vue-progressbar](https://www.npmjs.com/package/vue-progressbar) \
[vue-spinner](https://www.npmjs.com/package/vue-spinner) \
[vue-blockui](https://www.npmjs.com/package/vue-blockui)

## 进度条-滑动条
[vuejs-progress-bar](https://www.npmjs.com/package/vuejs-progress-bar) \
[vue-slider-component](https://www.npmjs.com/package/vue-slider-component) \
[vue-radial-progress](https://www.npmjs.com/package/vue-radial-progress)

## 轮播图
[swiper 支持PC、H5](https://www.swiper.com.cn/) 结合
[vue-awesome-swiper](https://www.swiper.com.cn/) 使用 \
[vue-concise-slider](https://www.npmjs.com/package/vue-concise-slider) \
[@splidejs/vue-splide](https://www.npmjs.com/package/@splidejs/vue-splide)

## 树
[vue-treeselect](https://www.npmjs.com/package/ue-treeselect)

## 拖拽
[vuedraggable](https://www.npmjs.com/package/vuedraggable) \
[vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout)

## 全屏
[screenfull](https://www.npmjs.com/package/screenfull)

## 数据表格
[xlsx](https://www.npmjs.com/package/xlsx)

## html2canvas，页面截图
[html2canvas](https://www.npmjs.com/package/html2canvas)

## cookie管理
[js-cookie](https://www.npmjs.com/package/js-cookie)

## 文件上传及保存
[file-saver](https://www.npmjs.com/package/file-saver)
[Uppy 官网](https://uppy.io/docs/vue/)
[Vue-filepond 官网](https://github.com/pqina/vue-filepond#readme)

## 二维码
[qrcode](https://www.npmjs.com/package/qrcode) \
[qrcodejs2](https://www.npmjs.com/package/qrcodejs2) \
[vue-qr](https://www.npmjs.com/package/vue-qr)

## 日期格式化
[moment](https://www.npmjs.com/package/moment) \
[date-fns](https://www.npmjs.com/package/date-fns) \
[dayjs](https://www.npmjs.com/package/dayjs)

## 日历
[vue-functional-calendar](https://www.npmjs.com/package/vue-functional-calendar) \
[vuejs-heatmap](https://www.npmjs.com/package/vuejs-heatmap)

## 富文本编辑器
[tiptap](https://www.npmjs.com/package/tiptap) || [官网](https://tiptap.dev/) \
[wangeditor](https://www.npmjs.com/package/@wangeditor/editor-for-vue@next) || vue3 [官网](https://www.wangeditor.com/) \
[wangeditor](https://www.npmjs.com/package/@wangeditor/editor-for-vue) || vue2 [官网](https://www.wangeditor.com/) \
[wangeditor](https://www.npmjs.com/package/@wangeditor/editor-for-react) || react [官网](https://www.wangeditor.com/) \
[wangeditor](https://www.npmjs.com/package/@wangeditor/editor) || js [官网](https://www.wangeditor.com/) \
[Quill](https://quilljs.com/) \
[vue-quill-editor](https://www.npmjs.com/package/vue-quill-editor) \
[ckeditor5-vue](https://www.npmjs.com/package/@ckeditor/ckeditor5-vue) \
[TinyMCE 6 官网](https://www.tiny.cloud/docs/tinymce/6/) || [官网](https://www.tiny.cloud/)
[Froala](https://froala.com/wysiwyg-editor/) \
[Trumbowyg](https://alex-d.github.io/Trumbowyg/) \
[slate](https://github.com/ianstormtaylor/slate) \
[squire](https://github.com/neilj/Squire) \
[summernote](https://summernote.org/) \

## Markdown编辑器
[Vditor 官网](https://b3log.org/vditor/) \
[Vue-markdown-editor 官网](https://code-farmer-i.github.io/vue-markdown-editor/zh/) \
[Md-editor-v3 官网](https://imzbf.github.io/md-editor-v3/index)

## 剪切板
[vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2)

## Loading动画
[three-dots 等待效果](https://nzbin.github.io/three-dots/) \

## 开屏渲染动画
[animate css库](https://www.npmjs.com/package/animate.css/) [官网](https://animate.style/) \
[gsap库](https://www.npmjs.com/package/gsap/) [官网](https://greensock.com/) \
[angrytools](https://angrytools.com/) | 
[angrytools](https://angrytools.com/css/animation/) \
[animista](https://animista.net/) \
[minimamente](https://www.minimamente.com/project/magic/) \
[vue-kinesis](https://www.npmjs.com/package/vue-kinesis) \
[tsparticles 粒子动画](https://www.npmjs.com/package/tsparticles) \
[vue-prlx 滚动视觉差](https://www.npmjs.com/package/vue-prlx) \
[vue-page-transition 过渡](https://www.npmjs.com/package/vue-page-transition) \
[Animatopy](https://sarthology.github.io/Animatopy/) \
[wickedCSS](https://github.com/kristofferandreasen/wickedCSS) \
[cssanimation](https://github.com/yesiamrocks/cssanimation.io) \
[]()

## 鼠标动画
[ianlunn 鼠标放上效果](https://github.com/IanLunn/Hover) | [官网](http://ianlunn.github.io/Hover/) \
[animxyz](https://animxyz.com/) \
[elrumordelaluz 鼠标放上效果](https://elrumordelaluz.github.io/reshake/) \

[基本形状](https://csslayout.io/) \
[案例 特效 1](https://codepen.io/) \
[案例 css技巧 1](https://csscoco.com/inspiration/#/) \
[案例 css技巧 2](https://chokcoco.github.io/CSS-Inspiration/#/) \

# 数据操作
## 加密解密
[crypto-js](https://www.npmjs.com/package/crypto-js) \
[md5](https://www.npmjs.com/package/md5) \
[bcryptjs](https://www.npmjs.com/package/bcryptjs) \
[jsencrypt](https://www.npmjs.com/package/jsencrypt) \
[jsrsasign](https://www.npmjs.com/package/jsrsasign) \
[base64-js](https://www.npmjs.com/package/base64-js) \
[js-base64](https://www.npmjs.com/package/js-base64)

## ua签名
[ua-parser-js](https://www.npmjs.com/package/ua-parser-js)

## 本地数据存储
[lodash](https://www.npmjs.com/package/lodash) \
[lowdb](https://www.npmjs.com/package/lowdb)

## 国际化
[vue-i18n](https://www.npmjs.com/package/vue-i18n)

## 复制粘贴
[clipboard](https://www.npmjs.com/package/clipboard)

## 三方授权登录集成库
[next-auth](https://www.npmjs.com/package/next-auth) \
[@okta/okta-auth-js](https://www.npmjs.com/package/@okta/okta-auth-js) \
[hellojs](https://www.npmjs.com/package/hellojs)

## 分享插件
[vue-social-sharing](https://www.npmjs.com/package/vue-social-sharing) \
[vue-socialmedia-share](https://www.npmjs.com/package/vue-socialmedia-share) \
[@vue/shared](https://www.npmjs.com/package/@vue/shared) \
[@vue/cli-shared-utils](https://www.npmjs.com/package/@vue/cli-shared-utils) \
[nativeshare](https://www.npmjs.com/package/nativeshare) || 唤起浏览器自身分享组件

## 地图
[vue-amap](https://www.npmjs.com/package/vue-amap) || 高德 \
[vue-baidu-map](https://www.npmjs.com/package/vue-baidu-map) || 百度

## 绘图 3D
[three.js](https://www.npmjs.com/package/three) || three.js

## 代码提交信息校验 -D
[husky](https://www.npmjs.com/package/husky) \
[commitizen](https://www.npmjs.com/package/commitizen) \
[cz-conventional-changelog](https://www.npmjs.com/package/cz-conventional-changelog) \
[cz-customizable](https://www.npmjs.com/package/cz-customizable)

## 适配移动端 -D
**rem方案过时啦，用vw方案解决吧** \
[postcss](https://www.npmjs.com/package/postcss)
[postcss-loader](https://www.npmjs.com/package/postcss-loader) || 将px转rem \
**vw方案 需要依赖style-loader 且需要删除@vue/cli-plugin-eslint** \
[cssnano](https://www.npmjs.com/package/cssnano) \
[cssnano-preset-advanced](https://www.npmjs.com/package/cssnano-preset-advanced) \
[postcss-aspect-ratio-mini](https://www.npmjs.com/package/postcss-aspect-ratio-mini) \
[postcss-cssnext](https://www.npmjs.com/package/postcss-cssnext) \
[postcss-import](https://www.npmjs.com/package/postcss-import) \
[postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport) \
[postcss-url](https://www.npmjs.com/package/postcss-url) \
[postcss-viewport-units](https://www.npmjs.com/package/postcss-viewport-units) \
[postcss-write-svg](https://www.npmjs.com/package/postcss-write-svg) \
**rem方案** \
[~~amfe-flexible~~](https://www.npmjs.com/package/amfe-flexible) || 不再推荐 lib-flexible 按照比例缩放展示，基于不同设备（Android、iOS、brow）的px值 \
[~~autoprefixer~~](https://www.npmjs.com/package/autoprefixer) \
[~~postcss-pxtorem~~](https://www.npmjs.com/package/postcss-pxtorem) \
[~~postcss-plugin-px2rem~~](https://www.npmjs.com/package/postcss-plugin-px2rem) \
[~~postcss-px2rem~~](https://www.npmjs.com/package/postcss-px2rem)

## 移动端调试 -D
[vconsole](https://www.npmjs.com/package/vconsole)

## 支付
[stripejs](https://www.npmjs.com/package/stripe) [官网](https://stripe.com/docs) \
[vue-stripe-elements-plus](https://www.npmjs.com/package/vue-stripe-elements-plus) [官网](https://vuestripe.com/) \
[vue-stripe](https://www.npmjs.com/package/@vue-stripe/vue-stripe) [官网](https://vuestripe.com/)

## 视频播放
[vue-video-player](https://www.npmjs.com/package/vue-video-player) \
[vue-core-video-player](https://www.npmjs.com/package/vue-core-video-player)

## 游戏
[Eva.js](https://www.npmjs.com/package/@eva/eva.js)
[Eva-plugin-renderer](https://www.npmjs.com/package/@eva/plugin-renderer)
[Eva-plugin-renderer-img](https://www.npmjs.com/package/@eva/plugin-renderer-img) [官网](https://eva-engine.gitee.io/#/tutorials/intro)

## 3D
[WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) \
[threejs](https://www.npmjs.com/package/three) [官网](https://threejs.org/)

# 特效
## 文字
[vue-textra](https://www.npmjs.com/package/vue-textra)

## 展示异常
[vue-show](https://www.npmjs.com/package/vue-show)

## 移动端日志
[eruda](https://www.npmjs.com/package/eruda) \
[vconsole](https://www.npmjs.com/package/vconsole)

## 跨端框架推荐：包含小程序啥的
[uni-app 官网](https://uniapp.dcloud.net.cn/) || 全平台跨端含APP等等 \
[taro 官网](https://taro.jd.com/) || 3.x已支持vue \
[~~mpvue 官网~~](https://mpvue.com/) || 美团 \
[~~wepyjs 官网~~](https://wepyjs.github.io/wepy-docs/) || 腾讯 需要学习wepy

## APP开发
[cordova 官网](http://cordova.axuer.com/) \
[Native Script 官网](https://nativescript.org/) \
[React Native 官网](https://reactnative.cn/)

# 其他组件参考
[组件](https://madewith.cn/) \
[百度，这是一个神奇的东西](https://baijiahao.baidu.com/s?id=1629138670094636894&wfr=spider&for=pc)

# 好玩的？
[水墨文档](https://github.com/huangwei9527/Ink-wash-docs) \
[聊天](https://www.npmjs.com/package/vue-beautiful-chat)

[createjs](https://www.createjs.com/) \
[Phaser 还有人用吗？](https://www.phaser-china.com/)

## 专业开发200年
[Unity 3D(C/JS) 3D大佬！](https://www.unrealengine.com/zh-CN/) \
[Cocos(C/TS) 2D、2.5大佬！](https://www.unrealengine.com/zh-CN/) \
[Unreal(C++) 这是一个追求画质的游戏引擎](https://www.unrealengine.com/zh-CN/)

# 移动端推荐
[vant](https://github.com/CharleeWa/vue3-vant-mobile) \
[Tencent](https://github.com/Tencent/weui/) \
[vite](https://github.com/LZHD/vue-vite-h5) \

# 小程序端UI
[vant](https://github.com/vant-ui/vant-weapp) \
[taro](https://taro-ui.jd.com/#/) | [github](https://github.com/NervJS/taro-ui) \
[Tencent](https://github.com/Tencent/weui-wxss) \
[mini](https://doc.mini.talelin.com/) | [github](https://github.com/TaleLin/lin-ui) \
[wux](https://wux-weapp.github.io/wux-weapp-docs/#/) \
[ColorUI 更新频率慢](https://github.com/weilanwl/ColorUI) \
[touchwx 不推荐，停更了](https://github.com/uileader/touchwx) \
[iview 不推荐，停更了](https://github.com/TalkingData/iview-weapp) \

# 由于其他因素相关的Web 库也放这里
## UI
[Bootstrap](https://getbootstrap.com/)
[heyui](https://v2.heyui.top/)
[varletjs](https://github.com/varletjs/varlet) | [varletjs](https://varlet-varletjs.vercel.app/#/en-US/home)

## Admin server & Web
https://github.com/jeecgboot \
https://github.com/flipped-aurora \
https://gitee.com/likeadmin \

## Admin vite
https://github.com/vbenjs/vue-vben-admin \
https://github.com/xiaoxian521/vue-pure-admin \
https://github.com/jekip/naive-ui-admin \
https://github.com/HalseySpicy/Geeker-Admin \
https://github.com/newbee-ltd/vue3-admin \
https://github.com/buqiyuan/vite-vue3-admin \
https://github.com/buqiyuan/vite-vue3-lowcode \
https://github.com/RainManGO/vue3-composition-admin/tree/vite \
https://github.com/cmdparkour/vue-admin-box \
https://github.com/GeekQiaQia/vue3.0-template-admin \
https://github.com/jeecgboot/jeecgboot-vue3 \
https://github.com/lyt-Top/vue-next-admin \
https://github.com/jzfai/vue3-admin-plus \
https://github.com/tobe-fe-dalao/fast-vue3 \

https://github.com/gmingchen/vue3-element-plus-admin/tree/vite-pinia \
https://github.com/lin-xin/vue-manage-system \

## other vite
https://github.com/nekobc1998923/vitecamp \
https://github.com/XPoet/vite-vue3-starter \
https://github.com/xxxsf/vue3-h5-template \

## doc
https://github.com/sl1673495/blogs \
https://github.com/cuixiaorui/mini-vue \

## project
https://github.com/geekskai/vue3-jd-h5 \
https://github.com/biubiubiu01/vue3-bigData \
https://github.com/jeecgboot/jeecg-boot \
https://github.com/flipped-aurora/gin-vue-admin \
https://github.com/biaochenxuying/blog-vue-typescript \
https://github.com/Yin-Hongwei/music-website \
https://github.com/pipipi-pikachu/PPTist \
https://github.com/Codennnn/vue-color-avatar \
https://github.com/youlaitech/youlai-mall \

[//]: # (loading)
http://k21vin.gitee.io/front-end-data-visualization/#/native/pureCSS/loading

https://juejin.cn/post/7037036742985121800
