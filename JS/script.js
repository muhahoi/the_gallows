"use strict";

// глобальная переменная для хранения загаданного слова
let randomWord;

function greetings() {
	for (let i = 1; i < 2; i++) {
		let greetings = prompt("[N]ew game or [E]xit");

		if (greetings == "N" || greetings == "n") {
			console.log("Отлично");
			start();
		} else if (greetings == "E" || greetings == "e") {
			console.log("До свидания");
			break;
		} else {
			console.log("Ошибка");
			i--;
		}
	}
}

async function start() {
	const path = "http://127.0.0.1:5500/dictionary.txt";

	const text = await fetch(path).then((response) => response.text());

	// Выбираем случайное слово из текста файла
	const words = text.replace(/\r/g, "").split("\n");
	const randomWordIndex = Math.floor(Math.random() * words.length);
	randomWord = words[randomWordIndex];

	console.log("start randomWord", randomWord);
	stars();
	return randomWord;
}

function stars() {
	let star = "*";
	let randomWordLength = randomWord.length;
	let stars = star.repeat(randomWordLength);
	let starsArrow = [...stars];
	console.log("Загаданное слово: ", stars);
	console.log("randomWordLength", randomWordLength);
	console.log("stars arrow: ", starsArrow);
}

greetings();
//stars();
