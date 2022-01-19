const guessForm = document.querySelector('#submit-guess');
const guessMsgSection = document.querySelector('#guess-msg');

guessForm.addEventListener('submit', async function(e) {
	e.preventDefault();
	const guess = this.guess.value;
	const res = await submitForm(guess);
	const msg = translateGuess(res);
	updateGuessMsgSection(msg);
	this.guess.value = '';
});

async function submitForm(word) {
	const response = await axios.post('http://localhost:5002/handle-guess', { guess: word });
	return response;
}

function translateGuess(response) {
	const msg = response.data.result;
	let text;
	if (msg === 'not-word') {
		text = 'This is not a valid word';
	} else if (msg === 'not-on-board') {
		text = 'This word is not on the board';
	} else if (msg === 'ok') {
		text = 'Successful Guess!';
	}
	return text;
}

// Add new paragraph before form, with translateGuess text
function updateGuessMsgSection(text) {
	guessMsgSection.innerHTML = '';
	const userMsg = document.createElement('p');
	userMsg.innerText = text;
	guessMsgSection.append(userMsg);
}
