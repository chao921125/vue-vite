import { ElMessage } from "element-plus";

/**
 * hex颜色转rgb颜色
 * @param str 颜色值字符串
 * @returns MessageHandler
 */
export const hexToRgb = (str: string) => {
	let hexs: (string | number)[] = [];
	const reg = /^#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(str)) return ElMessage.warning("输入错误的hex");
	str = str.replace("#", "");
	hexs = str.match(/../g) || [];
	for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i] as string, 16);
	return hexs as number[];
};

/**
 * rgb颜色转Hex颜色
 * @param r 代表红色
 * @param g 代表绿色
 * @param b 代表蓝色
 * @returns string
 */
export const rgbToHex = (r: number, g: number, b: number) => {
	const reg = /^\d{1,3}$/;
	if (!reg.test(r.toString()) || !reg.test(g.toString()) || !reg.test(b.toString())) {
		ElMessage.warning("输入错误的rgb颜色值");
		return "";
	}
	const hexs = [r.toString(16), g.toString(16), b.toString(16)];
	for (let i = 0; i < 3; i++) if (hexs[i].length === 1) hexs[i] = `0${hexs[i]}`;
	return `#${hexs.join("")}`;
};

/**
 * 加深颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限0-1之间
 * @returns string
 */
export const getDarkColor = (color: string, level: number) => {
	const reg = /^#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) {
		ElMessage.warning("输入错误的hex颜色值");
		return "";
	}
	const rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
};

/**
 * 变浅颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限0-1之间
 * @returns string
 */
export const getLightColor = (color: string, level: number) => {
	const reg = /^#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) {
		ElMessage.warning("输入错误的hex颜色值");
		return "";
	}
	const rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
};
