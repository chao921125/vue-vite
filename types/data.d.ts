// * 请求响应参数(不包含data)
declare interface IResult {
  code: string;
  msg: string;
}

// * 请求响应参数(包含data)
declare interface IResultData<T = never> extends IResult {
  data?: T;
}

// * 分页响应参数
declare interface IResPage<T> {
  datalist: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// * 分页请求参数
declare interface IReqPage {
  pageNum: number;
  pageSize: number;
}
