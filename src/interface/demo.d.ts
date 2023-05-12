/**
 * 定义接口来定义对象的类型
 * `stores` 全部类型定义在这里
 * *State 单实例 多个属性
 * *States 实例集合 属性实例key
 */
export interface IDemoState {
	id: number;
	name: string;
}
export interface IDemoStates {
	demo: IDemoState;
}
