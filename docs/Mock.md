```javascript
const fs = require("fs");
const path = require("path");

export default (options) => {
  // 做的最主要的事情就是拦截http请求
  // D当我们使用fetch或者axios去请求的
  // axios baseUrl // 请求地址
  // 当打给本地的开发服务器的时候 viteserver服务器接管

  return {
    configureServer(server) {
      // 服务器的相关配置
      // req, 请求对象 --> 用户发过来的请求, 请求头请求体 url cookie
      // res: 响应对象, - res.header
      // next: 是否交给下一个中间件, 调用next方法会将处理结果交给下一个中间件
      const mockStat = fs.statSync("mock");
      const isDirectory = mockStat.isDirectory();
      let mockResult = [];
      if (isDirectory) {
        // process.cwd() ---> 获取你当前的执行根目录
        mockResult = require(path.resolve(process.cwd(), "mock/index.js"));
        console.log("result", mockResult);

      }

      server.middlewares.use((req, res, next) => {
        console.log("req", req.url);
        // 看我们请求的地址在mockResult里有没有
        const matchItem = mockResult.find(mockDescriptor => mockDescriptor.url === req.url);
        console.log("matchItem", matchItem);

        if (matchItem) {
          console.log("进来了", );
          const responseData = matchItem.response(req);
          console.log("responseData", responseData);
          // 强制设置一下他的请求头的格式为json
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(responseData)); // 设置请求头 异步的


        } else {
          next(); // 你不调用next 你又不响应 也会响应东西
        }

      })  // 插件 === middlewares
    }
  }
}
```

```javascript
// main.[tj]s
// mock
import initMock from "../mock/index";
initMock();

// index.js
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
// 创建一个 MockAdapter 实例
const mock = new MockAdapter(axios);

const initMock = () => {
	// mock模拟一个get方法的响应数据
	mock.onGet("/users").reply(200, {
		// 200 为状态码，后面对象为返回data
		users: [{ id: 1, name: "李华" }],
	});
	// mock模拟一个post方法的响应数据
	mock.onPost("/foo").reply(200, {
		// 200 为状态码，后面对象为返回data
		msg: "success",
		desc: "恭喜，请求成功！",
	});

	// 模拟一个带参数请求的响应
	mock.onGet("/search", { params: { searchText: "张" } }).reply(200, {
		users: [{ id: 1, name: "张小花" }],
	});

	// 模拟一个错误响应
	mock.onPut("/api/users/1").networkError();
};

// 导出
export default initMock;
```
