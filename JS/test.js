"use strict";
let userName;
let sum1 = Sum1();
let sum2 = Sum2();
let sum3 = Sum3();
function greetings() {
	for (let i = 1; i < 2; i++) {
		userName = prompt("Привет! Как тебя зовут?", "");

		if (
			userName == NaN ||
			userName == null ||
			userName == undefined ||
			userName == ""
		) {
			i--;
		} else {
			start();
		}
	}

	return userName;
}

function start() {
	let answer = confirm(`${userName}, ты хочешь посчитать?`);
	if (answer == true) {
		Sum1();
	} else {
		alert(`Goodbuy, ${userName}!`);
	}
}
function Sum1() {
	let a = Sum2();
	let b = Sum3();
	let sum1 = a + b;
	return sum1;
}

function Sum2() {
	let c = 4;
	let d = 5;
	let sum2 = d - c;
	return sum2;
}

function Sum3() {
	return 4 + 5;
}
greetings();
console.log(sum1);
console.log(sum2);
console.log(sum3);
