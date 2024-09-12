export const writeText = (text) => {
	if (!navigator.clipboard) {
		return false;
	}
	navigator.clipboard
		.writeText(text)
		.then(() => {
			console.log("Copied!");
		})
		.catch((err) => {
			console.error("Could not copy text:", err);
		});
};
export const readText = () => {
	if (!navigator.clipboard) {
		return false;
	}
	navigator.clipboard
		.readText()
		.then((text) => {
			return text;
		})
		.catch((err) => {
			console.error("Could not copy text:", err);
		});
};
export default { writeText, readText };
