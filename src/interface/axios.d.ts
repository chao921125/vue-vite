// * 请求响应参数(不包含data)
export interface IResult {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface IResultData<T = any> extends IResult {
	data?: T;
}

// * 分页响应参数
export interface IResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface IReqPage {
	pageNum: number;
	pageSize: number;
}
