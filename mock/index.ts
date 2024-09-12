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
