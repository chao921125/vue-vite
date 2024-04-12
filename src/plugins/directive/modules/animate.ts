import type { Directive, DirectiveBinding } from "vue";

export const animated: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		el.classList.add("animate__animated");
		const options = binding.value || { animateClass: "animate__fadeIn" };

		let isEntered = false;
		let isRepeat = options.repeat || false;

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
				} else if (!entry.isIntersecting && isEntered && isRepeat) {
					el.classList.remove(options.animateClass);
					isEntered = false;
				}
			});
		}, options.intersectionOptions || {});
		observer.observe(el);
	},
};
