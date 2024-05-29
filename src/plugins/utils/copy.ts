export const writeText = (text: string) => {
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
		.then((text: any) => {
			return text;
		})
		.catch((err) => {
			console.error("Could not copy text:", err);
		});
};
export default { writeText, readText };
