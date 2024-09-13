// import { useIntersectionObserver } from "@vueuse/core";

export const animate = {
	mounted(el, binding) {
		// const { stop } = useIntersectionObserver(el, ([{ isIntersecting }], observerElement) => {
		// 	if (isIntersecting) {
		// 		el.classList.remove(options.animateOutClass);
		// 		el.classList.add(options.animateInClass);
		// 		stop();
		// 	}
		// });

		el.classList.add("animate__animated");
		const options = {
			animateInClass: (binding.value && binding.value.animateInClass) || "animate__fadeIn",
			animateOutClass: (binding.value && binding.value.animateOutClass) || "animate__fadeOut",
			repeat: (binding.value && binding.value.repeat) || false,
		};

		let isEntered = false;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				// const viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				// const elTop = el.offsetTop;
				// const scrollTop = document.documentElement.scrollTop;
				// const top = elTop - scrollTop;
				console.log(entry.isIntersecting);
				if (entry.isIntersecting && !isEntered) {
					el.classList.remove(options.animateOutClass);
					el.classList.add(options.animateInClass);
					isEntered = true;
				}
			});
		});
		observer.observe(el);
		window.addEventListener("resize", () => {
			observer.disconnect();
			observer.observe(el);
		});
	},
};
