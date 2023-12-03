document.querySelector(".keyboard__content").onclick = (event) => {
	if (!event.target.classList.contains("btn")) return;

	const key = event.target.textContent;

	console.log(key);
};
