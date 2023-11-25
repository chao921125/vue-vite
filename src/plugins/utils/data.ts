/**
 * 多层级嵌套赋值
 * @param obj 赋值的对象
 * @param path 需要赋值的属性 如：aaa.bbb
 * @param value 值
 */
export const setObjDeep = (obj: any, path: string, value: unknown) => {
	let schema = obj;
	const pList = path.split(".");
	const len = pList.length;
	for (let i = 0; i < len - 1; i++) {
		const elem = String(pList[i]);
		schema = schema[elem] || {};
	}

	schema[pList[len - 1]] = value;
};

/**
 * 根据路径获取目标对象的值
 * 如:{a:{b:{c:'xxxx'}}} 路径为:a.b.c ,则获取的则为xxxx
 * @param path 对象深度属性路径
 * @param obj 取值的对象
 */
export const resolve = (path: string, obj: any): unknown => {
	return path.split(".").reduce(function (prev, curr) {
		return prev ? prev[curr] : null;
	}, obj || self);
};
