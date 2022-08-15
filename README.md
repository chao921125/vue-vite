# 注意事项
使用pnpm安装包的时候需要修改package.json的文件，删除掉resolutions里面的// \
npm安装依赖包出现错误或安装失败，选择yarn安装 \
注意所有配置菜单的数据，均由前端提供 \
！！！注意VUE3中的reactive使用，如果需要更新视图需要抽出interface。！！！

# 对应包使用解释
项目本身配置99%都在vite.config.ts里面，参数设置都在根目录下，而非src下 \
src下的settings目录是系统默认参数

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

# 已完成
- [x] 动态路由（同时支持静态路由配置，一切简便化）
- [x] 国际化
- [x] Element Icon、Iconify、IconFont使用

# 下一步
- [ ] 换肤
- [ ] 全屏
- [ ] 标签TAG
- [ ] 静态权限控制（此项并不在我的计划之内）
- [ ] 按钮级别权限控制（此项并不在我的计划之内）

# 我有一个想法
把Axios封装成一个异步函数，所有的数据均抽象出来，然后多次调用。但是有个缺点，当数据请求特别多的时候，那么都在等待状态，而此时就无法点击其他操作，不太友好，怎么解决？

# [Vite 插件](https://github.com/vitejs/awesome-vite#plugins)

# 收集好用的[VUE库](https://github.com/chao921125/web-study/blob/main/Document/VUE.MD)
