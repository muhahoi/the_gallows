"use strict";
//https://zhukovsd.github.io/java-backend-learning-course/Projects/Hangman/

function greetings() {
	for (let i = 1; i < 2; i++) {
		let greetings = "н";
		//let greetings = prompt("[Н]ачать новую игру или [В]ыйти из игры");
		if (greetings == "Н" || greetings == "н") {
			start();
		} else if (greetings == "В" || greetings == "в") {
			console.log("До свидания");
			break;
		} else {
			console.log(
				`Необходимо ввести "Н", если хотите начать игру, или "В", если хотите выйти из игры`
			);
			i--;
		}
	}
}

async function start() {
	const path = "http://127.0.0.1:5500/dictionary.txt";
	const text = await fetch(path).then((response) => response.text());
	// Выбираем случайное слово из текста файла
	const words = text.replace(/\r/g, "").split("\n");
	randomWord = [...words[Math.floor(Math.random() * words.length)]];
	stars();
}

function stars() {
	round++;
	let star = "*";
	let randomWordLength = randomWord.length;
	let stars = star.repeat(randomWordLength);
	starsArrow = [...stars];
	console.log(randomWord);
	getLetter();
}

// Выводим запрос буквы
async function getLetter() {
	let mistake = 0;
	let guess = 0;
	let inputLetterArrow = [];
	let wrongLetterArrow = [];
	let wrongLetterString = "";
}

greetings();

// глобальная переменная для хранения загаданного слова
let randomWord;
// глобальная переменная для хранения массива звездочек
let starsArrow;
let round = 0;
let winningRounds = 0;
let record = 0;

//Всплывающее окно
