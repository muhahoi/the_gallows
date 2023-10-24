function greetings() {
	for (let i = 1; i < 2; i++) {
		let greetings = prompt("[N]ew game or [E]xit");
		//let greetings = "n";

		if (greetings == "N" || greetings == "n") {
			console.log("Отлично");
			//start();
		} else if (greetings == "E" || greetings == "e") {
			console.log("До свидания");
		} else {
			console.log("Ошибка");
			i--;
		}
		console.log(greetings);
	}
}
greetings();
