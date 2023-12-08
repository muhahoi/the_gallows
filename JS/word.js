let letterCount = randomWord.length;
//let letterCount = 8;
// Получаем родительский элемент, в который будем вставлять блоки
let parent = document.getElementById("word");

// Создаем и вставляем блоки в цикле
for (let i = 0; i < letterCount; i++) {
	let div = document.createElement("div");
	div.className = "letterBox letterBox" + i; // Присваиваем разные классы
	parent.appendChild(div);
}

var key;

//document.getElementById("myDiv").addEventListener("click", function () {
//	key = this.textContent;
//	console.log(key);
//});
