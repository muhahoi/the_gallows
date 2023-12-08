"use strict";
//https://zhukovsd.github.io/java-backend-learning-course/Projects/Hangman/

document.querySelector(".start").onclick = (event) => {
	const divStart = document.getElementById("start");
	const divWordBox = document.getElementById("wordBox");
	const divKeyboard = document.getElementById("keyboard");
	const divName = document.getElementById("name");
	const divImage = document.getElementById("image");
	const divExit = document.getElementById("exit");
	divStart.style.display = "none";
	divWordBox.style.display = "block";
	divKeyboard.style.display = "flex";
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
	const divWordBox = document.getElementById("wordBox");
	const divKeyboard = document.getElementById("keyboard");
	const divName = document.getElementById("name");
	const divImage = document.getElementById("image");
	const divExit = document.getElementById("exit");
	divStart.style.display = "flex";
	divWordBox.style.display = "none";
	divKeyboard.style.display = "none";
	divName.style.display = "flex";
	divImage.style.display = "none";
	divExit.style.display = "none";

	//сброс стилей нажатых кнопок
	const clearAll = document.querySelectorAll(".btn");
	for (const button of clearAll) {
		button.style.pointerEvents = "All";
		button.style.border = "2px solid #000";
		button.style.color = "#000";
	}

	//очистка окошек букв
	let block = document.getElementById("wordWindow");
	block.textContent = "";

	//очистка прорисовки висилицы
	const el1 = document.querySelector(".el1");
	el1.style.display = "none";
	const el2 = document.querySelector(".el2");
	el2.style.display = "none";
	const el3 = document.querySelector(".el3");
	el3.style.display = "none";
	const el4 = document.querySelector(".el4");
	el4.style.display = "none";
	const el5 = document.querySelector(".el5");
	el5.style.display = "none";
	const el6 = document.querySelector(".el6");
	el6.style.display = "none";
	const el7 = document.querySelector(".el7");
	el7.style.display = "none";
	const el8 = document.querySelector(".el8");
	el8.style.display = "none";
	const el9 = document.querySelector(".el9");
	el9.style.display = "none";
	const el10 = document.querySelector(".el10");
	el10.style.display = "none";
}

async function start() {
	const path = "http://127.0.0.1:5501/dictionary.txt";
	const text = await fetch(path).then((response) => response.text());
	// Выбираем случайное слово из текста файла
	const words = text.replace(/\r/g, "").split("\n");
	randomWord = [...words[Math.floor(Math.random() * words.length)]];
	//randomWord = "А";
	console.log(randomWord);
	createDiv();
}
function createDiv() {
	//создаем окошки для букв
	let letterCount = randomWord.length;
	//let letterCount = 8;
	// Получаем родительский элемент, в который будем вставлять блоки
	let parent = document.getElementById("wordWindow");
	// Создаем и вставляем блоки в цикле
	for (let i = 0; i < letterCount; i++) {
		let div = document.createElement("div");
		div.className = "letterBox letterBox" + i; // Присваиваем разные классы
		parent.appendChild(div);
	}
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
					//записываем букву в окошко
					let content = randomWord[i];

					// Находим блок с классом "class1"
					let block = document.querySelector(".letterBox" + [i]);

					// Записываем содержимое переменной в блок
					block.innerHTML = content;

					guess++;
					flag = true;
					inactiveButton.style.cssText =
						"pointer-events:none; border: 2px solid green; color: green";

					//передаем букву в окошко
					//const element = document.querySelector("letterBox1");

					//// Устанавливаем значение переменной в элемент
					//element.textContent = randomWord[i];
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
				const el = document.querySelector(".el" + mistake);
				el.style.display = "flex";
			}

			if (mistake == 7) {
				if (winningRounds != 1 && winningRounds > record) {
					record = winningRounds;
				}
				winningRounds = 0;
				round = 0;
				mistake = 0;
				const el8 = document.querySelector(".el8");
				el8.style.display = "flex";
				const el9 = document.querySelector(".el9");
				el9.style.display = "flex";
				const el10 = document.querySelector(".el10");
				el10.style.display = "flex";

				
				// Находим блок с классом "class1"
				let blockPopupLose = document.querySelector(".popup__text");

				// Записываем содержимое переменной в блок
				blockPopupLose.innerHTML = `Вы проиграли.\n
Загаданное слово: ${randomWord.reduce((accumulator, currentValue) => {
					return accumulator + currentValue;
				}, "")}\n
Хотите сыграть в новую игру?`;

				console.log(`Вы проиграли.\n
Загаданное слово: ${randomWord.reduce((accumulator, currentValue) => {
					return accumulator + currentValue;
				}, "")}`);
				//clear();
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
				mistake = 0;
				console.log("Поздравляю! Вы победили!");
				//clear();
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
