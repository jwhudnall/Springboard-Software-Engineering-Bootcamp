/*
Further Study TODO:
- Instead of hard-coding colors, try something different like random colors or even images!
*/

const gameContainer = document.getElementById("game");
const highScoreSpan = document.querySelector('#high-score');
const currentScoreSpan = document.querySelector('#current-score');
const scoreboard = document.querySelector('#scoreboard');
let nextCardColor = null;
let userCanClick = true;
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "yellow"
];

let shuffledColors = shuffle(COLORS);

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.setAttribute("data-clicked", false);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  let color = event.target.className;
  let hasBeenClicked = event.target.dataset.clicked;

  if (hasBeenClicked === "false" && userCanClick) {
    updateScore();
    flipCard(event, color);
    checkBoard(event, color);
    checkGameStatus();
  }
}

function updateScore() {
  score++;
  currentScoreSpan.textContent = score;
}

function checkGameStatus() {
  let cards = gameContainer.children;
  let lengthOfDeck = cards.length;
  let clickedCardCount = 0;
  for (card of cards) {
    if (card.dataset.clicked === "true") {
      clickedCardCount++;
    }
  }
  if (clickedCardCount === lengthOfDeck) {
    gameOver();
  }
}

function gameOver() {
  updateLocalStorage();
  let playAgainBtn = document.createElement('button');
  playAgainBtn.textContent = 'Play Again?';
  playAgainBtn.classList.add('btn');
  document.body.append(playAgainBtn);

  playAgainBtn.addEventListener('click', function () {
    resetGame(playAgainBtn);
  })
}

function updateLocalStorage() {
  if (!localStorage.score || score < parseInt(localStorage.score)) {
    localStorage.setItem('score', score);
    highScoreSpan.textContent = score;
  }
}

function resetGame(btn) {
  console.log('Reset Board!')
  gameContainer.innerHTML = '';
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  btn.remove();
  score = 0;
  currentScoreSpan.textContent = 0;
}

function flipCard(event, color) {
  event.target.style.backgroundColor = color;
  event.target.dataset.clicked = true;
}

function checkBoard(event, color) {
  if (nextCardColor === color) {
    nextCardColor = null;
  } else if (nextCardColor === null) {
    nextCardColor = color;
  } else {
    resetFlippedCards(event, color);
  }
}

function resetFlippedCards(event, color) {
  userCanClick = !userCanClick;
  event.target.style.backgroundColor = color;

  setTimeout(function () {
    const cardsOfNextType = document.getElementsByClassName(nextCardColor);
    event.target.dataset.clicked = false;
    event.target.style.backgroundColor = "";
    for (let card of cardsOfNextType) {
      card.style.backgroundColor = "";
      card.dataset.clicked = false;
    }
    nextCardColor = null;
    userCanClick = !userCanClick;
  }, 1000)
}

function displayHomeScreen() {
  gameContainer.style.display = "none";
  scoreboard.style.display = "none";

  let startSection = document.createElement('section');
  let startBtn = document.createElement('button');
  startSection.classList.add('start-screen');
  startBtn.textContent = "Play";
  startBtn.classList.add('btn');
  startSection.append(startBtn);
  document.body.append(startSection);

  startBtn.addEventListener("click", function () {
    startSection.style.display = "none";
    gameContainer.removeAttribute('style');
    scoreboard.removeAttribute('style');
  })
}

function getHighScore() {
  highScoreSpan.textContent = localStorage.score || "N/A";
}

function startProgram() {
  getHighScore();
  createDivsForColors(shuffledColors);
  displayHomeScreen();
}

startProgram();