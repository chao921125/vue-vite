import type { Directive, DirectiveBinding } from "vue";

export const animate: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		el.classList.add("animate__animated");
		const options = {
			animateClass: binding.value.animateClass || "animate__fadeIn",
			repeat: binding.value.repeat || false,
		};

		let isEntered = false;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry: IntersectionObserverEntry) => {
				// const viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				// const elTop = el.offsetTop;
				// const scrollTop = document.documentElement.scrollTop;
				// const top = elTop - scrollTop;
				// console.log(top);

				if (entry.isIntersecting && !isEntered) {
					el.classList.add(options.animateClass);
					isEntered = true;
				} else if (!entry.isIntersecting && isEntered && options.repeat) {
					el.classList.remove(options.animateClass);
					isEntered = false;
				}
			});
		}, binding.value.intersectionOptions || {});
		observer.observe(el);
	},
};
