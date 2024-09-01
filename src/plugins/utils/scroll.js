// @ts-ignore
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) {
		return (c / 2) * t * t + b;
	}
	t--;
	return (-c / 2) * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
let requestAnimFrame = (function () {
	return (
		window.requestAnimationFrame ||
		// @ts-ignore
		window.webkitRequestAnimationFrame ||
		// @ts-ignore
		window.mozRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	);
})();

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount) {
	document.documentElement.scrollTop = amount;
	// @ts-ignore
	document.body.parentNode.scrollTop = amount;
	document.body.scrollTop = amount;
}

function position() {
	// @ts-ignore
	return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export const scrollTo = (to, duration, callback) => {
	const start = position();
	const change = to - start;
	const increment = 20;
	let currentTime = 0;
	duration = typeof duration === "undefined" ? 500 : duration;
	let animateScroll = function () {
		// increment the time
		currentTime += increment;
		// find the value with the quadratic in-out easing function
		// @ts-ignore
		let val = Math.easeInOutQuad(currentTime, start, change, duration);
		// move the document.body
		move(val);
		// do the animation unless its over
		if (currentTime < duration) {
			requestAnimFrame(animateScroll);
		} else {
			if (callback && typeof callback === "function") {
				// the animation is done so lets callback
				callback();
			}
		}
	};
	animateScroll();
};
