"use strict";
//https://zhukovsd.github.io/java-backend-learning-course/Projects/Hangman/

document.querySelector(".start").onclick = (event) => {
	const divStart = document.getElementById("start");
	const divWord = document.getElementById("word");
	const divKeyboard = document.getElementById("keyboard");
	const divName = document.getElementById("name");
	const divImage = document.getElementById("image");
	const divExit = document.getElementById("exit");
	divStart.style.display = "none";
	divWord.style.display = "block";
	divKeyboard.style.display = "block";
	divName.style.display = "none";
	divImage.style.display = "block";
	divExit.style.display = "flex";
	start();
};

document.querySelector(".exit").onclick = (event) => {
	clear();
};

function clear() {
	const divStart = document.getElementById("start");
	const divWord = document.getElementById("word");
	const divKeyboard = document.getElementById("keyboard");
	const divName = document.getElementById("name");
	const divImage = document.getElementById("image");
	const divExit = document.getElementById("exit");
	divStart.style.display = "flex";
	divWord.style.display = "none";
	divKeyboard.style.display = "none";
	divName.style.display = "block";
	divImage.style.display = "none";
	divExit.style.display = "none";

	//сброс стилей нажатых кнопок
	const clearAll = document.querySelectorAll(".btn");
	for (const button of clearAll) {
		button.style.pointerEvents = "All";
		button.style.border = "2px solid #000";
		button.style.color = "#000";
	}
}

async function start() {
	//const path = "http://127.0.0.1:5501/dictionary.txt";
	//const text = await fetch(path).then((response) => response.text());
	//// Выбираем случайное слово из текста файла
	//const words = text.replace(/\r/g, "").split("\n");
	//randomWord = [...words[Math.floor(Math.random() * words.length)]];
	randomWord = "А";
	console.log(randomWord);
	stars();
}
function stars() {
	let star = "*";
	let randomWordLength = randomWord.length;
	let stars = star.repeat(randomWordLength);
	starsArrow = [...stars];
	getLetter();
}

async function getLetter() {
	let mistake = 0;
	let guess = 0;
	let inputLetterArrow = [];
	let wrongLetterArrow = [];
	let wrongLetterString = "";

	for (let j = 0; j < randomWord.length + 5; j++) {
		let letter = "";
		document.querySelector(".keyboard__content").onclick = (event) => {
			//let buttonId = event.target.id;
			const inactiveButton = document.getElementById(`${event.target.id}`);

			if (!event.target.classList.contains("btn")) return;

			//получаю нажатую кнопку
			const key = event.target.textContent;
			// присваиваем переменной "а" значение key
			letter = key;
			console.log(letter);

			let flag = false;
			for (let i = 0; i < randomWord.length; i++) {
				if (letter == randomWord[i]) {
					starsArrow[i] = letter;
					inputLetterArrow.push(letter);
					guess++;
					flag = true;
					inactiveButton.style.cssText =
						"pointer-events:none; border: 2px solid green; color: green";
				}
			}

			if (!flag) {
				mistake++;
				inputLetterArrow.push(letter);
				wrongLetterArrow.push(letter);
				wrongLetterString += `${letter} `;
				inactiveButton.style.cssText =
					"pointer-events:none; border: 2px solid red; color: red";
				console.log("Такой буквы нет.");
			}

			if (mistake == 6) {
				if (winningRounds != 1 && winningRounds > record) {
					record = winningRounds;
				}
				winningRounds = 0;
				round = 0;
				alert(`Вы проиграли.\n
Загаданное слово: ${randomWord}`);
				clear();
			}

			//if (guess == randomWord.length && mistake == 0) {
			//	winningRounds = winningRounds + 1;
			//	round += 1;
			//	alert(`Поздравляю! Идеальная победа!`);
			//	clear();
			//}

			if (guess == randomWord.length) {
				winningRounds = winningRounds + 1;
				round = round + 1;
				//const roundOut = document.querySelector(".round__number");
				//roundOut.textContent = round;
				//const recordOut = document.querySelector(".record__number");
				//recordOut.textContent = winningRounds;
				alert("Поздравляю! Вы победили!");
				clear();
			}
		};
	}
}

let randomWord;
// глобальная переменная для хранения массива звездочек
let starsArrow;
let round = 0;
let record = 0;
let winningRounds = 0;
