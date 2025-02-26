// v-seamless-scroll.js
export default {
	mounted(el, binding) {
		// 解析配置项
		const config = Object.assign(
			{
				direction: "left", // 'left' | 'right' | 'up' | 'down'
				speed: 50, // 滚动速度，单位：px/s
			},
			binding.value || {},
		);

		// 强制设置外层容器样式
		el.style.overflow = "hidden";
		el.style.position = "relative";

		// 创建滚动容器，包裹内容，并复制一份以实现无缝滚动
		const wrapper: any = document.createElement("div");
		wrapper.className = "seamless-scroll-wrapper";

		// 根据滚动方向决定布局方式
		if (config.direction === "left" || config.direction === "right") {
			wrapper.style.display = "flex";
		} else {
			wrapper.style.display = "flex";
			wrapper.style.flexDirection = "column";
		}

		// 将原有内容移入 wrapper
		while (el.firstChild) {
			wrapper.appendChild(el.firstChild);
		}

		// 复制一份内容
		const clone = wrapper.cloneNode(true);
		wrapper.appendChild(clone);

		// 添加 wrapper 到 el 中
		el.appendChild(wrapper);

		// 等待浏览器渲染布局后计算尺寸并设置动画
		setTimeout(() => {
			let distance = 0;
			if (config.direction === "left" || config.direction === "right") {
				// 横向滚动：取第一组内容的宽度
				distance = wrapper.children[0]!.offsetWidth!;
			} else {
				// 纵向滚动：取第一组内容的高度
				distance = wrapper.children[0]!.offsetHeight!;
			}

			// 根据速度计算动画持续时间（秒）
			const duration = distance / config.speed;

			// 动态生成 keyframes，根据方向决定动画效果
			let keyframes = "";
			if (config.direction === "left") {
				keyframes = `
          @keyframes seamlessScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${distance}px); }
          }
        `;
			} else if (config.direction === "right") {
				keyframes = `
          @keyframes seamlessScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(${distance}px); }
          }
        `;
			} else if (config.direction === "up") {
				keyframes = `
          @keyframes seamlessScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-${distance}px); }
          }
        `;
			} else if (config.direction === "down") {
				keyframes = `
          @keyframes seamlessScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(${distance}px); }
          }
        `;
			}

			// 将 keyframes 插入页面中（防止重复插入可按需优化）
			const styleEl = document.createElement("style");
			styleEl.innerHTML = keyframes;
			document.head.appendChild(styleEl);

			// 为滚动容器设置动画
			wrapper.style.animation = `seamlessScroll ${duration}s linear infinite`;
		}, 0);
	},
};
