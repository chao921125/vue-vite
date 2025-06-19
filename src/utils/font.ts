export default {
	name: "font-load",
	isLoadAll() {
		const fontFaces = document.fonts.values();
		let item = fontFaces.next();
		let count = 0;
		while (!item.done) {
			// let ff = item.value;
			item = fontFaces.next();
			count += 1;
		}
		return document.fonts.ready.then(() => {
			return document.fonts.size === count;
		});
	},
	isLoad(fonts) {
		// document.fonts.status
		if (typeof fonts === "string") {
		}
		if (Array.isArray(fonts)) {
		}
	},
	addFont(name, url) {
		const font = new FontFace(name, `url(${url})`);
		document.fonts.add(font);
	},
	deleteFont(name, url) {
		const font = new FontFace(name, `url(${url})`);
		document.fonts.delete(font);
	},
	clearFont() {
		document.fonts.clear();
	},
};
