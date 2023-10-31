const array = [1, 2, 3, 4, 5];

const string = array.reduce((accumulator, currentValue) => {
	return accumulator + currentValue;
}, "");

console.log(string);
