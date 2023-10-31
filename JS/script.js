"use strict";
//https://zhukovsd.github.io/java-backend-learning-course/Projects/Hangman/

function greetings() {
	for (let i = 1; i < 2; i++) {
		let greetings = prompt("[Н]ачать новую игру или [В]ыйти из игры");
		if (greetings == "Н" || greetings == "н") {
			start();
		} else if (greetings == "В" || greetings == "в") {
			alert("До свидания");
			break;
		} else {
			alert(
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

	outer: for (let j = 0; j < randomWord.length + 5; j++) {
		let letter = prompt(`Введите букву русского алфавита\n
${randomWord}\n
Загаданное слово: ${starsArrow.reduce((accumulator, currentValue) => {
			return accumulator + currentValue;
		}, "")}\n
Неправильные буквы: ${wrongLetterString}`);

		if (
			letter == null ||
			letter.length != 1 ||
			letter == "" ||
			!isNaN(letter) ||
			!letter.match(/^[А-Яа-яёё]$/)
		) {
			j--;
			continue outer;
		}

		for (let k = 0; k < inputLetterArrow.length; k++) {
			//проверка на повтор
			if (letter !== inputLetterArrow[k]) continue;
			alert(`Буква "${letter}" уже была введена ранее. Попробуйте еще раз.`);
			j--;
			continue outer;
		}

		// Создаем флаг, который будет указывать на то, выполнено ли условное ветвление
		let flag = false;
		for (let i = 0; i < randomWord.length; i++) {
			if (letter == randomWord[i]) {
				starsArrow[i] = letter;
				inputLetterArrow.push(letter);
				guess++;
				flag = true;
			}
		}

		// Условное ветвление ни разу не выполнено
		if (!flag) {
			mistake++;
			inputLetterArrow.push(letter);
			wrongLetterArrow.push(letter);
			wrongLetterString += `${letter} `;
		}
		if (mistake == 6) {
			alert("Вы проиграли.");
			break;
		}

		if (guess == randomWord.length) {
			alert("Поздравляю! Вы победили!");
			break;
		}
	}
	setTimeout(greetings, 1000);
}

greetings();

// глобальная переменная для хранения загаданного слова
let randomWord;
// глобальная переменная для хранения массива звездочек
let starsArrow;
