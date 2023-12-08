//// Получаем элемент с классом letter[i]
//const element = document.querySelector(`${letter + i}`);

//// Устанавливаем значение переменной в элемент
//element.textContent = randomWord[i];

//let letterCount = randomWord.length;
////let letterCount = 8;
//// Получаем родительский элемент, в который будем вставлять блоки
//let parent = document.getElementById("wordWindow");

//// Создаем и вставляем блоки в цикле
//for (let i = 0; i < letterCount; i++) {
//	let div = document.createElement("div");
//	div.className = "letterBox letterBox" + i; // Присваиваем разные классы
//	parent.appendChild(div);
//}

const el = document.querySelector(".el" + mistake);
el.style.removeProperty("display");
