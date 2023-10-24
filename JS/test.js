const path = "dictionary.txt";

const fs = require("fs");

const text = fs.readFileSync(path, "utf8");

// Выбираем случайное слово из текста файла
const words = text.replace(/\r/g, "").split("\n");
const randomWordIndex = Math.floor(Math.random() * words.length);
const randomWord = words[randomWordIndex];

console.log(randomWord);
