const guessForm = document.querySelector('#submit-guess');
const guessMsgSection = document.querySelector('#guess-msg');
const scoreboard = document.querySelector('#score');
const guessInput = document.querySelector('#guess');
const submitBtn = document.querySelector('#submit-guess-btn');
const timeLeft = document.querySelector('#time');

let currentScore = 0;

guessForm.addEventListener('submit', async function(e) {
	e.preventDefault();
	const guess = this.guess.value;
	const res = await submitForm(guess);
	const msg = translateGuess(res, guess);
	updateGuessMsgSection(msg);
	this.guess.value = '';
});

async function submitForm(word) {
	const response = await axios.post('http://localhost:5002/handle-guess', { guess: word });
	return response;
}

function translateGuess(response, word) {
	const msg = response.data.result;
	let text;
	if (msg === 'not-word') {
		text = 'This is not a valid word';
	} else if (msg === 'not-on-board') {
		text = 'This word is not on the board';
	} else if (msg === 'ok') {
		text = 'Successful Guess!';
		incrementScore(word);
	}
	return text;
}

function incrementScore(word) {
	const points = word.length;
	currentScore += points;
	scoreboard.textContent = currentScore;
}

function updateGuessMsgSection(text) {
	guessMsgSection.innerHTML = '';
	const userMsg = document.createElement('p');
	userMsg.innerText = text;
	guessMsgSection.append(userMsg);
}

function gameOver() {
	submitBtn.disabled = true;
	guessInput.value = '';
	guessInput.disabled = true;
	updateUserStats(currentScore);
}

async function updateUserStats(score) {
	const response = await axios.post('http://localhost:5002/update-user-stats', { score: currentScore });
	console.log(response);
	return response;
}

// Timer Source: https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
function startTimer(duration, display) {
	let timer = duration;
	let minutes;
	let seconds;
	const time = setInterval(function() {
		minutes = parseInt(timer / 60);
		seconds = parseInt(timer % 60);

		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		display.textContent = minutes + ':' + seconds;

		if (timer-- < 0) {
			timer = duration;
		}
	}, 1000);

	setTimeout(function() {
		gameOver();
		clearInterval(time);
	}, (duration + 1) * 1000);
}

window.onload = function() {
	const gameDuration = 60 * 1;
	startTimer(10, timeLeft);
	timeLeft.textContent = '01:00';
};
