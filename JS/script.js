"use strict";
//https://zhukovsd.github.io/java-backend-learning-course/Projects/Hangman/
let randomWord;
let round = 0;
let record = 0;

const roundOut = document.querySelector(".round__number");
roundOut.textContent = round;

document.querySelector(".start").onclick = (event) => {
	const divStart = document.getElementById("start");
	const divWordBox = document.getElementById("wordBox");
	const divKeyboard = document.getElementById("keyboard");
	const divName = document.getElementById("name");
	const divImage = document.getElementById("image");
	const divExit = document.getElementById("exit");
	divStart.style.display = "none";
	divWordBox.style.display = "flex";
	divKeyboard.style.display = "flex";
	divName.style.display = "none";
	divImage.style.display = "flex";
	divExit.style.display = "flex";
	start();
};

document.querySelector(".button-yes").onclick = (event) => {
	const divKeyboard = document.getElementById("keyboard");
	divKeyboard.style.display = "flex";
	let block = document.getElementById("wordWindow");
	block.textContent = "";
	clearPopupContainer();
	clearEl();
	clearButtons();
	start();
};

document.querySelector(".button-no").onclick = (event) => {
	clearPlayField();
	clearButtons();
	clearWordBlock();
	clearEl();
	clearPopupContainer();
};

document.querySelector(".exit").onclick = (event) => {
	round = 0;
	console.log(round);
	clearPlayField();
	clearButtons();
	clearWordBlock();
	clearPopupContainer();
	clearEl();
	roundOut.textContent = "0";
};

function clearPopupContainer() {
	const divPopupContainer = document.getElementById("popupContainer");
	divPopupContainer.style.display = "none";
}

function clearPlayField() {
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
}

//сброс стилей нажатых кнопок
function clearButtons() {
	const clearBtn = document.querySelectorAll(".btn");
	for (const button of clearBtn) {
		button.style.pointerEvents = "All";
		button.style.border = "2px solid #000";
		button.style.color = "#000";
		button.style.background = "transparent";
	}
}

//очистка окошек букв
function clearWordBlock() {
	let block = document.getElementById("wordWindow");
	block.textContent = "";
}
//очистка прорисовки виселицы
function clearEl() {
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
}

//Попап помощи
document.querySelector(".settings__help").onclick = (event) => {
	openPopup();
};

// Открыть поп-окно
function openPopup() {
	document.querySelector(".popup__help").style.display = "block";
}

// Закрыть поп-окно
function closePopup() {
	document.querySelector(".popup__help").style.display = "none";
}

// Добавить событие для закрытия поп-окна по нажатию на крестик
document.querySelector(".close-button").addEventListener("click", closePopup);

// Добавить событие для закрытия поп-окна по нажатию вне поп-окна
document.addEventListener("click", (event) => {
	if (event.target.classList.contains("popup__help")) {
		closePopup();
	}
});

async function start() {
	++round;
	const roundOut = document.querySelector(".round__number");
	roundOut.textContent = round;
	const path = "/dictionary.txt";
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
						"pointer-events:none; border: 2px solid green; color: green; background-color: rgb(198, 240, 198)";
				}
			}

			if (!flag) {
				mistake++;
				inputLetterArrow.push(letter);
				wrongLetterArrow.push(letter);
				wrongLetterString += `${letter} `;
				inactiveButton.style.cssText =
					"pointer-events:none; border: 2px solid red; color: red; background-color: 	rgba(255, 133, 133, 0.359)";
				const el = document.querySelector(".el" + mistake);
				el.style.display = "flex";
			}

			if (mistake == 6) {
				round = 0;
				mistake = 0;
				const el7 = document.querySelector(".el7");
				el7.style.display = "flex";
				const el8 = document.querySelector(".el8");
				el8.style.display = "flex";
				const el9 = document.querySelector(".el9");
				el9.style.display = "flex";

				let blockPopupLose = document.querySelector(".popup__text");

				blockPopupLose.innerHTML = `&#128128<br>
				Вы проиграли!<br>
Загаданное слово: ${randomWord.reduce((accumulator, currentValue) => {
					return accumulator + currentValue;
				}, "")}<br>
Хотите сыграть в новую игру?`;
				const popupContainer = document.querySelector(".popup__container");
				const divKeyboard = document.getElementById("keyboard");
				divKeyboard.style.display = "none";
				popupContainer.style.display = "flex";
			}

			if (guess == randomWord.length) {
				if (record < round) {
					record = round;
				}

				const recordOut = document.querySelector(".record__number");
				recordOut.textContent = record;
				let blockPopupLose = document.querySelector(".popup__text");

				if (guess == randomWord.length && mistake == 0) {
					blockPopupLose.innerHTML = `&#127881<Br>
				Поздравляю! Идеальная победа!<br/>
				Хотите сыграть в новую игру?`;
					const popupContainer = document.querySelector(".popup__container");
					const divKeyboard = document.getElementById("keyboard");
					divKeyboard.style.display = "none";
					popupContainer.style.display = "flex";
				} else {
					// Записываем содержимое переменной в блок
					blockPopupLose.innerHTML = `&#127881<Br>
				Поздравляю! Вы выиграли!<br/>
				Хотите сыграть в новую игру?`;
					const popupContainer = document.querySelector(".popup__container");
					const divKeyboard = document.getElementById("keyboard");
					divKeyboard.style.display = "none";
					popupContainer.style.display = "flex";
				}
				mistake = 0;
			}
		};
	}
}
