if(self === top) {
	document.documentElement.style.display = 'block';
} else {
	top.location = self.location;
}
