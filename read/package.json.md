# description


## scripts指定了运行脚本命令的npm命令行缩写，比如start指定了运行npm run start时，所要执行的命令。
```
"scripts": {
    "preinstall": "echo here it comes!",
    "postinstall": "echo there it goes!",
    "start": "node index.js",
    "test": "tap test/*.js"
}
```

## dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。

```
"devDependencies": {
    "browserify": "~13.0.0",
    "karma-browserify": "~5.0.1"
}

指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
波浪号（tilde）+指定版本：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。
插入号（caret）+指定版本：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。
latest：安装最新版本。
```

## peerDependencies字段，就是用来供插件指定其所需要的主工具的版本。

```
"peerDependencies": {
    "chai": "1.x"
}
```

## bin项用来指定各个内部命令对应的可执行文件的位置。

```
"bin": {
  "someTool": "./bin/someTool.js"
}

scripts: {
  start: './node_modules/bin/someTool.js build'
}

// 简写为

scripts: {
  start: 'someTool build'
}
```

## main字段指定了加载的入口文件，require('moduleName')就会加载这个文件。这个字段的默认值是模块根目录下面的index.js。

## config字段用于添加命令行的环境变量。

## browser指定该模板供浏览器使用的版本。Browserify这样的浏览器打包工具，通过它就知道该打包那个文件。

```
"browser": {
  "tipso": "./node_modules/tipso/src/tipso.js"
}
```

## engines字段指明了该模块运行的平台，比如 Node 的某个版本或者浏览器。

```
{ "engines" : { "node" : ">=0.10.3 <0.12" } }

{ "engines" : { "npm" : "~1.0.20" } }

```
## man用来指定当前模块的man文档的位置。

```
"man" :[ "./doc/calc.1" ]
```

## preferGlobal的值是布尔值，表示当用户不将该模块安装为全局模块时（即不用–global参数），要不要显示警告，表示该模块的本意就是安装为全局模块。


## style指定供浏览器使用时，样式文件所在的位置。样式文件打包工具parcelify，通过它知道样式文件的打包位置。

```
"style": [
  "./node_modules/tipso/src/tipso.css"
]
```

### git 提交信息校验配置
```
"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
    }
  },
  "gitHooks": {
    "commit-msg": "commitlint -e -V "
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
```

## 完全配置以及解释
```json 
{
  "name": "puppeteer",
  "version": "1.0.0",
  "description": "demo",
  "main": "index.js",
  "private": false, # 是否是私有模块，非公开设置为true
  "scripts": { # 执行脚本
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": { # 运行时依赖
    "mysql": "^2.18.1",
    "node-rsa": "^1.1.1",
    "puppeteer": "^10.4.0",
    "puppeteer-core": "^10.4.0"
  },
  "devDependencies": { # 开发时依赖
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/chao921125/"
  },
  "keywords": [
    "github",
    "puppeteer",
    "npm"
  ],
  "author": "cc",
  "license": "ISC",
  "engines": { # 指定运行或开发环境最低需求
    "node": ">= 8.16.0",
    "npm": ">= 6.9.0"
  },
  "os" : [ "darwin", "linux", "!win32" ], # 支持的平台和黑名单
  "cpu" : [ "x64", "ia32", "!arm", "!mips" ], # 支持的cpu和黑名单
  "bugs": { # 问题追踪
    "url" : "https://github.com/owner/project/issues" ,  
    "email" ："project@hostname.com"
  },
}
```
