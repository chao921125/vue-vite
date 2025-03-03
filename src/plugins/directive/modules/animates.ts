/**
 * v-animated="'bounce'"
 * v-animated="{
 *         animation: 'fadeIn',
 *         duration: '2s',
 *         delay: '0.5s',
 *         iterationCount: '2',
 *         infinite: false,
 *         onAnimationEnd: handleAnimationEnd
 *       }"
 */
export const animates = {
	mounted(el, binding) {
		applyAnimation(el, binding.value);
	},
	updated(el, binding) {
		// 清理之前的动画类和内联样式（除基础类外）
		resetAnimation(el);
		applyAnimation(el, binding.value);
	},
	unmounted(el) {
		resetAnimation(el);
	},
};

// 内部方法：重置动画相关的类和样式
function resetAnimation(el) {
	// 保留基础类 animate__animated 与 animate__infinite（后续根据配置添加或移除）
	el.classList.forEach((cls) => {
		if (cls.startsWith("animate__") && cls !== "animate__animated" && cls !== "animate__infinite") {
			el.classList.remove(cls);
		}
	});
	el.style.removeProperty("--animate-duration");
	el.style.removeProperty("--animate-delay");
	el.style.removeProperty("animation-iteration-count");
}

// 内部方法：应用动画配置
function applyAnimation(el, bindingValue) {
	// 如果传入为字符串，则视为动画名称，其他配置采用默认值
	let config = {
		animation: "",
		duration: "",
		delay: "",
		iterationCount: "",
		infinite: "",
		onAnimationEnd: (e?: any) => {
			console.log("Animation ended:", e);
		},
	};
	if (typeof bindingValue === "string") {
		config.animation = bindingValue;
	} else if (typeof bindingValue === "object" && bindingValue !== null) {
		config = bindingValue;
	}
	// 默认动画名称为 fadeIn
	const animationName = config.animation || "fadeIn";
	const duration = config.duration; // 示例："2s"
	const delay = config.delay; // 示例："0.5s"
	const iterationCount = config.iterationCount; // 示例："infinite" 或数字字符串 "3"
	const infinite = config.infinite || false; // 布尔值
	const onAnimationEnd = typeof config.onAnimationEnd === "function" ? config.onAnimationEnd : null;

	// 添加基础类
	el.classList.add("animate__animated");
	// 添加目标动画类（注意 animate.css 的命名规则：animate__动画名称）
	el.classList.add(`animate__${animationName}`);

	// 设置动画时长与延迟（如果配置了）
	if (duration) {
		el.style.setProperty("--animate-duration", duration);
	}
	if (delay) {
		el.style.setProperty("--animate-delay", delay);
	}
	// 设置循环次数
	if (iterationCount) {
		el.style.setProperty("animation-iteration-count", iterationCount);
	}
	// 若 infinite 为 true，添加无限循环类
	if (infinite) {
		el.classList.add("animate__infinite");
	} else {
		el.classList.remove("animate__infinite");
	}
	// 绑定动画结束事件（支持回调）
	if (onAnimationEnd) {
		const handleAnimationEnd = () => {
			onAnimationEnd(el);
			el.removeEventListener("animationend", handleAnimationEnd);
		};
		el.addEventListener("animationend", handleAnimationEnd);
	}
}
