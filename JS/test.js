// Получаем элемент с классом letter[i]
const element = document.querySelector(`${letter + i}`);

// Устанавливаем значение переменной в элемент
element.textContent = randomWord[i];
