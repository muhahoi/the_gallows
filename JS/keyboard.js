let letter;
document.querySelector(".keyboard__content").onclick = (event) => {
	if (!event.target.classList.contains("btn")) return;

	keyw = event.target.textContent;
	letter = keyw;
	return letter;
	// This will now print the value of the 'key' variable
};
console.log(letter);
