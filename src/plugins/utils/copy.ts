export const copyText = (text: string) => {
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
export default { copyText };
