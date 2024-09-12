import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import AxiosConfig from "@/config/httpConfig";
// 创建一个 MockAdapter 实例
const mock = new MockAdapter(axios);

const initMock = () => {
	// user login
	mock.onPost(`${AxiosConfig.baseUrl}/login`).reply((response) => {
		console.log(response);
		return [
			200,
			{
				code: 0,
				message: "",
				data: {
					avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
					name: "admin",
					token: new Date().getTime(),
				},
			},
		];
	});

	// mock模拟一个get方法的响应数据
	mock.onGet(`${AxiosConfig.baseUrl}/user`).reply(200, {
		// 200 为状态码，后面对象为返回data
		users: [{ id: 1, name: "李华" }],
	});
};

// 导出
export default initMock;
