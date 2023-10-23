"use strict";

function greetings() {
	for (let i = 1; i < 2; i++) {
		let greetings = prompt("[N]ew game or [E]xit?", "");

		if (greetings == "Y" || greetings == "y") {
			console.log("Отлично");
			start();
		} else if (greetings == "N" || greetings == "n") {
			console.log("До свидания");
		} else {
			console.log("Ошибка");
			i--;
		}
	}
}
greetings();

//--------Загружаем словарь и выбираем слово---------

function start() {
	window.addEventListener("DOMContentLoaded", () => {
		const fileURL = "/dictionary.txt";

		fetch(fileURL)
			.then((response) => response.text())
			.then((fileContent) => {
				let words = fileContent.replace(/\r/g, "").split("\n");
				let randomWord = [...words[Math.floor(Math.random() * words.length)]];
			})
			.catch((error) => console.error(error));
	});
}
console.log(aaa);
//-----------------------------------------------
// запрос буквы
//function stars() {
//	let star = "*";
//	let randomWordLength = randomWord.length;
//	//let starRow = star.repeat(`${randomWord.length}`);
//	console.log(randomWordLength);
//}
