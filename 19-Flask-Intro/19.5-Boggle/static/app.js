const guessForm = document.querySelector('#submit-guess');
const guessMsgSection = document.querySelector('#guess-msg');
const scoreboard = document.querySelector('#score');
const guessInput = document.querySelector('#guess');
const submitBtn = document.querySelector('#submit-guess-btn');
const timeLeft = document.querySelector('#time');
const highScore = document.querySelector('#high-score');

class Game {
	constructor(duration) {
		this.duration = duration;
		this.score = 0;
		this.guessedWords = new Set();
		this.initialize();
		this.startTimer(this.duration, timeLeft);
	}

	async submitForm(word) {
		try {
			const response = await axios.get('http://localhost:5002/handle-guess', { params: { guess: word } });
			return response;
		} catch (e) {
			console.log('Error!');
			alert(e);
		}
	}

	translateGuess(response, guess) {
		const msg = response.data.result;
		let text;
		if (msg === 'not-word') {
			text = 'This is not a valid word';
		} else if (msg === 'not-on-board') {
			text = 'This word is not on the board';
		} else if (msg === 'ok') {
			text = 'Successful Guess!';
			this.incrementScore(guess);
			this.addWordToSet(guess);
		}
		return text;
	}

	addWordToSet(word) {
		this.guessedWords.add(word);
	}

	incrementScore(word) {
		const points = word.length;
		this.score += points;
		scoreboard.textContent = this.score;
	}

	updateGuessMsgSection(text) {
		guessMsgSection.innerHTML = '';
		const userMsg = document.createElement('p');
		userMsg.innerText = text;
		guessMsgSection.append(userMsg);
	}

	async gameOver() {
		submitBtn.disabled = true;
		guessInput.value = '';
		guessInput.disabled = true;
		const highScoreRes = await this.updateUserStats();
		this.updateGuessMsgSection('Game Over!');
		highScore.textContent = highScoreRes;
	}

	async updateUserStats() {
		const currentScore = this.score;
		try {
			const response = await axios.post('http://localhost:5002/update-user-stats', { score: currentScore });
			return response.data;
		} catch (e) {
			alert("Couldn't Update User Stats. Check console for more info.");
			console.log(e);
		}
	}

	async initialize() {
		guessForm.addEventListener('submit', async (e) => {
			e.preventDefault();
			const guess = guessInput.value;
			if (this.guessedWords.has(guess)) {
				this.updateGuessMsgSection('You already guessed that!');
			} else {
				const res = await this.submitForm(guess);
				const msg = this.translateGuess(res, guess);
				this.updateGuessMsgSection(msg);
				// this.addWordToSet(guess);
			}
			guessInput.value = '';
		});
	}

	// Timer Source: https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
	startTimer(duration, display) {
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

		let endGame = this.gameOver.bind(this);
		setTimeout(function() {
			endGame();
			clearInterval(time);
		}, (duration + 1) * 1000);
	}
}

const newGame = new Game(60);
